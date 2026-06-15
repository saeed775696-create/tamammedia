export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "تمام ميديا",
    alternateName: "Tamam Media",
    description:
      "وكالة تسويق رقمي متكاملة في اليمن – تصميم مواقع، تسويق، وبناء علامات تجارية.",
    url: "https://tamammedia.vercel.app",
    logo: "https://tamammedia.vercel.app/imgs/2-3.png",
    image: "https://tamammedia.vercel.app/imgs/2-3.png",
    telephone: "+967733579558",
    email: "tamammedia9@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "تعز",
      addressCountry: "YE",
    },
    sameAs: [
      "https://wa.me/967733579558",
      "https://www.facebook.com/tamammedia",
      "https://www.instagram.com/tamammedia",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}