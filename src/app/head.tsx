export default function Head() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamam Media",
    url: "https://tamammedia.tech",
    logo: "https://tamammedia.tech/imgs/tamam logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+967-123-456-789",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/tamammedia",
      "https://www.instagram.com/tamammedia",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}