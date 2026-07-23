import { NextRequest } from 'next/server';
import { partnerService } from '@/lib/services';
import { createPartnerSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const params = parsePaginationParams(req);
    const { items, total } = await partnerService.getAllPartners(params);
    return { items, total };
  });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();
    const validatedData = createPartnerSchema.parse(body);
    const item = await partnerService.createPartner(validatedData);

    return item;
  }, { status: 201 });
}
