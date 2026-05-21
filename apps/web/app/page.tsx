import type { ReactNode } from "react";
import { Bell, Sparkles } from "lucide-react";
import Link from "next/link";

import { getHomeData } from "@/lib/api";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { AnimeRow } from "@/components/anime/anime-row";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const home = await getHomeData();

  return (
    <PageShell className="section-shell space-y-12 pb-16">
      <HeroCarousel items={home.featured} />

      <section className="grid gap-6 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Premium feed</p>
          <h2 className="font-display text-4xl font-semibold">Original discovery, responsive watch UX, and deep user tracking.</h2>
          <p className="max-w-3xl text-base leading-8 text-white/65">
            KaiStream blends cinematic browsing, instant search, adaptive HLS playback, subtitle switching, and personalized watch history into a modern anime platform feel.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureStat title="Adaptive playback" body="Video.js + HLS streaming, subtitle tracks, server switching, theater mode, and keyboard shortcuts." icon={<Sparkles className="size-5" />} />
          <FeatureStat title="User pulse" body="Continue watching, favorites, history, notifications, and recommendation rails tuned from viewer behavior." icon={<Bell className="size-5" />} />
        </div>
      </section>

      <AnimeRow title="Trending Now" eyebrow="Momentum Feed" href="/trending" items={home.sections.trendingNow} />
      <AnimeRow title="Latest Episodes" eyebrow="Fresh Drops" href="/latest" items={home.sections.latestEpisodes} />
      <AnimeRow title="Popular This Week" eyebrow="Community Heat" href="/browse" items={home.sections.popularWeek} />
      <AnimeRow title="Top Rated" eyebrow="Critic Favorites" href="/top-rated" items={home.sections.topRated} />
      <AnimeRow title="Recommended For You" eyebrow="Taste Graph" href="/dashboard" items={home.sections.recommended} />
      <AnimeRow title="Continue Watching" eyebrow="Keep Going" href="/history" items={home.sections.continueWatching} />
      <AnimeRow title="New Movies" eyebrow="Feature Nights" href="/movies" items={home.sections.newMovies} />
      <AnimeRow title="Upcoming Releases" eyebrow="Countdown" href="/schedule" items={home.sections.upcoming} />

      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(168,85,247,0.2),rgba(6,182,212,0.06))] p-8 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Join KaiStream</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Track your next binge with synced progress and favorites.</h2>
          </div>
          <Button asChild size="lg">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}

function FeatureStat({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
      <div className="flex size-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/12 text-accent-soft">{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/62">{body}</p>
    </div>
  );
}
