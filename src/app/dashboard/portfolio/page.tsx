"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Star, Link as LinkIcon, Calendar, FolderOpen } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/dashboard/ImageUpload";

type PortfolioItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  completionDate?: string;
  link?: string;
  featured: boolean;
};

const emptyForm = {
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  imageUrl: "",
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

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) setItems(await res.json());
    } catch {
      toast.error("حدث خطأ في جلب الأعمال");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;
    const loadingToast = toast.loading("جاري الحذف...");
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("تم حذف العمل بنجاح", { id: loadingToast });
      } else {
        throw new Error("فشل الحذف");
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف", { id: loadingToast });
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      titleEn: item.titleEn || "",
      titleAr: item.titleAr || "",
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "branding",
      clientName: item.clientName || "",
      completionDate: item.completionDate || "",
      link: item.link || "",
      videoUrl: "",
      featured: item.featured || false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.titleAr || !form.titleEn || !form.imageUrl) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة (الاسم بالعربي والإنجليزي والصورة)");
      return;
    }

    const loadingToast = toast.loading("جاري الحفظ...");
    try {
      const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("فشل الحفظ");

      toast.success(editingId ? "تم تعديل العمل بنجاح" : "تم إضافة العمل بنجاح", { id: loadingToast });
      setShowModal(false);
      fetchItems();
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#21214f] mb-2">إدارة الأعمال</h1>
          <p className="text-gray-500">أضف، عدل، واحذف مشاريع الشركة</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-6 py-3 rounded-xl hover:bg-[#b8701e] transition-all shadow-lg shadow-[#da8827]/30 font-medium"
        >
          <Plus size={20} />
          إضافة مشروع جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da8827]"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">لا توجد أعمال بعد</p>
          <button onClick={openAdd} className="mt-4 text-[#da8827] hover:underline font-medium">أضف مشروعك الأول</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.currentTarget.src = "/imgs/2-3.png")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-lg text-white transition-colors"
                      title="تعديل"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-lg text-white transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {item.featured && (
                  <span className="absolute top-3 left-3 bg-white text-[#da8827] p-1.5 rounded-full shadow-md">
                    <Star size={14} className="fill-current" />
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-[#21214f] text-lg mb-1 line-clamp-1">{item.titleAr}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.titleEn}</p>
                
                <div className="mt-auto space-y-2">
                  {item.clientName && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#da8827]">👤</div>
                      <span className="truncate">{item.clientName}</span>
                    </div>
                  )}
                  {item.completionDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-5 h-5 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#da8827]"><Calendar size={12}/></div>
                      <span>{item.completionDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-[#21214f]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-[#21214f]">
                {editingId ? "تعديل بيانات المشروع" : "إضافة مشروع جديد"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                <Trash2 size={20} className="hidden" /> {/* Hidden icon for symmetry if needed, using custom close below */}
                <span className="font-bold text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              
              {/* Image Upload Component */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <ImageUpload 
                  value={form.imageUrl} 
                  onChange={(url) => setForm({ ...form, imageUrl: url })} 
                  label="صورة المشروع الرئيسية *" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">العنوان بالعربية *</label>
                    <input
                      name="titleAr"
                      value={form.titleAr}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                      placeholder="مثال: متجر إلكتروني متكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف بالعربية</label>
                    <textarea
                      name="descriptionAr"
                      value={form.descriptionAr}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم العميل</label>
                    <input
                      name="clientName"
                      value={form.clientName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all bg-white"
                    >
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">العنوان بالإنجليزية *</label>
                    <input
                      name="titleEn"
                      value={form.titleEn}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all text-left"
                      dir="ltr"
                      placeholder="e.g. Full E-commerce Store"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف بالإنجليزية</label>
                    <textarea
                      name="descriptionEn"
                      value={form.descriptionEn}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all resize-none text-left"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإنجاز</label>
                    <input
                      name="completionDate"
                      type="text"
                      value={form.completionDate}
                      onChange={handleChange}
                      placeholder="مثال: 2023 - 2024"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط المشروع</label>
                    <div className="relative">
                      <LinkIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      <input
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-[#da8827] outline-none transition-all text-left"
                        dir="ltr"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={form.featured}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-gray-300 text-[#da8827] focus:ring-[#da8827]"
                    />
                  </div>
                  <div className="mr-3 text-sm leading-6">
                    <label htmlFor="featured" className="font-medium text-gray-900">إبراز في الصفحة الرئيسية</label>
                    <p className="text-gray-500">سيظهر هذا العمل في قسم الأعمال المميزة في الصفحة الرئيسية للموقع.</p>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-all shadow-md shadow-[#da8827]/20"
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