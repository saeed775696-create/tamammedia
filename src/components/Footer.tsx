"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* الهوية */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
              تمام ميديا | Tamam Media
            </h3>
            <p className="text-[0.95rem] leading-relaxed text-gray-600">
              شركة يمنية متخصصة في الحلول الرقمية والتسويقية المتكاملة.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/tamammedia1/" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/tamammedia9" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/tamam-media-0914b1418" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://wa.me/967779552639" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="mailto:tamammedia9@gmail.com" title="Email" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#EA4335] hover:text-white transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="flex flex-col">
            <h4 className="text-[1.05rem] font-bold text-[var(--primary)] mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">الرئيسية</Link>
              <Link href="/about" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">من نحن</Link>
              <Link href="/services" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">خدماتنا</Link>
              <Link href="/portfolio" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">أعمالنا</Link>
              <Link href="/contact" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">اتصل بنا</Link>
            </div>
          </div>

          {/* خدماتنا */}
          <div className="flex flex-col">
            <h4 className="text-[1.05rem] font-bold text-[var(--primary)] mb-4">خدماتنا</h4>
            <div className="flex flex-col gap-3">
              <Link href="/services/creative" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">الخدمات الإبداعية</Link>
              <Link href="/services/tech" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">الخدمات التقنية</Link>
              <Link href="/services/integrated" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">الحلول المتكاملة</Link>
            </div>
          </div>

          {/* تواصل */}
          <div className="flex flex-col">
            <h4 className="text-[1.05rem] font-bold text-[var(--primary)] mb-4">تواصل</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:tamammedia9@gmail.com" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors">
                tamammedia9@gmail.com
              </a>
              <a href="tel:+967733579558" className="text-[0.9rem] text-gray-500 hover:text-[var(--secondary)] transition-colors" dir="ltr" style={{ textAlign: "right" }}>
                +967 733 579 558
              </a>
              <span className="text-[0.9rem] text-gray-500">تعز – اليمن</span>
            </div>
          </div>
        </div>

        {/* البوتوم */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start">
          <p className="text-[0.9rem] text-gray-500 font-medium">© 2026 تمام ميديا | Tamam Media - جميع الحقوق محفوظة</p>
          <p className="text-[0.85rem] text-gray-400">
            تصميم وتطوير{" "}
            <span className="text-[var(--secondary)] font-bold px-1">
              Saeed Alshadadi / سعيد الشدادي
            </span>{" "}
            |{" "}
            <a
              href="tel:+967736458132"
              className="hover:text-[var(--primary)] transition-colors inline-block ms-1"
              dir="ltr"
            >
              +967 736 458 132
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}