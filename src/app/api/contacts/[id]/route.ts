import { NextRequest } from 'next/server';
import { contactService } from '@/lib/services';
import { updateContactSchema } from '@/lib/validations';
import { ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    return contactService.getSubmissionById(id);
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
    const validatedData = updateContactSchema.parse(body);
    const updated = await contactService.updateSubmissionStatus(id, validatedData);

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
    await contactService.deleteSubmission(id);
    return { success: true };
  });
}

// دعم PATCH كـ alias لـ PUT لأي عملاء يستخدمون PATCH
export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  return PUT(req, ctx);
}
