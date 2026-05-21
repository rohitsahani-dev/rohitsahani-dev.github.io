import { DubStatus } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { getBrowseData } from "./anime.service.js";

export async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      favorites: {
        include: {
          anime: {
            include: {
              genres: { include: { genre: true } },
              studios: { include: { studio: true } },
              episodes: true
            }
          }
        }
      },
      history: {
        include: {
          anime: {
            include: {
              genres: { include: { genre: true } },
              studios: { include: { studio: true } },
              episodes: true
            }
          },
          episode: true
        },
        orderBy: {
          updatedAt: "desc"
        },
        take: 12
      },
      notifications: {
        orderBy: {
          createdAt: "desc"
        },
        take: 8
      }
    }
  });

  if (!user) {
    return null;
  }

  const favoriteGenreIds = await prisma.favorite.findMany({
    where: { userId },
    select: {
      anime: {
        select: {
          genres: {
            select: {
              genreId: true
            }
          }
        }
      }
    }
  });

  const watchedAnimeIds = new Set(user.history.map((entry) => entry.animeId));
  const boostGenres = favoriteGenreIds.flatMap((entry) => entry.anime.genres.map((genre) => genre.genreId));

  const personalized = await prisma.anime.findMany({
    where: {
      id: {
        notIn: Array.from(watchedAnimeIds)
      },
      genres: {
        some: {
          genreId: {
            in: boostGenres
          }
        }
      }
    },
    include: {
      genres: { include: { genre: true } },
      studios: { include: { studio: true } },
      episodes: true
    },
    orderBy: [{ recommended: "desc" }, { averageRating: "desc" }],
    take: 6
  });

  return {
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
      preferredAudio: user.preferredAudio,
      autoplayNext: user.autoplayNext,
      theaterMode: user.theaterMode
    },
    continueWatching: user.history.map((entry) => ({
      id: entry.id,
      progress: entry.progress,
      updatedAt: entry.updatedAt,
      episodeNumber: entry.episode.number,
      anime: {
        slug: entry.anime.slug,
        title: entry.anime.title,
        posterImage: entry.anime.posterImage,
        quality: entry.anime.quality
      }
    })),
    favorites: user.favorites.map((favorite) => ({
      slug: favorite.anime.slug,
      title: favorite.anime.title,
      posterImage: favorite.anime.posterImage,
      averageRating: favorite.anime.averageRating,
      quality: favorite.anime.quality
    })),
    notifications: user.notifications,
    personalized: personalized.map((anime) => ({
      slug: anime.slug,
      title: anime.title,
      posterImage: anime.posterImage,
      averageRating: anime.averageRating,
      quality: anime.quality,
      genres: anime.genres.map((item) => item.genre)
    })),
    stats: {
      totalFavorites: user.favorites.length,
      watchedEpisodes: user.history.filter((entry) => entry.watched).length,
      unreadNotifications: user.notifications.filter((entry) => !entry.read).length
    }
  };
}

export async function getFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      anime: {
        include: {
          genres: { include: { genre: true } },
          studios: { include: { studio: true } },
          episodes: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return favorites.map((favorite) => ({
    id: favorite.anime.id,
    slug: favorite.anime.slug,
    title: favorite.anime.title,
    posterImage: favorite.anime.posterImage,
    averageRating: favorite.anime.averageRating,
    quality: favorite.anime.quality,
    genres: favorite.anime.genres.map((entry) => entry.genre)
  }));
}

export async function getHistory(userId: string) {
  const history = await prisma.history.findMany({
    where: { userId },
    include: {
      anime: true,
      episode: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return history.map((entry) => ({
    id: entry.id,
    progress: entry.progress,
    watched: entry.watched,
    updatedAt: entry.updatedAt,
    anime: {
      slug: entry.anime.slug,
      title: entry.anime.title,
      posterImage: entry.anime.posterImage
    },
    episode: {
      number: entry.episode.number,
      title: entry.episode.title,
      duration: entry.episode.duration
    }
  }));
}

export async function getDefaultRecommendationFeed() {
  return getBrowseData({
    page: 1,
    limit: 8
  });
}

export async function updateUserSettings(
  userId: string,
  input: {
    name?: string;
    preferredLanguage?: string;
    preferredAudio?: DubStatus;
    autoplayNext?: boolean;
    theaterMode?: boolean;
  }
) {
  return prisma.user.update({
    where: { id: userId },
    data: input
  });
}
