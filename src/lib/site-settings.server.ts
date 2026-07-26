import { prisma } from "@/lib/prisma";
import { defaultSiteSettings, normalizeSiteSettings } from "@/config/site-settings";
import type { SiteSettings } from "@/types/site-settings";

const SETTINGS_KEY = "site-content";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const record = await prisma.siteSetting.findUnique({ where: { key: SETTINGS_KEY } });
    if (!record?.value) return defaultSiteSettings;
    try {
      return normalizeSiteSettings(JSON.parse(record.value));
    } catch {
      return defaultSiteSettings;
    }
  } catch (error) {
    // The public site remains available while a deployment is waiting for the
    // new migration. The dashboard still reports the write error explicitly.
    if (process.env.NODE_ENV === "development") {
      console.warn("[site-settings] Falling back to bundled defaults", error);
    }
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const content = normalizeSiteSettings(settings);
  const record = await prisma.siteSetting.upsert({
    where: { key: SETTINGS_KEY },
    create: {
      id: SETTINGS_KEY,
      key: SETTINGS_KEY,
      value: JSON.stringify(content),
      category: "content",
    },
    update: { value: JSON.stringify(content), category: "content" },
  });

  return normalizeSiteSettings(record.value ? JSON.parse(record.value) : content);
}
