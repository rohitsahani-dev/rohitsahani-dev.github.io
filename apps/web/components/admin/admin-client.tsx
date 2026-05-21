"use client";

import { useEffect, useState } from "react";
import { animeCatalog, sampleUsers } from "@kaistream/shared";

import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AdminOverview = {
  stats: {
    userCount: number;
    animeCount: number;
    episodeCount: number;
    commentCount: number;
  };
  recentAnime: Array<{ slug: string; title: string; quality: string }>;
  moderationQueue: Array<{ id: string; message: string; anime: { title: string }; user: { name: string } }>;
};

export function AdminClient() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"}/admin/overview`, {
      credentials: "include"
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Fallback to demo overview");
        }
        return response.json();
      })
      .then(setOverview)
      .catch(() =>
        setOverview({
          stats: {
            userCount: sampleUsers.length + 12,
            animeCount: animeCatalog.length,
            episodeCount: animeCatalog.reduce((sum, anime) => sum + anime.episodes.length, 0),
            commentCount: animeCatalog.reduce((sum, anime) => sum + anime.comments.length, 0)
          },
          recentAnime: animeCatalog.slice(0, 6).map((anime) => ({
            slug: anime.slug,
            title: anime.title,
            quality: anime.quality
          })),
          moderationQueue: animeCatalog.slice(0, 3).map((anime, index) => ({
            id: String(index),
            message: anime.comments[0]?.message ?? "No comment",
            anime: { title: anime.title },
            user: { name: anime.comments[0]?.author ?? "Kai Viewer" }
          }))
        })
      );
  }, []);

  if (!overview) {
    return null;
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Control Tower</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Admin Dashboard</h1>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Users" value={overview.stats.userCount} />
        <Metric title="Anime" value={overview.stats.animeCount} />
        <Metric title="Episodes" value={overview.stats.episodeCount} />
        <Metric title="Comments" value={overview.stats.commentCount} />
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-display text-2xl font-semibold">Add New Anime</h2>
            <div className="grid gap-3">
              <Input placeholder="Title" />
              <Input placeholder="Japanese title" />
              <Input placeholder="Poster URL" />
              <Input placeholder="Banner URL" />
              <Button type="button">Create anime entry</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-display text-2xl font-semibold">Moderation Queue</h2>
            <div className="space-y-3">
              {overview.moderationQueue.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="font-semibold">{item.anime.title}</p>
                  <p className="mt-2 text-sm text-white/60">{item.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/40">By {item.user.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent>
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">{title}</p>
        <p className="mt-3 font-display text-4xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
