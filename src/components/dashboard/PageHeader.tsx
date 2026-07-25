"use client";

import { RefreshCw, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
}: Props) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="mb-10">
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-1.5 text-body-sm text-surface-400 mb-6 font-medium"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronLeft size={14} className="text-surface-300" />}
              {crumb.href ? (
                <button
                  onClick={() => router.push(crumb.href!)}
                  className="hover:text-accent-500 transition-colors text-body-sm"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-accent-600 bg-accent-50/50 px-3 py-1 rounded-lg border border-accent-100 text-body-sm font-semibold">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/60 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-surface-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Decorative glow wrapped safely */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute -start-20 -top-20 w-40 h-40 bg-accent-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-h3 font-extrabold text-brand-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-body text-surface-500 mt-2 font-medium">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3 relative z-10">
          {actions}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="تحديث"
            title="تحديث البيانات"
            className="p-2.5 bg-white/80 border border-surface-200 text-surface-500 rounded-xl hover:bg-white hover:text-brand-900 hover:shadow-md hover:-translate-y-0.5 hover:border-surface-300 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin text-accent-500" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}