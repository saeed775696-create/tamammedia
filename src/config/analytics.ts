import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_FACEBOOK_PIXEL_ID: z.string().optional(),
});

const env = envSchema.parse({
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
});

export const analyticsConfig = {
  googleAnalyticsId: env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  facebookPixelId: env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
};
