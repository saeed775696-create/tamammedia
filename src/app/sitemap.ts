import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/creative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/tech`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/integrated`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    // إضافة صفحات portfolio الديناميكية
    const portfolioRows = await prisma.portfolioItem.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    });

    const portfolioPages: MetadataRoute.Sitemap = portfolioRows.map((item) => ({
      url: `${baseUrl}/portfolio/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    // إضافة صفحات services الديناميكية (من قاعدة البيانات)
    const serviceItems = await prisma.service.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    });

    const servicePages: MetadataRoute.Sitemap = serviceItems.map((item) => ({
      url: `${baseUrl}/services/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    return [...staticPages, ...portfolioPages, ...servicePages];
  } catch {
    // في حال فشل الاتصال بقاعدة البيانات، نُعيد الصفحات الثابتة فقط
    return staticPages;
  }
}