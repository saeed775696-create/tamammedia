"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, ExternalLink } from "lucide-react";

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
      if (res.ok) setPartners(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الشريك؟")) return;
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setForm({
      name: partner.name,
      imageUrl: partner.imageUrl,
      website: partner.website || "",
      order: partner.order,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const url = editingId ? `/api/partners/${editingId}` : "/api/partners";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    fetchPartners();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "order" ? Number(value) : value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الشركاء</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-3 rounded-xl hover:bg-[#c07520] transition shadow-lg shadow-[#da8827]/20"
        >
          <Plus size={18} />
          إضافة شريك
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-400">جار التحميل...</p>
      ) : partners.length === 0 ? (
        <p className="text-center py-12 text-gray-400">
          لا يوجد شركاء بعد. أضف أول شريك!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center p-6">
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) =>
                    (e.currentTarget.src = "/imgs/2-3.png")
                  }
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{partner.name}</h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 flex items-center gap-1 mt-1 hover:underline"
                  >
                    <ExternalLink size={14} />
                    زيارة الموقع
                  </a>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEdit(partner)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit2 size={14} /> تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "تعديل الشريك" : "إضافة شريك جديد"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">اسم الشريك *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الشعار *</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="/assets/ourparteners/شرفه.png"
                  required
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="معاينة"
                    className="mt-2 h-16 object-contain rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">رابط الموقع</label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-2"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm mb-1">الترتيب</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
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
                {editingId ? "حفظ التعديلات" : "إضافة الشريك"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}