"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      titleEn: service.titleEn,
      titleAr: service.titleAr,
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      iconName: "",
      imageUrl: service.imageUrl || "",
      order: service.order,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editingId ? `/api/services/${editingId}` : "/api/services";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    fetchServices();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الخدمات</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-3 rounded-xl hover:bg-[#c07520] transition shadow-lg shadow-[#da8827]/20"
        >
          <Plus size={18} />
          إضافة خدمة
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-400">جار التحميل...</p>
      ) : services.length === 0 ? (
        <p className="text-center py-12 text-gray-400">
          لا توجد خدمات بعد. أضف أول خدمة!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              {service.imageUrl && (
                <div className="h-40 bg-gray-100">
                  <img
                    src={service.imageUrl}
                    alt={service.titleAr}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{service.titleAr}</h3>
                <p className="text-sm text-gray-500">{service.titleEn}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {service.descriptionAr}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(service)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit2 size={14} /> تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
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
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">وصف عربي</label>
                  <textarea
                    name="descriptionAr"
                    value={form.descriptionAr}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">وصف إنجليزي</label>
                  <textarea
                    name="descriptionEn"
                    value={form.descriptionEn}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-2"
                    rows={3}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الصورة</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">الترتيب</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                  className="w-full border rounded-xl p-2"
                />
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
                {editingId ? "حفظ التعديلات" : "إضافة الخدمة"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}