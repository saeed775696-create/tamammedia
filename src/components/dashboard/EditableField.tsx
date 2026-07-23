"use client";

import { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  dir?: "rtl" | "ltr";
  hint?: string;
};

/**
 * حقل تحرير موحد للنصوص.
 * - دعم سطر واحد أو متعدد
 * - دعم RTL/LTR
 * - label + hint
 * - تحديد الحقول المطلوبة بـ *
 */
export default function EditableField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  dir = "rtl",
  hint,
}: Props) {
  const [focused, setFocused] = useState(false);

  const baseClass =
    "w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all bg-white";
  const stateClass = focused
    ? "border-[#da8827] bg-white shadow-sm"
    : "border-gray-200 bg-gray-50/50";

  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          dir={dir}
          className={`${baseClass} ${stateClass} resize-none leading-relaxed`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          dir={dir}
          className={`${baseClass} ${stateClass}`}
        />
      )}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
