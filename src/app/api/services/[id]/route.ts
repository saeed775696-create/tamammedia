import { serviceService } from '@/lib/services';
import { updateServiceSchema } from '@/lib/validations';
import { createSingleRoutes } from '@/lib/api/create-entity-routes';

export const { GET, PUT, DELETE } = createSingleRoutes(serviceService, updateServiceSchema);