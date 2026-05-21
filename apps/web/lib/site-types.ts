import type { CharacterSeed, GenreSeed, StreamSourceSeed, StudioSeed, SubtitleSeed } from "@kaistream/shared";

export interface AnimeSummary {
  id?: string;
  slug: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  synopsis: string;
  releaseYear: number;
  season: string;
  type: string;
  status: string;
  dubStatus: string;
  maturityRating: string;
  duration: number;
  totalEpisodes: number;
  averageRating: number;
  ratingCount: number;
  views: number;
  quality: string;
  featured: boolean;
  trending: boolean;
  latest: boolean;
  topRated: boolean;
  popularWeek: boolean;
  recommended: boolean;
  movie: boolean;
  bannerImage: string;
  posterImage: string;
  trailerUrl?: string | null;
  trailerThumbnail?: string | null;
  upcomingEpisodeAt?: string | Date | null;
  genres: GenreSeed[];
  studios: StudioSeed[];
  themes: string[];
  latestEpisodeNumber: number | null;
}

export interface AnimeDetail extends AnimeSummary {
  episodes: Array<{
    id?: string;
    number: number;
    slug: string;
    title: string;
    synopsis: string;
    duration: number;
    airDate: string | Date;
    introStart: number;
    introEnd: number;
    thumbnailImage: string;
    sources: StreamSourceSeed[];
    subtitles: Array<SubtitleSeed & { isDefault?: boolean }>;
  }>;
  characters: CharacterSeed[];
  reviews: Array<{
    id?: string;
    rating: number;
    headline: string;
    body: string;
    createdAt: string | Date;
    author: {
      name: string;
      avatar?: string | null;
    };
  }>;
  comments: Array<{
    id?: string;
    message: string;
    likesCount: number;
    createdAt: string | Date;
    episodeId?: string | null;
    author: {
      name: string;
      avatar?: string | null;
    };
  }>;
  related: AnimeSummary[];
  recommendations: AnimeSummary[];
}

export interface HomeData {
  featured: AnimeSummary[];
  sections: {
    trendingNow: AnimeSummary[];
    latestEpisodes: AnimeSummary[];
    popularWeek: AnimeSummary[];
    topRated: AnimeSummary[];
    recommended: AnimeSummary[];
    continueWatching: AnimeSummary[];
    newMovies: AnimeSummary[];
    upcoming: AnimeSummary[];
  };
}

export interface BrowseResponse {
  items: AnimeSummary[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface SearchResponse extends BrowseResponse {
  suggestions: Array<{
    slug: string;
    title: string;
    posterImage: string;
    genres: GenreSeed[];
  }>;
  recentSearches: string[];
}

export interface ScheduleEntry extends AnimeSummary {
  nextEpisodeLabel: string;
}

export interface GenreDirectoryEntry {
  id?: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  featuredAnime: AnimeSummary[];
}

export interface WatchPayload {
  anime: AnimeSummary & {
    comments?: AnimeDetail["comments"];
  };
  episode: AnimeDetail["episodes"][number];
  navigation: {
    previous: number | null;
    next: number | null;
  };
  episodes: Array<{
    id?: string;
    number: number;
    title: string;
    duration: number;
    thumbnailImage: string;
  }>;
  recommendations: AnimeSummary[];
}

export interface DashboardData {
  profile: {
    id?: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: string;
    preferredLanguage: string;
    preferredAudio: string;
    autoplayNext: boolean;
    theaterMode: boolean;
  };
  continueWatching: Array<{
    id?: string;
    progress: number;
    updatedAt: string | Date;
    episodeNumber: number;
    anime: {
      slug: string;
      title: string;
      posterImage: string;
      quality: string;
    };
  }>;
  favorites: Array<{
    slug: string;
    title: string;
    posterImage: string;
    averageRating: number;
    quality: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    body: string;
    type: string;
    createdAt: string | Date;
    read: boolean;
  }>;
  personalized: Array<{
    slug: string;
    title: string;
    posterImage: string;
    averageRating: number;
    quality: string;
    genres: GenreSeed[];
  }>;
  stats: {
    totalFavorites: number;
    watchedEpisodes: number;
    unreadNotifications: number;
  };
}
