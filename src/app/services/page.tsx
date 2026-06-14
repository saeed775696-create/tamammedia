"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "خدماتنا" : "Our Services"}</h1>
            <p>
              {lang === "ar"
                ? "حلول متكاملة لتطوير حضورك الرقمي والميداني"
                : "Integrated solutions for your digital and field presence"}
            </p>
            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "خدماتنا" : "Services"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              {lang === "ar" ? "ماذا نقدم" : "What We Offer"}
            </div>
            <h2 className="section-title">
              {lang === "ar" ? "مجالات خبرتنا" : "Our Expertise"}
            </h2>
            <p className="section-desc">
              {lang === "ar"
                ? "نقدم حلولاً شاملة تغطي كافة جوانب التسويق والتقنية تحت سقف واحد"
                : "We offer comprehensive solutions covering all aspects of marketing & technology"}
            </p>
          </div>

          {/* بطاقات الخدمات الرئيسية مع صور */}
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            
            {/* الإبداعية */}
            <Link
              href="/services/creative"
              className="service-category"
              style={{ display: "block", textAlign: "center", cursor: "pointer" }}
            >
              <img
                src="/imgs/service imgs/creative_identity.png"
                alt={lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
                className="service-cat-icon"
                style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px" }}
              />
              <h3 className="service-cat-title" style={{ fontSize: 24, marginBottom: 12 }}>
                {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
                {lang === "ar"
                  ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، موشن جرافيك، تصوير وإنتاج فيديو."
                  : "Branding, graphic design, social media, motion graphics, video production."}
              </p>
              <span
                className="btn btn-outline-dark"
                style={{ padding: "8px 24px", fontSize: 14, fontWeight: 700 }}
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
              </span>
            </Link>

            {/* التقنية */}
            <Link
              href="/services/tech"
              className="service-category"
              style={{ display: "block", textAlign: "center", cursor: "pointer" }}
            >
              <img
                src="/imgs/service imgs/app_development.png"
                alt={lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
                className="service-cat-icon"
                style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px" }}
              />
              <h3 className="service-cat-title" style={{ fontSize: 24, marginBottom: 12 }}>
                {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
                {lang === "ar"
                  ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات، دعم فني."
                  : "Web & app development, e-commerce, hosting & security, technical support."}
              </p>
              <span
                className="btn btn-outline-dark"
                style={{ padding: "8px 24px", fontSize: 14, fontWeight: 700 }}
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
              </span>
            </Link>

            {/* الحلول المتكاملة */}
            <Link
              href="/services/integrated"
              className="service-category"
              style={{ display: "block", textAlign: "center", cursor: "pointer" }}
            >
              <img
                src="/imgs/service imgs/marketing_strategies (1).png"
                alt={lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
                className="service-cat-icon"
                style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto 20px" }}
              />
              <h3 className="service-cat-title" style={{ fontSize: 24, marginBottom: 12 }}>
                {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
                {lang === "ar"
                  ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية، تحليل بيانات."
                  : "Marketing strategies, campaigns, consulting, data analysis."}
              </p>
              <span
                className="btn btn-outline-dark"
                style={{ padding: "8px 24px", fontSize: 14, fontWeight: 700 }}
              >
                {lang === "ar" ? "تفاصيل الخدمة" : "Service Details"}
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* Methodology (تبقى كما هي) */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {lang === "ar" ? "منهجية العمل" : "Our Process"}
            </h2>
          </div>
          <div className="method-grid">
            <div className="method-step">
              <div className="method-num">01</div>
              <h4>{lang === "ar" ? "تحليل وفهم" : "Analysis"}</h4>
              <p>
                {lang === "ar"
                  ? "ندرس احتياجاتك والسوق بدقة"
                  : "We study your needs and market"}
              </p>
            </div>
            <div className="method-step">
              <div className="method-num">02</div>
              <h4>
                {lang === "ar" ? "استراتيجية مخصصة" : "Custom Strategy"}
              </h4>
              <p>
                {lang === "ar"
                  ? "نضع خطة تناسب أهدافك"
                  : "We create a tailored plan"}
              </p>
            </div>
            <div className="method-step">
              <div className="method-num">03</div>
              <h4>
                {lang === "ar" ? "تنفيذ إبداعي" : "Creative Execution"}
              </h4>
              <p>
                {lang === "ar"
                  ? "إنتاج احترافي بأحدث الأدوات"
                  : "High-quality production"}
              </p>
            </div>
            <div className="method-step">
              <div className="method-num">04</div>
              <h4>
                {lang === "ar" ? "تحسين وقياس" : "Optimization"}
              </h4>
              <p>
                {lang === "ar"
                  ? "متابعة وتحسين مستمر"
                  : "Continuous improvement"}
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
            {lang === "ar" ? "طلب عرض سعر" : "Request Quote"}
          </Link>
        </div>
      </section>
    </>
  );
}