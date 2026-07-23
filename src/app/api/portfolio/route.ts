import { NextRequest } from 'next/server';
import { portfolioService } from '@/lib/services';
import { createPortfolioSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const params = parsePaginationParams(req);
    const { items, total } = await portfolioService.getAllItems(params);
    return { items, total };
  });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();

    // تحويل المصفوفات إلى JSON string إذا أُرسلت كمصفوفة (توافق مع الواجهة)
    if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
    if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);

    const validatedData = createPortfolioSchema.parse(body);
    const item = await portfolioService.createItem(validatedData);

    return item;
  }, { status: 201 });
}
