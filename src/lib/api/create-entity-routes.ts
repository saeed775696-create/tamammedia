import { NextRequest } from 'next/server';
import { z } from 'zod';
import { BaseService } from '@/lib/services/base.service';
import { parsePaginationParams, ApiResponseHandler, requireAdmin } from '@/lib/api';

/**
 * توليد معالجي GET و POST للمجموعة (collection)
 * @example
 * // في portfolio/route.ts
 * export const { GET, POST } = createCollectionRoutes(portfolioService, createPortfolioSchema);
 */
export function createCollectionRoutes<T, TCreate extends Record<string, unknown>>(
  service: BaseService<T, TCreate, unknown>,
  createSchema: z.ZodType<TCreate>,
  beforeCreate?: (body: Record<string, unknown>) => Record<string, unknown>
) {
  return {
    async GET(req: NextRequest) {
      return ApiResponseHandler.handle(req, async () => {
        const params = parsePaginationParams(req);
        const { items, total } = await service.getAll(params);
        return { items, total };
      });
    },

    async POST(req: NextRequest) {
      const guard = await requireAdmin();
      if (guard) return guard;

      return ApiResponseHandler.handle(req, async () => {
        let body = await req.json();
        if (beforeCreate) {
          body = beforeCreate(body);
        }
        const validatedData = createSchema.parse(body);
        const item = await service.create(validatedData);
        return item;
      }, { status: 201 });
    },
  };
}

/**
 * توليد معالجي GET, PUT, DELETE للعنصر الفردي (/:id)
 * @example
 * // في portfolio/[id]/route.ts
 * export const { GET, PUT, DELETE } = createSingleRoutes(portfolioService, updatePortfolioSchema);
 */
export function createSingleRoutes<T, TUpdate extends Record<string, unknown>>(
  service: BaseService<T, unknown, TUpdate>,
  updateSchema: z.ZodType<TUpdate>,
  beforeUpdate?: (body: Record<string, unknown>) => Record<string, unknown>
) {
  return {
    async GET(
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) {
      return ApiResponseHandler.handle(req, async () => {
        const { id } = await params;
        return service.getById(id);
      });
    },

    async PUT(
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) {
      const guard = await requireAdmin();
      if (guard) return guard;

      return ApiResponseHandler.handle(req, async () => {
        const { id } = await params;
        let body = await req.json();
        if (beforeUpdate) {
          body = beforeUpdate(body);
        }
        const validatedData = updateSchema.parse(body);
        const updated = await service.update(id, validatedData);
        return updated;
      });
    },

    async DELETE(
      req: NextRequest,
      { params }: { params: Promise<{ id: string }> }
    ) {
      const guard = await requireAdmin();
      if (guard) return guard;

      return ApiResponseHandler.handle(req, async () => {
        const { id } = await params;
        await service.delete(id);
        return { success: true };
      });
    },
  };
}