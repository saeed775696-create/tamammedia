import { serviceService } from '@/lib/services';
import { createServiceSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';
import { SERVICE_CONTENT_CACHE_TAG } from '@/lib/public-content.server';

import { NextRequest } from 'next/server';

const routes = createCollectionRoutes(
  serviceService,
  createServiceSchema,
  undefined,
  [SERVICE_CONTENT_CACHE_TAG]
);
export async function GET(req: NextRequest) { return routes.GET(req); }
export async function POST(req: NextRequest) { return routes.POST(req); }
