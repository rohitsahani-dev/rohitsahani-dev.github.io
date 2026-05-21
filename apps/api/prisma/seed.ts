import { AnimeStatus, AnimeType, DubStatus, NotificationType, Prisma, PrismaClient, Role } from "@prisma/client";
import { animeCatalog, genres, sampleUsers, studios } from "@kaistream/shared";

import { env } from "../src/config/env.js";
import { hashPassword } from "../src/utils/password.js";
import { slugifyText } from "../src/utils/text.js";

const prisma = new PrismaClient();

async function seed() {
  await prisma.commentLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.history.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.episodeSource.deleteMany();
  await prisma.subtitleTrack.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.animeGenre.deleteMany();
  await prisma.animeStudio.deleteMany();
  await prisma.anime.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.studio.deleteMany();
  await prisma.user.deleteMany();

  for (const genre of genres) {
    await prisma.genre.create({ data: genre });
  }

  for (const studio of studios) {
    await prisma.studio.create({ data: studio });
  }

  for (const anime of animeCatalog) {
    await prisma.anime.create({
      data: {
        slug: anime.slug,
        title: anime.title,
        japaneseTitle: anime.japaneseTitle,
        tagline: anime.tagline,
        synopsis: anime.synopsis,
        releaseYear: anime.releaseYear,
        season: anime.season,
        type: anime.type as AnimeType,
        status: anime.status as AnimeStatus,
        dubStatus: anime.dubStatus as DubStatus,
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
        upcomingEpisodeAt: anime.upcomingEpisodeAt ? new Date(anime.upcomingEpisodeAt) : null,
        themes: anime.themes,
        characters: anime.characters as unknown as Prisma.InputJsonValue,
        genres: {
          create: anime.genres.map((genreSlug) => ({
            genre: {
              connect: {
                slug: genreSlug
              }
            }
          }))
        },
        studios: {
          create: anime.studios.map((studioSlug) => ({
            studio: {
              connect: {
                slug: studioSlug
              }
            }
          }))
        },
        episodes: {
          create: anime.episodes.map((episode, index) => ({
            number: episode.number,
            slug: episode.slug,
            title: episode.title,
            synopsis: episode.synopsis,
            duration: episode.duration,
            airDate: new Date(episode.airDate),
            introStart: episode.introStart,
            introEnd: episode.introEnd,
            thumbnailImage: episode.thumbnailImage,
            sources: {
              create: episode.sources.map((source, sourceIndex) => ({
                name: source.name,
                url: source.url,
                quality: source.quality,
                region: source.region,
                priority: sourceIndex + index
              }))
            },
            subtitles: {
              create: episode.subtitles.map((subtitle) => ({
                label: subtitle.label,
                language: subtitle.language,
                url: subtitle.url,
                isDefault: subtitle.default ?? false
              }))
            }
          }))
        }
      }
    });
  }

  const defaultUserPassword = await hashPassword("KaiStreamDemo123!");
  const adminPassword = await hashPassword(env.ADMIN_PASSWORD);
  const authorMap = new Map<string, string>();

  for (const seedUser of sampleUsers) {
    const user = await prisma.user.create({
      data: {
        name: seedUser.name,
        email: seedUser.role === "ADMIN" ? env.ADMIN_EMAIL : seedUser.email.toLowerCase(),
        passwordHash: seedUser.role === "ADMIN" ? adminPassword : defaultUserPassword,
        avatar: seedUser.avatar,
        role: seedUser.role as Role,
        preferredLanguage: seedUser.language
      }
    });

    authorMap.set(seedUser.name, user.id);
  }

  for (const anime of animeCatalog) {
    for (const review of anime.reviews) {
      let userId = authorMap.get(review.author);

      if (!userId) {
        const reviewer = await prisma.user.create({
          data: {
            name: review.author,
            email: `${slugifyText(review.author)}@community.kaistream.dev`,
            avatar: review.avatar,
            passwordHash: defaultUserPassword,
            role: Role.USER
          }
        });

        userId = reviewer.id;
        authorMap.set(review.author, userId);
      }

      const animeRecord = await prisma.anime.findUniqueOrThrow({
        where: { slug: anime.slug }
      });

      await prisma.review.create({
        data: {
          animeId: animeRecord.id,
          userId,
          rating: review.rating,
          headline: review.headline,
          body: review.body,
          createdAt: new Date(review.createdAt)
        }
      });
    }

    for (const comment of anime.comments) {
      let userId = authorMap.get(comment.author);

      if (!userId) {
        const commenter = await prisma.user.create({
          data: {
            name: comment.author,
            email: `${slugifyText(comment.author)}@community.kaistream.dev`,
            avatar: comment.avatar,
            passwordHash: defaultUserPassword,
            role: Role.USER
          }
        });

        userId = commenter.id;
        authorMap.set(comment.author, userId);
      }

      const animeRecord = await prisma.anime.findUniqueOrThrow({
        where: { slug: anime.slug }
      });

      await prisma.comment.create({
        data: {
          animeId: animeRecord.id,
          userId,
          message: comment.message,
          likesCount: comment.likes,
          createdAt: new Date(comment.createdAt)
        }
      });
    }
  }

  for (const seedUser of sampleUsers) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: seedUser.role === "ADMIN" ? env.ADMIN_EMAIL : seedUser.email.toLowerCase()
      }
    });

    for (const slug of seedUser.favoriteSlugs) {
      const anime = await prisma.anime.findUniqueOrThrow({
        where: { slug }
      });

      await prisma.favorite.create({
        data: {
          userId: user.id,
          animeId: anime.id
        }
      });
    }

    for (const item of seedUser.history) {
      const anime = await prisma.anime.findUniqueOrThrow({
        where: { slug: item.animeSlug },
        include: {
          episodes: true
        }
      });

      const episode = anime.episodes.find((entry) => entry.number === item.episodeNumber);

      if (!episode) {
        continue;
      }

      await prisma.history.create({
        data: {
          userId: user.id,
          animeId: anime.id,
          episodeId: episode.id,
          progress: item.progress,
          watched: item.progress >= 0.9,
          updatedAt: new Date(item.updatedAt),
          createdAt: new Date(item.updatedAt)
        }
      });
    }

    for (const notification of seedUser.notifications) {
      await prisma.notification.create({
        data: {
          id: notification.id,
          userId: user.id,
          title: notification.title,
          body: notification.body,
          type: notification.type as NotificationType,
          read: notification.read,
          createdAt: new Date(notification.createdAt)
        }
      });
    }
  }
}

seed()
  .then(async () => {
    console.log("KaiStream seed completed");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
