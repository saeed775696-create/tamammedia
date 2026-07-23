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
        breadcrumbs={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الفريق" }]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-2.5 rounded-xl hover:bg-[#c07520] transition-all shadow-md shadow-[#da8827]/20 font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة عضو</span>
          </button>
        }
      />

      <div className="mb-6">
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
          icon={<Users size={36} />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
            >
              <div className="p-5 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#21214f] to-[#3a3a7a] flex items-center justify-center mb-4 border-4 border-[#da8827]/20 group-hover:border-[#da8827] transition-colors overflow-hidden shadow-md">
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
                          parent.innerHTML = `<span class="text-3xl font-bold text-white">${member.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-[#21214f] line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#da8827] font-medium mt-1 line-clamp-1">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                <span className="inline-block mt-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                  #{member.order}
                </span>
              </div>

              <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(member)}
                  className="p-2 bg-white shadow-md text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="تعديل"
                  aria-label="تعديل"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => setDeleteTarget(member)}
                  className="p-2 bg-white shadow-md text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف"
                  aria-label="حذف"
                >
                  <Trash2 size={16} />
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
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-[#da8827] text-white font-medium rounded-xl hover:bg-[#b8701e] transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
        <div className="space-y-5">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="صورة العضو الشخصية"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="الاسم الكامل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                المسمى الوظيفي <span className="text-red-500">*</span>
              </label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="مثال: المدير التنفيذي"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                نبذة قصيرة
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
                placeholder="وصف مختصر للخبرات..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الترتيب
              </label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
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
