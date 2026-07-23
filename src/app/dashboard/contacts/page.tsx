"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Eye,
  Mail,
  MessageSquare,
  Trash2,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import { extractItems } from "@/lib/api/extract";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import EmptyState from "@/components/dashboard/EmptyState";
import Modal from "@/components/dashboard/Modal";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

type StatusFilter = "all" | "new" | "read" | "replied";

const statusConfig = {
  new: {
    label: "جديد",
    badgeClass: "bg-red-100 text-red-700",
    dotClass: "bg-red-500 animate-pulse",
  },
  read: {
    label: "مقروء",
    badgeClass: "bg-yellow-100 text-yellow-700",
    dotClass: "bg-yellow-500",
  },
  replied: {
    label: "تم الرد",
    badgeClass: "bg-green-100 text-green-700",
    dotClass: "bg-green-500",
  },
} as const;

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("فشل تحميل الرسائل");
      const data = await res.json();
      setContacts(extractItems<Contact>(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الرسائل"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (updating) return; // منع النقر المزدوج
    setUpdating(id);
    const loadingToast = toast.loading("جارٍ التحديث...");
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("فشل التحديث");

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
      toast.success("تم تحديث الحالة", { id: loadingToast });
    } catch {
      toast.error("حدث خطأ أثناء التحديث", { id: loadingToast });
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loadingToast = toast.loading("جارٍ الحذف...");
    try {
      const res = await fetch(`/api/contacts/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      if (selectedMessage?.id === deleteTarget.id) {
        setSelectedMessage(null);
      }
      toast.success("تم حذف الرسالة", { id: loadingToast });
    } catch {
      toast.error("حدث خطأ أثناء الحذف", { id: loadingToast });
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleViewMessage = (contact: Contact) => {
    setSelectedMessage(contact);
    if (contact.status === "new") {
      updateStatus(contact.id, "read");
    }
  };

  // Filter + search
  const filteredContacts = useMemo(() => {
    let result = [...contacts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q)
      );
    }

    return result;
  }, [contacts, statusFilter, search]);

  const counts = useMemo(() => {
    return {
      all: contacts.length,
      new: contacts.filter((c) => c.status === "new").length,
      read: contacts.filter((c) => c.status === "read").length,
      replied: contacts.filter((c) => c.status === "replied").length,
    };
  }, [contacts]);

  const statusBadge = (status: string) => {
    const cfg = statusConfig[status as keyof typeof statusConfig];
    if (!cfg)
      return (
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
          {status}
        </span>
      );
    return (
      <span
        className={`${cfg.badgeClass} px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
        {cfg.label}
      </span>
    );
  };

  return (
    <div>
      <PageHeader
        title="الرسائل الواردة"
        subtitle="متابعة وإدارة طلبات التواصل والخدمات"
        breadcrumbs={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الرسائل" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { key: "all" as const, label: "إجمالي الرسائل", color: "text-[#21214f]", bg: "bg-[#21214f]/5" },
          { key: "new" as const, label: "جديد", color: "text-red-600", bg: "bg-red-50" },
          { key: "read" as const, label: "مقروء", color: "text-yellow-600", bg: "bg-yellow-50" },
          { key: "replied" as const, label: "تم الرد", color: "text-green-600", bg: "bg-green-50" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setStatusFilter(s.key)}
            className={`p-4 rounded-2xl border text-right transition-all ${
              statusFilter === s.key
                ? "border-[#da8827] bg-white shadow-md"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className={`text-2xl font-bold ${s.color}`}>{counts[s.key]}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، البريد، الرسالة..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState text="جارٍ تحميل الرسائل..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchContacts} />
      ) : filteredContacts.length === 0 ? (
        <EmptyState
          icon={<Mail size={36} />}
          title={search || statusFilter !== "all" ? "لا توجد نتائج مطابقة" : "لا توجد رسائل بعد"}
          description={
            search || statusFilter !== "all"
              ? "جرّب تغيير معايير البحث أو الفلترة"
              : "ستظهر هنا الرسائل المُرسلة من نموذج التواصل في الموقع"
          }
          retryLabel="تحديث"
          onRetry={fetchContacts}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-600 font-medium">
                    <th className="p-4 text-right whitespace-nowrap">الاسم</th>
                    <th className="p-4 text-right whitespace-nowrap">البريد الإلكتروني</th>
                    <th className="p-4 text-right whitespace-nowrap">الخدمة</th>
                    <th className="p-4 text-right whitespace-nowrap">التاريخ</th>
                    <th className="p-4 text-right whitespace-nowrap">الحالة</th>
                    <th className="p-4 text-center whitespace-nowrap">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className={`border-b border-gray-50 transition-colors cursor-pointer ${
                        contact.status === "new"
                          ? "bg-red-50/30 hover:bg-red-50/50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleViewMessage(contact)}
                    >
                      <td className="p-4 font-bold text-[#21214f] whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {contact.status === "new" && (
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                          )}
                          {contact.name}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 whitespace-nowrap" dir="ltr">
                        {contact.email}
                      </td>
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
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4 whitespace-nowrap">{statusBadge(contact.status)}</td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewMessage(contact)}
                            className="p-2 bg-gray-50 text-gray-600 hover:bg-[#21214f] hover:text-white rounded-lg transition-colors"
                            title="عرض التفاصيل"
                            aria-label="عرض التفاصيل"
                          >
                            <Eye size={16} />
                          </button>
                          {contact.status !== "replied" && (
                            <button
                              onClick={() => updateStatus(contact.id, "replied")}
                              disabled={updating === contact.id}
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                              title="تعليم كمردود"
                              aria-label="تعليم كمردود"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteTarget(contact)}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                            title="حذف"
                            aria-label="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleViewMessage(contact)}
                className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-right hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {contact.status === "new" && (
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    )}
                    <span className="font-bold text-[#21214f] truncate">
                      {contact.name}
                    </span>
                  </div>
                  {statusBadge(contact.status)}
                </div>
                <p className="text-xs text-gray-500 truncate" dir="ltr">
                  {contact.email}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(contact.createdAt).toLocaleDateString("ar-EG", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {contact.service && ` • ${contact.service}`}
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Message View Modal */}
      <Modal
        open={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="تفاصيل الرسالة"
        size="lg"
        footer={
          <>
            <button
              onClick={() => setDeleteTarget(selectedMessage)}
              className="px-6 py-2.5 bg-red-50 border border-red-100 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2 order-1 sm:order-none"
            >
              <Trash2 size={18} />
              حذف
            </button>
            <button
              onClick={() => setSelectedMessage(null)}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              إغلاق
            </button>
            {selectedMessage && selectedMessage.status !== "replied" && (
              <button
                onClick={() => updateStatus(selectedMessage.id, "replied")}
                disabled={updating === selectedMessage.id}
                className="px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle size={18} />
                تأكيد الرد
              </button>
            )}
          </>
        }
      >
        {selectedMessage && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">الاسم</p>
                <p className="font-bold text-[#21214f]">{selectedMessage.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">الخدمة المطلوبة</p>
                <p className="font-bold text-[#21214f]">
                  {selectedMessage.service || "غير محدد"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">البريد الإلكتروني</p>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="font-bold text-blue-600 hover:underline break-all flex items-center gap-1.5"
                  dir="ltr"
                >
                  {selectedMessage.email}
                  <ExternalLink size={12} className="flex-shrink-0" />
                </a>
              </div>
              {selectedMessage.phone && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">رقم الهاتف</p>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="font-bold text-blue-600 hover:underline flex items-center gap-1.5"
                    dir="ltr"
                  >
                    {selectedMessage.phone}
                    <ExternalLink size={12} className="flex-shrink-0" />
                  </a>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-2">
                <p className="text-xs text-gray-500 mb-1">التاريخ والحالة</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="font-bold text-[#21214f]" dir="ltr">
                    {new Date(selectedMessage.createdAt).toLocaleString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {statusBadge(selectedMessage.status)}
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare size={16} />
                نص الرسالة
              </p>
              <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف الرسالة"
        message={`هل أنت متأكد من حذف رسالة ${deleteTarget?.name || ""}؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="نعم، احذف"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
