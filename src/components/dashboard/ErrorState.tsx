"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "حدث خطأ أثناء تحميل البيانات",
  onRetry,
}: Props) {
  return (
    <div className="text-center py-12 bg-red-50/50 rounded-xl border border-red-100 px-6">
      <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
        <AlertCircle size={26} />
      </div>
      <h3 className="text-base font-semibold text-red-700 mb-1.5">عذرًا!</h3>
      <p className="text-[13px] text-red-600 mb-5 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 mx-auto"
        >
          <RefreshCw size={14} />
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
