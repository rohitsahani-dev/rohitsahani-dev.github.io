import type { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { cacheWrap } from "../lib/redis.js";

const animeInclude = {
  genres: {
    include: {
      genre: true
    }
  },
  studios: {
    include: {
      studio: true
    }
  },
  episodes: {
    orderBy: {
      number: "asc"
    },
    include: {
      sources: {
        orderBy: {
          priority: "asc"
        }
      },
      subtitles: true
    }
  },
  reviews: {
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  },
  comments: {
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 12
  }
} satisfies Prisma.AnimeInclude;

function mapAnimeSummary(anime: Prisma.AnimeGetPayload<{ include: typeof animeInclude }>) {
  const latestEpisode = anime.episodes.at(-1);

  return {
    id: anime.id,
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
    upcomingEpisodeAt: anime.upcomingEpisodeAt,
    genres: anime.genres.map((item) => item.genre),
    studios: anime.studios.map((item) => item.studio),
    themes: anime.themes as string[],
    latestEpisodeNumber: latestEpisode?.number ?? null
  };
}

function mapAnimeDetail(anime: Prisma.AnimeGetPayload<{ include: typeof animeInclude }>) {
  return {
    ...mapAnimeSummary(anime),
    episodes: anime.episodes.map((episode) => ({
      id: episode.id,
      number: episode.number,
      slug: episode.slug,
      title: episode.title,
      synopsis: episode.synopsis,
      duration: episode.duration,
      airDate: episode.airDate,
      introStart: episode.introStart,
      introEnd: episode.introEnd,
      thumbnailImage: episode.thumbnailImage,
      sources: episode.sources,
      subtitles: episode.subtitles
    })),
    characters: anime.characters,
    reviews: anime.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      headline: review.headline,
      body: review.body,
      createdAt: review.createdAt,
      author: {
        name: review.user.name,
        avatar: review.user.avatar
      }
    })),
    comments: anime.comments.map((comment) => ({
      id: comment.id,
      message: comment.message,
      likesCount: comment.likesCount,
      createdAt: comment.createdAt,
      episodeId: comment.episodeId,
      author: {
        name: comment.user.name,
        avatar: comment.user.avatar
      }
    }))
  };
}

function buildAnimeWhere(filters: {
  query?: string | null;
  genre?: string | null;
  year?: number | null;
  type?: string | null;
  status?: string | null;
  rating?: number | null;
  dubOnly?: boolean;
  movieOnly?: boolean;
}) {
  const where: Prisma.AnimeWhereInput = {};

  if (filters.query) {
    where.OR = [
      { title: { contains: filters.query, mode: "insensitive" } },
      { japaneseTitle: { contains: filters.query, mode: "insensitive" } },
      { synopsis: { contains: filters.query, mode: "insensitive" } }
    ];
  }

  if (filters.genre) {
    where.genres = {
      some: {
        genre: {
          slug: filters.genre
        }
      }
    };
  }

  if (filters.year) {
    where.releaseYear = filters.year;
  }

  if (filters.type) {
    where.type = filters.type as Prisma.EnumAnimeTypeFilter["equals"];
  }

  if (filters.status) {
    where.status = filters.status as Prisma.EnumAnimeStatusFilter["equals"];
  }

  if (filters.rating) {
    where.averageRating = {
      gte: filters.rating
    };
  }

  if (filters.dubOnly) {
    where.dubStatus = {
      in: ["DUB", "BOTH"]
    };
  }

  if (filters.movieOnly) {
    where.movie = true;
  }

  return where;
}

export async function getHomeData() {
  return cacheWrap("home:data", 120, async () => {
    const anime = await prisma.anime.findMany({
      include: animeInclude,
      orderBy: [{ featured: "desc" }, { trending: "desc" }, { averageRating: "desc" }]
    });

    const mapped = anime.map(mapAnimeSummary);

    return {
      featured: mapped.filter((item) => item.featured).slice(0, 5),
      sections: {
        trendingNow: mapped.filter((item) => item.trending).slice(0, 8),
        latestEpisodes: mapped.filter((item) => item.latest).slice(0, 8),
        popularWeek: mapped.filter((item) => item.popularWeek).slice(0, 8),
        topRated: mapped.filter((item) => item.topRated).slice(0, 8),
        recommended: mapped.filter((item) => item.recommended).slice(0, 8),
        continueWatching: mapped.slice(0, 6),
        newMovies: mapped.filter((item) => item.movie).slice(0, 6),
        upcoming: mapped.filter((item) => item.upcomingEpisodeAt).slice(0, 6)
      }
    };
  });
}

export async function getBrowseData(params: {
  page: number;
  limit: number;
  query?: string | null;
  genre?: string | null;
  year?: number | null;
  type?: string | null;
  status?: string | null;
  rating?: number | null;
  dubOnly?: boolean;
  movieOnly?: boolean;
}) {
  const where = buildAnimeWhere(params);
  const skip = (params.page - 1) * params.limit;

  const [items, total] = await Promise.all([
    prisma.anime.findMany({
      where,
      include: animeInclude,
      orderBy: [{ trending: "desc" }, { averageRating: "desc" }, { views: "desc" }],
      skip,
      take: params.limit
    }),
    prisma.anime.count({ where })
  ]);

  return {
    items: items.map(mapAnimeSummary),
    page: params.page,
    limit: params.limit,
    total,
    hasMore: skip + items.length < total
  };
}

