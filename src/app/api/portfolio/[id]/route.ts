import { NextRequest } from 'next/server';
import { portfolioService } from '@/lib/services';
import { updatePortfolioSchema } from '@/lib/validations';
import { ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    return portfolioService.getItemById(id);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    const body = await req.json();

    if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
    if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);

    const validatedData = updatePortfolioSchema.parse(body);
    const updated = await portfolioService.updateItem(id, validatedData);

    return updated;
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    await portfolioService.deleteItem(id);
    return { success: true };
  });
}
