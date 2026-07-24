import { partnerService } from '@/lib/services';
import { updatePartnerSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

export const { GET, PUT, DELETE } = createSingleRoutes(partnerService, updatePartnerSchema);