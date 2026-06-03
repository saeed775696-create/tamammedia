"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">

            <div className="hero-content">
              <h1 className="hero-title">
                {lang === "ar" ? "نحو حضور أقوى" : "Towards a Stronger Presence"}{" "}
                <span className="highlight">
                  {lang === "ar" ? "بصناعة رقمية" : "Digital Excellence"}
                </span>
              </h1>

              <p className="hero-subtitle">
                {lang === "ar"
                  ? "نبني حضوراً رقمياً وميدانياً متكاملاً"
                  : "We build integrated digital presence"}
              </p>

              <div className="hero-btns">
                <Link href="/contact" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>{" "}
                  {lang === "ar" ? "ابدأ مشروعك" : "Start Project"}
                </Link>

                <Link href="/services" className="btn btn-outline-light">
                  {lang === "ar" ? "استكشف الخدمات" : "Explore Services"}{" "}
                  <i className="fas fa-arrow-down"></i>
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
                  }}
                />

                <p>
                  {lang === "ar"
                    ? "تمام للحلول التسويقية الرقمية المتكاملة"
                    : "Integrated Digital Marketing Solutions"}
                </p>

                <div
                  style={{
                    width: "60px",
                    height: "3px",
                    background: "var(--secondary)",
                    margin: "0 auto 20px",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
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

      {/* SERVICES */}
      <section className="section">
        <div className="container">

          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-cogs"></i>{" "}
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </div>

            <h2 className="section-title">
              {lang === "ar"
                ? "حلول متكاملة تحت سقف واحد"
                : "All-in-One Solutions"}
            </h2>

            <p className="section-desc">
              {lang === "ar"
                ? "نقدم لك كل ما تحتاجه لبناء حضور رقمي قوي ومؤثر"
                : "Everything you need to build a strong digital presence"}
            </p>
          </div>

          <div className="services-preview">

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3>
                {lang === "ar" ? "الخدمات الإبداعية" : "Creative Services"}
              </h3>
              <p>
                {lang === "ar"
                  ? "هوية بصرية، تصميم جرافيكي، إدارة سوشيال ميديا، تصوير وإنتاج فيديو."
                  : "Branding, design, social media, and video production."}
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>
                {lang === "ar" ? "الخدمات التقنية" : "Tech Services"}
              </h3>
              <p>
                {lang === "ar"
                  ? "تطوير مواقع وتطبيقات، متاجر إلكترونية، استضافة وأمن معلومات."
                  : "Web & app development, e-commerce, hosting & security."}
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>
                {lang === "ar" ? "الحلول المتكاملة" : "Integrated Solutions"}
              </h3>
              <p>
                {lang === "ar"
                  ? "خطط تسويقية، حملات رقمية وميدانية، استشارات استراتيجية."
                  : "Marketing strategies, campaigns, and consulting."}
              </p>
            </div>

          </div>

          <div className="cta-buttons">
            <Link href="/services" className="btn btn-primary">
              {lang === "ar" ? "جميع الخدمات" : "All Services"}
              <i className="fas fa-arrow-left"></i>
            </Link>

            <Link href="/portfolio" className="btn btn-outline">
              {lang === "ar" ? "أعمالنا" : "Portfolio"}
              <i className="fas fa-briefcase"></i>
            </Link>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="section section-light">
        <div className="container">

          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-building"></i>{" "}
              {lang === "ar" ? "من نحن" : "About Us"}
            </div>

            <h2 className="section-title">
              {lang === "ar"
                ? "تعرف على تمام ميديا"
                : "About Tamam Media"}
            </h2>

            <p className="section-desc">
              {lang === "ar"
                ? "شريكك الرقمي الأول في اليمن"
                : "Your digital partner in Yemen"}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}>

            <div>
              <p>
                {lang === "ar"
                  ? "تمام ميديا هي شركة يمنية متخصصة في تقديم الحلول الرقمية والتسويقية المتكاملة."
                  : "Tamam Media is a Yemeni company providing integrated digital marketing solutions."}
              </p>

              <p style={{ marginTop: "10px" }}>
                {lang === "ar"
                  ? "نؤمن بأن العلامة التجارية تحتاج إلى حضور قوي واستراتيجية ذكية."
                  : "We believe every brand needs a strong presence and smart strategy."}
              </p>

              <Link href="/about" className="btn btn-primary" style={{ marginTop: "15px" }}>
                {lang === "ar" ? "اقرأ قصتنا" : "Read Our Story"}
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop"
                alt="Tamam Media Team"
                style={{ borderRadius: "24px", width: "100%" }}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}