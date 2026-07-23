"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { extractItems } from "@/lib/api/extract";

interface PortfolioItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  featured: boolean;
}

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  branding: { en: "Branding", ar: "هوية بصرية" },
  video: { en: "Video", ar: "فيديو" },
  social: { en: "Social Media", ar: "سوشيال ميديا" },
  web: { en: "Web", ar: "مواقع" },
  website: { en: "Website", ar: "موقع إلكتروني" },
  ecommerce: { en: "E-Commerce", ar: "متجر إلكتروني" },
};

export default function PortfolioPage() {
  const { lang } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setItems(extractItems<PortfolioItem>(data));
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const sortedItems = [...filteredItems].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <>
      {/* Banner */}
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
              <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link> /{" "}
              <span>{lang === "ar" ? "أعمالنا" : "Portfolio"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              {lang === "ar" ? "جار تحميل الأعمال..." : "Loading works..."}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {lang === "ar"
                ? "لا توجد أعمال بعد."
                : "No works yet."}
            </div>
          ) : (
            <>
              {/* أزرار الفلترة */}
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
                      ? categoryLabels[cat]?.ar || cat
                      : categoryLabels[cat]?.en || cat}
                  </button>
                ))}
              </div>

              {/* شبكة المشاريع */}
              <div className="portfolio-grid">
                {sortedItems.map((item) => (
                  <Link
                    href={`/portfolio/${item.id}`}
                    key={item.id}
                    className="portfolio-item"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.titleAr}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="portfolio-overlay">
                      <h4>{lang === "ar" ? item.titleAr : item.titleEn}</h4>
                      <span>
                        {lang === "ar"
                          ? categoryLabels[item.category]?.ar || item.category
                          : categoryLabels[item.category]?.en || item.category}
                      </span>
                      {item.featured && (
                        <span style={{ marginLeft: 8, color: "#ffd700" }}>★</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* زر العودة إلى التواصل */}
          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary">
              {lang === "ar" ? "هل لديك فكرة؟ تواصل معنا" : "Have a project? Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}