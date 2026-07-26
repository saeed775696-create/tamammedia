import { teamService } from '@/lib/services';
import { createTeamMemberSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';
import { HOMEPAGE_CONTENT_CACHE_TAG } from '@/lib/homepage-content.server';

import { NextRequest } from 'next/server';

const routes = createCollectionRoutes(
  teamService,
  createTeamMemberSchema,
  undefined,
  [HOMEPAGE_CONTENT_CACHE_TAG]
);
export async function GET(req: NextRequest) { return routes.GET(req); }
export async function POST(req: NextRequest) { return routes.POST(req); }
