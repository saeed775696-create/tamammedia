import { z } from 'zod';

export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  website: z.string().url().optional().nullable().or(z.literal('')),
  order: z.number().int().default(0),
});

export const updatePartnerSchema = createPartnerSchema.partial();

export type CreatePartnerInput = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof updatePartnerSchema>;
