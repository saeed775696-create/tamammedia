import { NextRequest } from 'next/server';
import { appConfig } from '@/config/app';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

const { defaultLimit, maxLimit } = appConfig.pagination;

/**
 * يحوّل قيمة استعلام إلى رقم صحيح آمن، ويرجع القيمة الافتراضية
 * إن كانت غير موجودة أو غير رقمية (مثل ?page=abc) بدلًا من NaN.
 */
function parseIntSafe(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parsePaginationParams(req: NextRequest): PaginationParams {
  const url = new URL(req.url);
  const page = Math.max(1, parseIntSafe(url.searchParams.get('page'), 1));
  const limit = Math.min(
    maxLimit,
    Math.max(1, parseIntSafe(url.searchParams.get('limit'), defaultLimit))
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
