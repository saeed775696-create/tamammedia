"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Eye, Mail } from "lucide-react";

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

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) setContacts(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
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

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
            جديد
          </span>
        );
      case "read":
        return (
          <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
            مقروء
          </span>
        );
      case "replied":
        return (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
            تم الرد
          </span>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">الرسائل الواردة</h1>

      {loading ? (
        <p className="text-center py-12 text-gray-400">جار التحميل...</p>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400">لا توجد رسائل بعد.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right p-4 text-gray-500">الاسم</th>
                <th className="text-right p-4 text-gray-500">البريد</th>
                <th className="text-right p-4 text-gray-500">الخدمة</th>
                <th className="text-right p-4 text-gray-500">التاريخ</th>
                <th className="text-right p-4 text-gray-500">الحالة</th>
                <th className="text-right p-4 text-gray-500">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="p-4 font-medium">{contact.name}</td>
                  <td className="p-4">{contact.email}</td>
                  <td className="p-4">{contact.service || "-"}</td>
                  <td className="p-4">
                    {new Date(contact.createdAt).toLocaleDateString("ar")}
                  </td>
                  <td className="p-4">{statusBadge(contact.status)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {contact.status === "new" && (
                        <button
                          onClick={() => updateStatus(contact.id, "read")}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="تعليم كمقروء"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {contact.status !== "replied" && (
                        <button
                          onClick={() => updateStatus(contact.id, "replied")}
                          className="text-green-600 hover:text-green-800"
                          title="تعليم كمردود"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}