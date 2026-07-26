import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Invalid email address').max(254),
  phone: z.string().trim().max(40).optional().nullable(),
  service: z.string().trim().max(100).optional().nullable(),
  message: z.string().trim().min(1, 'Message is required').max(5_000),
  language: z.enum(['ar', 'en']),
});

export const updateContactSchema = z.object({
  status: z.enum(['new', 'read', 'replied']),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
