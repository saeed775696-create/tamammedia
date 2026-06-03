"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      {/* BANNER */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1>{lang === "ar" ? "أعمالنا" : "Our Portfolio"}</h1>
            <p>
              {lang === "ar"
                ? "استعرض مشاريعنا الناجحة في مختلف المجالات"
                : "Explore our successful projects across different fields"}
            </p>

            <div className="breadcrumb">
              <a href="/">{lang === "ar" ? "الرئيسية" : "Home"}</a> /{" "}
              <span>{lang === "ar" ? "أعمالنا" : "Portfolio"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="section">
        <div className="container">
          <div className="portfolio-filters">
            <button className="filter-btn active">
              {lang === "ar" ? "الكل" : "All"}
            </button>
            <button className="filter-btn">
              {lang === "ar" ? "هوية بصرية" : "Branding"}
            </button>
            <button className="filter-btn">Video</button>
            <button className="filter-btn">
              {lang === "ar" ? "سوشيال ميديا" : "Social Media"}
            </button>
            <button className="filter-btn">Web</button>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img src="/imgs/2-3.png" alt="project" />
              <div className="portfolio-overlay">
                <h4>
                  {lang === "ar"
                    ? "هوية بصرية لمطعم"
                    : "Restaurant Branding"}
                </h4>
                <span>Branding</span>
              </div>
            </div>

            <div className="portfolio-item">
              <img src="/imgs/2-3.png" alt="project" />
              <div className="portfolio-overlay">
                <h4>
                  {lang === "ar" ? "فيديو تعريفي" : "Promo Video"}
                </h4>
                <span>Video</span>
              </div>
            </div>

            <div className="portfolio-item">
              <img src="/imgs/2-3.png" alt="project" />
              <div className="portfolio-overlay">
                <h4>
                  {lang === "ar"
                    ? "حملة سوشيال ميديا"
                    : "Social Campaign"}
                </h4>
                <span>Social</span>
              </div>
            </div>

            <div className="portfolio-item">
              <img src="/imgs/2-3.png" alt="project" />
              <div className="portfolio-overlay">
                <h4>
                  {lang === "ar"
                    ? "موقع إلكتروني"
                    : "Website Development"}
                </h4>
                <span>Web</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              {lang === "ar" ? "ماذا يقولون عنا" : "Testimonials"}
            </div>

            <h2 className="section-title">
              {lang === "ar" ? "آراء عملائنا" : "What Clients Say"}
            </h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                {lang === "ar"
                  ? "غيّرت تمام ميديا طريقة تسويقنا بالكامل، نتائج ممتازة"
                  : "Tamam Media completely transformed our marketing results"}
              </p>
              <h4>محمد العواضي</h4>
            </div>

            <div className="testimonial-card">
              <p>
                {lang === "ar"
                  ? "فريق محترف وسريع التنفيذ"
                  : "Professional and fast team"}
              </p>
              <h4>أروى ناجي</h4>
            </div>

            <div className="testimonial-card">
              <p>
                {lang === "ar"
                  ? "أفضل تجربة تطوير موقع حصلت عليها"
                  : "Best website development experience"}
              </p>
              <h4>خالد سعيد</h4>
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

          <a href="/contact" className="btn btn-secondary">
            {lang === "ar" ? "طلب عرض سعر" : "Get a Quote"}
          </a>
        </div>
      </section>
    </>
  );
}