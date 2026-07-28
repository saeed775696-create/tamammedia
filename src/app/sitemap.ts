import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";

// Services and portfolio entries are managed after deployment. Rendering the
// sitemap per request keeps crawler discovery aligned with dashboard CRUD.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/creative`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/tech`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/integrated`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    // إضافة صفحات portfolio الديناميكية
    const portfolioRows = await prisma.portfolioItem.findMany({
      select: { id: true, imageUrl: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const portfolioPages: MetadataRoute.Sitemap = portfolioRows.map((item) => ({
      url: `${baseUrl}/portfolio/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [absoluteUrl(item.imageUrl)],
    }));

    // إضافة صفحات services الديناميكية (من قاعدة البيانات)
    const serviceItems = await prisma.service.findMany({
      select: { id: true, imageUrl: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const servicePages: MetadataRoute.Sitemap = serviceItems.map((item) => ({
      url: `${baseUrl}/services/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
      ...(item.imageUrl ? { images: [absoluteUrl(item.imageUrl)] } : {}),
    }));

    return [...staticPages, ...portfolioPages, ...servicePages];
  } catch {
    // في حال فشل الاتصال بقاعدة البيانات، نُعيد الصفحات الثابتة فقط
    return staticPages;
  }
}
