"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Server Error:", error)
  }, [error])

  const isNetworkError = error.message.includes("Can't reach database") || error.message.includes("fetch") || error.message.includes("network")

  return (
    <div className="pb-10">
      <PageHeader 
        title="حدث خطأ غير متوقع" 
        subtitle="عذراً، لم نتمكن من جلب بيانات اللوحة"
      />

      <div className="flex flex-col items-center justify-center p-8 mt-10 bg-white border border-red-100 rounded-3xl shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 border border-red-100 shadow-sm text-red-500">
          <AlertCircle size={40} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-xl font-bold text-brand-900 mb-2">
          {isNetworkError ? "فشل الاتصال بقاعدة البيانات" : "حدث خطأ غير متوقع في الخادم"}
        </h2>
        
        <p className="text-surface-500 text-[15px] mb-8 leading-relaxed max-w-md">
          {isNetworkError 
            ? "يبدو أن هناك تأخيراً أو مشكلة في الاتصال بقاعدة البيانات (Supabase). هذا الخطأ يحدث عادة بسبب ضعف الإنترنت المحلي أو تأخر استجابة الخادم."
            : error.message || "حدث خطأ غير معروف منعنا من عرض محتوى هذه الصفحة بالكامل."}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
          >
            <RefreshCw size={18} />
            المحاولة مرة أخرى
          </button>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-surface-100 text-brand-900 rounded-xl font-bold hover:bg-surface-200 transition-all duration-300"
          >
            <Home size={18} />
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
