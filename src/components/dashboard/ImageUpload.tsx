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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <label
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition ${
            uploading
              ? "bg-gray-100 text-gray-400"
              : "bg-white hover:bg-gray-50 border-gray-300"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              جاري الرفع...
            </>
          ) : (
            <>
              <Upload size={16} />
              اختر صورة
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
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="أو الصق رابط الصورة"
          className="flex-1 border border-gray-300 rounded-xl p-2 text-sm focus:ring-2 focus:ring-[#da8827] outline-none"
          dir="ltr"
        />
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
