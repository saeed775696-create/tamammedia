import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(12, "Password must contain at least 12 characters")
  .max(128, "Password is too long")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/\d/, "Password must include a number")
  .regex(/[^A-Za-z0-9]/, "Password must include a symbol");

export const createEditorSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().min(2).max(120).optional(),
  temporaryPassword: strongPasswordSchema,
});

export const updateEditorSchema = z
  .object({
    isActive: z.boolean().optional(),
    temporaryPassword: strongPasswordSchema.optional(),
  })
  .refine((value) => value.isActive !== undefined || value.temporaryPassword !== undefined, {
    message: "Provide an access state or a temporary password",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1).max(128),
    newPassword: strongPasswordSchema,
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: "New password must differ from the current password",
    path: ["newPassword"],
  });

export const changeAccountEmailSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  currentPassword: z.string().min(1).max(128),
});

export const confirmAccountEmailSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  code: z.string().trim().regex(/^\d{6}$/, "Verification code must contain six digits"),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

export const passwordResetConfirmSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  code: z.string().trim().regex(/^\d{6}$/, "Verification code must contain six digits"),
  newPassword: strongPasswordSchema,
});

export type CreateEditorInput = z.infer<typeof createEditorSchema>;
