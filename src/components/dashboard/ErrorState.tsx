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
    <div className="text-center py-10 bg-red-50/50 rounded-2xl border border-red-100 px-6">
      <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
        <AlertCircle size={24} />
      </div>
      <h3 className="text-h6 font-semibold text-red-700 mb-2">عذرًا!</h3>
      <p className="text-body-sm text-red-600 mb-6 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2.5 bg-red-600 text-white text-body font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 mx-auto"
        >
          <RefreshCw size={14} />
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}