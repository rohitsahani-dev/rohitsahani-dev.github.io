import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { ensureRedisConnection, redis } from "./lib/redis.js";

async function bootstrap() {
  await prisma.$connect();
  await ensureRedisConnection();

  app.listen(env.PORT, () => {
    console.log(`KaiStream API running on ${env.API_URL || `http://localhost:${env.PORT}`}`);
  });
}

async function shutdown() {
  await prisma.$disconnect();
  if (redis) {
    await redis.quit();
  }
}

bootstrap().catch(async (error) => {
  console.error("Failed to start KaiStream API", error);
  await shutdown();
  process.exit(1);
});

process.on("SIGINT", async () => {
  await shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await shutdown();
  process.exit(0);
});
