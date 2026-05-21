import { animeCatalog, genres, getAnimeBySlug, sampleUsers, studios } from "@kaistream/shared";

import type { AnimeDetail, AnimeSummary, BrowseResponse, DashboardData, GenreDirectoryEntry, HomeData, ScheduleEntry, SearchResponse, WatchPayload } from "./site-types";

function mapSummary(slug: string): AnimeSummary {
  const anime = getAnimeBySlug(slug);

  if (!anime) {
    throw new Error(`Unknown anime slug: ${slug}`);
  }

  return {
    slug: anime.slug,
    title: anime.title,
    japaneseTitle: anime.japaneseTitle,
    tagline: anime.tagline,
    synopsis: anime.synopsis,
    releaseYear: anime.releaseYear,
    season: anime.season,
    type: anime.type,
    status: anime.status,
    dubStatus: anime.dubStatus,
    maturityRating: anime.maturityRating,
    duration: anime.duration,
    totalEpisodes: anime.totalEpisodes,
    averageRating: anime.averageRating,
    ratingCount: anime.ratingCount,
    views: anime.views,
    quality: anime.quality,
    featured: anime.featured,
    trending: anime.trending,
    latest: anime.latest,
    topRated: anime.topRated,
    popularWeek: anime.popularWeek,
    recommended: anime.recommended,
    movie: anime.movie,
    bannerImage: anime.bannerImage,
    posterImage: anime.posterImage,
    trailerUrl: anime.trailerUrl,
    trailerThumbnail: anime.trailerThumbnail,
    upcomingEpisodeAt: anime.upcomingEpisodeAt ?? null,
    genres: anime.genres.map((genreSlug) => genres.find((genre) => genre.slug === genreSlug)!).filter(Boolean),
    studios: anime.studios.map((studioSlug) => studios.find((studio) => studio.slug === studioSlug)!).filter(Boolean),
    themes: anime.themes,
    latestEpisodeNumber: anime.episodes.at(-1)?.number ?? null
  };
}

export function getFallbackHomeData(): HomeData {
  const summaries = animeCatalog.map((anime) => mapSummary(anime.slug));

  return {
    featured: summaries.filter((item) => item.featured).slice(0, 5),
    sections: {
      trendingNow: summaries.filter((item) => item.trending).slice(0, 8),
      latestEpisodes: summaries.filter((item) => item.latest).slice(0, 8),
      popularWeek: summaries.filter((item) => item.popularWeek).slice(0, 8),
      topRated: summaries.filter((item) => item.topRated).slice(0, 8),
      recommended: summaries.filter((item) => item.recommended).slice(0, 8),
      continueWatching: summaries.slice(0, 6),
      newMovies: summaries.filter((item) => item.movie).slice(0, 6),
      upcoming: summaries.filter((item) => item.upcomingEpisodeAt).slice(0, 6)
    }
  };
}

export function getFallbackBrowseData(filters: {
  page?: number;
  limit?: number;
  query?: string | null;
  genre?: string | null;
  year?: number | null;
  type?: string | null;
  status?: string | null;
  rating?: number | null;
  dubOnly?: boolean;
  movieOnly?: boolean;
} = {}): BrowseResponse {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 18;

  let filtered = animeCatalog.filter((anime) => {
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matches = [anime.title, anime.japaneseTitle, anime.synopsis].some((value) => value.toLowerCase().includes(query));
      if (!matches) {
        return false;
      }
    }

    if (filters.genre && !anime.genres.includes(filters.genre)) {
      return false;
    }

    if (filters.year && anime.releaseYear !== filters.year) {
      return false;
    }

    if (filters.type && anime.type !== filters.type) {
      return false;
    }

    if (filters.status && anime.status !== filters.status) {
      return false;
    }

    if (filters.rating && anime.averageRating < filters.rating) {
      return false;
    }

    if (filters.dubOnly && !["DUB", "BOTH"].includes(anime.dubStatus)) {
      return false;
    }

    if (filters.movieOnly && !anime.movie) {
      return false;
    }

    return true;
  });

  filtered = filtered.sort((left, right) => right.averageRating - left.averageRating || right.views - left.views);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit).map((anime) => mapSummary(anime.slug));

  return {
    items,
    page,
    limit,
    total,
    hasMore: start + items.length < total
  };
}

export function getFallbackCategoryData(category: "trending" | "latest" | "movies" | "dubbed" | "top-rated") {
  return getFallbackBrowseData({
    page: 1,
    limit: 24,
    dubOnly: category === "dubbed",
    movieOnly: category === "movies"
  }).items.filter((item) => {
    if (category === "trending") return item.trending;
    if (category === "latest") return item.latest;
    if (category === "movies") return item.movie;
    if (category === "dubbed") return ["DUB", "BOTH"].includes(item.dubStatus);
    return item.topRated;
  });
}

