import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()
import { cacheMiddleware } from './redis';
prisma.$use(cacheMiddleware);