import { z } from 'zod';
import { imageUrlSchema } from './url.schema';

export const createTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().optional().nullable(),
  imageUrl: imageUrlSchema.optional().nullable().or(z.literal('')),
  order: z.coerce.number().int().default(0),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
