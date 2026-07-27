import { z } from "zod";
import { googleMeasurementIdSchema } from "./analytics.schema";

const text = (max = 500) => z.string().trim().min(1).max(max);
const url = z.string().trim().url().max(2048);

const localizedTextSchema = z.object({ ar: text(), en: text() });

export const siteSettingsSchema = z.object({
  branding: z.object({
    nameAr: text(120),
    nameEn: text(120),
    logoUrl: url,
    taglineAr: text(180),
    taglineEn: text(180),
  }),
  contact: z.object({
    email: z.string().trim().email().max(254),
    phone: z.string().trim().regex(/^\d{6,20}$/, "Use the international number without + or spaces"),
    phoneDisplay: text(48),
    locationAr: text(240),
    locationEn: text(240),
    workingHoursAr: text(180),
    workingHoursEn: text(180),
    mapEmbedUrl: url,
  }),
  social: z.object({
    facebook: url,
    instagram: url,
    linkedin: url,
    whatsapp: url,
  }),
  analytics: z.object({
    googleMeasurementId: googleMeasurementIdSchema,
  }),
  hero: z.object({
    badgeAr: text(180),
    badgeEn: text(180),
    headingAr: text(180),
    headingEn: text(180),
    accentAr: text(180),
    accentEn: text(180),
    descriptionAr: text(1000),
    descriptionEn: text(1000),
    primaryCtaAr: text(80),
    primaryCtaEn: text(80),
    secondaryCtaAr: text(80),
    secondaryCtaEn: text(80),
    cards: z.array(localizedTextSchema.extend({ imageUrl: url })).min(1).max(8),
    stats: z.array(localizedTextSchema.extend({ value: text(24) })).min(1).max(6),
  }),
  homeAbout: z.object({
    eyebrowAr: text(120),
    eyebrowEn: text(120),
    titleAr: text(300),
    titleEn: text(300),
    descriptionAr: text(2000),
    descriptionEn: text(2000),
  }),
  footer: z.object({
    descriptionAr: text(1500),
    descriptionEn: text(1500),
    designerName: text(180),
    designerPhone: z.string().trim().regex(/^\d{6,20}$/, "Use the international number without + or spaces"),
    designerPhoneDisplay: text(48),
  }),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
