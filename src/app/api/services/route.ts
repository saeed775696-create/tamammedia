import { serviceService } from '@/lib/services';
import { createServiceSchema } from '@/lib/validations';
import { createCollectionRoutes } from '@/lib/api/create-entity-routes';

export const { GET, POST } = createCollectionRoutes(serviceService, createServiceSchema);