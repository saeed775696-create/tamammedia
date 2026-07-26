import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponseHandler } from "@/lib/api";
import { getClientIp, rateLimit } from "@/lib/api/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!(await rateLimit(`whatsapp-click:${ip}`, { limit: 10, windowSeconds: 60 }))) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMIT", message: "تم تجاوز الحد المسموح" } },
      { status: 429 }
    );
  }

  return ApiResponseHandler.handle(req, async () => {
    await prisma.whatsAppClick.create({ data: {} });
    return { ok: true };
  }, { status: 201 });
}
