import Script from "next/script";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamam Media",
    url: "https://tamammedia.vercel.app/",
    logo: "https://tamammedia.vercel.app/imgs/2-3.png",
    description:
      "Digital marketing agency in Yemen offering branding, web development, and integrated marketing solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Taiz",
      addressCountry: "YE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+96777552639", // ضع رقمك هنا
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://www.facebook.com/share/1CcpgN53m2/",
      "https://www.instagram.com/tamammedia9",
    ],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}