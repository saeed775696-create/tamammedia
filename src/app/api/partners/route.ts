import { partnerService } from '@/lib/services';
import { createPartnerSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

import { NextRequest } from 'next/server';

const routes = createCollectionRoutes(partnerService, createPartnerSchema);
export async function GET(req: NextRequest) { return routes.GET(req); }
export async function POST(req: NextRequest) { return routes.POST(req); }