export function getFallbackScheduleData(): ScheduleEntry[] {
  return animeCatalog
    .filter((anime) => anime.upcomingEpisodeAt)
    .sort((left, right) => new Date(left.upcomingEpisodeAt!).getTime() - new Date(right.upcomingEpisodeAt!).getTime())
    .map((anime) => ({
      ...mapSummary(anime.slug),
      nextEpisodeLabel: `Episode ${(anime.episodes.at(-1)?.number ?? 0) + 1}`
    }));
}

export function getFallbackGenreDirectory(): GenreDirectoryEntry[] {
  return genres.map((genre) => {
    const matches = animeCatalog.filter((anime) => anime.genres.includes(genre.slug));

    return {
      slug: genre.slug,
      name: genre.name,
      description: genre.description,
      count: matches.length,
      featuredAnime: matches.slice(0, 4).map((anime) => mapSummary(anime.slug))
    };
  });
}

export function getFallbackAnimeDetail(slug: string): AnimeDetail | null {
  const anime = getAnimeBySlug(slug);

  if (!anime) {
    return null;
  }

  return {
    ...mapSummary(slug),
    episodes: anime.episodes.map((episode) => ({
      ...episode,
      subtitles: episode.subtitles.map((subtitle) => ({
        ...subtitle,
        isDefault: subtitle.default ?? false
      }))
    })),
    characters: anime.characters,
    reviews: anime.reviews.map((review) => ({
      rating: review.rating,
      headline: review.headline,
      body: review.body,
      createdAt: review.createdAt,
      author: {
        name: review.author,
        avatar: review.avatar
      }
    })),
    comments: anime.comments.map((comment) => ({
      message: comment.message,
      likesCount: comment.likes,
      createdAt: comment.createdAt,
      author: {
        name: comment.author,
        avatar: comment.avatar
      }
    })),
    related: anime.relatedSlugs.map(mapSummary),
    recommendations: anime.recommendationSlugs.map(mapSummary)
  };
}

export function getFallbackWatchPayload(slug: string, episodeNumber: number): WatchPayload | null {
  const detail = getFallbackAnimeDetail(slug);

  if (!detail) {
    return null;
  }

  const episode = detail.episodes.find((item) => item.number === episodeNumber);

  if (!episode) {
    return null;
  }

  return {
    anime: detail,
    episode,
    navigation: {
      previous: episodeNumber > 1 ? episodeNumber - 1 : null,
      next: episodeNumber < detail.episodes.length ? episodeNumber + 1 : null
    },
    episodes: detail.episodes.map((entry) => ({
      number: entry.number,
      title: entry.title,
      duration: entry.duration,
      thumbnailImage: entry.thumbnailImage
    })),
    recommendations: detail.recommendations
  };
}

export function getFallbackSearchResponse(query: string, filters: {
  genre?: string | null;
  year?: number | null;
  type?: string | null;
  status?: string | null;
  rating?: number | null;
} = {}): SearchResponse {
  const result = getFallbackBrowseData({
    page: 1,
    limit: 24,
    query,
    ...filters
  });

  return {
    ...result,
    suggestions: result.items.slice(0, 6).map((item) => ({
      slug: item.slug,
      title: item.title,
      posterImage: item.posterImage,
      genres: item.genres
    })),
    recentSearches: ["cyberpunk noir", "spring simulcast", "romance fantasy", "mecha academy"]
  };
}

export function getFallbackDashboardData(): DashboardData {
  const user = sampleUsers[0]!;

  return {
    profile: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      preferredLanguage: user.language,
      preferredAudio: "BOTH",
      autoplayNext: true,
      theaterMode: false
    },
    continueWatching: user.history.map((entry) => ({
      progress: entry.progress,
      updatedAt: entry.updatedAt,
      episodeNumber: entry.episodeNumber,
      anime: {
        slug: entry.animeSlug,
        title: mapSummary(entry.animeSlug).title,
        posterImage: mapSummary(entry.animeSlug).posterImage,
        quality: mapSummary(entry.animeSlug).quality
      }
    })),
    favorites: user.favoriteSlugs.map((slug) => {
      const item = mapSummary(slug);
      return {
        slug: item.slug,
        title: item.title,
        posterImage: item.posterImage,
        averageRating: item.averageRating,
        quality: item.quality
      };
    }),
    notifications: user.notifications,
    personalized: animeCatalog
      .filter((anime) => !user.favoriteSlugs.includes(anime.slug))
      .slice(0, 6)
      .map((anime) => {
        const item = mapSummary(anime.slug);
        return {
          slug: item.slug,
          title: item.title,
          posterImage: item.posterImage,
          averageRating: item.averageRating,
          quality: item.quality,
          genres: item.genres
        };
      }),
    stats: {
      totalFavorites: user.favoriteSlugs.length,
      watchedEpisodes: user.history.length,
      unreadNotifications: user.notifications.filter((entry) => !entry.read).length
    }
  };
}
