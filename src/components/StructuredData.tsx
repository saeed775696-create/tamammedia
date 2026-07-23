import { getAllContent } from "@/lib/content/service";

/**
 * بيانات منظمة (Schema.org) لمحركات البحث.
 * تُقرأ من DB لتسمح بالتحرير من لوحة التحكم.
 */
export default async function StructuredData() {
  const content = await getAllContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content["general.siteName.ar"] || "تمام ميديا",
    alternateName: content["general.siteName.en"] || "Tamam Media",
    description:
      content["seo.description"] ||
      "وكالة تسويق رقمي وحلول تقنية متكاملة في اليمن.",
    url: "https://tamammedia.tech",
    logo: "https://tamammedia.tech/imgs/2-3.png",
    image: "https://tamammedia.tech/imgs/2-3.png",
    telephone: `+${content["contact.phone"] || "967733579558"}`,
    email: content["contact.email"] || "tamammedia9@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: content["contact.address.ar"] || "تعز",
      addressCountry: "YE",
    },
    sameAs: [
      `https://wa.me/${content["contact.whatsapp"] || content["contact.phone"] || "967733579558"}`,
      content["contact.facebook"] || "",
      content["contact.instagram"] || "",
      content["contact.linkedin"] || "",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
