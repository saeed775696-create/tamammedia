"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* الهوية */}
          <div className="footer-brand">
            <h3>تمام ميديا | Tamam Media</h3>
            <p>شركة يمنية متخصصة في الحلول الرقمية والتسويقية المتكاملة.</p>

            <div className="footer-social">
              <a
                href="https://www.facebook.com/share/18xr6wuwL5/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/tamammedia9"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://wa.me/967779552639"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href="mailto:tamammedia9@gmail.com"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <Link href="/">الرئيسية</Link>
            <Link href="/about">من نحن</Link>
            <Link href="/services">خدماتنا</Link>
            <Link href="/portfolio">أعمالنا</Link>
            <Link href="/contact">اتصل بنا</Link>
          </div>

          {/* الخدمات */}
          <div className="footer-col">
            <h4>خدماتنا</h4>
            <Link href="/services">الخدمات الإبداعية</Link>
            <Link href="/services">الخدمات التقنية</Link>
            <Link href="/services">الحلول المتكاملة</Link>
          </div>

          {/* التواصل */}
          <div className="footer-col">
            <h4>تواصل</h4>

            <a href="mailto:tamammedia9@gmail.com">
              tamammedia9@gmail.com
            </a>

            <a href="tel:+967733579558">
              +967 733 579 558
            </a>

            <span>تعز – اليمن</span>
          </div>

        </div>

        {/* البوتوم */}
        <div className="footer-bottom">
          <p>© 2026 تمام ميديا | Tamam Media - جميع الحقوق محفوظة</p>

          <p style={{ marginTop: "5px", fontSize: "12px", opacity: 0.8 }}>
            تصميم وتطوير{" "}
            <span style={{ color: "var(--secondary)", fontWeight: "bold" }}>
              Saeed Alshadadi / سعيد الشدادي
            </span>

            {" | "}

            <a
              href="tel:+967736458132"
              style={{
                color: "inherit",
                textDecoration: "none",
                direction: "ltr",
                display: "inline-block",
                marginInlineStart: "6px"
              }}
            >
              +967 736 458 132
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}