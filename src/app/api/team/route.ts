import { NextRequest } from 'next/server';
import { teamService } from '@/lib/services';
import { createTeamMemberSchema } from '@/lib/validations';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';

export async function GET(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    const params = parsePaginationParams(req);
    const { items, total } = await teamService.getAllMembers(params);
    return { items, total };
  });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(req, async () => {
    const body = await req.json();
    const validatedData = createTeamMemberSchema.parse(body);
    const item = await teamService.createMember(validatedData);

    return item;
  }, { status: 201 });
}
