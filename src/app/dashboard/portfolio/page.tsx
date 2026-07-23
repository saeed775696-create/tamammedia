"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit2, Star, Upload } from "lucide-react";
import { extractItems } from "@/lib/api/extract";

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
  titleEn: "", titleAr: "", imageUrl: "", category: "branding",
  clientName: "", featured: false,
};

const categoryLabels: Record<string, string> = {
  branding: "هوية بصرية", video: "فيديو", social: "سوشيال ميديا",
  website: "موقع إلكتروني", ecommerce: "متجر إلكتروني",
};

export default function PortfolioDashboard() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setItems(extractItems<PortfolioItem>(data));
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("حذف العمل؟")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    toast.success("تم الحذف");
    fetchItems();
  };

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      titleEn: item.titleEn, titleAr: item.titleAr, imageUrl: item.imageUrl,
      category: item.category, clientName: item.clientName || "", featured: item.featured,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    toast.success(editingId ? "تم التعديل" : "تمت الإضافة");
    setShowModal(false);
    fetchItems();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.type === "checkbox" ? target.checked : target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const formData = new FormData(); formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setForm({ ...form, imageUrl: url });
      toast.success("تم رفع الصورة");
    } else {
      toast.error("فشل رفع الصورة");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>الأعمال</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-2.5 rounded-xl hover:bg-[#c07520] transition shadow-lg">
          <Plus size={18} /> إضافة عمل
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-12">جار التحميل...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-400 py-12">لا توجد أعمال بعد.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-48 bg-gray-100">
                <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover" />
                {item.featured && <span className="absolute top-2 left-2 bg-[#da8827] text-white p-1.5 rounded-full"><Star size={14} fill="white" /></span>}
                <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-1 rounded-full">{categoryLabels[item.category] || item.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg">{item.titleAr}</h3>
                <p className="text-sm text-gray-500">{item.titleEn}</p>
                {item.clientName && <p className="text-xs text-gray-400 mt-1">👤 {item.clientName}</p>}
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button onClick={() => openEdit(item)} className="flex items-center gap-1 text-sm text-blue-600 hover:underline"><Edit2 size={14} /> تعديل</button>
                  <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1 text-sm text-red-500 hover:underline"><Trash2 size={14} /> حذف</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "تعديل العمل" : "إضافة عمل جديد"}</h2>
            <div className="space-y-4">
              <input name="titleAr" placeholder="العنوان العربي *" value={form.titleAr} onChange={handleChange} className="w-full border rounded-xl p-2" required />
              <input name="titleEn" placeholder="العنوان الإنجليزي *" value={form.titleEn} onChange={handleChange} className="w-full border rounded-xl p-2" required />
              <div>
                <label className="block text-sm mb-1">الصورة</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
                    <Upload size={16} /> اختر صورة
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <input name="imageUrl" placeholder="أو رابط الصورة" value={form.imageUrl} onChange={handleChange} className="flex-1 border rounded-xl p-2 text-sm" />
                </div>
                {form.imageUrl && <img src={form.imageUrl} alt="معاينة" className="mt-2 h-20 w-20 object-cover rounded" />}
              </div>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-xl p-2">
                {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
              <input name="clientName" placeholder="اسم العميل" value={form.clientName} onChange={handleChange} className="w-full border rounded-xl p-2" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> مشروع مميز
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-200 rounded-xl">إلغاء</button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#da8827] text-white rounded-xl">{editingId ? "حفظ التعديلات" : "إضافة المشروع"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}