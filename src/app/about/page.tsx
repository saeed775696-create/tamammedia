"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "من نحن" : "About Us"}</h1>
            <p>
              {lang === "ar"
                ? "تعرّف على قصتنا، رؤيتنا، وقيمنا"
                : "Learn about our story, vision, and values"}
            </p>

            <div className="breadcrumb">
              <Link href="/">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
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
    <img
      src="/imgs/غلاف فيس copy-1.jpg.jpeg"
      alt="Tamam Media"
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

              <h3>{lang === "ar" ? "من نحن؟" : "Who are we?"}</h3>

              <p>
                {lang === "ar"
                  ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة."
                  : "Tamam Media is a Yemeni company specialized in integrated digital marketing solutions."}
              </p>

              <p>
                {lang === "ar"
                  ? "لا نقدم مجرد تصميم أو خدمة تقنية، بل نبني حضوراً متكاملاً للعلامات التجارية."
                  : "We don't just provide design or tech services, we build complete brand presence."}
              </p>

              <p>
                {lang === "ar"
                  ? "اسمنا يعكس وعدنا: الإتقان والاكتمال والرضا."
                  : "Our name reflects our promise: excellence, completeness, and satisfaction."}
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
                {lang === "ar"
                  ? "الريادة في الحلول الرقمية والتسويقية المتكاملة."
                  : "Leadership in integrated digital marketing solutions."}
              </p>
            </div>

            <div className="vmv-card">
              <h3 className="vmv-title">
                {lang === "ar" ? "الرسالة" : "Mission"}
              </h3>
              <p className="vmv-text">
                {lang === "ar"
                  ? "مساعدة الشركات على بناء حضور قوي وفعّال."
                  : "Helping businesses build strong digital presence."}
              </p>
            </div>

            <div className="vmv-card">
              <h3 className="vmv-title">
                {lang === "ar" ? "القيم" : "Values"}
              </h3>
              <p className="vmv-text">
                {lang === "ar"
                  ? "الإتقان، الشفافية، الالتزام، النتائج."
                  : "Excellence, transparency, commitment, results."}
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
                {lang === "ar"
                  ? "استراتيجية مخصصة"
                  : "Custom Strategy"}
              </p>
            </div>

            <div className="method-step">
              <h3>03</h3>
              <p>
                {lang === "ar"
                  ? "تنفيذ إبداعي وتقني"
                  : "Creative Execution"}
              </p>
            </div>

            <div className="method-step">
              <h3>04</h3>
              <p>
                {lang === "ar"
                  ? "قياس وتحسين مستمر"
                  : "Optimization"}
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
            {lang === "ar"
              ? "تواصل مع فريقنا اليوم"
              : "Contact our team today"}
          </p>

          <Link href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "طلب عرض سعر" : "Get a Quote"}
          </Link>

        </div>
      </section>
    </>
  );
}