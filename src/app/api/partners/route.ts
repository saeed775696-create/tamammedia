import { partnerService } from '@/lib/services';
import { createPartnerSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

export const { GET, POST } = createCollectionRoutes(partnerService, createPartnerSchema);