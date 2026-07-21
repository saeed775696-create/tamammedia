"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Upload, Loader2 } from "lucide-react";

// أنشئ عميل Supabase مرة واحدة
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUpload({ value, onChange, label }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
    } catch (err: any) {
      alert("فشل رفع الصورة: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="flex items-center gap-3">
        <label className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition ${
          uploading ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-gray-50 border-gray-300"
        }`}>
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
        />
      </div>
      {value && (
        <div className="mt-3 p-2 bg-white rounded-xl border inline-block">
          <img src={value} alt="معاينة" className="h-20 object-contain rounded" />
        </div>
      )}
    </div>
  );
}