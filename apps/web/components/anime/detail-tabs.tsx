"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { AnimeDetail } from "@/lib/site-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function DetailTabs({ anime }: { anime: AnimeDetail }) {
  const [query, setQuery] = useState("");
  const [showDub, setShowDub] = useState(false);

  const filteredEpisodes = useMemo(
    () =>
      anime.episodes.filter((episode) => {
        if (query && !episode.title.toLowerCase().includes(query.toLowerCase()) && String(episode.number) !== query) {
          return false;
        }

        if (showDub) {
          return anime.dubStatus === "DUB" || anime.dubStatus === "BOTH";
        }

        return true;
      }),
    [anime.dubStatus, anime.episodes, query, showDub]
  );

  return (
    <Tabs defaultValue="episodes" className="space-y-6">
      <TabsList>
        <TabsTrigger value="episodes">Episodes</TabsTrigger>
        <TabsTrigger value="related">Related</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="characters">Characters</TabsTrigger>
      </TabsList>

      <TabsContent value="episodes" className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1fr,auto]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search episode or number" />
          <button
            type="button"
            onClick={() => setShowDub((value) => !value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              showDub ? "border-accent/30 bg-accent/16 text-white" : "border-white/10 bg-white/[0.03] text-white/70"
            }`}
          >
            {showDub ? "Showing Dub-ready" : "Toggle Dub/Sub"}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredEpisodes.map((episode) => (
            <Link
              key={episode.number}
              href={`/watch/${anime.slug}/episode/${episode.number}`}
              className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/16 hover:bg-white/[0.06]"
            >
              <img src={episode.thumbnailImage} alt={episode.title} className="aspect-video w-full rounded-2xl object-cover" />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">Episode {episode.number}</p>
                  <Badge variant="accent">{episode.duration} min</Badge>
                </div>
                <p className="text-sm text-white/70">{episode.title}</p>
                <p className="line-clamp-2 text-sm leading-6 text-white/55">{episode.synopsis}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Mark watched • stream now</p>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="related">
        <Shelf items={anime.related} emptyText="No related anime yet." />
      </TabsContent>

      <TabsContent value="recommendations">
        <Shelf items={anime.recommendations} emptyText="Recommendations are still tuning." />
      </TabsContent>

      <TabsContent value="reviews">
        <div className="grid gap-4 lg:grid-cols-2">
          {anime.reviews.map((review) => (
            <div key={`${review.author.name}-${review.headline}`} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{review.author.name}</p>
                  <p className="text-sm text-white/50">{review.headline}</p>
                </div>
                <Badge variant="accent">{review.rating.toFixed(1)}</Badge>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">{review.body}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="characters">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {anime.characters.map((character) => (
            <div key={character.name} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">{character.role}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{character.name}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{character.summary}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function Shelf({ items, emptyText }: { items: AnimeDetail["related"]; emptyText: string }) {
  if (!items.length) {
    return <div className="rounded-[26px] border border-dashed border-white/10 bg-white/[0.02] p-6 text-white/55">{emptyText}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link key={item.slug} href={`/anime/${item.slug}`} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]">
          <img src={item.posterImage} alt={item.title} className="aspect-[3/4] w-full rounded-2xl object-cover" />
          <h3 className="mt-4 font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-white/58">{item.tagline}</p>
        </Link>
      ))}
    </div>
  );
}
