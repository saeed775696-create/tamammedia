"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

type Props = {
  message?: string;
  onRetry?: () => void;
};

/**
 * Error state مع زر إعادة المحاولة
 */
export default function ErrorState({
  message = "حدث خطأ أثناء تحميل البيانات",
  onRetry,
}: Props) {
  return (
    <div className="text-center py-16 bg-red-50/50 rounded-2xl border border-red-100 px-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5 text-red-500">
        <AlertCircle size={36} />
      </div>
      <h3 className="text-xl font-bold text-red-700 mb-2">عذرًا!</h3>
      <p className="text-red-600 mb-6 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
