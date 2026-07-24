import { NextRequest } from 'next/server';
import { contactService } from '@/lib/services';
import { createContactSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';

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
  // إنشاء رسالة اتصال متاح للعامة (لا يحتاج مصادقة)
  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();
    const validatedData = createContactSchema.parse(body);
    const item = await contactService.submitContact(validatedData);

    return item;
  }, { status: 201 });
}
