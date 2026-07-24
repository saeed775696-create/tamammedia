import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z
    .string()
    .url()
    .default('http://localhost:3000'),
  NEXTAUTH_SECRET: z
    .string()
    .min(8, 'NEXTAUTH_SECRET is required (min 8 chars)'),
});

// فحص مُسامح في وقت البناء (لا نرمي خطأً إن لم يكن موجودًا في build environment)
// لكن نُرجع تحذيرًا للمطور
const parsed = envSchema.safeParse({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});

if (!parsed.success && process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  NEXTAUTH_SECRET غير مضبوط. استخدم: openssl rand -base64 32'
  );
}

export const authConfig = {
  url: parsed.success ? parsed.data.NEXTAUTH_URL : 'http://localhost:3000',
  secret: parsed.success
    ? parsed.data.NEXTAUTH_SECRET
    : 'dev-only-fallback-secret-change-me',
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 يومًا
  },
};
