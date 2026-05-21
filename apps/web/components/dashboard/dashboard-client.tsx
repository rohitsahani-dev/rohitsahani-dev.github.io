"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getDashboardData } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { AnimeCard } from "@/components/anime/anime-card";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardClient() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData
  });

  if (!data) {
    return null;
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardContent className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Dashboard</p>
            <h1 className="font-display text-5xl font-semibold">{data.profile.name}</h1>
            <p className="text-white/65">{data.profile.email}</p>
            <div className="grid gap-4 md:grid-cols-3">
              <Stat label="Favorites" value={data.stats.totalFavorites} />
              <Stat label="Watched Episodes" value={data.stats.watchedEpisodes} />
              <Stat label="Unread Alerts" value={data.stats.unreadNotifications} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Notifications</p>
            <div className="space-y-3">
              {data.notifications.map((notification) => (
                <div key={notification.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="font-semibold text-white">{notification.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{notification.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-semibold">Continue Watching</h2>
          <Link href="/history" className="text-sm text-white/65 transition hover:text-white">
            Full history
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {data.continueWatching.map((entry) => (
            <Card key={`${entry.anime.slug}-${entry.episodeNumber}`}>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <img src={entry.anime.posterImage} alt={entry.anime.title} className="h-28 w-20 rounded-2xl object-cover" />
                  <div className="space-y-2">
                    <p className="font-semibold">{entry.anime.title}</p>
                    <p className="text-sm text-white/60">Episode {entry.episodeNumber}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">{entry.anime.quality}</p>
                  </div>
                </div>
                <Progress value={entry.progress * 100} />
                <Link href={`/watch/${entry.anime.slug}/episode/${entry.episodeNumber}`} className="text-sm font-semibold text-white/80">
                  Resume watching
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">Personalized Picks</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.personalized.map((anime) => (
            <AnimeCard
              key={anime.slug}
              anime={{
                ...anime,
                japaneseTitle: anime.title,
                tagline: "Recommended from your watch graph",
                synopsis: "",
                releaseYear: 2026,
                season: "Spring",
                type: "TV",
                status: "ONGOING",
                dubStatus: "BOTH",
                maturityRating: "13+",
                duration: 24,
                totalEpisodes: 12,
                views: 0,
                featured: false,
                trending: false,
                latest: false,
                topRated: false,
                popularWeek: false,
                recommended: true,
                movie: false,
                bannerImage: anime.posterImage,
                trailerUrl: null,
                trailerThumbnail: null,
                upcomingEpisodeAt: null,
                studios: [],
                themes: [],
                latestEpisodeNumber: 1,
                ratingCount: 1000
              }}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
