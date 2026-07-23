"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2, LayoutGrid, Wrench } from "lucide-react";
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

type Service = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl?: string | null;
  order: number;
};

type Form = {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  order: number;
};

const emptyForm: Form = {
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  imageUrl: "",
  order: 0,
};

export default function ServicesDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("فشل تحميل الخدمات");
      const data = await res.json();
      setServices(extractItems<Service>(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الخدمات"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loadingToast = toast.loading("جارٍ الحذف...");
    try {
      const res = await fetch(`/api/services/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toast.success("تم حذف الخدمة", { id: loadingToast });
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

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      titleEn: service.titleEn || "",
      titleAr: service.titleAr || "",
      descriptionEn: service.descriptionEn || "",
      descriptionAr: service.descriptionAr || "",
      imageUrl: service.imageUrl || "",
      order: service.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (saving) return;

    if (!form.titleAr.trim()) {
      toast.error("العنوان بالعربية مطلوب");
      return;
    }
    if (!form.titleEn.trim()) {
      toast.error("العنوان بالإنجليزية مطلوب");
      return;
    }
    if (!form.descriptionAr.trim()) {
      toast.error("الوصف بالعربية مطلوب");
      return;
    }
    if (!form.descriptionEn.trim()) {
      toast.error("الوصف بالإنجليزية مطلوب");
      return;
    }

    setSaving(true);
    const loadingToast = toast.loading("جارٍ الحفظ...");
    try {
      const url = editingId ? `/api/services/${editingId}` : "/api/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الحفظ");

      toast.success(editingId ? "تم تعديل الخدمة" : "تمت إضافة الخدمة", {
        id: loadingToast,
      });
      setShowModal(false);
      fetchServices();
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sortedServices = useMemo(() => {
    let result = [...services];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.titleAr.toLowerCase().includes(q) ||
          s.titleEn.toLowerCase().includes(q) ||
          s.descriptionAr.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.order - b.order);
  }, [services, search]);

  return (
    <div>
      <PageHeader
        title="الخدمات"
        subtitle="إدارة الخدمات التي تقدمها الشركة"
        breadcrumbs={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "الخدمات" },
        ]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-[#da8827] text-white px-3.5 py-2 rounded-lg hover:bg-[#b8701e] transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">إضافة خدمة</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        }
      />

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="بحث في الخدمات..."
        />
      </div>

      {loading ? (
        <LoadingState text="جارٍ تحميل الخدمات..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchServices} />
      ) : sortedServices.length === 0 ? (
        <EmptyState
          icon={<Wrench size={32} />}
          title={search ? "لا توجد نتائج" : "لا توجد خدمات بعد"}
          description={
            search ? "جرّب تغيير كلمات البحث" : "ابدأ بإضافة أول خدمة لشركتك"
          }
          actionLabel={search ? undefined : "إضافة خدمة"}
          onAction={search ? undefined : openAdd}
          retryLabel="تحديث"
          onRetry={fetchServices}
        />
      ) : (
        // Grid أنيق بـ 3-4 أعمدة، صور أصغر
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sortedServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all flex flex-col"
            >
              <div className="relative h-24 sm:h-28 bg-gray-50 overflow-hidden">
                {service.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.imageUrl}
                    alt={service.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <LayoutGrid size={32} />
                  </div>
                )}
                <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  #{service.order}
                </span>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-2 bg-white/95 hover:bg-white text-[#21214f] rounded-lg transition-all hover:scale-110"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(service)}
                    className="p-2 bg-white/95 hover:bg-white text-red-600 rounded-lg transition-all hover:scale-110"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-[#21214f] text-[13px] sm:text-sm line-clamp-1">
                  {service.titleAr}
                </h3>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5" dir="ltr">
                  {service.titleEn}
                </p>
                {service.descriptionAr && (
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-1.5 flex-1">
                    {service.descriptionAr}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
        size="xl"
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
                "إضافة الخدمة"
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
              label="صورة أو أيقونة الخدمة"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  العنوان بالعربية <span className="text-red-500">*</span>
                </label>
                <input
                  name="titleAr"
                  value={form.titleAr}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  الوصف بالعربية <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descriptionAr"
                  value={form.descriptionAr}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
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
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  العنوان بالإنجليزية <span className="text-red-500">*</span>
                </label>
                <input
                  name="titleEn"
                  value={form.titleEn}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  الوصف بالإنجليزية <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descriptionEn"
                  value={form.descriptionEn}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف الخدمة"
        message={`هل أنت متأكد من حذف "${deleteTarget?.titleAr || ""}"؟ لا يمكن التراجع.`}
        confirmText="نعم، احذف"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
