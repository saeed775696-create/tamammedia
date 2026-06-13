"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PortfolioItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  category: string;
  featured: boolean;
};

export default function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState({
    titleEn: "",
    titleAr: "",
    imageUrl: "/imgs/2-3.png",
    category: "branding",
    featured: false,
  });

  const openEdit = (item: PortfolioItem) => {
    setEditItem(item);
    setForm({
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      imageUrl: item.imageUrl,
      category: item.category,
      featured: item.featured,
    });
    setShowForm(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ titleEn: "", titleAr: "", imageUrl: "/imgs/2-3.png", category: "branding", featured: false });
    setShowForm(true);
  };

  const handleSave = async () => {
    const url = editItem ? `/api/portfolio/${editItem.id}` : "/api/portfolio";
    const method = editItem ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowForm(false);
    setEditItem(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🖼️ إدارة الأعمال</h1>
        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          + إضافة عمل جديد
        </button>
      </div>

      {/* جدول الأعمال */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-right">
              <th className="p-3">الصورة</th>
              <th className="p-3">العنوان (EN)</th>
              <th className="p-3">العنوان (AR)</th>
              <th className="p-3">التصنيف</th>
              <th className="p-3">مميز</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="p-3">{item.titleEn}</td>
                <td className="p-3">{item.titleAr}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.featured ? "⭐" : "-"}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-blue-600 underline">
                    تعديل
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 underline">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نموذج إضافة/تعديل */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-bold mb-4">
              {editItem ? "تعديل العمل" : "إضافة عمل جديد"}
            </h3>
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
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span className="text-sm">عمل مميز</span>
            </label>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">
                إلغاء
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}