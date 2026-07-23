import { z } from 'zod';

// فحص مُسامح: لا نريد أن يفشل البناء إذا كانت DATABASE_URL مفقودة مؤقتًا
// Prisma نفسها ستتحقق عند الاتصال
const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
});

const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
});

export const databaseConfig = {
  // Pooler URL (مع PgBouncer) — للاستخدام في التطبيق
  url: env.DATABASE_URL,
  // Direct URL — للأوامر الإدارية (migrations)
  directUrl: env.DIRECT_URL,
};
