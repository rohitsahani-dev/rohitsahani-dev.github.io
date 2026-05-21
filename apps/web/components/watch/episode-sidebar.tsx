import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";

export function EpisodeSidebar({
  slug,
  currentEpisode,
  episodes
}: {
  slug: string;
  currentEpisode: number;
  episodes: Array<{
    number: number;
    title: string;
    duration: number;
    thumbnailImage: string;
  }>;
}) {
  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.32em] text-accent-soft">Episodes</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">Watch Queue</h3>
      </div>

      <ScrollArea className="h-[540px] pr-2">
        <div className="space-y-3">
          {episodes.map((episode) => {
            const active = episode.number === currentEpisode;

            return (
              <Link
                key={episode.number}
                href={`/watch/${slug}/episode/${episode.number}`}
                className={`grid gap-3 rounded-2xl border p-3 transition ${
                  active
                    ? "border-accent/35 bg-accent/12 shadow-glow"
                    : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.06]"
                }`}
              >
                <img src={episode.thumbnailImage} alt={episode.title} className="aspect-video w-full rounded-xl object-cover" />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Episode {episode.number}</p>
                  <p className="mt-1 font-semibold text-white">{episode.title}</p>
                  <p className="mt-1 text-sm text-white/55">{episode.duration} min</p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
