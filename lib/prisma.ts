import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __nd_prisma_instance: PrismaClient | undefined;
}

/**
 * Singleton Prisma Client pour Next.js & Vercel Serverless.
 * Évite les fuites de connexions lors du hot reload en développement
 * et optimise la réutilisation des sockets en environnement serverless.
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma: PrismaClient =
  globalThis.__nd_prisma_instance ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__nd_prisma_instance = prisma;
}

/**
 * Détecte si une base de données PostgreSQL est configurée via les variables d'environnement
 */
export function isDatabaseConfigured(): boolean {
  const url =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL;
  return Boolean(url && url.startsWith("postgres"));
}

export default prisma;
