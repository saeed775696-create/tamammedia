import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";
import {
  PORTFOLIO_CONTENT_CACHE_TAG,
  SERVICE_CONTENT_CACHE_TAG,
} from "@/lib/public-content.server";

export const revalidate = 3600;

type SitemapContent = {
  portfolioRows: Array<{
    id: string;
    imageUrl: string;
    updatedAt: string;
  }>;
  serviceRows: Array<{
    id: string;
    imageUrl: string | null;
    updatedAt: string;
  }>;
};

async function readSitemapContent(): Promise<SitemapContent> {
  const [portfolioRows, serviceRows] = await Promise.all([
    prisma.portfolioItem.findMany({
      select: { id: true, imageUrl: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.service.findMany({
      select: { id: true, imageUrl: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  // Cache plain JSON-compatible values so the result is portable across
  // serverless instances and does not need a database read on every crawl.
  return {
    portfolioRows: portfolioRows.map((item) => ({
      ...item,
      updatedAt: item.updatedAt.toISOString(),
    })),
    serviceRows: serviceRows.map((item) => ({
      ...item,
      updatedAt: item.updatedAt.toISOString(),
    })),
  };
}

const getSitemapContent = unstable_cache(
  readSitemapContent,
  ["sitemap-content-v1"],
  {
    revalidate: 3600,
    // Existing dashboard CRUD mutations already invalidate these tags.
    tags: [PORTFOLIO_CONTENT_CACHE_TAG, SERVICE_CONTENT_CACHE_TAG],
  }
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${baseUrl}/services/creative`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/tech`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/integrated`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const { portfolioRows, serviceRows } = await getSitemapContent();
    const portfolioPages: MetadataRoute.Sitemap = portfolioRows.map((item) => ({
      url: `${baseUrl}/portfolio/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [absoluteUrl(item.imageUrl)],
    }));
    const servicePages: MetadataRoute.Sitemap = serviceRows.map((item) => ({
      url: `${baseUrl}/services/${item.id}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
      ...(item.imageUrl ? { images: [absoluteUrl(item.imageUrl)] } : {}),
    }));

    return [...staticPages, ...portfolioPages, ...servicePages];
  } catch {
    // Crawlers still receive the stable public routes during a DB outage.
    return staticPages;
  }
}
