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

  // Filter + sort
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
        breadcrumbs={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الخدمات" }]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-2.5 rounded-xl hover:bg-[#c07520] transition-all shadow-md shadow-[#da8827]/20 font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة خدمة</span>
          </button>
        }
      />

      <div className="mb-6">
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
          icon={<Wrench size={36} />}
          title={search ? "لا توجد نتائج" : "لا توجد خدمات بعد"}
          description={
            search
              ? "جرّب تغيير كلمات البحث"
              : "ابدأ بإضافة أول خدمة لشركتك"
          }
          actionLabel={search ? undefined : "إضافة خدمة"}
          onAction={search ? undefined : openAdd}
          retryLabel="تحديث"
          onRetry={fetchServices}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-40 sm:h-44 bg-gray-50 overflow-hidden">
                {service.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.imageUrl}
                    alt={service.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-500">
                    <LayoutGrid size={48} />
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  #{service.order}
                </span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-3 bg-white/95 hover:bg-white text-[#21214f] rounded-xl transition-all shadow-md hover:scale-110"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(service)}
                    className="p-3 bg-white/95 hover:bg-white text-red-600 rounded-xl transition-all shadow-md hover:scale-110"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-[#21214f] text-lg mb-1 line-clamp-1">
                  {service.titleAr}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-1" dir="ltr">
                  {service.titleEn}
                </p>
                {service.descriptionAr && (
                  <p className="text-xs text-gray-400 line-clamp-2 flex-1">
                    {service.descriptionAr}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
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
                "إضافة الخدمة"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="صورة أو أيقونة الخدمة"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Arabic */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  العنوان بالعربية <span className="text-red-500">*</span>
                </label>
                <input
                  name="titleAr"
                  value={form.titleAr}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  الوصف بالعربية <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descriptionAr"
                  value={form.descriptionAr}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
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
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                  className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                  min="0"
                />
              </div>
            </div>

            {/* English */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  العنوان بالإنجليزية <span className="text-red-500">*</span>
                </label>
                <input
                  name="titleEn"
                  value={form.titleEn}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  الوصف بالإنجليزية <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descriptionEn"
                  value={form.descriptionEn}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all resize-none"
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
