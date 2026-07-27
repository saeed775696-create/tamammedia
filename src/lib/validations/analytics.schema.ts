import { z } from "zod";

export const googleMeasurementIdSchema = z
  .string()
  .trim()
  .toUpperCase()
  .refine(
    (value) => value === "" || /^G-[A-Z0-9]{4,20}$/.test(value),
    "معرّف القياس يجب أن يبدأ بـ G-"
  );

export const analyticsPeriodSchema = z.enum(["7d", "30d", "90d"]);

export const analyticsConnectionSchema = z.object({
  measurementId: googleMeasurementIdSchema,
  propertyId: z
    .string()
    .trim()
    .regex(/^\d{5,30}$/, "معرّف الخاصية يجب أن يحتوي أرقامًا فقط"),
  serviceAccountJson: z.string().trim().max(20_000).optional(),
});

export const googleServiceAccountSchema = z.object({
  type: z.literal("service_account"),
  project_id: z.string().trim().min(1).max(200),
  private_key_id: z.string().trim().min(1).max(300).optional(),
  private_key: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.startsWith("-----BEGIN PRIVATE KEY-----") &&
        value.endsWith("-----END PRIVATE KEY-----"),
      "ملف حساب الخدمة لا يحتوي مفتاحًا خاصًا صالحًا"
    ),
  client_email: z.string().trim().email().max(254),
  client_id: z.string().trim().max(100).optional(),
  token_uri: z.string().trim().url().optional(),
});

export type GoogleServiceAccount = z.infer<typeof googleServiceAccountSchema>;
