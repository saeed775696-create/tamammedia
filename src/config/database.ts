import { z } from 'zod';

// We do not strict validate DATABASE_URL here if we want to avoid crashing at build time
// Prisma handles connection string validation. But we can ensure it's a string.
const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
});

const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});

export const databaseConfig = {
  url: env.DATABASE_URL,
};
