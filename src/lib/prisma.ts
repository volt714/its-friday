// Import Prisma ORM client type
import { PrismaClient } from '@prisma/client'

// Augment the Node.js global scope to cache a PrismaClient in development
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined
}

// Create or reuse a single PrismaClient instance
// In dev, reuse the cached client across hot reloads to avoid connection leaks
export const prisma: PrismaClient =
  global.prismaGlobal ?? new PrismaClient({ log: ['query', 'error', 'warn'] })

// Cache the client on the global object only outside production
if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma
}


