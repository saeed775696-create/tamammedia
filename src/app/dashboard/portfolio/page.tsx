"use client"

import { useState, useMemo } from "react"
import { Trash2, Edit2, Star, FolderOpen, Filter, Search, Image as ImageIcon, Users } from "lucide-react"
import toast from "react-hot-toast"
import { CrudPage } from "@/components/dashboard/CrudPage"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"

type PortfolioItem = {
  id: string
  titleAr: string
  titleEn: string
  imageUrl: string
  category: string
  clientName?: string | null
  featured: boolean
}

const categoryLabels: Record<string, string> = {
  branding: "هوية بصرية",
  video: "فيديو",
  social: "سوشيال ميديا",
  website: "موقع إلكتروني",
  ecommerce: "متجر إلكتروني",
}

export default function PortfolioDashboard() {
  const [form, setForm] = useState({ titleEn: "", titleAr: "", imageUrl: "", category: "branding", clientName: "", featured: false })
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return toast.error("يُسمح برفع الصور فقط")
    if (file.size > 5 * 1024 * 1024) return toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت")

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("فشل رفع الصورة")
      const data = await res.json()
      const url = data?.data?.url || data?.url
      if (!url) throw new Error("استجابة غير متوقعة")
      setForm((prev) => ({ ...prev, imageUrl: url }))
      toast.success("تم رفع الصورة")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "فشل رفع الصورة")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <CrudPage<PortfolioItem>
      endpoint="/api/portfolio"
      itemName="العمل"
      pageTitle="الأعمال والمشاريع"
      pageSubtitle="إدارة معرض الأعمال والمشاريع السابقة"
      emptyIcon={<FolderOpen size={40} />}
      emptyTitle="لا توجد أعمال في المعرض"
      emptyDescription="ابدأ بإضافة أول مشروع لعرضه على زوار الموقع بكل فخر"
      emptyActionLabel="إضافة عمل جديد"
      searchPlaceholder="ابحث بعنوان العمل أو اسم العميل..."
      searchFields={["titleAr", "titleEn", "clientName"]}
      onOpenAdd={() => setForm({ titleEn: "", titleAr: "", imageUrl: "", category: "branding", clientName: "", featured: false })}
      onOpenEdit={(item) => setForm({ titleEn: item.titleEn, titleAr: item.titleAr, imageUrl: item.imageUrl, category: item.category, clientName: item.clientName || "", featured: item.featured })}
      renderFilters={() => (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide px-1">
          <Filter size={16} className="text-surface-400 shrink-0 ms-1 hidden md:block" />
          <Button variant={categoryFilter === "all" ? "primary" : "outline"} size="sm" onClick={() => setCategoryFilter("all")}>الكل</Button>
          {Object.keys(categoryLabels).map((cat) => (
            <Button key={cat} variant={categoryFilter === cat ? "secondary" : "outline"} size="sm" onClick={() => setCategoryFilter(cat)}>{categoryLabels[cat]}</Button>
          ))}
        </div>
      )}
      renderCard={(item, { onEdit, onDelete }) => (
        <Card key={item.id} className="group overflow-hidden hover:-translate-y-1 transition-all p-0">
          <div className="relative h-48 sm:h-56 bg-surface-100 overflow-hidden rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" onError={(e) => { e.currentTarget.src = "/imgs/2-3.png" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            {item.featured && (
              <span className="absolute top-3 end-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white p-1.5 rounded-lg shadow-lg backdrop-blur-md">
                <Star size={14} fill="white" strokeWidth={0} />
              </span>
            )}
            <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-md text-[11px] px-2.5 py-1 rounded-md font-bold text-brand-900 shadow-sm">
              {categoryLabels[item.category] || item.category}
            </span>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <IconButton variant="secondary" icon={<Edit2 size={16} />} onClick={onEdit} aria-label="تعديل" />
              <IconButton variant="danger" icon={<Trash2 size={16} />} onClick={onDelete} aria-label="حذف" />
            </div>
          </div>
          <div className="p-4 sm:p-5 relative">
            <h3 className="font-bold text-brand-900 text-base sm:text-lg line-clamp-1 mb-1">{item.titleAr}</h3>
            <p className="text-[13px] font-medium text-surface-500 line-clamp-1">{item.titleEn}</p>
            {item.clientName && (
              <div className="mt-3 pt-3 border-t border-surface-100 flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-100 text-accent-600">
                  <Users size={12} strokeWidth={3} />
                </div>
                <span className="text-[12px] font-bold text-surface-600 truncate">{item.clientName}</span>
              </div>
            )}
          </div>
        </Card>
      )}
      renderModal={(crud) => (
        <Modal isOpen={crud.isAddModalOpen} onClose={() => crud.setIsAddModalOpen(false)} title={crud.editItem ? "تعديل بيانات العمل" : "إضافة عمل جديد للمعرض"}>
          <div className="space-y-6 mt-4">
            <div className="bg-gradient-to-r from-brand-50 to-surface-50 p-5 rounded-2xl border border-brand-100/50 flex items-start gap-4 shadow-sm">
              <div className="bg-white p-2.5 rounded-xl shadow-sm"><FolderOpen className="text-brand-500" size={24} strokeWidth={1.5} /></div>
              <div>
                <h4 className="text-[15px] font-bold text-brand-900">معلومات العمل الأساسية</h4>
                <p className="text-[13px] text-surface-500 mt-1.5 leading-relaxed">أدخل تفاصيل المشروع بدقة لضمان ظهوره بشكل احترافي في معرض الأعمال.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2">التفاصيل النصية</h5>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-accent-500" /> العنوان العربي <span className="text-red-500">*</span></label>
                    <Input name="titleAr" value={form.titleAr} onChange={(e) => setForm({...form, titleAr: e.target.value})} placeholder="مثال: متجر فلك" className="bg-surface-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-accent-500" /> العنوان الإنجليزي <span className="text-red-500">*</span></label>
                    <Input name="titleEn" value={form.titleEn} onChange={(e) => setForm({...form, titleEn: e.target.value})} placeholder="Example: Falak Store" dir="ltr" className="bg-surface-50 focus:bg-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2">التصنيف والعميل</h5>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Filter size={14} className="text-accent-500" /> القسم <span className="text-red-500">*</span></label>
                    <Select name="category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-surface-50 focus:bg-white">
                      {Object.entries(categoryLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Users size={14} className="text-accent-500" /> اسم العميل <span className="text-surface-400 font-normal">(اختياري)</span></label>
                    <Input name="clientName" value={form.clientName} onChange={(e) => setForm({...form, clientName: e.target.value})} placeholder="مثال: شركة التقنية" className="bg-surface-50 focus:bg-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm space-y-4">
              <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-2 border-b border-surface-100 pb-2 flex items-center gap-2"><ImageIcon size={14} className="text-accent-500" /> صورة المشروع <span className="text-red-500">*</span></h5>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1 w-full space-y-3">
                  <Button variant="outline" className="relative overflow-hidden cursor-pointer w-full justify-center border-dashed border-2 hover:border-brand-300 hover:bg-brand-50" leftIcon={<ImageIcon size={18} className="text-brand-500" />} isLoading={isUploading}>
                    <span className="font-bold text-surface-600">انقر هنا لرفع صورة من جهازك</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="h-px bg-surface-200 flex-1"></div>
                    <span className="text-[11px] text-surface-400 font-bold uppercase">أو</span>
                    <div className="h-px bg-surface-200 flex-1"></div>
                  </div>
                  <Input name="imageUrl" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})} placeholder="ألصق رابط الصورة مباشرة..." dir="ltr" className="bg-surface-50 focus:bg-white text-[13px]" />
                </div>
                {form.imageUrl ? (
                  <div className="w-full sm:w-32 h-32 rounded-xl border border-surface-200 overflow-hidden relative group bg-surface-50 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.imageUrl} alt="معاينة" className="w-full h-full object-cover transition-transform group-hover:scale-105" onError={(e) => { e.currentTarget.style.opacity = "0.3" }} />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl"></div>
                  </div>
                ) : (
                  <div className="w-full sm:w-32 h-32 rounded-xl border border-dashed border-surface-300 bg-surface-50 flex items-center justify-center shrink-0">
                    <ImageIcon size={24} className="text-surface-300" />
                  </div>
                )}
              </div>
            </div>
            <label className="flex items-start gap-4 cursor-pointer p-5 bg-gradient-to-r from-amber-50 to-white border border-amber-200/60 rounded-2xl hover:border-amber-300 hover:shadow-sm transition-all group">
              <div className="pt-0.5 relative">
                <input type="checkbox" name="featured" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-surface-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 flex items-center justify-center transition-colors">
                  <Star size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[15px] font-bold text-amber-900 flex items-center gap-2 group-hover:text-amber-700 transition-colors"><Star size={18} className="text-amber-500" fill="currentColor" /> تمييز هذا المشروع في الصفحة الرئيسية</span>
                <p className="text-[13px] text-amber-700/80 mt-1">المشاريع المميزة تحصل على نسبة ظهور أعلى وتلفت انتباه زوار الموقع بشكل أكبر.</p>
              </div>
            </label>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-surface-100">
              <Button variant="outline" onClick={() => crud.setIsAddModalOpen(false)} disabled={crud.isSubmitting} className="min-w-[120px]">إلغاء الأمر</Button>
              <Button variant="primary" onClick={crud.handleSave} isLoading={crud.isSubmitting} className="min-w-[160px] shadow-md shadow-brand-500/20">{crud.editItem ? "حفظ التعديلات" : "إضافة المشروع"}</Button>
            </div>
          </div>
        </Modal>
      )}
      renderConfirmDialog={(crud) => (
        <ConfirmDialog isOpen={!!crud.deleteItem} onClose={() => crud.setDeleteItem(null)} onConfirm={() => crud.removeItem(crud.deleteItem!.id)} title="حذف العمل نهائياً" description={`هل أنت متأكد من حذف "${crud.deleteItem?.titleAr || ""}"؟ لا يمكن التراجع عن هذا الإجراء وسيتم إزالته من الموقع فوراً.`} isLoading={crud.isSubmitting} />
      )}
    />
  )
}