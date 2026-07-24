import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().min(1, 'Message is required'),
  language: z.string().min(1, 'Language is required'),
  status: z.string().default('new'),
});

export const updateContactSchema = z.object({
  status: z.string().min(1, 'Status is required'),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
