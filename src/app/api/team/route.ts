import { teamService } from '@/lib/services';
import { createTeamMemberSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

export const { GET, POST } = createCollectionRoutes(teamService, createTeamMemberSchema);