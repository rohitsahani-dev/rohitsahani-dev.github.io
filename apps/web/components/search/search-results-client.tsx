"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { getSearchData } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { Badge } from "@/components/ui/badge";

export function SearchResultsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["search-page", query],
    queryFn: () => getSearchData({ q: query }),
    enabled: query.trim().length > 0
  });

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Search Pulse</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Search Results</h1>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the catalog"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }
            }}
          />
        </div>

        {data?.suggestions?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {data.suggestions.map((item) => (
              <Badge key={item.slug} variant="accent">
                {item.title}
              </Badge>
            ))}
          </div>
        ) : null}
      </section>

      {query.trim().length > 0 && data ? (
        <AnimeGrid items={data.items} />
      ) : (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-white/55">
          Type a title, genre, or mood to search KaiStream.
        </div>
      )}
    </PageShell>
  );
}
