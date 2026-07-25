import { serviceService } from '@/lib/services';
import { updateServiceSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

import { NextRequest } from 'next/server';

const routes = createSingleRoutes(serviceService, updateServiceSchema);
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.GET(req, ctx); }
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.PUT(req, ctx); }
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.DELETE(req, ctx); }