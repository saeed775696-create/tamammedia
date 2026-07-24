import { portfolioService } from '@/lib/services';
import { createPortfolioSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

const beforeCreate = (body: Record<string, unknown>) => {
  if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
  if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);
  return body;
};

export const { GET, POST } = createCollectionRoutes(portfolioService, createPortfolioSchema, beforeCreate);