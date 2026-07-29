import { z } from 'zod';
import { getAdminHost, normalizeHost } from '@/lib/admin-host';

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

const configuredAdminHost = getAdminHost();
const rawAdminHost = process.env.ADMIN_HOST?.trim();
const configuredAuthHost = parsed.success
  ? normalizeHost(parsed.data.NEXTAUTH_URL)
  : null;

if (process.env.NODE_ENV === 'production' && rawAdminHost && !configuredAdminHost) {
  throw new Error('ADMIN_HOST must be a valid hostname without a path');
}

if (
  process.env.NODE_ENV === 'production' &&
  configuredAdminHost &&
  configuredAuthHost !== configuredAdminHost
) {
  throw new Error(
    'NEXTAUTH_URL must use the same hostname as ADMIN_HOST when admin host isolation is enabled'
  );
}

if (!parsed.success && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXTAUTH_SECRET must be configured in production. Generate one with: openssl rand -base64 32'
  );
}

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
