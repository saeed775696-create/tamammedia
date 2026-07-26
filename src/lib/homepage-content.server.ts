import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const HOMEPAGE_CONTENT_CACHE_TAG = "homepage-content";

export interface HomepageTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export interface HomepagePartner {
  id: string;
  name: string;
  imageUrl: string;
  website?: string;
}

async function readHomepageContent(): Promise<{
  team: HomepageTeamMember[];
  partners: HomepagePartner[];
}> {
  // The home page never renders totals, timestamps, or ordering metadata.
  // Selecting only its visible fields avoids two unused COUNT queries and
  // keeps the cached payload intentionally small.
  const [team, partners] = await Promise.all([
    prisma.teamMember.findMany({
      take: 12,
      orderBy: { order: "asc" },
      select: { id: true, name: true, role: true, bio: true, imageUrl: true },
    }),
    prisma.partner.findMany({
      take: 20,
      orderBy: { order: "asc" },
      select: { id: true, name: true, imageUrl: true, website: true },
    }),
  ]);

  return {
    team: team.map((member) => ({
      ...member,
      bio: member.bio ?? undefined,
      imageUrl: member.imageUrl ?? undefined,
    })),
    partners: partners.map((partner) => ({
      ...partner,
      website: partner.website ?? undefined,
    })),
  };
}

const getCachedHomepageContent = unstable_cache(
  readHomepageContent,
  ["homepage-content-v1"],
  { revalidate: 3600, tags: [HOMEPAGE_CONTENT_CACHE_TAG] }
);

export function getHomepageContent() {
  return getCachedHomepageContent();
}
