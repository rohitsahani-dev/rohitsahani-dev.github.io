import { DubStatus } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";
import { getDashboardData, getFavorites, getHistory, updateUserSettings } from "../services/user.service.js";

export const userRouter = Router();

userRouter.use(requireAuth);

userRouter.get("/dashboard", async (request, response) => {
  const data = await getDashboardData(request.auth!.sub);

  if (!data) {
    return response.status(404).json({ message: "User not found" });
  }

  return response.json(data);
});

userRouter.get("/favorites", async (request, response) => {
  response.json(await getFavorites(request.auth!.sub));
});

userRouter.post("/favorites/:slug", async (request, response) => {
  const params = z.object({ slug: z.string() }).parse(request.params);

  const anime = await prisma.anime.findUnique({
    where: { slug: params.slug }
  });

  if (!anime) {
    return response.status(404).json({ message: "Anime not found" });
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_animeId: {
        userId: request.auth!.sub,
        animeId: anime.id
      }
    }
  });

  if (existing) {
    await prisma.favorite.delete({
      where: {
        userId_animeId: {
          userId: request.auth!.sub,
          animeId: anime.id
        }
      }
    });

    return response.json({ favorited: false });
  }

  await prisma.favorite.create({
    data: {
      userId: request.auth!.sub,
      animeId: anime.id
    }
  });

  return response.json({ favorited: true });
});

userRouter.get("/history", async (request, response) => {
  response.json(await getHistory(request.auth!.sub));
});

userRouter.post("/history", async (request, response) => {
  const body = z
    .object({
      animeSlug: z.string(),
      episodeNumber: z.coerce.number().min(1),
      progress: z.coerce.number().min(0).max(1)
    })
    .parse(request.body);

  const anime = await prisma.anime.findUnique({
    where: { slug: body.animeSlug },
    include: { episodes: true }
  });

  if (!anime) {
    return response.status(404).json({ message: "Anime not found" });
  }

  const episode = anime.episodes.find((item) => item.number === body.episodeNumber);

  if (!episode) {
    return response.status(404).json({ message: "Episode not found" });
  }

  const history = await prisma.history.upsert({
    where: {
      userId_animeId_episodeId: {
        userId: request.auth!.sub,
        animeId: anime.id,
        episodeId: episode.id
      }
    },
    update: {
      progress: body.progress,
      watched: body.progress >= 0.9
    },
    create: {
      userId: request.auth!.sub,
      animeId: anime.id,
      episodeId: episode.id,
      progress: body.progress,
      watched: body.progress >= 0.9
    }
  });

  return response.status(201).json(history);
});

userRouter.get("/notifications", async (request, response) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: request.auth!.sub },
    orderBy: {
      createdAt: "desc"
    }
  });

  return response.json(notifications);
});

userRouter.patch("/notifications/:id/read", async (request, response) => {
  const params = z.object({ id: z.string() }).parse(request.params);

  const notification = await prisma.notification.updateMany({
    where: {
      id: params.id,
      userId: request.auth!.sub
    },
    data: {
      read: true
    }
  });

  return response.json(notification);
});

userRouter.patch("/settings", async (request, response) => {
  const body = z
    .object({
      name: z.string().min(2).optional(),
      preferredLanguage: z.string().min(2).optional(),
      preferredAudio: z.nativeEnum(DubStatus).optional(),
      autoplayNext: z.boolean().optional(),
      theaterMode: z.boolean().optional()
    })
    .parse(request.body);

  const user = await updateUserSettings(request.auth!.sub, body);

  return response.json({
    id: user.id,
    name: user.name,
    preferredLanguage: user.preferredLanguage,
    preferredAudio: user.preferredAudio,
    autoplayNext: user.autoplayNext,
    theaterMode: user.theaterMode
  });
});
