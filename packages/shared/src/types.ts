export type AnimeStatus = "ONGOING" | "COMPLETED" | "UPCOMING";
export type AnimeType = "TV" | "MOVIE" | "ONA" | "SPECIAL";
export type DubStatus = "SUB" | "DUB" | "BOTH";
export type UserRole = "USER" | "ADMIN";

export interface GenreSeed {
  slug: string;
  name: string;
  description: string;
}

export interface StudioSeed {
  slug: string;
  name: string;
  country: string;
}

export interface StreamSourceSeed {
  name: string;
  url: string;
  quality: string;
  region: string;
}

export interface SubtitleSeed {
  label: string;
  language: string;
  url: string;
  default?: boolean;
}

export interface CharacterSeed {
  name: string;
  role: string;
  summary: string;
}

export interface ReviewSeed {
  author: string;
  avatar: string;
  rating: number;
  headline: string;
  body: string;
  createdAt: string;
}

export interface CommentSeed {
  author: string;
  avatar: string;
  message: string;
  likes: number;
  createdAt: string;
}

export interface EpisodeSeed {
  number: number;
  slug: string;
  title: string;
  synopsis: string;
  duration: number;
  airDate: string;
  introStart: number;
  introEnd: number;
  thumbnailImage: string;
  sources: StreamSourceSeed[];
  subtitles: SubtitleSeed[];
}

export interface AnimeSeed {
  slug: string;
  title: string;
  japaneseTitle: string;
  tagline: string;
  synopsis: string;
  releaseYear: number;
  season: string;
  type: AnimeType;
  status: AnimeStatus;
  dubStatus: DubStatus;
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
  trailerUrl: string;
  trailerThumbnail: string;
  upcomingEpisodeAt?: string;
  studios: string[];
  genres: string[];
  themes: string[];
  relatedSlugs: string[];
  recommendationSlugs: string[];
  characters: CharacterSeed[];
  reviews: ReviewSeed[];
  comments: CommentSeed[];
  episodes: EpisodeSeed[];
}

export interface NotificationSeed {
  id: string;
  title: string;
  body: string;
  type: "AIRING" | "SYSTEM" | "COMMENT" | "RECOMMENDATION";
  createdAt: string;
  read: boolean;
}

export interface UserSeed {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  language: string;
  favoriteSlugs: string[];
  history: Array<{
    animeSlug: string;
    episodeNumber: number;
    progress: number;
    updatedAt: string;
  }>;
  notifications: NotificationSeed[];
}
