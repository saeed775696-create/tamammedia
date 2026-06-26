"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Star, Upload } from "lucide-react";

type PortfolioItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  imageUrl: string;
  category: string;
  clientName?: string;
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
};

export default function PortfolioDashboard() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error(err);
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
      descriptionEn: "",
      descriptionAr: "",
      imageUrl: item.imageUrl,
      category: item.category,
      clientName: item.clientName || "",
      completionDate: "",
      link: "",
      videoUrl: "",
      featured: item.featured,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editingId
      ? `/api/portfolio/${editingId}`
      : "/api/portfolio";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    fetchItems();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setForm((prev) => ({ ...prev, imageUrl: url }));
      } else {
        alert("فشل رفع الصورة");
      }
    } catch (err) {
      alert("خطأ في الاتصال");
    } finally {
      setUploading(false);
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
        <h1 className="text-2xl font-bold text-gray-800">الأعمال</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-3 rounded-xl hover:bg-[#c07520] transition shadow-lg shadow-[#da8827]/20"
        >
          <Plus size={18} />
          إضافة عمل
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-400">جار التحميل...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-12 text-gray-400">
          لا توجد أعمال بعد. أضف أول مشروع!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-40 bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.titleAr}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = "/imgs/2-3.png")
                  }
                />
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-[#da8827] text-white p-1 rounded-full">
                    <Star size={14} />
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-1 rounded-full">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{item.titleAr}</h3>
                <p className="text-sm text-gray-500">{item.titleEn}</p>
                {item.clientName && (
                  <p className="text-xs text-gray-400 mt-1">
                    👤 {item.clientName}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit2 size={14} /> تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                  >
                    <Trash2 size={14} /> حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* المودال المنبثق مع حقل رفع الصورة */}
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
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">العنوان الإنجليزي *</label>
                <input
                  name="titleEn"
                  value={form.titleEn}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>

              {/* حقل الصورة مع الرفع */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">صورة المشروع</label>
                <div className="flex flex-wrap items-center gap-2">
                  {/* زر الرفع */}
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
                    <Upload size={16} />
                    <span className="text-sm">
                      {uploading ? "جاري الرفع..." : "اختر صورة"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {/* الرابط اليدوي */}
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="flex-1 border rounded-xl p-2 text-sm"
                    placeholder="أو اكتب رابط الصورة يدويًا"
                  />
                </div>
                {/* معاينة الصورة */}
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="معاينة"
                    className="mt-2 h-20 w-20 object-cover rounded border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">التصنيف</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
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
                  className="w-full border rounded-xl p-2"
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
                className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#da8827] text-white rounded-xl hover:bg-[#c07520]"
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