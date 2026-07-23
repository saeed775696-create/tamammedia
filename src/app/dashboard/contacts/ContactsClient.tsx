"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractItems } from "@/lib/api/extract";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export default function ContactsClient({ contacts }: { contacts: Contact[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setSelected(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📧 إدارة الرسائل</h1>

      {/* فلتر الحالة */}
      <div className="flex gap-2 mb-4">
        {["all", "new", "read", "replied"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded text-sm ${
              filter === s ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {s === "all" ? "الكل" : s === "new" ? "جديد" : s === "read" ? "مقروء" : "تم الرد"}
          </button>
        ))}
      </div>

      {/* الجدول */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-right">
              <th className="p-3">الاسم</th>
              <th className="p-3">البريد</th>
              <th className="p-3">الخدمة</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-400">
                  لا توجد رسائل
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelected(c)}
              >
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.service || "-"}</td>
                <td className="p-3">{new Date(c.createdAt).toLocaleDateString("ar")}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      c.status === "new"
                        ? "bg-red-500"
                        : c.status === "read"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {c.status === "new" ? "جديد" : c.status === "read" ? "مقروء" : "تم الرد"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal التفاصيل */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-500 mb-1">📧 {selected.email}</p>
            {selected.phone && <p className="text-sm text-gray-500 mb-1">📞 {selected.phone}</p>}
            <p className="text-sm text-gray-500 mb-1">🛠️ {selected.service || "غير محدد"}</p>
            <p className="text-sm text-gray-500 mb-3">
              📅 {new Date(selected.createdAt).toLocaleString("ar")}
            </p>
            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="text-sm">{selected.message}</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setSelected(null)} className="px-4 py-2 bg-gray-300 rounded">
                إغلاق
              </button>
              {selected.status !== "replied" && (
                <button
                  onClick={() => updateStatus(selected.id, "replied")}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  تعليم كمردود
                </button>
              )}
              {selected.status === "new" && (
                <button
                  onClick={() => updateStatus(selected.id, "read")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  تعليم كمقروء
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}