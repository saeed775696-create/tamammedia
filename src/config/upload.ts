import { z } from 'zod';

const envSchema = z.object({
  UPLOAD_PROVIDER: z
    .enum(['supabase', 'cloudinary', 's3', 'local'])
    .default('supabase'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
});

const env = envSchema.parse({
  UPLOAD_PROVIDER: process.env.UPLOAD_PROVIDER,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export const uploadConfig = {
  provider: env.UPLOAD_PROVIDER,
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY || '',
    bucket: 'images',
  },
};

/** هل إعداد Supabase مكتمل؟ */
export const isSupabaseConfigured = Boolean(
  uploadConfig.supabase.url && uploadConfig.supabase.serviceRoleKey
);
