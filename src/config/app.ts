import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Tamam Media'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('ar'),
  NEXT_PUBLIC_SUPPORTED_LOCALES: z.string().default('ar,en'),
});

const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_SUPPORTED_LOCALES: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES,
});

export const appConfig = {
  url: env.NEXT_PUBLIC_APP_URL,
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  siteName: env.NEXT_PUBLIC_SITE_NAME,
  i18n: {
    defaultLocale: env.NEXT_PUBLIC_DEFAULT_LOCALE,
    locales: env.NEXT_PUBLIC_SUPPORTED_LOCALES.split(','),
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  }
};
