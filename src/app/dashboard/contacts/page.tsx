"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then(setContacts);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📧 الرسائل الواردة</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">البريد</th>
              <th className="p-3 text-right">الخدمة</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.service || "-"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded text-white ${
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
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString("ar")}
                </td>
                <td className="p-3">
                  {c.status === "new" && (
                    <button
                      onClick={() => updateStatus(c.id, "read")}
                      className="text-yellow-600 underline text-xs"
                    >
                      تعليم كمقروء
                    </button>
                  )}
                  {c.status !== "replied" && (
                    <button
                      onClick={() => updateStatus(c.id, "replied")}
                      className="text-green-600 underline text-xs ml-2"
                    >
                      تم الرد
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}