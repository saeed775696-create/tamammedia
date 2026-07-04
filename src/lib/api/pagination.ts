import { NextRequest } from 'next/server';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function parsePaginationParams(req: NextRequest): PaginationParams {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.max(1, parseInt(url.searchParams.get('limit') || '10', 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
