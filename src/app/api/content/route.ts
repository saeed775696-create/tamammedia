import { NextRequest } from 'next/server';
import { getAllContent, setContentMany } from '@/lib/content/service';
import { ApiResponseHandler, requireAdmin } from '@/lib/api';

/**
 * GET /api/content
 * يُرجع كل محتوى الموقع دفعة واحدة.
 * متاح للعامة (للموقع يقرأه).
 */
export async function GET(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const content = await getAllContent();
    return content;
  });
}

/**
 * PUT /api/content
 * تحديث عدة مفاتيح دفعة واحدة.
 * متاح فقط لـ admin.
 *
 * body: { "hero.title1.ar": "نص جديد", "about.p1.ar": "..." }
 */
export async function PUT(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { error: 'التنسيق غير صحيح. متوقع object من key-value pairs' };
    }

    // فلترة القيم غير الصالحة
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof key === 'string' && typeof value === 'string') {
        entries[key] = value;
      }
    }

    if (Object.keys(entries).length === 0) {
      return { error: 'لا توجد قيم صالحة للتحديث' };
    }

    await setContentMany(entries);

    return { updated: Object.keys(entries).length };
  });
}
