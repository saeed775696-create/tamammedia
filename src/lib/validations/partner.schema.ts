import { z } from 'zod';
import { externalUrlSchema, imageUrlSchema } from './url.schema';

export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  imageUrl: imageUrlSchema,
  website: externalUrlSchema.optional().nullable().or(z.literal('')),
  order: z.coerce.number().int().default(0),
});

export const updatePartnerSchema = createPartnerSchema.partial();

export type CreatePartnerInput = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof updatePartnerSchema>;
