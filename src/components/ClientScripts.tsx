"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/context/SiteSettingsContext";

/**
 * يحمل Google tag فقط في صفحات الموقع العامة عند ضبط معرّف قياس صالح.
 * يمكن ضبط المعرّف من لوحة التحكم، مع إبقاء متغير البيئة كخيار توافق.
 */
export default function ClientScripts({ nonce }: { nonce?: string }) {
  const pathname = usePathname();
  const { analytics } = useSiteSettings();
  const gaId =
    analytics.googleMeasurementId ||
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
    "";
  const isPrivatePage =
    /^\/(?:dashboard|login|forgot-password|change-password)(?:\/|$)/.test(
      pathname
    );

  if (!/^G-[A-Z0-9]{4,20}$/.test(gaId) || isPrivatePage) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
