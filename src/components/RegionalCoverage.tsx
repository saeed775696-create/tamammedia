"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe2, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { servedMarkets } from "@/lib/seo";

export default function RegionalCoverage() {
  const { lang } = useLanguage();
  const { seo } = useSiteSettings();
  const isArabic = lang === "ar";

  return (
    <section
      className="section-y-md border-y border-surface-200/70 bg-white"
      aria-labelledby="regional-coverage-title"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="section-eyebrow">
              <Globe2 size={17} aria-hidden="true" />
              {isArabic ? "نطاق خدماتنا" : "Where We Work"}
            </span>
            <h2
              id="regional-coverage-title"
              className="mt-5 max-w-2xl text-h1 text-brand-900"
            >
              {isArabic ? seo.regionalTitleAr : seo.regionalTitleEn}
            </h2>
            <p className="mt-5 max-w-2xl text-body-lg leading-loose text-surface-600">
              {isArabic
                ? seo.regionalDescriptionAr
                : seo.regionalDescriptionEn}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="btn-md btn-primary inline-flex">
                {isArabic ? "استكشف خدماتنا" : "Explore Services"}
                {isArabic ? (
                  <ArrowLeft size={18} aria-hidden="true" />
                ) : (
                  <ArrowRight size={18} aria-hidden="true" />
                )}
              </Link>
              <Link href="/contact" className="btn-md btn-outline inline-flex">
                {isArabic ? "ناقش مشروعك" : "Discuss Your Project"}
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-brand-800/10 bg-brand-950 p-5 shadow-2xl sm:p-7">
            <div
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(218,136,39,0.24),transparent_43%)]"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
              {servedMarkets.map((market, index) => (
                <div
                  key={market.code}
                  className={`flex min-h-24 flex-col justify-between rounded-2xl border p-4 ${
                    index === 0
                      ? "border-accent-400/50 bg-accent-500 text-white sm:col-span-2"
                      : "border-white/10 bg-white/[0.06] text-white"
                  }`}
                >
                  <MapPin
                    size={19}
                    className={index === 0 ? "text-white" : "text-accent-400"}
                    aria-hidden="true"
                  />
                  <span className="mt-4 text-base font-extrabold">
                    {isArabic ? market.ar : market.en}
                  </span>
                </div>
              ))}
            </div>
            <p className="relative mt-5 text-center text-xs font-semibold leading-relaxed text-white/60">
              {isArabic
                ? "إدارة وتنفيذ المشاريع إقليميًا من مقرنا في تعز وبقنوات تعاون رقمية مرنة."
                : "Managing regional projects from our Taiz base through flexible digital collaboration."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
