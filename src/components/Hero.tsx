"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              {lang === "ar"
                ? "وكالة تسويق رقمي متكاملة"
                : "Integrated Digital Marketing Agency"}
            </div>

            <h1 className="hero-title">
              {lang === "ar" ? "نحو حضور أقوى" : "Towards a Stronger Presence"}{" "}
              <span className="highlight">
                {lang === "ar" ? "بصناعة رقمية" : "Digital Excellence"}
              </span>
            </h1>

            <p className="hero-subtitle">
              {lang === "ar"
                ? "نبني حضوراً رقمياً وميدانياً متكاملاً ينقل علامتك التجارية إلى آفاق جديدة."
                : "We build integrated digital and on-ground presence that takes your brand to new heights."}
            </p>

            <div className="hero-btns">
              <Link href="/contact" className="btn btn-primary">
                {lang === "ar" ? "ابدأ مشروعك" : "Start Project"}
                <ArrowLeft
                  size={18}
                  className={lang === "ar" ? "" : "rotate-180"}
                />
              </Link>

              <Link href="/services" className="btn btn-outline">
                {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
                <ArrowRight
                  size={18}
                  className={lang === "ar" ? "rotate-180" : ""}
                />
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="number">+50</div>
                <div className="label">
                  {lang === "ar" ? "عميل" : "Clients"}
                </div>
              </div>
              <div className="hero-stat">
                <div className="number">+120</div>
                <div className="label">
                  {lang === "ar" ? "مشروع" : "Projects"}
                </div>
              </div>
              <div className="hero-stat">
                <div className="number">100%</div>
                <div className="label">
                  {lang === "ar" ? "رضا العملاء" : "Satisfaction"}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div className="hero-visual">
            <div className="hero-card bg-white/10">
              {/* Logo with glow */}
              <Image
                src="/imgs/2-3.png"
                alt="Tamam Media Logo"
                width={180}
                height={180}
                priority
                className="block mx-auto mb-5 max-w-[180px] drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] bg-white/15 p-3 rounded-2xl h-auto"
              />
              <p className="font-semibold text-base text-white">
                {lang === "ar"
                  ? "تمام للحلول التسويقية الرقمية المتكاملة"
                  : "Integrated Digital Marketing Solutions"}
              </p>
              <div className="w-[60px] h-[3px] bg-[var(--secondary)] mx-auto my-4" />
              <div className="flex justify-between gap-5 text-white">
                <div>
                  <span className="number text-[var(--secondary)]">
                    {lang === "ar" ? "تعز" : "Taiz"}
                  </span>
                  <div className="label">
                    {lang === "ar" ? "اليمن" : "Yemen"}
                  </div>
                </div>
                <div>
                  <span className="number text-[var(--secondary)]">
                    {lang === "ar" ? "إبداع" : "Creative"}
                  </span>
                  <div className="label">
                    {lang === "ar" ? "بلا حدود" : "Without Limits"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}