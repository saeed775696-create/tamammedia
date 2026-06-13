"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ---------- أنواع البيانات ----------
interface PortfolioItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  gallery?: string | null; // JSON string
  category: string;
  clientName?: string;
  completionDate?: string;
  technologies?: string | null; // JSON string
  link?: string;
  videoUrl?: string;
  featured: boolean;
}

const emptyForm = {
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  imageUrl: "/imgs/2-3.png",
  gallery: [""],
  category: "website",
  clientName: "",
  completionDate: "",
  technologies: [""],
  link: "",
  videoUrl: "",
  featured: false,
};

const categoryLabels: Record<string, string> = {
  website: "موقع إلكتروني",
  ecommerce: "متجر إلكتروني",
  branding: "هوية بصرية",
  video: "فيديو",
  social: "سوشيال ميديا",
  web: "تطبيق ويب",
};

export default function PortfolioDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  // تحميل البيانات
  const loadItems = async () => {
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
    loadItems();
  }, []);

  // فتح نموذج فارغ للإضافة
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // فتح نموذج للتعديل
  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
      imageUrl: item.imageUrl,
      gallery: item.gallery ? JSON.parse(item.gallery) : [""],
      category: item.category,
      clientName: item.clientName || "",
      completionDate: item.completionDate || "",
      technologies: item.technologies ? JSON.parse(item.technologies) : [""],
      link: item.link || "",
      videoUrl: item.videoUrl || "",
      featured: item.featured,
    });
    setShowForm(true);
  };

  // تعديل مصفوفة نصية (gallery, technologies)
  const updateArrayField = (field: "gallery" | "technologies", index: number, value: string) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field: "gallery" | "technologies") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field: "gallery" | "technologies", index: number) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated.length ? updated : [""] });
  };

  // حفظ (إضافة أو تحديث)
  const handleSave = async () => {
    const body = {
      ...form,
      gallery: form.gallery.filter((url) => url.trim() !== ""),
      technologies: form.technologies.filter((t) => t.trim() !== ""),
    };

    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    loadItems();
  };

  // حذف
  const handleDelete = async (id: string) => {
    if (!confirm("حذف المشروع؟")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    loadItems();
  };

  if (loading) return <div className="text-center py-12">جار التحميل...</div>;

  return (
    <div className="p-4">
      {/* الرأس */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المشاريع</h1>
        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow transition"
        >
          + إضافة مشروع جديد
        </button>
      </div>

      {/* عرض المشاريع كبطاقات (وليس جدول فقط) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
            <div className="relative h-40 bg-gray-100">
              <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded">
                {categoryLabels[item.category] || item.category}
              </span>
              {item.featured && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">⭐ مميز</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{item.titleAr}</h3>
              <p className="text-sm text-gray-500">{item.titleEn}</p>
              {item.clientName && <p className="text-xs text-gray-400 mt-1">العميل: {item.clientName}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(item)} className="text-blue-600 text-sm hover:underline">تعديل</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm hover:underline">حذف</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">لا توجد مشاريع بعد. أضف مشروعك الأول!</div>
        )}
      </div>

      {/* النموذج (مودال) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingId ? "تعديل المشروع" : "إضافة مشروع جديد"}
            </h2>

            {/* شبكة الحقول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* title */}
              <div>
                <label className="block text-sm font-medium mb-1">العنوان بالعربية *</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" value={form.titleAr} onChange={e => setForm({...form, titleAr: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">العنوان بالإنجليزية *</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} />
              </div>

              {/* الوصف */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">وصف عربي</label>
                  <textarea className="w-full border border-gray-300 rounded-lg p-2" rows={2} value={form.descriptionAr} onChange={e => setForm({...form, descriptionAr: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">وصف إنجليزي</label>
                  <textarea className="w-full border border-gray-300 rounded-lg p-2" rows={2} value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} />
                </div>
              </div>

              {/* الصورة الرئيسية */}
              <div>
                <label className="block text-sm font-medium mb-1">رابط الصورة الرئيسية</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                <div className="mt-1 h-20 w-20 bg-gray-100 rounded overflow-hidden">
                  <img src={form.imageUrl || "/imgs/2-3.png"} alt="preview" className="h-full w-full object-cover" />
                </div>
              </div>

              {/* التصنيف */}
              <div>
                <label className="block text-sm font-medium mb-1">التصنيف</label>
                <select className="w-full border border-gray-300 rounded-lg p-2" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* العميل والتاريخ */}
              <div>
                <label className="block text-sm font-medium mb-1">اسم العميل</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">تاريخ الإنجاز</label>
                <input type="month" className="w-full border border-gray-300 rounded-lg p-2" value={form.completionDate} onChange={e => setForm({...form, completionDate: e.target.value})} />
              </div>

              {/* رابط المشروع */}
              <div>
                <label className="block text-sm font-medium mb-1">رابط المشروع</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" placeholder="https://..." value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">رابط الفيديو (يوتيوب)</label>
                <input className="w-full border border-gray-300 rounded-lg p-2" placeholder="https://youtube.com/..." value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} />
              </div>

              {/* معرض الصور */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">معرض الصور</label>
                {form.gallery.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                      placeholder="رابط الصورة"
                      value={url}
                      onChange={e => updateArrayField("gallery", i, e.target.value)}
                    />
                    <button onClick={() => removeArrayField("gallery", i)} className="text-red-500 px-2">✕</button>
                  </div>
                ))}
                <button onClick={() => addArrayField("gallery")} className="text-blue-600 text-sm hover:underline">+ إضافة صورة</button>
              </div>

              {/* التقنيات */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">التقنيات المستخدمة</label>
                {form.technologies.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                      placeholder="مثال: Next.js"
                      value={tech}
                      onChange={e => updateArrayField("technologies", i, e.target.value)}
                    />
                    <button onClick={() => removeArrayField("technologies", i)} className="text-red-500 px-2">✕</button>
                  </div>
                ))}
                <button onClick={() => addArrayField("technologies")} className="text-blue-600 text-sm hover:underline">+ إضافة تقنية</button>
              </div>

              {/* مميز */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm({...form, featured: e.target.checked})}
                />
                <label htmlFor="featured" className="text-sm">مشروع مميز</label>
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex justify-end gap-3 mt-8 border-t pt-4">
              <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">إلغاء</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">
                {editingId ? "حفظ التعديلات" : "إضافة المشروع"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}