"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">

        <div className="hero-content">
          <div className="hero-badge">
            🚀 حلول رقمية احترافية
          </div>

          <h1 className="hero-title">
            نحن نبني <span className="highlight">علامتك التجارية</span>
          </h1>

          <p className="hero-subtitle">
            تصميم مواقع، تسويق رقمي، وحلول متكاملة تساعدك على النمو
          </p>

          <div className="hero-btns">
            <Link href="/contact" className="btn btn-primary">
              تواصل معنا
            </Link>

            <Link href="/services" className="btn btn-outline">
              خدماتنا
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-logo">
              T<span className="t-letter">M</span>
            </div>
            <div className="hero-card-tagline">
              Tamam Media
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">120+</div>
                <div className="hero-stat-label">مشروع</div>
              </div>

              <div>
                <div className="hero-stat-num">50+</div>
                <div className="hero-stat-label">عميل</div>
              </div>

              <div>
                <div className="hero-stat-num">5★</div>
                <div className="hero-stat-label">تقييم</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}