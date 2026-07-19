"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, LayoutGrid } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/dashboard/ImageUpload";

type Service = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl?: string;
  order: number;
};

const emptyForm = {
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  iconName: "",
  imageUrl: "",
  order: 0,
};

export default function ServicesDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) setServices(await res.json());
    } catch {
      toast.error("حدث خطأ في جلب بيانات الخدمات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    const loadingToast = toast.loading("جاري الحذف...");
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        toast.success("تم حذف الخدمة بنجاح", { id: loadingToast });
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

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      titleEn: service.titleEn || "",
      titleAr: service.titleAr || "",
      descriptionEn: service.descriptionEn || "",
      descriptionAr: service.descriptionAr || "",
      iconName: "",
      imageUrl: service.imageUrl || "",
      order: service.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.titleAr || !form.titleEn) {
      toast.error("الرجاء تعبئة العنوان بالعربي والإنجليزي");
      return;
    }

    const loadingToast = toast.loading("جاري الحفظ...");
    try {
      const url = editingId ? `/api/services/${editingId}` : "/api/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("فشل الحفظ");
      
      toast.success(editingId ? "تم تعديل الخدمة بنجاح" : "تم إضافة الخدمة بنجاح", { id: loadingToast });
      setShowModal(false);
      fetchServices();
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#21214f] mb-2">الخدمات</h1>
          <p className="text-gray-500">إدارة الخدمات التي تقدمها الشركة</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-6 py-3 rounded-xl hover:bg-[#b8701e] transition-all shadow-lg shadow-[#da8827]/30 font-medium"
        >
          <Plus size={20} />
          إضافة خدمة جديدة
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da8827]"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <LayoutGrid size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">لا توجد خدمات بعد</p>
          <button onClick={openAdd} className="mt-4 text-[#da8827] hover:underline font-medium">أضف خدمتك الأولى</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.sort((a, b) => a.order - b.order).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
                {service.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={service.imageUrl}
                    alt={service.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <LayoutGrid size={48} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(service)}
                      className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-lg text-white transition-colors"
                      title="تعديل"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-lg text-white transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  ترتيب: {service.order}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-[#21214f] text-lg mb-1 line-clamp-1">{service.titleAr}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">{service.titleEn}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-3 flex-1">
                  {service.descriptionAr}
                </p>
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
                {editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                <Trash2 size={20} className="hidden" />
                <span className="font-bold text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              
              {/* Image Upload Component */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <ImageUpload 
                  value={form.imageUrl} 
                  onChange={(url) => setForm({ ...form, imageUrl: url })} 
                  label="صورة أو أيقونة الخدمة" 
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف بالعربية</label>
                    <textarea
                      name="descriptionAr"
                      value={form.descriptionAr}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                    <input
                      type="number"
                      name="order"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                      min="0"
                    />
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف بالإنجليزية</label>
                    <textarea
                      name="descriptionEn"
                      value={form.descriptionEn}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all resize-none text-left"
                      dir="ltr"
                    />
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
                {editingId ? "حفظ التعديلات" : "إضافة الخدمة"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}