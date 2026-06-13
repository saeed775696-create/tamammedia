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
                : "Integrated solutions for your digital presence"}
            </p>

            <div className="breadcrumb">
              <Link href="/">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>{" "}
              / <span>{lang === "ar" ? "خدماتنا" : "Services"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">

          <div className="section-header">
            <div className="section-badge">
              {lang === "ar" ? "ماذا نقدم" : "What We Offer"}
            </div>

            <h2 className="section-title">
              {lang === "ar"
                ? "خدماتنا المتكاملة"
                : "Our Integrated Services"}
            </h2>

            <p className="section-desc">
              {lang === "ar"
                ? "نجمع بين الإبداع والتقنية والتنفيذ الميداني تحت سقف واحد"
                : "We combine creativity, technology and execution"}
            </p>
          </div>

          <div className="services-preview">

            <div className="service-card">
              <h3>
                {lang === "ar"
                  ? "الخدمات الإبداعية"
                  : "Creative Services"}
              </h3>

              <ul>
                <li>
                  {lang === "ar"
                    ? "تصميم الهوية البصرية والشعارات"
                    : "Brand identity & logo design"}
                </li>
                <li>
                  {lang === "ar"
                    ? "التصميم الجرافيكي"
                    : "Graphic design"}
                </li>
                <li>
                  {lang === "ar"
                    ? "إدارة السوشيال ميديا"
                    : "Social media management"}
                </li>
                <li>
                  {lang === "ar"
                    ? "الموشن جرافيك"
                    : "Motion graphics"}
                </li>
                <li>
                  {lang === "ar"
                    ? "التصوير والتوثيق"
                    : "Photography & videography"}
                </li>
              </ul>
            </div>

            <div className="service-card">
              <h3>
                {lang === "ar"
                  ? "الخدمات التقنية"
                  : "Tech Services"}
              </h3>

              <ul>
                <li>
                  {lang === "ar"
                    ? "تصميم وتطوير المواقع"
                    : "Website development"}
                </li>
                <li>
                  {lang === "ar"
                    ? "المتاجر الإلكترونية"
                    : "E-commerce solutions"}
                </li>
                <li>
                  {lang === "ar"
                    ? "تطوير الأنظمة والتطبيقات"
                    : "Systems & app development"}
                </li>
                <li>
                  {lang === "ar"
                    ? "الدعم الفني"
                    : "Technical support"}
                </li>
                <li>
                  {lang === "ar"
                    ? "الاستضافة وأمن المعلومات"
                    : "Hosting & security"}
                </li>
              </ul>
            </div>

            <div className="service-card">
              <h3>
                {lang === "ar"
                  ? "الحلول المتكاملة"
                  : "Integrated Solutions"}
              </h3>

              <ul>
                <li>
                  {lang === "ar"
                    ? "حملات تسويقية متكاملة"
                    : "Full marketing campaigns"}
                </li>
                <li>
                  {lang === "ar"
                    ? "استراتيجيات التسويق"
                    : "Marketing strategies"}
                </li>
                <li>
                  {lang === "ar"
                    ? "الاستشارات الإدارية"
                    : "Business consulting"}
                </li>
                <li>
                  {lang === "ar"
                    ? "حلول مخصصة للشركات"
                    : "Custom business solutions"}
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Methodology */}
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
                {lang === "ar"
                  ? "استراتيجية مخصصة"
                  : "Custom Strategy"}
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
                {lang === "ar"
                  ? "تنفيذ إبداعي"
                  : "Creative Execution"}
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
                {lang === "ar"
                  ? "تحسين وقياس"
                  : "Optimization"}
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