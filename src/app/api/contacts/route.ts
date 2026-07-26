import { NextRequest, NextResponse } from 'next/server';
import { contactService } from '@/lib/services';
import { createContactSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';
import { rateLimit, getClientIp } from '@/lib/api/rate-limit';

export async function GET(req: NextRequest) {
  // قراءة جهات الاتصال متاحة فقط للمسؤول
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const params = parsePaginationParams(req);
    const { items, total } = await contactService.getAllSubmissions(params);
    return { items, total };
  });
}

export async function POST(req: NextRequest) {
  // Rate limiting: max 5 submissions per IP per 15 minutes
  const ip = getClientIp(req);
  if (!(await rateLimit(`contact:${ip}`, { limit: 5, windowSeconds: 900 }))) {
    return NextResponse.json(
      { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
      { status: 429 }
    );
  }

  // إنشاء رسالة اتصال متاح للعامة (لا يحتاج مصادقة)
  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();
    const validatedData = createContactSchema.parse(body);
    const item = await contactService.submitContact(validatedData);

    return item;
  }, { status: 201 });
}
