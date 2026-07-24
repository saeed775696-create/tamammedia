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
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center w-full min-h-[300px]">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-5 text-gray-400 shadow-inner border border-white">
        {icon || <Search size={32} strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-bold text-[#11112b] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed font-medium">
          {description}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="px-6 py-2.5 bg-gradient-to-r from-[accent-500] to-[#e89b3f] text-white text-sm font-bold rounded-xl hover:shadow-[0_4px_15px_rgba(218,136,39,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {actionLabel}
          </button>
        )}
        {onRetry && retryLabel && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 shadow-sm"
          >
            <RefreshCw size={16} />
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
