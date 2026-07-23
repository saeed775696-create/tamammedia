"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2, ExternalLink, Briefcase } from "lucide-react";
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

type Partner = {
  id: string;
  name: string;
  imageUrl: string;
  website?: string | null;
  order: number;
};

type Form = {
  name: string;
  imageUrl: string;
  website: string;
  order: number;
};

const emptyForm: Form = {
  name: "",
  imageUrl: "",
  website: "",
  order: 0,
};

export default function PartnersDashboard() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
  const [search, setSearch] = useState("");

  const fetchPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/partners");
      if (!res.ok) throw new Error("فشل تحميل الشركاء");
      const data = await res.json();
      setPartners(extractItems<Partner>(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الشركاء"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loadingToast = toast.loading("جارٍ الحذف...");
    try {
      const res = await fetch(`/api/partners/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      setPartners((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("تم حذف الشريك", { id: loadingToast });
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

  const openEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setForm({
      name: partner.name || "",
      imageUrl: partner.imageUrl || "",
      website: partner.website || "",
      order: partner.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (saving) return;

    if (!form.name.trim()) {
      toast.error("اسم الشريك مطلوب");
      return;
    }
    if (!form.imageUrl.trim()) {
      toast.error("شعار الشريك مطلوب");
      return;
    }

    setSaving(true);
    const loadingToast = toast.loading("جارٍ الحفظ...");
    try {
      const url = editingId ? `/api/partners/${editingId}` : "/api/partners";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الحفظ");

      toast.success(editingId ? "تم تعديل الشريك" : "تمت إضافة الشريك", {
        id: loadingToast,
      });
      setShowModal(false);
      fetchPartners();
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const sortedPartners = useMemo(() => {
    let result = [...partners];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.website || "").toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.order - b.order);
  }, [partners, search]);

  return (
    <div>
      <PageHeader
        title="الشركاء"
        subtitle="إدارة شركاء النجاح"
        breadcrumbs={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الشركاء" }]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-2.5 rounded-xl hover:bg-[#c07520] transition-all shadow-md shadow-[#da8827]/20 font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة شريك</span>
          </button>
        }
      />

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="بحث في الشركاء..."
        />
      </div>

      {loading ? (
        <LoadingState text="جارٍ تحميل الشركاء..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchPartners} />
      ) : sortedPartners.length === 0 ? (
        <EmptyState
          icon={<Briefcase size={36} />}
          title={search ? "لا توجد نتائج" : "لا يوجد شركاء بعد"}
          description={
            search ? "جرّب تغيير كلمات البحث" : "ابدأ بإضافة أول شريك"
          }
          actionLabel={search ? undefined : "إضافة شريك"}
          onAction={search ? undefined : openAdd}
          retryLabel="تحديث"
          onRetry={fetchPartners}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {sortedPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="h-32 sm:h-40 bg-gray-50 flex items-center justify-center p-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/imgs/2-3.png";
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                  <button
                    onClick={() => openEdit(partner)}
                    className="p-2 bg-white text-[#21214f] hover:bg-blue-50 rounded-lg transition-colors shadow-sm"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(partner)}
                    className="p-2 bg-white text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 text-center border-t border-gray-50 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-[#21214f] text-sm sm:text-base line-clamp-1">
                  {partner.name}
                </h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#da8827] flex items-center justify-center gap-1 mt-1 hover:underline"
                  >
                    <ExternalLink size={10} />
                    زيارة الموقع
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "تعديل بيانات الشريك" : "إضافة شريك جديد"}
        size="md"
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
                "إضافة الشريك"
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
              label="شعار الشريك *"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              اسم الشريك <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
              placeholder="اسم الشركة"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              رابط الموقع (اختياري)
            </label>
            <div className="relative">
              <ExternalLink
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                dir="ltr"
                placeholder="https://example.com"
              />
            </div>
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
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف الشريك"
        message={`هل أنت متأكد من حذف "${deleteTarget?.name || ""}"؟`}
        confirmText="نعم، احذف"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
