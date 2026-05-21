import { Redis } from "ioredis";

import { env, isProduction } from "../config/env.js";

type CacheEntry = {
  expiresAt: number;
  value: string;
};

const memoryStore = new Map<string, CacheEntry>();

export const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableReadyCheck: false
    })
  : null;

let redisReady = false;

if (redis) {
  redis.on("error", (error: Error) => {
    if (!isProduction) {
      console.warn("[redis] falling back to memory cache:", error.message);
    }
  });
}

export async function ensureRedisConnection() {
  if (!redis || redisReady) {
    return;
  }

  try {
    await redis.connect();
    redisReady = true;
  } catch (error) {
    if (!isProduction) {
      console.warn("[redis] connect failed, using memory cache");
    }
  }
}

export async function cacheWrap<T>(key: string, ttlSeconds: number, factory: () => Promise<T>): Promise<T> {
  await ensureRedisConnection();

  if (redis && redisReady) {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
  } else {
    const cached = memoryStore.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return JSON.parse(cached.value) as T;
    }
  }

  const value = await factory();
  const serialized = JSON.stringify(value);

  if (redis && redisReady) {
    await redis.set(key, serialized, "EX", ttlSeconds);
  } else {
    memoryStore.set(key, {
      expiresAt: Date.now() + ttlSeconds * 1000,
      value: serialized
    });
  }

  return value;
}
