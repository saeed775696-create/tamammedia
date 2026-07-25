import { serviceService } from '@/lib/services';
import { createServiceSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

import { NextRequest } from 'next/server';

const routes = createCollectionRoutes(serviceService, createServiceSchema);
export async function GET(req: NextRequest) { return routes.GET(req); }
export async function POST(req: NextRequest) { return routes.POST(req); }