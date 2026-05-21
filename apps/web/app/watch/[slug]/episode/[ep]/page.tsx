import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWatchPayload } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { VideoPlayer } from "@/components/watch/video-player";
import { EpisodeSidebar } from "@/components/watch/episode-sidebar";
import { AnimeCard } from "@/components/anime/anime-card";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; ep: string }> }): Promise<Metadata> {
  const { slug, ep } = await params;
  const payload = await getWatchPayload(slug, Number(ep));

  if (!payload) {
    return {};
  }

  return {
    title: `${payload.anime.title} Episode ${payload.episode.number}`,
    description: payload.episode.synopsis
  };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string; ep: string }> }) {
  const { slug, ep } = await params;
  const payload = await getWatchPayload(slug, Number(ep));

  if (!payload) {
    notFound();
  }

  return (
    <PageShell className="section-shell space-y-8 pb-16">
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Watch Player</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">
            {payload.anime.title} • Episode {payload.episode.number}
          </h1>
        </div>
        <div className="flex gap-3">
          {payload.navigation.previous && (
            <Link href={`/watch/${slug}/episode/${payload.navigation.previous}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75">
              <ArrowLeft className="size-4" />
              Previous
            </Link>
          )}
          {payload.navigation.next && (
            <Link href={`/watch/${slug}/episode/${payload.navigation.next}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75">
              Next
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <VideoPlayer payload={payload} />
        <EpisodeSidebar slug={slug} currentEpisode={payload.episode.number} episodes={payload.episodes} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="font-display text-2xl font-semibold">Episode Description</h2>
          <p className="mt-4 text-sm leading-8 text-white/65">{payload.episode.synopsis}</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm text-white/55">Keyboard shortcuts</p>
              <p className="mt-2 text-sm leading-7 text-white/72">Space = pause • Left/Right = seek • F = fullscreen • N = next episode</p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h2 className="font-display text-2xl font-semibold">Comments</h2>
          <div className="mt-4 space-y-4">
            {payload.anime.comments?.slice?.(0, 3)?.map?.((comment) => (
              <div key={`${comment.author.name}-${comment.message}`} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <p className="font-semibold">{comment.author.name}</p>
                <p className="mt-2 text-sm leading-7 text-white/62">{comment.message}</p>
              </div>
            )) ?? (
              <p className="text-sm text-white/55">Jump into the conversation after login.</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">Recommended Anime</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {payload.recommendations.map((anime) => (
            <AnimeCard key={anime.slug} anime={anime} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
