"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "الصورة الرئيسية" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة كبير جداً. الحد الأقصى هو 5 ميجابايت");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("جاري الرفع...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل الرفع");
      }

      onChange(data.url);
      toast.success("تم رفع الصورة بنجاح", { id: loadingToast });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء الرفع";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#21214f]">{label}</label>
      <div className="flex items-start gap-4">
        {/* Preview Area */}
        <div className="relative w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-white flex items-center justify-center shrink-0">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                title="إزالة الصورة"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <ImageIcon size={32} className="mb-2 opacity-30" />
              <span className="text-xs">بدون صورة</span>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="animate-spin text-[#da8827]" size={24} />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1">
          <label className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 h-12 bg-white">
            <Upload size={18} className="text-[#da8827]" />
            {isUploading ? "جاري الرفع..." : "اختر صورة لرفعها"}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            يُفضل أن تكون الصورة بصيغة JPG أو PNG وبحجم لا يتجاوز 5MB.
          </p>
        </div>
      </div>
    </div>
  );
}
