import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { defaultSiteSettings, normalizeSiteSettings } from "@/config/site-settings";
import type { SiteSettings } from "@/types/site-settings";

const SETTINGS_KEY = "site-content";
export const SITE_SETTINGS_CACHE_TAG = "site-settings";

async function readSiteSettings(): Promise<SiteSettings> {
  const record = await prisma.siteSetting.findUnique({ where: { key: SETTINGS_KEY } });
  if (!record?.value) return defaultSiteSettings;

  try {
    return normalizeSiteSettings(JSON.parse(record.value));
  } catch {
    return defaultSiteSettings;
  }
}

// Layout content is requested on every public route. Cache the database read
// while preserving instant content updates through an explicit cache tag.
const getCachedSiteSettings = unstable_cache(
  readSiteSettings,
  ["site-settings-v1"],
  { revalidate: 3600, tags: [SITE_SETTINGS_CACHE_TAG] }
);

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await getCachedSiteSettings();
  } catch (error) {
    // The public site remains available while a deployment is waiting for the
    // new migration. A failed read is intentionally not cached.
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

  // `expire: 0` makes the next public request read the new value rather than
  // serving a stale cache entry after a dashboard update.
  revalidateTag(SITE_SETTINGS_CACHE_TAG, { expire: 0 });

  return normalizeSiteSettings(record.value ? JSON.parse(record.value) : content);
}
