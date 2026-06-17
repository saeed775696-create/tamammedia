"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPortfolioPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    imageUrl: "/imgs/2-3.png",
    category: "branding",
    clientName: "",
    completionDate: "",
    link: "",
    videoUrl: "",
    featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/dashboard/portfolio"); // العودة إلى قائمة الأعمال
    } else {
      alert("فشل في إضافة المشروع");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إضافة عمل جديد</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">العنوان العربي</label>
            <input
              type="text"
              name="titleAr"
              value={form.titleAr}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">العنوان الإنجليزي</label>
            <input
              type="text"
              name="titleEn"
              value={form.titleEn}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">وصف عربي</label>
            <textarea
              name="descriptionAr"
              value={form.descriptionAr}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">وصف إنجليزي</label>
            <textarea
              name="descriptionEn"
              value={form.descriptionEn}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">رابط الصورة</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="معاينة"
                className="mt-2 h-20 w-20 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">التصنيف</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="branding">هوية بصرية</option>
              <option value="video">فيديو</option>
              <option value="social">سوشيال ميديا</option>
              <option value="website">موقع إلكتروني</option>
              <option value="ecommerce">متجر إلكتروني</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">اسم العميل</label>
            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">تاريخ الإنجاز</label>
            <input
              type="month"
              name="completionDate"
              value={form.completionDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">رابط المشروع</label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">رابط الفيديو</label>
            <input
              type="url"
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              id="featured"
            />
            <label htmlFor="featured">مشروع مميز</label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          حفظ العمل
        </button>
      </form>
    </div>
  );
}
