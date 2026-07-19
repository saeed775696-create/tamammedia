"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, ExternalLink, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/dashboard/ImageUpload";

type Partner = {
  id: string;
  name: string;
  imageUrl: string;
  website?: string;
  order: number;
};

const emptyForm = {
  name: "",
  imageUrl: "",
  website: "",
  order: 0,
};

export default function PartnersDashboard() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners");
      if (res.ok) {
        const data = await res.json();
        setPartners(Array.isArray(data) ? data : []);
      } else {
        setPartners([]);
      }
    } catch (err) {
      toast.error("حدث خطأ في جلب بيانات الشركاء");
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الشريك؟")) return;
    const loadingToast = toast.loading("جاري الحذف...");
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPartners((prev) => prev.filter((p) => p.id !== id));
        toast.success("تم حذف الشريك بنجاح", { id: loadingToast });
      } else {
        throw new Error("فشل الحذف");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف", { id: loadingToast });
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setForm({
      name: partner.name || "",
      imageUrl: partner.imageUrl || "",
      website: partner.website || "",
      order: partner.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.imageUrl) {
      toast.error("الاسم والشعار مطلوبان");
      return;
    }

    const loadingToast = toast.loading("جاري الحفظ...");
    const url = editingId ? `/api/partners/${editingId}` : "/api/partners";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(editingId ? "تم تعديل الشريك بنجاح" : "تم إضافة الشريك بنجاح", { id: loadingToast });
        setShowModal(false);
        fetchPartners();
      } else {
        throw new Error("فشل الحفظ");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "order" ? Number(value) : value }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#21214f] mb-2">الشركاء</h1>
          <p className="text-gray-500">إدارة شركاء النجاح</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-6 py-3 rounded-xl hover:bg-[#b8701e] transition-all shadow-lg shadow-[#da8827]/30 font-medium"
        >
          <Plus size={20} />
          إضافة شريك جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da8827]"></div>
        </div>
      ) : partners.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">لا يوجد شركاء بعد</p>
          <button onClick={openAdd} className="mt-4 text-[#da8827] hover:underline font-medium">أضف الشريك الأول</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {partners.sort((a, b) => a.order - b.order).map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="h-40 bg-gray-50 flex items-center justify-center p-6 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  onError={(e) => (e.currentTarget.src = "/imgs/2-3.png")}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button
                    onClick={() => openEdit(partner)}
                    className="p-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm"
                    title="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="p-2 bg-white text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 text-center border-t border-gray-50 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-[#21214f] text-lg mb-1">{partner.name}</h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#da8827] flex items-center justify-center gap-1 mt-1 hover:underline mx-auto"
                  >
                    <ExternalLink size={12} />
                    زيارة الموقع
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-[#21214f]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-[#21214f]">
                {editingId ? "تعديل بيانات الشريك" : "إضافة شريك جديد"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                <Trash2 size={20} className="hidden" />
                <span className="font-bold text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <ImageUpload 
                  value={form.imageUrl} 
                  onChange={(url) => setForm({ ...form, imageUrl: url })} 
                  label="شعار الشريك *" 
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشريك *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رابط الموقع (اختياري)</label>
                  <div className="relative">
                    <ExternalLink size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-[#da8827] outline-none transition-all text-left"
                      dir="ltr"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#da8827] outline-none transition-all"
                    min="0"
                  />
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
                {editingId ? "حفظ التعديلات" : "إضافة الشريك"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}