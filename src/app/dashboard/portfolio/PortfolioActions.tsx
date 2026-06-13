"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioActions() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    titleEn: "",
    titleAr: "",
    imageUrl: "/imgs/2-3.png",
    category: "branding",
  });

  const handleSave = async () => {
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + إضافة عمل
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-bold mb-4">إضافة عمل جديد</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="العنوان بالإنجليزية"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="العنوان بالعربية"
              value={form.titleAr}
              onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="رابط الصورة"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
            <select
              className="w-full mb-2 p-2 border rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="branding">Branding</option>
              <option value="video">Video</option>
              <option value="social">Social Media</option>
              <option value="web">Web</option>
            </select>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}