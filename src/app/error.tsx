"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

/**
 * Error boundary — يلتقط أي خطأ في الـ client components
 * ويعرض صفحة خطأ ودية بدلاً من الشاشة البيضاء.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // تسجيل الخطأ (يمكن إرساله إلى Sentry لاحقًا)
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[surface-50] p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-5">
          <AlertTriangle size={40} />
        </div>

        <h1 className="text-2xl font-bold text-[brand-900] mb-2">
          حدث خطأ غير متوقع
        </h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          نعتذر، حدث خطأ أثناء تحميل الصفحة. يمكنك المحاولة مرة أخرى أو العودة
          للصفحة الرئيسية.
        </p>

        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-xl text-right">
            <p className="text-xs text-gray-500 mb-1">رسالة الخطأ:</p>
            <p className="text-xs text-red-600 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-[accent-500] text-white font-medium rounded-xl hover:bg-[accent-700] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
