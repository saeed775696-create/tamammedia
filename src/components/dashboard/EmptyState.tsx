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
    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 px-6">
      <div className="w-14 h-14 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-300">
        {icon || <Search size={26} />}
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1.5">{title}</h3>
      {description && (
        <p className="text-[13px] text-gray-500 mb-5 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-[#da8827] text-white text-sm font-medium rounded-lg hover:bg-[#b8701e] transition-colors shadow-sm"
          >
            {actionLabel}
          </button>
        )}
        {onRetry && retryLabel && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={14} />
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
