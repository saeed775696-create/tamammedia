"use client";
import Script from "next/script";

/**
 * يحمل سكربتات الطرف الثالث (Google Analytics) فقط إن كان المعرّف مضبوطًا.
 * ضع المعرّف في NEXT_PUBLIC_GOOGLE_ANALYTICS_ID.
 */
export default function ClientScripts() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!gaId || gaId === "G-XXXXXXXXXX") {
    // لا شيء لتحميله — تجنب الـ placeholder الوهمي
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
