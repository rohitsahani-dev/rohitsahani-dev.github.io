import { Router } from "express";
import { z } from "zod";

import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";
import {
  getAnimeDetail,
  getBrowseData,
  getCategoryData,
  getGenreDirectory,
  getHomeData,
  getScheduleData,
  getWatchPayload,
  searchAnime
} from "../services/anime.service.js";

export const animeRouter = Router();

animeRouter.get("/home", async (_request, response) => {
  response.json(await getHomeData());
});

animeRouter.get("/browse", async (request, response) => {
  const query = z
    .object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(48).default(18),
      query: z.string().optional(),
      genre: z.string().optional(),
      year: z.coerce.number().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
      rating: z.coerce.number().optional(),
      dubOnly: z.coerce.boolean().optional(),
      movieOnly: z.coerce.boolean().optional()
    })
    .parse(request.query);

  response.json(await getBrowseData(query));
});

animeRouter.get("/trending", async (_request, response) => {
  response.json(await getCategoryData("trending"));
});

animeRouter.get("/latest", async (_request, response) => {
  response.json(await getCategoryData("latest"));
});

animeRouter.get("/movies", async (_request, response) => {
  response.json(await getCategoryData("movies"));
});

animeRouter.get("/dubbed", async (_request, response) => {
  response.json(await getCategoryData("dubbed"));
});

animeRouter.get("/top-rated", async (_request, response) => {
  response.json(await getCategoryData("top-rated"));
});

animeRouter.get("/schedule", async (_request, response) => {
  response.json(await getScheduleData());
});

animeRouter.get("/genres", async (_request, response) => {
  response.json(await getGenreDirectory());
});

animeRouter.get("/search", async (request, response) => {
  const query = z
    .object({
      q: z.string().default(""),
      genre: z.string().optional(),
      year: z.coerce.number().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
      rating: z.coerce.number().optional()
    })
    .parse(request.query);

  response.json(await searchAnime(query));
});

animeRouter.get("/:slug", async (request, response) => {
  const detail = await getAnimeDetail(request.params.slug);

  if (!detail) {
    return response.status(404).json({ message: "Anime not found" });
  }

  return response.json(detail);
});

animeRouter.get("/:slug/watch/:episode", async (request, response) => {
  const params = z
    .object({
      slug: z.string(),
      episode: z.coerce.number().min(1)
    })
    .parse(request.params);

  const payload = await getWatchPayload(params.slug, params.episode);

  if (!payload) {
    return response.status(404).json({ message: "Episode not found" });
  }

  return response.json(payload);
});

animeRouter.post("/:slug/comments", requireAuth, async (request, response) => {
  const params = z.object({ slug: z.string() }).parse(request.params);
  const body = z
    .object({
      message: z.string().min(2).max(600),
      episodeNumber: z.coerce.number().optional()
    })
    .parse(request.body);

  const anime = await prisma.anime.findUnique({
    where: { slug: params.slug },
    include: { episodes: true }
  });

  if (!anime) {
    return response.status(404).json({ message: "Anime not found" });
  }

  const episode = body.episodeNumber
    ? anime.episodes.find((item) => item.number === body.episodeNumber)
    : null;

  const comment = await prisma.comment.create({
    data: {
      animeId: anime.id,
      userId: request.auth!.sub,
      episodeId: episode?.id,
      message: body.message
    },
    include: {
      user: true
    }
  });

  return response.status(201).json({
    id: comment.id,
    message: comment.message,
    likesCount: comment.likesCount,
    createdAt: comment.createdAt,
    author: {
      name: comment.user.name,
      avatar: comment.user.avatar
    }
  });
});

animeRouter.post("/:slug/comments/:commentId/like", requireAuth, async (request, response) => {
  const params = z
    .object({
      slug: z.string(),
      commentId: z.string()
    })
    .parse(request.params);

  const comment = await prisma.comment.findFirst({
    where: {
      id: params.commentId,
      anime: {
        slug: params.slug
      }
    }
  });

  if (!comment) {
    return response.status(404).json({ message: "Comment not found" });
  }

  const existing = await prisma.commentLike.findUnique({
    where: {
      commentId_userId: {
        commentId: comment.id,
        userId: request.auth!.sub
      }
    }
  });

  if (existing) {
    await prisma.$transaction([
      prisma.commentLike.delete({
        where: {
          commentId_userId: {
            commentId: comment.id,
            userId: request.auth!.sub
          }
        }
      }),
      prisma.comment.update({
        where: { id: comment.id },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      })
    ]);

    return response.json({ liked: false });
  }

  await prisma.$transaction([
    prisma.commentLike.create({
      data: {
        commentId: comment.id,
        userId: request.auth!.sub
      }
    }),
    prisma.comment.update({
      where: { id: comment.id },
      data: {
        likesCount: {
          increment: 1
        }
      }
    })
  ]);

  return response.json({ liked: true });
});

animeRouter.post("/:slug/reviews", requireAuth, async (request, response) => {
  const params = z.object({ slug: z.string() }).parse(request.params);
  const body = z
    .object({
      rating: z.coerce.number().min(1).max(10),
      headline: z.string().min(4).max(80),
      body: z.string().min(12).max(1200)
    })
    .parse(request.body);

  const anime = await prisma.anime.findUnique({
    where: { slug: params.slug }
  });

  if (!anime) {
    return response.status(404).json({ message: "Anime not found" });
  }

  const review = await prisma.review.upsert({
    where: {
      animeId_userId: {
        animeId: anime.id,
        userId: request.auth!.sub
      }
    },
    update: body,
    create: {
      ...body,
      animeId: anime.id,
      userId: request.auth!.sub
    }
  });

  const stats = await prisma.review.aggregate({
    where: { animeId: anime.id },
    _avg: { rating: true },
    _count: { _all: true }
  });

  await prisma.anime.update({
    where: { id: anime.id },
    data: {
      averageRating: Number(stats._avg.rating?.toFixed(1) ?? anime.averageRating),
      ratingCount: stats._count._all
    }
  });

  return response.status(201).json(review);
});
