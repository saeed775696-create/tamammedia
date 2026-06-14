"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
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
                  style={{
                    transform: lang === "ar" ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </Link>

              <Link href="/services" className="btn btn-outline">
                {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}
                <ArrowRight
                  size={18}
                  style={{
                    transform: lang === "ar" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
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

          <div className="hero-visual">
            <div className="hero-card">
              <img
                src="/imgs/2-3.png"
                alt="Tamam Media"
                style={{
                  display: "block",
                  margin: "0 auto 20px",
                  maxWidth: "160px",
                }}
              />
              <p style={{ fontWeight: 600, fontSize: "16px" }}>
                {lang === "ar"
                  ? "تمام للحلول التسويقية الرقمية المتكاملة"
                  : "Integrated Digital Marketing Solutions"}
              </p>
              <div
                style={{
                  width: "60px",
                  height: "3px",
                  background: "var(--secondary)",
                  margin: "16px auto",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div>
                  <span className="number">تعز</span>
                  <div className="label">
                    {lang === "ar" ? "اليمن" : "Yemen"}
                  </div>
                </div>
                <div>
                  <span className="number">
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