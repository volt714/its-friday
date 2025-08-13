import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined
}

// Export a singleton PrismaClient in development to avoid exhausting database connections
export const prisma: PrismaClient =
  global.prismaGlobal ?? new PrismaClient({ log: ['query', 'error', 'warn'] })

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma
}


