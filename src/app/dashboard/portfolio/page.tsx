"use client";

import { useEffect, useState } from "react";

type PortfolioItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  completionDate?: string;
  link?: string;
  videoUrl?: string;
  featured: boolean;
};

const emptyForm = {
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
};

const categoryLabels: Record<string, string> = {
  branding: "هوية بصرية",
  video: "فيديو",
  social: "سوشيال ميديا",
  website: "موقع إلكتروني",
  ecommerce: "متجر إلكتروني",
  web: "ويب",
};

export default function PortfolioDashboardPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) setItems(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
      imageUrl: item.imageUrl,
      category: item.category,
      clientName: item.clientName || "",
      completionDate: item.completionDate || "",
      link: item.link || "",
      videoUrl: item.videoUrl || "",
      featured: item.featured,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editingId
      ? `/api/portfolio/${editingId}`
      : "/api/portfolio";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowModal(false);
      fetchItems(); // تحديث القائمة من الخادم
    } else {
      alert("فشل في حفظ العمل");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الأعمال</h1>
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          + إضافة عمل
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12">جار التحميل...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-12 text-gray-500">لا توجد أعمال بعد.</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-right">
                <th className="p-3">الصورة</th>
                <th className="p-3">العنوان AR</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">العميل</th>
                <th className="p-3">مميز</th>
                <th className="p-3">حذف</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">
                    <img
                      src={item.imageUrl}
                      alt={item.titleAr}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => (e.currentTarget.src = "/imgs/2-3.png")}
                    />
                  </td>
                  <td className="p-3">{item.titleAr}</td>
                  <td className="p-3">
                    {categoryLabels[item.category] || item.category}
                  </td>
                  <td className="p-3">{item.clientName || "-"}</td>
                  <td className="p-3">{item.featured ? "⭐" : "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 underline hover:text-red-800"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* المودال المنبثق */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "تعديل العمل" : "إضافة عمل جديد"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">العنوان العربي *</label>
                <input
                  name="titleAr"
                  value={form.titleAr}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">العنوان الإنجليزي *</label>
                <input
                  name="titleEn"
                  value={form.titleEn}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">وصف عربي</label>
                  <textarea
                    name="descriptionAr"
                    value={form.descriptionAr}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">وصف إنجليزي</label>
                  <textarea
                    name="descriptionEn"
                    value={form.descriptionEn}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    rows={2}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الصورة</label>
                <input
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
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">اسم العميل</label>
                <input
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
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الفيديو</label>
                <input
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

            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editingId ? "حفظ التعديلات" : "إضافة المشروع"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}