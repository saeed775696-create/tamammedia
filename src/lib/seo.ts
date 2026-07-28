import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const servedMarkets = [
  { code: "YE", ar: "اليمن", en: "Yemen" },
  { code: "SA", ar: "السعودية", en: "Saudi Arabia" },
  { code: "AE", ar: "الإمارات", en: "United Arab Emirates" },
  { code: "OM", ar: "عُمان", en: "Oman" },
  { code: "QA", ar: "قطر", en: "Qatar" },
  { code: "KW", ar: "الكويت", en: "Kuwait" },
  { code: "BH", ar: "البحرين", en: "Bahrain" },
] as const;

export function absoluteUrl(pathOrUrl: string): string {
  try {
    return new URL(pathOrUrl, `${siteConfig.url}/`).toString();
  } catch {
    return siteConfig.url;
  }
}

export function summarizeForSearch(value: string, maxLength = 165): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 90 ? lastSpace : shortened.length)}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  imageUrl = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
}): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(imageUrl || "/opengraph-image");
  const summary = summarizeForSearch(description);

  return {
    title,
    description: summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: summary,
      url: canonical,
      siteName: "تمام ميديا | Tamam Media",
      locale: "ar_YE",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [image],
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
