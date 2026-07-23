"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  content: Record<string, string>;
};

export default function AboutClient({ content }: Props) {
  const { lang } = useLanguage();

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "من نحن" : "About Us"}</h1>
            <p>
              {content[`about.subtitle.${lang}`] ||
                content["about.subtitle.ar"]}
            </p>

            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
              {" / "}
              <span>{lang === "ar" ? "من نحن" : "About"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="about-image">
                <Image
                  src="/imgs/غلاف فيس copy-1.jpg.jpeg"
                  alt="Tamam Media"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>

              <div className="about-image-badge">
                <div className="num">Tamam</div>
                <div className="label">
                  {lang === "ar" ? "في الإتقان" : "Excellence"}
                </div>
              </div>
            </div>

            <div className="about-text">
              <div className="section-badge">
                {lang === "ar" ? "تعرف علينا" : "Get to know us"}
              </div>

              <h3>
                {content[`about.title.${lang}`] || content["about.title.ar"]}
              </h3>

              <p>
                {content[`about.p1.${lang}`] || content["about.p1.ar"]}
              </p>

              <p>
                {content[`about.p2.${lang}`] || content["about.p2.ar"]}
              </p>

              <p>
                {content[`about.p3.${lang}`] || content["about.p3.ar"]}
              </p>

              <div className="about-features">
                <div className="about-feature">
                  {lang === "ar" ? "✓ خبرة محلية" : "✓ Local Experience"}
                </div>

                <div className="about-feature">
                  {lang === "ar" ? "✓ حلول ذكية" : "✓ Smart Solutions"}
                </div>

                <div className="about-feature">
                  {lang === "ar" ? "✓ فريق محترف" : "✓ Professional Team"}
                </div>

                <div className="about-feature">
                  {lang === "ar" ? "✓ أسعار تنافسية" : "✓ Competitive Pricing"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              {lang === "ar" ? "رؤيتنا ورسالتنا" : "Vision & Mission"}
            </div>

            <h2 className="section-title">
              {lang === "ar" ? "ما يوجّهنا" : "What Drives Us"}
            </h2>
          </div>

          <div className="vmv-grid">
            <div className="vmv-card">
              <h3 className="vmv-title">
                {lang === "ar" ? "الرؤية" : "Vision"}
              </h3>
              <p className="vmv-text">
                {content[`about.vision.${lang}`] || content["about.vision.ar"]}
              </p>
            </div>

            <div className="vmv-card">
              <h3 className="vmv-title">
                {lang === "ar" ? "الرسالة" : "Mission"}
              </h3>
              <p className="vmv-text">
                {content[`about.mission.${lang}`] ||
                  content["about.mission.ar"]}
              </p>
            </div>

            <div className="vmv-card">
              <h3 className="vmv-title">
                {lang === "ar" ? "القيم" : "Values"}
              </h3>
              <p className="vmv-text">
                {content[`about.values.${lang}`] ||
                  content["about.values.ar"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              {lang === "ar" ? "كيف نعمل" : "How We Work"}
            </div>

            <h2 className="section-title">
              {lang === "ar" ? "منهجية العمل" : "Our Process"}
            </h2>
          </div>

          <div className="method-grid">
            <div className="method-step">
              <h3>01</h3>
              <p>
                {lang === "ar"
                  ? "تحليل وفهم الاحتياجات"
                  : "Analysis & Understanding"}
              </p>
            </div>

            <div className="method-step">
              <h3>02</h3>
              <p>
                {lang === "ar" ? "استراتيجية مخصصة" : "Custom Strategy"}
              </p>
            </div>

            <div className="method-step">
              <h3>03</h3>
              <p>
                {lang === "ar" ? "تنفيذ إبداعي وتقني" : "Creative Execution"}
              </p>
            </div>

            <div className="method-step">
              <h3>04</h3>
              <p>
                {lang === "ar" ? "قياس وتحسين مستمر" : "Optimization"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            {lang === "ar"
              ? "هل أنت مستعد لتعزيز حضورك الرقمي؟"
              : "Ready to grow your digital presence?"}
          </h2>

          <p className="cta-desc">
            {lang === "ar" ? "تواصل مع فريقنا اليوم" : "Contact our team today"}
          </p>

          <Link href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "طلب عرض سعر" : "Get a Quote"}
          </Link>
        </div>
      </section>
    </>
  );
}
