"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string | null;
};

export default function ServicesClient({ services }: { services: Service[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Service | null>(null);
  const [form, setForm] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    iconName: "",
  });

  const openEdit = (s: Service) => {
    setEditItem(s);
    setForm({
      titleEn: s.titleEn,
      titleAr: s.titleAr,
      descriptionEn: s.descriptionEn,
      descriptionAr: s.descriptionAr,
      iconName: s.iconName || "",
    });
    setShowForm(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", iconName: "" });
    setShowForm(true);
  };

  const handleSave = async () => {
    const url = editItem ? `/api/services/${editItem.id}` : "/api/services";
    const method = editItem ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowForm(false);
    setEditItem(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("حذف هذه الخدمة؟")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">⚙️ إدارة الخدمات</h1>
        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          + إضافة خدمة
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-right">
              <th className="p-3">العنوان (EN)</th>
              <th className="p-3">العنوان (AR)</th>
              <th className="p-3">الوصف (EN)</th>
              <th className="p-3">الأيقونة</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.titleEn}</td>
                <td className="p-3">{s.titleAr}</td>
                <td className="p-3 max-w-[200px] truncate">{s.descriptionEn}</td>
                <td className="p-3">{s.iconName || "-"}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEdit(s)} className="text-blue-600 underline">
                    تعديل
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 underline">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-bold mb-4">{editItem ? "تعديل الخدمة" : "إضافة خدمة"}</h3>
            <input className="w-full mb-2 p-2 border rounded" placeholder="العنوان EN" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" placeholder="العنوان AR" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} />
            <textarea className="w-full mb-2 p-2 border rounded" placeholder="الوصف EN" value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
            <textarea className="w-full mb-2 p-2 border rounded" placeholder="الوصف AR" value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" placeholder="اسم الأيقونة" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} />
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}