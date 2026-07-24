import { teamService } from '@/lib/services';
import { updateTeamMemberSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

export const { GET, PUT, DELETE } = createSingleRoutes(teamService, updateTeamMemberSchema);