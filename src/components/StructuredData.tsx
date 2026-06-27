export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "تمام ميديا",
    alternateName: "Tamam Media",
    description:
      "وكالة تسويق رقمي وحلول تقنية متكاملة في اليمن. نقدم خدمات تصميم الهوية البصرية، تطوير المواقع والمتاجر الإلكترونية، إدارة السوشيال ميديا، والحملات الإعلانية. مقرنا في تعز، ونعمل مع علامات تجارية محلية وإقليمية لبناء حضور رقمي قوي ومؤثر.",
    url: "https://tamammedia.tech",
    logo: "https://tamammedia.tech/imgs/2-3.png",
    image: "https://tamammedia.tech/imgs/2-3.png",
    telephone: "+967733579558",
    email: "tamammedia9@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "تعز",
      addressCountry: "YE",
    },
    sameAs: [
      "https://wa.me/967733579558",
      "https://www.facebook.com/tamammedia1/",
      "https://www.instagram.com/tamammedia/1",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}