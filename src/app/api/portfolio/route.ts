import { portfolioService } from '@/lib/services';
import { createPortfolioSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

const beforeCreate = (body: Record<string, unknown>) => {
  if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
  if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);
  return body;
};

import { NextRequest } from 'next/server';

const routes = createCollectionRoutes(portfolioService, createPortfolioSchema, beforeCreate);
export async function GET(req: NextRequest) { return routes.GET(req); }
export async function POST(req: NextRequest) { return routes.POST(req); }