export async function getCategoryData(category: "trending" | "latest" | "movies" | "dubbed" | "top-rated") {
  const key = `category:${category}`;
  return cacheWrap(key, 180, async () => {
    const where: Prisma.AnimeWhereInput =
      category === "trending"
        ? { trending: true }
        : category === "latest"
          ? { latest: true }
          : category === "movies"
            ? { movie: true }
            : category === "dubbed"
              ? { dubStatus: { in: ["DUB", "BOTH"] } }
              : { topRated: true };

    const items = await prisma.anime.findMany({
      where,
      include: animeInclude,
      orderBy: [{ averageRating: "desc" }, { views: "desc" }]
    });

    return items.map(mapAnimeSummary);
  });
}

export async function getScheduleData() {
  return cacheWrap("schedule:data", 180, async () => {
    const anime = await prisma.anime.findMany({
      where: {
        upcomingEpisodeAt: {
          not: null
        }
      },
      include: animeInclude,
      orderBy: {
        upcomingEpisodeAt: "asc"
      }
    });

    return anime.map((item) => {
      const summary = mapAnimeSummary(item);

      return {
        ...summary,
        nextEpisodeLabel: `Episode ${(item.episodes.at(-1)?.number ?? 0) + 1}`
      };
    });
  });
}

export async function getGenreDirectory() {
  return cacheWrap("genres:data", 300, async () => {
    const genres = await prisma.genre.findMany({
      include: {
        anime: {
          include: {
            anime: {
              include: animeInclude
            }
          }
        }
      }
    });

    return genres.map((genre) => ({
      id: genre.id,
      slug: genre.slug,
      name: genre.name,
      description: genre.description,
      count: genre.anime.length,
      featuredAnime: genre.anime.slice(0, 4).map((entry) => mapAnimeSummary(entry.anime))
    }));
  });
}

export async function getAnimeDetail(slug: string) {
  return cacheWrap(`anime:${slug}`, 180, async () => {
    const anime = await prisma.anime.findUnique({
      where: { slug },
      include: animeInclude
    });

    if (!anime) {
      return null;
    }

    const related = await prisma.anime.findMany({
      where: {
        id: {
          not: anime.id
        },
        OR: [
          {
            genres: {
              some: {
                genreId: {
                  in: anime.genres.map((item) => item.genreId)
                }
              }
            }
          },
          {
            studios: {
              some: {
                studioId: {
                  in: anime.studios.map((item) => item.studioId)
                }
              }
            }
          }
        ]
      },
      include: animeInclude,
      take: 6
    });

    return {
      ...mapAnimeDetail(anime),
      related: related.map(mapAnimeSummary),
      recommendations: related
        .slice()
        .sort((left, right) => right.averageRating - left.averageRating)
        .slice(0, 4)
        .map(mapAnimeSummary)
    };
  });
}

export async function getWatchPayload(slug: string, episodeNumber: number) {
  const anime = await prisma.anime.findUnique({
    where: { slug },
    include: animeInclude
  });

  if (!anime) {
    return null;
  }

  const episode = anime.episodes.find((item) => item.number === episodeNumber);

  if (!episode) {
    return null;
  }

  const index = anime.episodes.findIndex((item) => item.number === episodeNumber);

  return {
    anime: {
      ...mapAnimeSummary(anime),
      comments: anime.comments.map((comment) => ({
        id: comment.id,
        message: comment.message,
        likesCount: comment.likesCount,
        createdAt: comment.createdAt,
        episodeId: comment.episodeId,
        author: {
          name: comment.user.name,
          avatar: comment.user.avatar
        }
      }))
    },
    episode: {
      id: episode.id,
      number: episode.number,
      title: episode.title,
      synopsis: episode.synopsis,
      duration: episode.duration,
      airDate: episode.airDate,
      introStart: episode.introStart,
      introEnd: episode.introEnd,
      sources: episode.sources,
      subtitles: episode.subtitles,
      thumbnailImage: episode.thumbnailImage
    },
    navigation: {
      previous: index > 0 ? anime.episodes[index - 1]?.number : null,
      next: index < anime.episodes.length - 1 ? anime.episodes[index + 1]?.number : null
    },
    episodes: anime.episodes.map((item) => ({
      id: item.id,
      number: item.number,
      title: item.title,
      duration: item.duration,
      thumbnailImage: item.thumbnailImage
    })),
    recommendations: anime.episodes.length
      ? (
          await prisma.anime.findMany({
            where: {
              slug: {
                not: slug
              },
              genres: {
                some: {
                  genreId: {
                    in: anime.genres.map((entry) => entry.genreId)
                  }
                }
              }
            },
            include: animeInclude,
            take: 6
          })
        ).map(mapAnimeSummary)
      : []
  };
}

export async function searchAnime(params: {
  q: string;
  genre?: string | null;
  year?: number | null;
  type?: string | null;
  status?: string | null;
  rating?: number | null;
}) {
  const browse = await getBrowseData({
    page: 1,
    limit: 24,
    query: params.q,
    genre: params.genre,
    year: params.year,
    type: params.type,
    status: params.status,
    rating: params.rating
  });

  const suggestions = browse.items.slice(0, 6).map((item) => ({
    slug: item.slug,
    title: item.title,
    posterImage: item.posterImage,
    genres: item.genres
  }));

  return {
    ...browse,
    suggestions,
    recentSearches: ["cyberpunk", "spring 2026", "space opera", "romance fantasy"]
  };
}
