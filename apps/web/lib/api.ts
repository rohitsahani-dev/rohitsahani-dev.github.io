import type { DashboardData, SearchResponse } from "./site-types";
import type { AnimeDetail, AnimeSummary, BrowseResponse, GenreDirectoryEntry, HomeData, ScheduleEntry, WatchPayload } from "./site-types";
import {
  getFallbackAnimeDetail,
  getFallbackBrowseData,
  getFallbackCategoryData,
  getFallbackDashboardData,
  getFallbackGenreDirectory,
  getFallbackHomeData,
  getFallbackScheduleData,
  getFallbackSearchResponse,
  getFallbackWatchPayload
} from "./fallback-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type RequestOptions<T> = RequestInit & {
  fallback?: T | (() => T | Promise<T>);
  revalidate?: number;
};

async function request<T>(path: string, options: RequestOptions<T> = {}): Promise<T> {
  const { fallback, revalidate, headers, ...init } = options;

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      credentials: "include",
      ...(revalidate ? { next: { revalidate } } : {})
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (fallback !== undefined) {
      return typeof fallback === "function" ? await (fallback as () => T | Promise<T>)() : fallback;
    }

    throw error;
  }
}

export function getHomeData() {
  return request<HomeData>("/anime/home", {
    revalidate: 180,
    fallback: getFallbackHomeData
  });
}

export function getBrowseData(params: Record<string, string | number | boolean | null | undefined>) {
  const query = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((accumulator, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        accumulator[key] = String(value);
      }
      return accumulator;
    }, {})
  );

  return request<BrowseResponse>(`/anime/browse?${query.toString()}`, {
    revalidate: 120,
    fallback: () =>
      getFallbackBrowseData({
        page: Number(params.page ?? 1),
        limit: Number(params.limit ?? 18),
        query: typeof params.query === "string" ? params.query : null,
        genre: typeof params.genre === "string" ? params.genre : null,
        year: typeof params.year === "number" ? params.year : params.year ? Number(params.year) : null,
        type: typeof params.type === "string" ? params.type : null,
        status: typeof params.status === "string" ? params.status : null,
        rating: typeof params.rating === "number" ? params.rating : params.rating ? Number(params.rating) : null,
        dubOnly: params.dubOnly === true || params.dubOnly === "true",
        movieOnly: params.movieOnly === true || params.movieOnly === "true"
      })
  });
}

export function getCategoryData(category: "trending" | "latest" | "movies" | "dubbed" | "top-rated") {
  return request<AnimeSummary[]>(`/anime/${category}`, {
    revalidate: 120,
    fallback: () => getFallbackCategoryData(category)
  });
}

export function getScheduleData() {
  return request<ScheduleEntry[]>("/anime/schedule", {
    revalidate: 120,
    fallback: getFallbackScheduleData
  });
}

export function getGenreDirectory() {
  return request<GenreDirectoryEntry[]>("/anime/genres", {
    revalidate: 300,
    fallback: getFallbackGenreDirectory
  });
}

export function getAnimeDetail(slug: string) {
  return request<AnimeDetail | null>(`/anime/${slug}`, {
    revalidate: 180,
    fallback: () => getFallbackAnimeDetail(slug)
  });
}

export function getWatchPayload(slug: string, episode: number) {
  return request<WatchPayload | null>(`/anime/${slug}/watch/${episode}`, {
    revalidate: 60,
    fallback: () => getFallbackWatchPayload(slug, episode)
  });
}

export function getSearchData(params: {
  q: string;
  genre?: string;
  year?: number;
  type?: string;
  status?: string;
  rating?: number;
}) {
  const query = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((accumulator, [key, value]) => {
      if (value !== undefined && value !== "") {
        accumulator[key] = String(value);
      }
      return accumulator;
    }, {})
  );

  return request<SearchResponse>(`/anime/search?${query.toString()}`, {
    revalidate: 60,
    fallback: () =>
      getFallbackSearchResponse(params.q, {
        genre: params.genre,
        year: params.year,
        type: params.type,
        status: params.status,
        rating: params.rating
      })
  });
}

export function getDashboardData() {
  return request<DashboardData>("/user/dashboard", {
    fallback: getFallbackDashboardData
  });
}

export function getFavoritesData() {
  return request<DashboardData["favorites"]>("/user/favorites", {
    fallback: () => getFallbackDashboardData().favorites
  });
}

export function getHistoryData() {
  return request<
    Array<{
      id?: string;
      progress: number;
      watched: boolean;
      updatedAt: string | Date;
      anime: {
        slug: string;
        title: string;
        posterImage: string;
      };
      episode: {
        number: number;
        title: string;
        duration: number;
      };
    }>
  >("/user/history", {
    fallback: () =>
      getFallbackDashboardData().continueWatching.map((entry) => ({
        progress: entry.progress,
        watched: entry.progress >= 0.9,
        updatedAt: entry.updatedAt,
        anime: {
          slug: entry.anime.slug,
          title: entry.anime.title,
          posterImage: entry.anime.posterImage
        },
        episode: {
          number: entry.episodeNumber,
          title: `Episode ${entry.episodeNumber}`,
          duration: 24
        }
      }))
  });
}

export function postJson<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export function patchJson<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}
