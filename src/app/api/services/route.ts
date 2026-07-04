import { NextRequest } from 'next/server';
import { serviceService } from '@/lib/services';
import { createServiceSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler } from '@/lib/api';

export async function GET(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const params = parsePaginationParams(req);
    const { items, total } = await serviceService.getAllServices(params);
    return { items, total };
  });
}

export async function POST(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();
    const validatedData = createServiceSchema.parse(body);
    const item = await serviceService.createService(validatedData);
    
    return item;
  }, { status: 201 });
}
