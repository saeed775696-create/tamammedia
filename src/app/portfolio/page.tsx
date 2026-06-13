"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// ⬇️ Define the shape of a portfolio item (from your database)
interface PortfolioItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  category: string; // English key: "branding", "video", "social", "web"
  featured: boolean;
  order: number;
}

// Helper: translate category to Arabic label (used in filter buttons & overlay)
const categoryLabelMap: Record<string, { en: string; ar: string }> = {
  branding: { en: "Branding", ar: "هوية بصرية" },
  video: { en: "Video", ar: "فيديو" },
  social: { en: "Social Media", ar: "سوشيال ميديا" },
  web: { en: "Web", ar: "مواقع" },
};

export default function PortfolioPage() {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch portfolio items from your API endpoint
  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Extract unique categories from items
  const categories = Array.from(new Set(items.map((item) => item.category)));

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* BANNER – لا تغيير فيها، تبقى ثابتة */}
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

      {/* FILTERS + GRID – أصبحت ديناميكية */}
      <section className="section">
        <div className="container">
          {loading ? (
            <p className="text-center py-12">
              {lang === "ar" ? "جاري التحميل..." : "Loading..."}
            </p>
          ) : (
            <>
              {/* أزرار الفلترة تُبنى من التصنيفات الموجودة فعلاً */}
              <div className="portfolio-filters">
                <button
                  className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  {lang === "ar" ? "الكل" : "All"}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {lang === "ar"
                      ? categoryLabelMap[cat]?.ar || cat
                      : categoryLabelMap[cat]?.en || cat}
                  </button>
                ))}
              </div>

              {/* شبكة الأعمال من البيانات */}
              <div className="portfolio-grid">
                {filteredItems.map((item) => (
                  <div key={item.id} className="portfolio-item">
                    <img src={item.imageUrl} alt={lang === "ar" ? item.titleAr : item.titleEn} />
                    <div className="portfolio-overlay">
                      <h4>{lang === "ar" ? item.titleAr : item.titleEn}</h4>
                      <span>
                        {lang === "ar"
                          ? categoryLabelMap[item.category]?.ar || item.category
                          : categoryLabelMap[item.category]?.en || item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* TESTIMONIALS – ما زالت ثابتة (يمكن تحويلها لاحقاً بنفس الطريقة) */}
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