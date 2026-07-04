import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponseHandler } from '@/lib/api';

export async function POST(req: NextRequest) {
  return ApiResponseHandler.handle(req, async () => {
    await prisma.whatsAppClick.create({ data: {} });
    return { ok: true };
  }, { status: 201 });
}
