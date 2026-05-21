"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getHistoryData } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function HistoryClient() {
  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: getHistoryData
  });

  if (!data) {
    return null;
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Playback Timeline</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Watch History</h1>
      </section>

      <div className="grid gap-5">
        {data.map((entry) => (
          <Card key={`${entry.anime.slug}-${entry.episode.number}`}>
            <CardContent className="grid gap-4 md:grid-cols-[120px,1fr,180px] md:items-center">
              <img src={entry.anime.posterImage} alt={entry.anime.title} className="h-32 w-24 rounded-2xl object-cover" />
              <div className="space-y-3">
                <div>
                  <p className="font-display text-2xl font-semibold">{entry.anime.title}</p>
                  <p className="text-sm text-white/58">
                    Episode {entry.episode.number}: {entry.episode.title}
                  </p>
                </div>
                <Progress value={entry.progress * 100} />
              </div>
              <div className="md:text-right">
                <p className="text-sm text-white/60">{Math.round(entry.progress * 100)}% watched</p>
                <Link href={`/watch/${entry.anime.slug}/episode/${entry.episode.number}`} className="mt-3 inline-block text-sm font-semibold text-white/80">
                  Resume
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
