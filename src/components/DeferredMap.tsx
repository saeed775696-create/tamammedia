"use client";

import { useState } from "react";
import { MapPinned, MousePointerClick } from "lucide-react";

type DeferredMapProps = {
  embedUrl: string;
  title: string;
  location: string;
  language: "ar" | "en";
};

export default function DeferredMap({
  embedUrl,
  title,
  location,
  language,
}: DeferredMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        className="h-full min-h-[220px] w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(245,120,45,0.18),transparent_42%),linear-gradient(135deg,#f8fafc,#eef2f7)] px-6 text-center">
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#21214f 1px, transparent 1px), linear-gradient(90deg, #21214f 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mb-3 flex size-14 items-center justify-center rounded-2xl bg-brand-900 text-white shadow-lg shadow-brand-900/15">
        <MapPinned size={26} aria-hidden="true" />
      </div>
      <p className="relative max-w-sm text-sm font-bold text-brand-900">
        {location}
      </p>
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        className="relative mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-md shadow-accent-500/20 transition hover:bg-accent-600 focus:outline-none focus:ring-4 focus:ring-accent-500/25"
      >
        <MousePointerClick size={17} aria-hidden="true" />
        {language === "ar" ? "عرض الخريطة التفاعلية" : "Load interactive map"}
      </button>
      <p className="relative mt-2 text-[11px] text-surface-500">
        {language === "ar"
          ? "لن تُحمّل خدمات Google إلا بعد اختيارك"
          : "Google Maps loads only after you choose"}
      </p>
    </div>
  );
}
