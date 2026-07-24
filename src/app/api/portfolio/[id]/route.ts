import { portfolioService } from '@/lib/services';
import { updatePortfolioSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

const beforeUpdate = (body: Record<string, unknown>) => {
  if (Array.isArray(body.gallery)) body.gallery = JSON.stringify(body.gallery);
  if (Array.isArray(body.technologies)) body.technologies = JSON.stringify(body.technologies);
  return body;
};

export const { GET, PUT, DELETE } = createSingleRoutes(portfolioService, updatePortfolioSchema, beforeUpdate);