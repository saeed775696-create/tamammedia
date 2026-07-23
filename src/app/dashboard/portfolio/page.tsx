"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2, Star, FolderOpen, Filter } from "lucide-react";
import toast from "react-hot-toast";
import { extractItems } from "@/lib/api/extract";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import EmptyState from "@/components/dashboard/EmptyState";
import Modal from "@/components/dashboard/Modal";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import SearchInput from "@/components/dashboard/SearchInput";

type PortfolioItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  imageUrl: string;
  category: string;
  clientName?: string | null;
  featured: boolean;
};

type Form = {
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  category: string;
  clientName: string;
  featured: boolean;
};

const emptyForm: Form = {
  titleEn: "",
  titleAr: "",
  imageUrl: "",
  category: "branding",
  clientName: "",
  featured: false,
};

const categoryLabels: Record<string, string> = {
  branding: "هوية بصرية",
  video: "فيديو",
  social: "سوشيال ميديا",
  website: "موقع إلكتروني",
  ecommerce: "متجر إلكتروني",
};

export default function PortfolioDashboard() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("فشل تحميل الأعمال");
      const data = await res.json();
      setItems(extractItems<PortfolioItem>(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الأعمال"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const loadingToast = toast.loading("جارٍ الحذف...");
    try {
      const res = await fetch(`/api/portfolio/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      toast.success("تم حذف العمل", { id: loadingToast });
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

  const openEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      titleEn: item.titleEn || "",
      titleAr: item.titleAr || "",
      imageUrl: item.imageUrl || "",
      category: item.category,
      clientName: item.clientName || "",
      featured: item.featured,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (saving) return;

    if (!form.titleAr.trim()) {
      toast.error("العنوان العربي مطلوب");
      return;
    }
    if (!form.titleEn.trim()) {
      toast.error("العنوان الإنجليزي مطلوب");
      return;
    }
    if (!form.imageUrl.trim()) {
      toast.error("الصورة مطلوبة");
      return;
    }

    setSaving(true);
    const loadingToast = toast.loading("جارٍ الحفظ...");
    try {
      const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الحفظ");

      toast.success(editingId ? "تم تعديل العمل" : "تمت إضافة العمل", {
        id: loadingToast,
      });
      setShowModal(false);
      fetchItems();
    } catch {
      toast.error("حدث خطأ أثناء الحفظ", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setForm({
      ...form,
      [target.name]:
        target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يُسمح برفع الصور فقط");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    const loadingToast = toast.loading("جارٍ رفع الصورة...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message || "فشل رفع الصورة");
      }
      const data = await res.json();
      const url = data?.data?.url || data?.url;
      if (!url) throw new Error("استجابة غير متوقعة");
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success("تم رفع الصورة", { id: loadingToast });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "فشل رفع الصورة", {
        id: loadingToast,
      });
    }
  };

  const filteredItems = useMemo(() => {
    let result = [...items];
    if (categoryFilter !== "all") {
      result = result.filter((i) => i.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.titleAr.toLowerCase().includes(q) ||
          i.titleEn.toLowerCase().includes(q) ||
          (i.clientName || "").toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [items, search, categoryFilter]);

  const categories = Object.keys(categoryLabels);

  return (
    <div>
      <PageHeader
        title="الأعمال"
        subtitle="إدارة معرض الأعمال والمشاريع"
        breadcrumbs={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "الأعمال" },
        ]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-[#da8827] text-white px-3.5 py-2 rounded-lg hover:bg-[#b8701e] transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">إضافة عمل</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        }
      />

      {/* Filters — صف واحد أنيق */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="بحث بالعنوان أو اسم العميل..."
        />
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter size={14} className="text-gray-400 flex-shrink-0 ml-1" />
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-2.5 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap transition-colors ${
              categoryFilter === "all"
                ? "bg-[#21214f] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            الكل ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-[#21214f] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {categoryLabels[cat]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <LoadingState text="جارٍ تحميل الأعمال..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchItems} />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          icon={<FolderOpen size={32} />}
          title={
            search || categoryFilter !== "all"
              ? "لا توجد نتائج"
              : "لا توجد أعمال بعد"
          }
          description={
            search || categoryFilter !== "all"
              ? "جرّب تغيير معايير البحث"
              : "ابدأ بإضافة أول عمل لمعرضك"
          }
          actionLabel={
            search || categoryFilter !== "all" ? undefined : "إضافة عمل"
          }
          onAction={
            search || categoryFilter !== "all" ? undefined : openAdd
          }
          retryLabel="تحديث"
          onRetry={fetchItems}
        />
      ) : (
        // Grid — صور أصغر (h-32) بدلاً من h-48
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="relative h-28 sm:h-32 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.titleAr}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/imgs/2-3.png";
                  }}
                />
                {item.featured && (
                  <span className="absolute top-1.5 right-1.5 bg-[#da8827] text-white p-1 rounded-md shadow-sm">
                    <Star size={10} fill="white" />
                  </span>
                )}
                <span className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded font-medium text-[#21214f] shadow-sm">
                  {categoryLabels[item.category] || item.category}
                </span>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 bg-white/95 hover:bg-white text-[#21214f] rounded-lg transition-all hover:scale-110"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 bg-white/95 hover:bg-white text-red-600 rounded-lg transition-all hover:scale-110"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-gray-800 text-[13px] sm:text-sm line-clamp-1">
                  {item.titleAr}
                </h3>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  {item.titleEn}
                </p>
                {item.clientName && (
                  <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                    <span>👤</span>
                    <span className="truncate">{item.clientName}</span>
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
        title={editingId ? "تعديل العمل" : "إضافة عمل جديد"}
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
                "إضافة العمل"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                العنوان العربي <span className="text-red-500">*</span>
              </label>
              <input
                name="titleAr"
                value={form.titleAr}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="مثال: متجر فلك"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                العنوان الإنجليزي <span className="text-red-500">*</span>
              </label>
              <input
                name="titleEn"
                value={form.titleEn}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="Example: Falak Store"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              الصورة <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="flex items-center justify-center gap-1.5 cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg transition-colors text-[13px] font-medium text-gray-700">
                <Plus size={14} strokeWidth={2.5} />
                اختر صورة
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="أو الصق رابط الصورة"
                className="flex-1 border border-gray-200 rounded-lg p-2 text-[13px] focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                dir="ltr"
              />
            </div>
            {form.imageUrl && (
              <div className="mt-2 inline-block p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imageUrl}
                  alt="معاينة"
                  className="h-16 w-16 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0.3";
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                التصنيف
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all bg-white"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                اسم العميل
              </label>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="اختياري"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-[#da8827]"
            />
            <span className="text-[13px] font-medium text-gray-700 flex items-center gap-1.5">
              <Star size={14} className="text-[#da8827]" />
              مشروع مميز (يظهر في المقدمة)
            </span>
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف العمل"
        message={`هل أنت متأكد من حذف "${deleteTarget?.titleAr || ""}"؟ لا يمكن التراجع.`}
        confirmText="نعم، احذف"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
