import type { PortfolioItem, Service } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const PORTFOLIO_CONTENT_CACHE_TAG = "portfolio-content";
export const SERVICE_CONTENT_CACHE_TAG = "service-content";

export interface PublicPortfolioItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  featured: boolean;
}

async function readPortfolioList(): Promise<PublicPortfolioItem[]> {
  const items = await prisma.portfolioItem.findMany({
    take: 60,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      titleEn: true,
      titleAr: true,
      descriptionEn: true,
      descriptionAr: true,
      imageUrl: true,
      category: true,
      clientName: true,
      featured: true,
    },
  });

  return items.map((item) => ({
    ...item,
    descriptionEn: item.descriptionEn ?? undefined,
    descriptionAr: item.descriptionAr ?? undefined,
    clientName: item.clientName ?? undefined,
  }));
}

const getCachedPortfolioList = unstable_cache(
  readPortfolioList,
  ["portfolio-list-v1"],
  { revalidate: 3600, tags: [PORTFOLIO_CONTENT_CACHE_TAG] }
);

const getCachedPortfolioItem = unstable_cache(
  async (id: string): Promise<PortfolioItem | null> =>
    prisma.portfolioItem.findUnique({ where: { id } }),
  ["portfolio-item-v1"],
  { revalidate: 3600, tags: [PORTFOLIO_CONTENT_CACHE_TAG] }
);

const getCachedService = unstable_cache(
  async (id: string): Promise<Service | null> =>
    prisma.service.findUnique({ where: { id } }),
  ["service-item-v1"],
  { revalidate: 3600, tags: [SERVICE_CONTENT_CACHE_TAG] }
);

export function getPortfolioList() {
  return getCachedPortfolioList();
}

export function getPortfolioItem(id: string) {
  return getCachedPortfolioItem(id);
}

export function getServiceItem(id: string) {
  return getCachedService(id);
}
