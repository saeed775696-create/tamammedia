"use client";

import { RefreshCw, Search } from "lucide-react";

type Props = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  retryLabel?: string;
  onRetry?: () => void;
};

/**
 * Empty state احترافي مع دعوة لإجراء + زر إعادة المحاولة
 */
export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  retryLabel,
  onRetry,
}: Props) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-5 text-gray-300">
        {icon || <Search size={36} />}
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#c07520] transition-all shadow-md shadow-[#da8827]/20"
          >
            {actionLabel}
          </button>
        )}
        {onRetry && retryLabel && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
