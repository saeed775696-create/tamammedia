import { prisma } from "@/lib/prisma";
import { DEFAULT_CONTENT } from "./defaults";

/**
 * خدمة إدارة محتوى الموقع.
 * تقرأ من جدول SiteSetting، وتستخدم DEFAULT_CONTENT كـ fallback.
 */

/** يقرأ قيمة واحدة من DB أو fallback */
export async function getContent(key: string): Promise<string> {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  if (setting?.value !== null && setting?.value !== undefined) {
    return setting.value;
  }
  return DEFAULT_CONTENT[key as keyof typeof DEFAULT_CONTENT] ?? "";
}

/** يقرأ كل المفاتيح من فئة معينة */
export async function getContentByCategory(
  category: string
): Promise<Record<string, string>> {
  const settings = await prisma.siteSetting.findMany({ where: { category } });
  const result: Record<string, string> = {};

  // ابدأ بـ defaults
  for (const [key, value] of Object.entries(DEFAULT_CONTENT)) {
    if (key.startsWith(`${category}.`)) {
      result[key] = value as string;
    }
  }

  // اكتب فوقها بقيم DB
  for (const setting of settings) {
    result[setting.key] = setting.value ?? "";
  }

  return result;
}

/** يقرأ كل المحتوى دفعة واحدة — مفيد للصفحات */
export async function getAllContent(): Promise<Record<string, string>> {
  const settings = await prisma.siteSetting.findMany();
  const result: Record<string, string> = { ...DEFAULT_CONTENT };

  for (const setting of settings) {
    result[setting.key] = setting.value ?? "";
  }

  return result;
}

/** يكتب قيمة واحدة (admin only — تحقق في API) */
export async function setContent(
  key: string,
  value: string,
  category?: string
): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: {
      key,
      value,
      category: category || key.split(".")[0] || "general",
    },
  });
}

/** يكتب عدة قيم دفعة واحدة (admin only) */
export async function setContentMany(
  entries: Record<string, string>
): Promise<void> {
  const operations = Object.entries(entries).map(([key, value]) =>
    prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        value,
        category: key.split(".")[0] || "general",
      },
    })
  );

  await prisma.$transaction(operations);
}
