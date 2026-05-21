import { AnimeStatus, AnimeType, DubStatus, Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/require-role.js";
import { prisma } from "../lib/prisma.js";
import { slugifyText } from "../utils/text.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole(Role.ADMIN));

adminRouter.get("/overview", async (_request, response) => {
  const [userCount, animeCount, episodeCount, commentCount] = await Promise.all([
    prisma.user.count(),
    prisma.anime.count(),
    prisma.episode.count(),
    prisma.comment.count()
  ]);

  const recentAnime = await prisma.anime.findMany({
    orderBy: {
      updatedAt: "desc"
    },
    take: 6
  });

  const moderationQueue = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 5,
    include: {
      user: true,
      anime: true
    }
  });

  response.json({
    stats: {
      userCount,
      animeCount,
      episodeCount,
      commentCount
    },
    recentAnime,
    moderationQueue
  });
});

adminRouter.get("/anime", async (_request, response) => {
  const anime = await prisma.anime.findMany({
    include: {
      episodes: {
        orderBy: {
          number: "asc"
        }
      },
      genres: {
        include: {
          genre: true
        }
      },
      studios: {
        include: {
          studio: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  response.json(anime);
});

adminRouter.post("/anime", async (request, response) => {
  const body = z
    .object({
      title: z.string().min(2),
      japaneseTitle: z.string().min(2),
      tagline: z.string().min(10),
      synopsis: z.string().min(40),
      releaseYear: z.coerce.number().min(1980).max(2100),
      season: z.string().min(3),
      type: z.nativeEnum(AnimeType),
      status: z.nativeEnum(AnimeStatus),
      dubStatus: z.nativeEnum(DubStatus),
      maturityRating: z.string().min(2),
      duration: z.coerce.number().min(1),
      totalEpisodes: z.coerce.number().min(1),
      quality: z.string().min(2),
      posterImage: z.string().min(2),
      bannerImage: z.string().min(2),
      trailerUrl: z.string().url().optional().or(z.literal("")),
      genres: z.array(z.string()).default([]),
      studios: z.array(z.string()).default([]),
      themes: z.array(z.string()).default([]),
      characters: z.array(z.object({ name: z.string(), role: z.string(), summary: z.string() })).default([])
    })
    .parse(request.body);

  const slug = slugifyText(body.title);

  const anime = await prisma.anime.create({
    data: {
      ...body,
      trailerUrl: body.trailerUrl || null,
      trailerThumbnail: body.bannerImage,
      movie: body.type === AnimeType.MOVIE,
      slug,
      characters: body.characters,
      genres: {
        create: body.genres.map((genreId) => ({
          genre: {
            connect: {
              slug: genreId
            }
          }
        }))
      },
      studios: {
        create: body.studios.map((studioId) => ({
          studio: {
            connect: {
              slug: studioId
            }
          }
        }))
      }
    },
    include: {
      genres: { include: { genre: true } },
      studios: { include: { studio: true } }
    }
  });

  response.status(201).json(anime);
});

adminRouter.put("/anime/:slug", async (request, response) => {
  const params = z.object({ slug: z.string() }).parse(request.params);
  const body = z
    .object({
      title: z.string().min(2).optional(),
      tagline: z.string().min(10).optional(),
      synopsis: z.string().min(40).optional(),
      quality: z.string().min(2).optional(),
      status: z.nativeEnum(AnimeStatus).optional(),
      posterImage: z.string().optional(),
      bannerImage: z.string().optional(),
      upcomingEpisodeAt: z.string().datetime().optional().nullable()
    })
    .parse(request.body);

  const anime = await prisma.anime.update({
    where: { slug: params.slug },
    data: {
      ...body,
      upcomingEpisodeAt: body.upcomingEpisodeAt ? new Date(body.upcomingEpisodeAt) : undefined
    }
  });

  response.json(anime);
});

adminRouter.post("/anime/:slug/episodes", async (request, response) => {
  const params = z.object({ slug: z.string() }).parse(request.params);
  const body = z
    .object({
      number: z.coerce.number().min(1),
      title: z.string().min(2),
      synopsis: z.string().min(12),
      duration: z.coerce.number().min(1),
      airDate: z.string().datetime(),
      introStart: z.coerce.number().min(0).default(0),
      introEnd: z.coerce.number().min(0).default(0),
      thumbnailImage: z.string().min(2),
      sources: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          quality: z.string(),
          region: z.string()
        })
      ),
      subtitles: z.array(
        z.object({
          label: z.string(),
          language: z.string(),
          url: z.string(),
          isDefault: z.boolean().optional()
        })
      )
    })
    .parse(request.body);

  const anime = await prisma.anime.findUnique({
    where: { slug: params.slug }
  });

  if (!anime) {
    return response.status(404).json({ message: "Anime not found" });
  }

  const episode = await prisma.episode.create({
    data: {
      animeId: anime.id,
      number: body.number,
      slug: `${params.slug}-episode-${body.number}`,
      title: body.title,
      synopsis: body.synopsis,
      duration: body.duration,
      airDate: new Date(body.airDate),
      introStart: body.introStart,
      introEnd: body.introEnd,
      thumbnailImage: body.thumbnailImage,
      sources: {
        create: body.sources.map((source, index) => ({
          ...source,
          priority: index
        }))
      },
      subtitles: {
        create: body.subtitles.map((subtitle) => ({
          label: subtitle.label,
          language: subtitle.language,
          url: subtitle.url,
          isDefault: subtitle.isDefault ?? false
        }))
      }
    },
    include: {
      sources: true,
      subtitles: true
    }
  });

  response.status(201).json(episode);
});

adminRouter.get("/users", async (_request, response) => {
  const users = await prisma.user.findMany({
    include: {
      favorites: true,
      history: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  response.json(users);
});

adminRouter.patch("/users/:id/role", async (request, response) => {
  const params = z.object({ id: z.string() }).parse(request.params);
  const body = z.object({ role: z.nativeEnum(Role) }).parse(request.body);

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      role: body.role
    }
  });

  response.json(user);
});
