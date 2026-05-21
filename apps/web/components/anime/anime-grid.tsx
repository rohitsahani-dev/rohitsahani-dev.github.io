import type { AnimeSummary } from "@/lib/site-types";

import { AnimeCard } from "./anime-card";

export function AnimeGrid({ items }: { items: AnimeSummary[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((anime) => (
        <AnimeCard key={anime.slug} anime={anime} />
      ))}
    </div>
  );
}
