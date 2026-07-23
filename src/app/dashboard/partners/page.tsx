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
        breadcrumbs={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "الشركاء" },
        ]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-[#da8827] text-white px-3.5 py-2 rounded-lg hover:bg-[#b8701e] transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">إضافة شريك</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        }
      />

      <div className="mb-5">
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
          icon={<Briefcase size={32} />}
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
        // Grid — 3-5 أعمدة، لوجوهات أنيقة الحجم
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {sortedPartners.map((partner) => (
            <div
              key={partner.id}
              className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all flex flex-col"
            >
              <div className="h-20 sm:h-24 bg-gray-50 flex items-center justify-center p-3 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/imgs/2-3.png";
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-sm">
                  <button
                    onClick={() => openEdit(partner)}
                    className="p-1.5 bg-white text-[#21214f] hover:bg-blue-50 rounded-md transition-colors shadow-sm"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(partner)}
                    className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded-md transition-colors shadow-sm"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-2 text-center border-t border-gray-50 flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-[#21214f] text-[12px] sm:text-[13px] line-clamp-1">
                  {partner.name}
                </h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#da8827] flex items-center justify-center gap-1 mt-0.5 hover:underline"
                  >
                    <ExternalLink size={9} />
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
                "إضافة الشريك"
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
              label="شعار الشريك *"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              اسم الشريك <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
              placeholder="اسم الشركة"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              رابط الموقع (اختياري)
            </label>
            <div className="relative">
              <ExternalLink
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 pl-9 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                dir="ltr"
                placeholder="https://example.com"
              />
            </div>
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
