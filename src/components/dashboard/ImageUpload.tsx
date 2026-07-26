"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";

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
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
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
        <label className="block text-label font-bold text-surface-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <label
          className={`flex items-center justify-center gap-2 px-4 h-11 rounded-xl border cursor-pointer transition-all duration-300 w-full sm:w-auto shrink-0 ${
            uploading
              ? "bg-surface-100 text-surface-400 border-surface-200"
              : "bg-white hover:bg-surface-50 border-surface-200 text-brand-900 shadow-sm hover:shadow"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin text-accent-500" />
              <span className="text-body-sm font-medium">جاري الرفع...</span>
            </>
          ) : (
            <>
              <Upload size={16} className="text-surface-500" />
              <span className="text-body-sm font-bold">اختر صورة</span>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <div className="relative w-full">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو الصق رابط الصورة مباشرة هنا..."
            className="text-body-sm"
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
