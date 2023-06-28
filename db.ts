import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()
const { createPrismaRedisCache } = require("prisma-redis-middleware");
import Redis from "ioredis";

const redis = new Redis(); // Uses default options for Redis connection

const cacheMiddleware:any = createPrismaRedisCache({
  models: [
    { model: "User", cacheTime: 60, cacheKey: "users", log: console },
  ],
  storage: {
    type: "redis",
    options: { client: redis, invalidation: { 
        referencesTTL: 60 
    }, log: console },
  },
  cacheTime: 300,
  onHit: (key:any) => {
    console.log("hit", key);
  },
  onMiss: (key:any) => {
    console.log("miss", key);
  },
  onError: (key:any) => {
    console.log("error", key);
  },
});

prisma.$use(cacheMiddleware);
