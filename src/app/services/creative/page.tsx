"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CreativeServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</h1>
            <p>
              {lang === "ar"
                ? "نصنع هوية علامتك التجارية ونجعلها تتحدث"
                : "We craft your brand identity and make it speak"}
            </p>
            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {/* هوية بصرية */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/creative_identity.webp"
                alt="هوية بصرية"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "تصميم الهوية البصرية" : "Visual Identity Design"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "شعارات، أدلة الهوية، اختيار الألوان والخطوط المؤسسية."
                  : "Logos, brand guidelines, and corporate colors & fonts."}
              </p>
            </div>

            {/* تصميم جرافيكي */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/graphic_design.webp"
                alt="تصميم جرافيكي"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "التصميم الجرافيكي" : "Graphic Design"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "منشورات، بروشورات، إعلانات مطبوعة ورقمية."
                  : "Posts, brochures, and print & digital ads."}
              </p>
            </div>

            {/* إدارة سوشيال ميديا */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/marketing_strategies (1).webp"
                alt="سوشيال ميديا"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "إدارة السوشيال ميديا" : "Social Media Management"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "إنشاء محتوى، جدولة، تفاعل، وإعلانات ممولة."
                  : "Content creation, scheduling, engagement & paid ads."}
              </p>
            </div>

            {/* تصوير وإنتاج */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/photography.webp"
                alt="تصوير وإنتاج"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "التصوير والإنتاج" : "Photography & Production"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "تصوير فوتوغرافي، فيديوهات ترويجية، مونتاج."
                  : "Photography, promotional videos, editing."}
              </p>
            </div>

            {/* موشن جرافيك */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/motion_graphics.webp"
                alt="موشن جرافيك"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "الموشن جرافيك" : "Motion Graphics"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "رسوم متحركة، فيديوهات إعلانية قصيرة، إنفوجرافيك."
                  : "Animations, short ads, and infographics."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            {lang === "ar" ? "هل تحتاج إلى هوية إبداعية مميزة؟" : "Need a unique creative identity?"}
          </h2>
          <p className="cta-desc">
            {lang === "ar"
              ? "فريقنا الإبداعي جاهز لنقل علامتك التجارية إلى آفاق جديدة"
              : "Our creative team is ready to take your brand to new heights"}
          </p>
          <Link href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "اطلب هذه الخدمة" : "Request This Service"}
          </Link>
        </div>
      </section>
    </>
  );
}