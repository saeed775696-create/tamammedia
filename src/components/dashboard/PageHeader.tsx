"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
};

/**
 * Page header موحد لكل صفحات dashboard
 * حجم أنظف، عنوان أكبر، أزرار واضحة
 */
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
    <div className="mb-6">
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-2"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">/</span>}
              {crumb.href ? (
                <button
                  onClick={() => router.push(crumb.href!)}
                  className="hover:text-[#da8827] transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-[#da8827] font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#21214f]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-[13px] mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="تحديث"
            title="تحديث البيانات"
            className="p-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-[#21214f] transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
