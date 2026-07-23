"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Eye, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { extractItems } from "@/lib/api/extract";

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
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(extractItems<Contact>(data));
      }
    } catch (err) {
      toast.error("حدث خطأ في جلب الرسائل");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const loadingToast = toast.loading("جاري التحديث...");
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
        toast.success("تم تحديث الحالة بنجاح", { id: loadingToast });
      } else {
        throw new Error("فشل التحديث");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث", { id: loadingToast });
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            جديد
          </span>
        );
      case "read":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm inline-flex items-center gap-1">
            <Eye size={12} />
            مقروء
          </span>
        );
      case "replied":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm inline-flex items-center gap-1">
            <CheckCircle size={12} />
            تم الرد
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            {status}
          </span>
        );
    }
  };

  const handleViewMessage = (contact: Contact) => {
    setSelectedMessage(contact);
    if (contact.status === "new") {
      updateStatus(contact.id, "read");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#21214f] mb-2">الرسائل الواردة</h1>
          <p className="text-gray-500">متابعة وإدارة طلبات التواصل والخدمات</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">الرسائل الجديدة</span>
            <span className="text-xl font-bold text-red-500">{contacts.filter(c => c.status === "new").length}</span>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">إجمالي الرسائل</span>
            <span className="text-xl font-bold text-[#21214f]">{contacts.length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#da8827]"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-600 font-medium">
                  <th className="p-4 whitespace-nowrap">الاسم</th>
                  <th className="p-4 whitespace-nowrap">البريد الإلكتروني</th>
                  <th className="p-4 whitespace-nowrap">الخدمة المطلوبة</th>
                  <th className="p-4 whitespace-nowrap">التاريخ</th>
                  <th className="p-4 whitespace-nowrap">الحالة</th>
                  <th className="p-4 whitespace-nowrap text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((contact) => (
                  <tr
                    key={contact.id}
                    className={`border-b border-gray-50 transition-colors ${contact.status === 'new' ? 'bg-red-50/20 hover:bg-red-50/40' : 'hover:bg-gray-50'}`}
                  >
                    <td className="p-4 font-bold text-[#21214f] whitespace-nowrap">{contact.name}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap" dir="ltr">{contact.email}</td>
                    <td className="p-4 whitespace-nowrap">
                      {contact.service ? (
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-blue-100">
                          {contact.service}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-500 whitespace-nowrap" dir="ltr">
                      {new Date(contact.createdAt).toLocaleDateString("ar-EG", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4 whitespace-nowrap">{statusBadge(contact.status)}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleViewMessage(contact)}
                          className="p-2 bg-gray-50 text-gray-600 hover:bg-[#21214f] hover:text-white rounded-lg transition-colors shadow-sm"
                          title="عرض التفاصيل"
                        >
                          <Eye size={16} />
                        </button>
                        {contact.status !== "replied" && (
                          <button
                            onClick={() => updateStatus(contact.id, "replied")}
                            className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors shadow-sm"
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
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-[#21214f]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg my-8 overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#da8827]/10 flex items-center justify-center text-[#da8827]">
                  <MessageSquare size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#21214f]">تفاصيل الرسالة</h2>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm"
              >
                <span className="font-bold text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">الاسم</p>
                  <p className="font-bold text-[#21214f]">{selectedMessage.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">الخدمة المطلوبة</p>
                  <p className="font-bold text-[#21214f]">{selectedMessage.service || "غير محدد"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-500 mb-1">البريد الإلكتروني</p>
                  <a href={`mailto:${selectedMessage.email}`} className="font-bold text-blue-600 hover:underline break-all" dir="ltr">{selectedMessage.email}</a>
                </div>
                {selectedMessage.phone && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 mb-1">رقم الهاتف</p>
                    <a href={`tel:${selectedMessage.phone}`} className="font-bold text-blue-600 hover:underline" dir="ltr">{selectedMessage.phone}</a>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">نص الرسالة:</p>
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                إغلاق
              </button>
              {selectedMessage.status !== "replied" && (
                <button
                  onClick={() => {
                    updateStatus(selectedMessage.id, "replied");
                    setSelectedMessage({ ...selectedMessage, status: "replied" });
                  }}
                  className="px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-all shadow-md shadow-[#da8827]/20 flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  تأكيد الرد
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}