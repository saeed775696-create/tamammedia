"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  // breadcrumb items (optional)
  breadcrumbs?: { label: string; href?: string }[];
  // actions to render on the left (e.g., add button)
  actions?: React.ReactNode;
};

/**
 * Page header موحد لكل صفحات dashboard
 * - عنوان + وصف
 * - breadcrumb navigation
 * - زر تحديث + actions
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
    <div className="mb-8">
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500 mb-3"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#21214f]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="تحديث"
            title="تحديث البيانات"
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
