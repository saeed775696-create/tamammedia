"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TechServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</h1>
            <p>
              {lang === "ar"
                ? "حلول تقنية متطورة لنمو أعمالك"
                : "Advanced tech solutions for business growth"}
            </p>
            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "الخدمات التقنية" : "Tech Services"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {/* تطوير التطبيقات */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/app_development.png"
                alt="تطوير التطبيقات"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "تطوير التطبيقات" : "App Development"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "تطبيقات iOS و Android، تطبيقات ويب تفاعلية."
                  : "iOS & Android apps, interactive web apps."}
              </p>
            </div>

            {/* تطوير المواقع */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/web_design.png"
                alt="تطوير المواقع"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "تطوير المواقع" : "Web Development"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "مواقع مؤسسية، لوحات تحكم، مدونات، أنظمة مخصصة."
                  : "Corporate sites, dashboards, blogs, custom systems."}
              </p>
            </div>

            {/* متاجر إلكترونية */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/ecommerce.png"
                alt="متاجر إلكترونية"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "المتاجر الإلكترونية" : "E-Commerce"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "متاجر كاملة مع بوابات دفع، إدارة منتجات، شحن."
                  : "Full stores with payment gateways, products & shipping."}
              </p>
            </div>

            {/* استضافة وأمن معلومات */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/hosting_security.png"
                alt="استضافة وأمن معلومات"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "استضافة وأمن معلومات" : "Hosting & Security"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "استضافة سريعة، شهادات SSL، حماية من الاختراقات."
                  : "Fast hosting, SSL certificates, hack protection."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            {lang === "ar" ? "هل تحتاج إلى خدمة تقنية؟" : "Need a technical service?"}
          </h2>
          <p className="cta-desc">
            {lang === "ar"
              ? "نحن هنا لمساعدتك في تحقيق أهدافك التقنية بأفضل الطرق"
              : "We are here to help you achieve your tech goals the best way"}
          </p>
          <Link href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "اطلب هذه الخدمة" : "Request This Service"}
          </Link>
        </div>
      </section>
    </>
  );
}