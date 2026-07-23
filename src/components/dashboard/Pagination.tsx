"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
};

/**
 * Pagination component متجاوب
 */
export default function Pagination({
  page,
  totalPages,
  total,
  onPageChange,
  pageSize = 10,
}: Props) {
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (p === 1 || p === totalPages) return true;
    if (Math.abs(p - page) <= 1) return true;
    return false;
  });

  // Add ellipsis markers
  const pagesWithEllipsis: (number | "...")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - (pages[i - 1] as number) > 1) {
      pagesWithEllipsis.push("...");
    }
    pagesWithEllipsis.push(p);
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-500">
        عرض <span className="font-semibold text-gray-700">{start}</span> -{" "}
        <span className="font-semibold text-gray-700">{end}</span> من{" "}
        <span className="font-semibold text-gray-700">{total}</span>
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="الصفحة السابقة"
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {pagesWithEllipsis.map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-3 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`min-w-[40px] h-10 rounded-lg font-medium text-sm transition-all ${
                  p === page
                    ? "bg-[#da8827] text-white shadow-md shadow-[#da8827]/20"
                    : "border border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="الصفحة التالية"
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
