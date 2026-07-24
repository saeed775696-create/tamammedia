import { siteConfig } from "@/config/site";

/**
 * بيانات منظمة (Schema.org) لمحركات البحث.
 * تُساعد Google على فهم نشاط الشركة وعرض Knowledge Panel.
 *
 * ملاحظة: تم إزالة aggregateRating الوهمي لأن Google تعاقب على التقييمات
 * غير الموثقة بخفض الترتيب.
 */
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name.ar,
    alternateName: siteConfig.name.en,
    description:
      "وكالة تسويق رقمي وحلول تقنية متكاملة في اليمن. نقدم خدمات تصميم الهوية البصرية، تطوير المواقع والمتاجر الإلكترونية، إدارة السوشيال ميديا، والحملات الإعلانية. مقرنا في تعز، ونعمل مع علامات تجارية محلية وإقليمية لبناء حضور رقمي قوي ومؤثر.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/imgs/2-3.png`,
    image: `${siteConfig.url}/imgs/2-3.png`,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "تعز",
      addressCountry: "YE",
    },
    sameAs: [
      siteConfig.social.whatsapp,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: siteConfig.workingHours.days,
      opens: siteConfig.workingHours.opens,
      closes: siteConfig.workingHours.closes,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
