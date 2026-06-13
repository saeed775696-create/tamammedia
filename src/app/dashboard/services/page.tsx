"use client";

import { useEffect, useState } from "react";

type Service = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setServices);
  }, []);

  const deleteService = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">⚙️ إدارة الخدمات</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-right">العنوان (EN)</th>
              <th className="p-3 text-right">العنوان (AR)</th>
              <th className="p-3 text-right">الوصف (EN)</th>
              <th className="p-3 text-right">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.titleEn}</td>
                <td className="p-3">{s.titleAr}</td>
                <td className="p-3">{s.descriptionEn?.slice(0, 60)}…</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteService(s.id)}
                    className="text-red-600 underline text-xs"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}