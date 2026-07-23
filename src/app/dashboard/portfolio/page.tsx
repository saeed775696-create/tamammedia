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
    if (saving) return; // منع النقر المزدوج

    // Validation
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
      const res = await fetch("/api/upload", { method: "POST", body: formData });
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
      toast.error(
        err instanceof Error ? err.message : "فشل رفع الصورة",
        { id: loadingToast }
      );
    }
  };

  // Filter + search
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
    // Featured first, then by creation order (already from API)
    return result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [items, search, categoryFilter]);

  const categories = Object.keys(categoryLabels);

  return (
    <div>
      <PageHeader
        title="الأعمال"
        subtitle="إدارة معرض الأعمال والمشاريع"
        breadcrumbs={[{ label: "الرئيسية", href: "/dashboard" }, { label: "الأعمال" }]}
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#da8827] text-white px-5 py-2.5 rounded-xl hover:bg-[#c07520] transition-all shadow-md shadow-[#da8827]/20 font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة عمل</span>
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="بحث بالعنوان أو اسم العميل..."
        />
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter size={16} className="text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
          icon={<FolderOpen size={36} />}
          title={search || categoryFilter !== "all" ? "لا توجد نتائج" : "لا توجد أعمال بعد"}
          description={
            search || categoryFilter !== "all"
              ? "جرّب تغيير معايير البحث"
              : "ابدأ بإضافة أول عمل لمعرضك"
          }
          actionLabel={search || categoryFilter !== "all" ? undefined : "إضافة عمل"}
          onAction={search || categoryFilter !== "all" ? undefined : openAdd}
          retryLabel="تحديث"
          onRetry={fetchItems}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-44 sm:h-48 bg-gray-100">
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
                  <span className="absolute top-2 left-2 bg-[#da8827] text-white p-1.5 rounded-full shadow-md">
                    <Star size={14} fill="white" />
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full font-medium text-[#21214f] shadow-sm">
                  {categoryLabels[item.category] || item.category}
                </span>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-3 bg-white/95 hover:bg-white text-[#21214f] rounded-xl transition-all shadow-md hover:scale-110"
                    title="تعديل"
                    aria-label="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-3 bg-white/95 hover:bg-white text-red-600 rounded-xl transition-all shadow-md hover:scale-110"
                    title="حذف"
                    aria-label="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                  {item.titleAr}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {item.titleEn}
                </p>
                {item.clientName && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <span>👤</span>
                    {item.clientName}
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
                "إضافة العمل"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                العنوان العربي <span className="text-red-500">*</span>
              </label>
              <input
                name="titleAr"
                value={form.titleAr}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="مثال: متجر فلك"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                العنوان الإنجليزي <span className="text-red-500">*</span>
              </label>
              <input
                name="titleEn"
                value={form.titleEn}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="Example: Falak Store"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              الصورة <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium">
                <Plus size={16} />
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
                className="flex-1 border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                dir="ltr"
              />
            </div>
            {form.imageUrl && (
              <div className="mt-3 inline-block p-2 bg-white rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imageUrl}
                  alt="معاينة"
                  className="h-24 w-24 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0.3";
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                التصنيف
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all bg-white"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                اسم العميل
              </label>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#da8827] focus:border-transparent outline-none transition-all"
                placeholder="اختياري"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-[#da8827]"
            />
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Star size={16} className="text-[#da8827]" />
              مشروع مميز (يظهر في المقدمة)
            </span>
          </label>
        </div>
      </Modal>

      {/* Delete confirmation */}
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
