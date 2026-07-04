import { NextRequest } from 'next/server';
import { portfolioService } from '@/lib/services';
import { updatePortfolioSchema } from '@/lib/validations';
import { ApiResponseHandler } from '@/lib/api';

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
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    const body = await req.json();

    // Convert arrays to strings if they come as arrays (due to old schema support)
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
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    await portfolioService.deleteItem(id);
    return { success: true };
  });
}
