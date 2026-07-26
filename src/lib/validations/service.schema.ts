import { z } from 'zod';
import { imageUrlSchema } from './url.schema';

export const createServiceSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().min(1, 'Arabic title is required'),
  descriptionEn: z.string().min(1, 'English description is required'),
  descriptionAr: z.string().min(1, 'Arabic description is required'),
  iconName: z.string().optional().nullable(),
  imageUrl: imageUrlSchema.optional().nullable().or(z.literal('')),
  order: z.coerce.number().int().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
