"use client";

import Link from "next/link";
import { Home } from "lucide-react";

/**
 * صفحة 500 — تُعرض عند فشل الـ server-side rendering
 */
export default function GlobalError() {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex items-center justify-center bg-[#f8f9fc] p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-[#21214f] mb-2">
            خطأ في الخادم
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            عذرًا، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى بعد قليل.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-colors"
          >
            <Home size={18} />
            العودة للرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}
