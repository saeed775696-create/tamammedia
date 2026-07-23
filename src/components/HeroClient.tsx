"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  content: Record<string, string>;
};

export default function HeroClient({ content }: Props) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              {content[`hero.badge.${lang}`] || content["hero.badge.ar"]}
            </div>

            <h1 className="hero-title">
              {content[`hero.title1.${lang}`] || content["hero.title1.ar"]}{" "}
              <span className="highlight">
                {content[`hero.title2.${lang}`] || content["hero.title2.ar"]}
              </span>
            </h1>

            <p className="hero-subtitle">
              {content[`hero.subtitle.${lang}`] || content["hero.subtitle.ar"]}
            </p>

            <div className="hero-btns">
              <Link href="/contact" className="btn btn-primary">
                {content[`hero.cta1.${lang}`] || content["hero.cta1.ar"]}
                <ArrowLeft
                  size={18}
                  className={isAr ? "" : "rotate-180"}
                />
              </Link>

              <Link href="/services" className="btn btn-outline">
                {content[`hero.cta2.${lang}`] || content["hero.cta2.ar"]}
                <ArrowRight
                  size={18}
                  className={isAr ? "rotate-180" : ""}
                />
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="number">
                  {content["hero.stat1.value"]}
                </div>
                <div className="label">
                  {content[`hero.stat1.label.${lang}`] ||
                    content["hero.stat1.label.ar"]}
                </div>
              </div>
              <div className="hero-stat">
                <div className="number">
                  {content["hero.stat2.value"]}
                </div>
                <div className="label">
                  {content[`hero.stat2.label.${lang}`] ||
                    content["hero.stat2.label.ar"]}
                </div>
              </div>
              <div className="hero-stat">
                <div className="number">
                  {content["hero.stat3.value"]}
                </div>
                <div className="label">
                  {content[`hero.stat3.label.${lang}`] ||
                    content["hero.stat3.label.ar"]}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div className="hero-visual">
            <div className="hero-card bg-white/10">
              <Image
                src="/imgs/2-3.png"
                alt="Tamam Media Logo"
                width={180}
                height={180}
                priority
                className="block mx-auto mb-5 max-w-[180px] drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] bg-white/15 p-3 rounded-2xl h-auto"
              />
              <p className="font-semibold text-base text-white">
                {isAr
                  ? "تمام للحلول التسويقية الرقمية المتكاملة"
                  : "Integrated Digital Marketing Solutions"}
              </p>
              <div className="w-[60px] h-[3px] bg-[var(--secondary)] mx-auto my-4" />
              <div className="flex justify-between gap-5 text-white">
                <div>
                  <span className="number text-[var(--secondary)]">
                    {isAr ? "تعز" : "Taiz"}
                  </span>
                  <div className="label">
                    {isAr ? "اليمن" : "Yemen"}
                  </div>
                </div>
                <div>
                  <span className="number text-[var(--secondary)]">
                    {isAr ? "إبداع" : "Creative"}
                  </span>
                  <div className="label">
                    {isAr ? "بلا حدود" : "Without Limits"}
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
