"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2, Users } from "lucide-react";
import toast from "react-hot-toast";
import { extractItems } from "@/lib/api/extract";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import EmptyState from "@/components/dashboard/EmptyState";
import Modal from "@/components/dashboard/Modal";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import SearchInput from "@/components/dashboard/SearchInput";
import ImageUpload from "@/components/dashboard/ImageUpload";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  imageUrl?: string | null;
  order: number;
};

type Form = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
};

const emptyForm: Form = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  order: 0,
};

export default function TeamDashboard() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/team");
      if (!res.ok) throw new Error("فشل تحميل الفريق");
      const data = await res.json();
      setMembers(extractItems<TeamMember>(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الفريق"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loadingToast = toast.loading("جارٍ الحذف...");
    try {
      const res = await fetch(`/api/team/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      toast.success("تم حذف العضو", { id: loadingToast });
    } catch {
      toast.error("حدث خطأ أثناء الحذف", { id: loadingToast });
    } finally {
      setDeleteTarget(null);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      imageUrl: member.imageUrl || "",
      order: member.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (saving) return;

    if (!form.name.trim()) {
      toast.error("الاسم مطلوب");
      return;
    }
    if (!form.role.trim()) {
      toast.error("المسمى الوظيفي مطلوب");
      return;
    }

    setSaving(true);
    const loadingToast = toast.loading("جارٍ الحفظ...");
    try {
      const url = editingId ? `/api/team/${editingId}` : "/api/team";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الحفظ");

      toast.success(editingId ? "تم تعديل العضو" : "تمت إضافة العضو", {
        id: loadingToast,
      });
      setShowModal(false);
      fetchMembers();
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const sortedMembers = useMemo(() => {
    let result = [...members];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.order - b.order);
  }, [members, search]);

  return (
    <div>
      <PageHeader
        title="الفريق"
        subtitle="إدارة أعضاء فريق العمل"
        breadcrumbs={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "الفريق" },
        ]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-[#da8827] text-white px-3.5 py-2 rounded-lg hover:bg-[#b8701e] transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">إضافة عضو</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        }
      />

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="بحث بالاسم أو المسمى الوظيفي..."
        />
      </div>

      {loading ? (
        <LoadingState text="جارٍ تحميل الفريق..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchMembers} />
      ) : sortedMembers.length === 0 ? (
        <EmptyState
          icon={<Users size={32} />}
          title={search ? "لا توجد نتائج" : "لا يوجد أعضاء بعد"}
          description={
            search ? "جرّب تغيير كلمات البحث" : "ابدأ بإضافة أول عضو لفريقك"
          }
          actionLabel={search ? undefined : "إضافة عضو"}
          onAction={search ? undefined : openAdd}
          retryLabel="تحديث"
          onRetry={fetchMembers}
        />
      ) : (
        // Grid — صور شخصية صغيرة، بطاقات مدمجة
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="p-3 sm:p-4 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[#21214f] to-[#3a3a7a] flex items-center justify-center mb-3 border-2 border-[#da8827]/20 group-hover:border-[#da8827] transition-colors overflow-hidden shadow-sm">
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xl font-bold text-white">${member.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-[#21214f] text-[13px] sm:text-sm line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#da8827] font-medium mt-0.5 line-clamp-1">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
                <span className="inline-block mt-2 bg-gray-50 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-medium">
                  #{member.order}
                </span>
              </div>

              {/* Hover actions */}
              <div className="absolute top-1.5 left-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(member)}
                  className="p-1.5 bg-white shadow-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="تعديل"
                  aria-label="تعديل"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => setDeleteTarget(member)}
                  className="p-1.5 bg-white shadow-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="حذف"
                  aria-label="حذف"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "تعديل بيانات العضو" : "إضافة عضو جديد"}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              disabled={saving}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-[#da8827] text-white text-sm font-medium rounded-lg hover:bg-[#b8701e] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جارٍ الحفظ...
                </>
              ) : editingId ? (
                "حفظ التعديلات"
              ) : (
                "إضافة العضو"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="صورة العضو الشخصية"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="الاسم الكامل"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                المسمى الوظيفي <span className="text-red-500">*</span>
              </label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="مثال: المدير التنفيذي"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                نبذة قصيرة
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
                placeholder="وصف مختصر للخبرات..."
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                الترتيب
              </label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                min="0"
              />
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف العضو"
        message={`هل أنت متأكد من حذف "${deleteTarget?.name || ""}" من الفريق؟`}
        confirmText="نعم، احذف"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
