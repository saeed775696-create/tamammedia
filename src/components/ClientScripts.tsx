"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/context/SiteSettingsContext";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

const PRIVATE_PAGE_PATTERN =
  /^\/(?:dashboard|login|forgot-password|change-password)(?:\/|$)/;
const INTERACTION_EVENTS: Array<keyof WindowEventMap> = [
  "pointerdown",
  "keydown",
  "touchstart",
  "scroll",
];

/**
 * Loads Analytics after genuine engagement, with a delayed fallback for
 * visitors who only read. This keeps the tag away from LCP/TBT while retaining
 * page-view tracking for normal sessions.
 */
export default function ClientScripts() {
  const pathname = usePathname();
  const { analytics } = useSiteSettings();
  const gaId =
    analytics.googleMeasurementId ||
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
    "";
  const isPrivatePage = PRIVATE_PAGE_PATTERN.test(pathname);

  useEffect(() => {
    if (!/^G-[A-Z0-9]{4,20}$/.test(gaId) || isPrivatePage) return;

    const analyticsWindow = window as AnalyticsWindow;
    if (analyticsWindow.gtag) {
      analyticsWindow.gtag("config", gaId, {
        anonymize_ip: true,
        page_path: `${window.location.pathname}${window.location.search}`,
      });
      return;
    }

    let started = false;
    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, loadAnalytics)
      );
    };
    const loadAnalytics = () => {
      if (started || document.getElementById("google-analytics-script")) return;
      started = true;
      removeListeners();

      analyticsWindow.dataLayer ??= [];
      analyticsWindow.gtag = (...args: unknown[]) => {
        analyticsWindow.dataLayer?.push(args);
      };
      analyticsWindow.gtag("js", new Date());
      analyticsWindow.gtag("config", gaId, { anonymize_ip: true });

      const script = document.createElement("script");
      script.id = "google-analytics-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        gaId
      )}`;
      document.head.appendChild(script);
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, loadAnalytics, {
        once: true,
        passive: true,
      })
    );
    const fallbackTimer = window.setTimeout(loadAnalytics, 7000);

    return () => {
      window.clearTimeout(fallbackTimer);
      removeListeners();
    };
  }, [gaId, isPrivatePage, pathname]);

  return null;
}
