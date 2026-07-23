import { z } from 'zod';

/**
 * يقبل gallery/technologies كـ string (JSON) أو array مباشرة.
 * الـ repository يحوّل القيمة إلى Json type compatible مع Prisma.
 */
export const createPortfolioSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleAr: z.string().min(1, 'Arabic title is required'),
  descriptionEn: z.string().optional().nullable(),
  descriptionAr: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  gallery: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  category: z.string().min(1, 'Category is required'),
  clientName: z.string().optional().nullable(),
  completionDate: z.string().optional().nullable(),
  technologies: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  link: z.string().url().optional().nullable().or(z.literal('')),
  videoUrl: z.string().url().optional().nullable().or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
