"use client";

import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

/**
 * صفحة 500 — تُعرض عند فشل الـ server-side rendering
 */
export default function GlobalError() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>خطأ في الخادم — تمام ميديا</title>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-surface-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-5">
            <AlertTriangle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-brand-900 mb-2">
            خطأ في الخادم
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            عذرًا، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى بعد قليل.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-500 text-white font-medium rounded-xl hover:bg-accent-700 transition-colors"
          >
            <Home size={18} />
            العودة للرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}
