import { siteConfig } from "@/config/site";
import { absoluteUrl, serializeJsonLd, servedMarkets } from "@/lib/seo";
import type { SiteSettings } from "@/types/site-settings";

export default function StructuredData({
  nonce,
  settings,
}: {
  nonce?: string;
  settings: SiteSettings;
}) {
  const businessId = `${siteConfig.url}/#business`;
  const websiteId = `${siteConfig.url}/#website`;
  const socialProfiles = Object.values(settings.social).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: settings.branding.nameAr,
        alternateName: settings.branding.nameEn,
        description: settings.seo.descriptionAr,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(settings.branding.logoUrl),
        },
        image: absoluteUrl(settings.seo.ogImageUrl),
        telephone: `+${settings.contact.phone}`,
        email: settings.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.contact.locationAr,
          addressLocality: "تعز",
          addressRegion: "تعز",
          addressCountry: "YE",
        },
        areaServed: servedMarkets.map((market) => ({
          "@type": "Country",
          name: market.ar,
          alternateName: market.en,
        })),
        sameAs: socialProfiles,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: siteConfig.workingHours.days,
          opens: siteConfig.workingHours.opens,
          closes: siteConfig.workingHours.closes,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${settings.contact.phone}`,
          email: settings.contact.email,
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
          areaServed: servedMarkets.map((market) => market.code),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات تمام ميديا",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "التسويق الرقمي وإدارة الحملات",
                url: absoluteUrl("/services/integrated"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "تطوير المواقع والتطبيقات",
                url: absoluteUrl("/services/tech"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "الهوية البصرية والتصميم الإبداعي",
                url: absoluteUrl("/services/creative"),
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: settings.branding.nameAr,
        alternateName: settings.branding.nameEn,
        description: settings.seo.descriptionAr,
        inLanguage: ["ar", "en"],
        publisher: {
          "@id": businessId,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: settings.seo.titleAr,
        description: settings.seo.descriptionAr,
        inLanguage: "ar",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": businessId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
