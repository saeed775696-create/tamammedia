"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

/**
 * مكوّن رفع الصور.
 * - يستخدم أولاً محاولة الرفع عبر /api/upload (server-side، يتطلب تسجيل دخول admin).
 * - إن فشل (مثلاً بسبب عدم إعداد Supabase)، يسمح للمستخدم بإدخال رابط يدوي.
 */
export default function ImageUpload({ value, onChange, label }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // فحص نوع الملف
    if (!file.type.startsWith("image/")) {
      toast.error("يُسمح برفع الصور فقط");
      return;
    }

    // فحص الحجم (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const msg =
          errData?.error?.message ||
          "فشل رفع الصورة. تأكد من إعداد Supabase أو استخدم رابطًا يدويًا.";
        throw new Error(msg);
      }

      const data = await res.json();
      const url = data?.data?.url || data?.url;
      if (!url) throw new Error("استجابة غير متوقعة من الخادم");

      onChange(url);
      toast.success("تم رفع الصورة");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "فشل رفع الصورة";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-[13px] font-bold text-surface-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <label
          className={`flex items-center justify-center gap-2 px-4 h-12 rounded-2xl border cursor-pointer transition-all duration-300 w-full sm:w-auto shrink-0 ${
            uploading
              ? "bg-surface-100 text-surface-400 border-surface-200"
              : "bg-white hover:bg-surface-50 border-surface-200 text-brand-900 shadow-sm hover:shadow"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin text-accent-500" />
              <span className="text-sm font-medium">جاري الرفع...</span>
            </>
          ) : (
            <>
              <Upload size={16} className="text-surface-500" />
              <span className="text-sm font-bold">اختر صورة</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو الصق رابط الصورة مباشرة هنا..."
            className="flex h-12 w-full rounded-2xl border border-surface-200/80 bg-surface-50/50 px-4 py-2 text-[14px] text-brand-900 shadow-sm transition-all duration-300 placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:border-accent-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-50"
            dir="ltr"
          />
        </div>
      </div>
      {value && (
        <div className="mt-3 p-2 bg-white rounded-xl border inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="معاينة"
            className="h-20 object-contain rounded"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}
