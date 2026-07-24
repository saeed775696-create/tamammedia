"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/**
 * حقل بحث متجاوب مع زر مسح
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = "بحث...",
}: Props) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10 pl-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[accent-500] focus:border-transparent outline-none transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="مسح البحث"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
