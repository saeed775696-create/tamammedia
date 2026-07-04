import { NextRequest } from 'next/server';
import { partnerService } from '@/lib/services';
import { updatePartnerSchema } from '@/lib/validations';
import { ApiResponseHandler } from '@/lib/api';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    return partnerService.getPartnerById(id);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updatePartnerSchema.parse(body);
    const updated = await partnerService.updatePartner(id, validatedData);
    
    return updated;
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    await partnerService.deletePartner(id);
    return { success: true };
  });
}
