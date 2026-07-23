import { NextRequest } from 'next/server';
import { teamService } from '@/lib/services';
import { updateTeamMemberSchema } from '@/lib/validations';
import { ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return ApiResponseHandler.handle(req, async () => {
    const { id } = await params;
    return teamService.getMemberById(id);
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
    const validatedData = updateTeamMemberSchema.parse(body);
    const updated = await teamService.updateMember(id, validatedData);

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
    await teamService.deleteMember(id);
    return { success: true };
  });
}
