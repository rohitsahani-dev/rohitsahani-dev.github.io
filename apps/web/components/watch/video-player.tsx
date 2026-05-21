"use client";

import { MonitorPlay, PictureInPicture2, SkipForward } from "lucide-react";
import { useRouter } from "next/navigation";
import videojs from "video.js";
import { useEffect, useMemo, useRef, useState } from "react";

import type { WatchPayload } from "@/lib/site-types";
import { useSaveProgress } from "@/hooks/use-save-progress";
import { usePlayerStore } from "@/store/player-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function VideoPlayer({ payload }: { payload: WatchPayload }) {
  const router = useRouter();
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const lastSavedRef = useRef(0);
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [activeSourceName, setActiveSourceName] = useState(payload.episode.sources[0]?.name ?? "");
  const { autoNext, theaterMode, setAutoNext, setTheaterMode, currentServer, setCurrentServer } = usePlayerStore();
  const saveProgress = useSaveProgress();

  const activeSource = useMemo(
    () => payload.episode.sources.find((source) => source.name === (currentServer || activeSourceName)) ?? payload.episode.sources[0],
    [activeSourceName, currentServer, payload.episode.sources]
  );

  useEffect(() => {
    setCurrentServer(activeSource?.name ?? "");
  }, [activeSource?.name, setCurrentServer]);

  useEffect(() => {
    const element = videoElementRef.current;

    if (!element || !activeSource) {
      return;
    }

    const player = videojs(element, {
      controls: true,
      fluid: true,
      autoplay: false,
      preload: "auto",
      sources: [
        {
          src: activeSource.url,
          type: "application/x-mpegURL"
        }
      ],
      playbackRates: [0.75, 1, 1.25, 1.5, 2]
    });

    playerRef.current = player;

    payload.episode.subtitles.forEach((subtitle) => {
      player.addRemoteTextTrack(
        {
          kind: "subtitles",
          src: subtitle.url,
          srclang: subtitle.language,
          label: subtitle.label,
          default: subtitle.isDefault
        },
        false
      );
    });

    const onTimeUpdate = () => {
      const currentTime = player.currentTime() ?? 0;
      const duration = player.duration() || payload.episode.duration * 60;

      setShowSkipIntro(currentTime >= payload.episode.introStart && currentTime <= payload.episode.introEnd);

      if (duration > 0 && currentTime - lastSavedRef.current >= 12) {
        lastSavedRef.current = currentTime;
        saveProgress.mutate({
          animeSlug: payload.anime.slug,
          episodeNumber: payload.episode.number,
          progress: Number((currentTime / duration).toFixed(3))
        });
      }
    };

    const onEnded = () => {
      if (autoNext && payload.navigation.next) {
        router.push(`/watch/${payload.anime.slug}/episode/${payload.navigation.next}`);
      }
    };

    player.on("timeupdate", onTimeUpdate);
    player.on("ended", onEnded);

    return () => {
      player.dispose();
      playerRef.current = null;
    };
  }, [activeSource, autoNext, payload, router, saveProgress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const player = playerRef.current;

      if (!player) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      }

      if (event.key === "ArrowLeft") {
        player.currentTime(Math.max(0, (player.currentTime() ?? 0) - 10));
      }

      if (event.key === "ArrowRight") {
        player.currentTime((player.currentTime() ?? 0) + 10);
      }

      if (event.key.toLowerCase() === "f") {
        player.requestFullscreen();
      }

      if (event.key.toLowerCase() === "n" && payload.navigation.next) {
        router.push(`/watch/${payload.anime.slug}/episode/${payload.navigation.next}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [payload.anime.slug, payload.navigation.next, router]);

  return (
    <div className={`space-y-4 ${theaterMode ? "lg:col-span-2" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Now Playing</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">
            {payload.anime.title} • Episode {payload.episode.number}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge>{activeSource?.quality ?? "Auto"}</Badge>
          <Badge>{payload.anime.dubStatus}</Badge>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm">
            <span className="text-white/70">Auto Next</span>
            <Switch checked={autoNext} onCheckedChange={setAutoNext} />
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={() => setTheaterMode(!theaterMode)}>
            <MonitorPlay className="size-4" />
            Theater
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={async () => {
              const video = videoElementRef.current as (HTMLVideoElement & {
                requestPictureInPicture?: () => Promise<void>;
              }) | null;
              if (video?.requestPictureInPicture) {
                await video.requestPictureInPicture();
              }
            }}
          >
            <PictureInPicture2 className="size-4" />
            PiP
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-card">
        <div data-vjs-player className="w-full">
          <video ref={videoElementRef} className="video-js vjs-theme-city !aspect-video w-full" playsInline />
        </div>

        {showSkipIntro && (
          <div className="absolute bottom-6 left-6 z-10">
            <Button
              type="button"
              onClick={() => {
                playerRef.current?.currentTime(payload.episode.introEnd);
              }}
            >
              <SkipForward className="size-4" />
              Skip Intro
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          {payload.episode.sources.map((source) => (
            <button
              key={source.name}
              type="button"
              onClick={() => {
                setActiveSourceName(source.name);
                setCurrentServer(source.name);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                source.name === activeSource?.name
                  ? "border-accent/30 bg-accent/18 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/[0.08]"
              }`}
            >
              {source.name} • {source.quality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
