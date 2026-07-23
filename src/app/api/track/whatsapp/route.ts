import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponseHandler } from '@/lib/api';

// تخزين مؤقت بسيط لتقييد المعدل (في الإنتاج استخدم Redis)
const RATE_LIMIT_WINDOW_MS = 60_000; // دقيقة واحدة
const RATE_LIMIT_MAX = 10; // 10 نقرات في الدقيقة لكل IP
const ipHits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  // تقييد المعدل
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'تم تجاوز الحد المسموح' } },
        { status: 429 }
      );
    }
  }

  return ApiResponseHandler.handle(req, async () => {
    await prisma.whatsAppClick.create({ data: {} });
    return { ok: true };
  }, { status: 201 });
}
