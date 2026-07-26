import { serviceService } from '@/lib/services';
import { updateServiceSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';
import { SERVICE_CONTENT_CACHE_TAG } from '@/lib/public-content.server';

import { NextRequest } from 'next/server';

const routes = createSingleRoutes(
  serviceService,
  updateServiceSchema,
  undefined,
  [SERVICE_CONTENT_CACHE_TAG]
);
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.GET(req, ctx); }
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.PUT(req, ctx); }
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.DELETE(req, ctx); }
