"use client";

import { useQuery } from "@tanstack/react-query";

import { getFavoritesData } from "@/lib/api";
import { PageShell } from "@/components/page-shell";
import { AnimeGrid } from "@/components/anime/anime-grid";

export function FavoritesClient() {
  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoritesData
  });

  if (!data) {
    return null;
  }

  return (
    <PageShell className="section-shell space-y-10 pb-16">
      <section>
        <p className="text-xs uppercase tracking-[0.34em] text-accent-soft">Curated Queue</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Favorites</h1>
      </section>

      <AnimeGrid
        items={data.map((anime) => ({
          ...anime,
          japaneseTitle: anime.title,
          tagline: "Saved to your personal shelf",
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
          recommended: false,
          movie: false,
          bannerImage: anime.posterImage,
          trailerUrl: null,
          trailerThumbnail: null,
          upcomingEpisodeAt: null,
          genres: [],
          studios: [],
          themes: [],
          latestEpisodeNumber: 1,
          ratingCount: 100
        }))}
      />
    </PageShell>
  );
}
