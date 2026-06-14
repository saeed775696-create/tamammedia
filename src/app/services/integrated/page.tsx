"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function IntegratedServicePage() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</h1>
            <p>
              {lang === "ar"
                ? "خطط وحملات تسويقية شاملة لنجاح أعمالك"
                : "Comprehensive marketing plans & campaigns for success"}
            </p>
            <div className="breadcrumb">
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {/* خطط تسويقية */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/marketing_strategies (1).png"
                alt="خطط تسويقية"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "خطط تسويقية" : "Marketing Strategies"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "دراسة السوق، تحليل المنافسين، بناء الاستراتيجيات."
                  : "Market research, competitor analysis, strategy building."}
              </p>
            </div>

            {/* حملات رقمية وميدانية */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/marketing_campaigns.png"
                alt="حملات"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "حملات رقمية وميدانية" : "Digital & Field Campaigns"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "إعلانات جوجل وفيسبوك، تنظيم فعاليات، ترويج."
                  : "Google & Facebook ads, event organization, promotion."}
              </p>
            </div>

            {/* تحليل بيانات */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/data_analysis.png"
                alt="تحليل بيانات"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "تحليل البيانات" : "Data Analysis"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "تقارير دورية، تحليلات الأداء، توصيات استراتيجية."
                  : "Periodic reports, performance analytics, strategic recommendations."}
              </p>
            </div>

            {/* استشارات */}
            <div className="service-category">
              <img
                src="/imgs/service imgs/creative_identity.png"
                alt="استشارات"
                style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", marginBottom: 18 }}
              />
              <h3 className="service-cat-title">
                {lang === "ar" ? "استشارات استراتيجية" : "Strategic Consulting"}
              </h3>
              <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 16 }}>
                {lang === "ar"
                  ? "جلسات استشارية، إعداد خطط تسويق، متابعة وتطوير."
                  : "Consulting sessions, marketing plans, follow-up & development."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            {lang === "ar" ? "هل تحتاج إلى خطة تسويقية متكاملة؟" : "Need an integrated marketing plan?"}
          </h2>
          <p className="cta-desc">
            {lang === "ar"
              ? "نحن هنا لمساعدتك في تحقيق أهدافك التسويقية بأفضل الاستراتيجيات"
              : "We are here to help you achieve your marketing goals with the best strategies"}
          </p>
          <Link href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "اطلب هذه الخدمة" : "Request This Service"}
          </Link>
        </div>
      </section>
    </>
  );
}