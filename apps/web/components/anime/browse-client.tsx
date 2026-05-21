"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animeCatalog, genres as genreSeeds } from "@kaistream/shared";

import { useInfiniteBrowse } from "@/hooks/use-infinite-browse";
import { PageShell } from "@/components/page-shell";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function BrowseClient() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filters = useMemo(
    () => ({
      query,
      genre,
      type,
      status,
      rating
    }),
    [genre, query, rating, status, type]
  );

  const browse = useInfiniteBrowse(filters);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && browse.hasNextPage && !browse.isFetchingNextPage) {
        browse.fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [browse]);

  const items = browse.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Infinite Discovery</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-white">Browse Anime</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/65">
          Filter by vibe, format, release window, and rating while KaiStream keeps streaming new cards into view.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or synopsis" />
          <select value={genre} onChange={(event) => setGenre(event.target.value)} className="h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white">
            <option value="">All genres</option>
            {genreSeeds.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white">
            <option value="">All formats</option>
            {Array.from(new Set(animeCatalog.map((anime) => anime.type))).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white">
            <option value="">All status</option>
            {Array.from(new Set(animeCatalog.map((anime) => anime.status))).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={rating} onChange={(event) => setRating(event.target.value)} className="h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white">
            <option value="">Any rating</option>
            <option value="9">9.0+</option>
            <option value="8.5">8.5+</option>
            <option value="8">8.0+</option>
          </select>
        </div>
      </section>

      {browse.isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[3/4] rounded-[28px]" />
          ))}
        </div>
      ) : (
        <>
          <AnimeGrid items={items} />
          <div ref={sentinelRef} className="h-10" />
        </>
      )}
    </PageShell>
  );
}
