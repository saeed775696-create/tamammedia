import { portfolioService } from '@/lib/services';
import { updatePortfolioSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

const beforeUpdate = (body: Record<string, unknown>) => {
  if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
  if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);
  return body;
};

import { NextRequest } from 'next/server';

const routes = createSingleRoutes(portfolioService, updatePortfolioSchema, beforeUpdate);
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.GET(req, ctx); }
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.PUT(req, ctx); }
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) { return routes.DELETE(req, ctx); }