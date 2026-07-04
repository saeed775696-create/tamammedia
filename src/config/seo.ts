import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_DEFAULT_TITLE: z.string().default('Tamam Media | تمام ميديا'),
  NEXT_PUBLIC_DEFAULT_DESCRIPTION: z.string().default('Creative media and technology solutions.'),
  NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
});

const env = envSchema.parse({
  NEXT_PUBLIC_DEFAULT_TITLE: process.env.NEXT_PUBLIC_DEFAULT_TITLE,
  NEXT_PUBLIC_DEFAULT_DESCRIPTION: process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION,
  NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
});

export const seoConfig = {
  defaultTitle: env.NEXT_PUBLIC_DEFAULT_TITLE,
  defaultDescription: env.NEXT_PUBLIC_DEFAULT_DESCRIPTION,
  twitterHandle: env.NEXT_PUBLIC_TWITTER_HANDLE,
};
