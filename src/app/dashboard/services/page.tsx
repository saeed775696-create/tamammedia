"use client"

import { useState } from "react"
import { Trash2, Edit2, LayoutGrid, Wrench, ListOrdered, Tag } from "lucide-react"
import { CrudPage } from "@/components/dashboard/CrudPage"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import ImageUpload from "@/components/dashboard/ImageUpload"

type Service = {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  imageUrl?: string | null
  order: number
}

export default function ServicesDashboard() {
  const [form, setForm] = useState({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", imageUrl: "", order: 0 })

  return (
    <CrudPage<Service>
      endpoint="/api/services"
      itemName="الخدمة"
      pageTitle="خدمات الشركة"
      pageSubtitle="إدارة الخدمات التي تقدمها لعملائك"
      emptyIcon={<Wrench size={40} />}
      emptyTitle="قائمة الخدمات فارغة"
      emptyDescription="ابدأ الآن في بناء قائمة خدماتك لتقديمها لزوار موقعك"
      emptyActionLabel="أضف الخدمة الأولى"
      searchPlaceholder="ابحث في الخدمات المتوفرة..."
      searchFields={["titleAr", "titleEn", "descriptionAr"]}
      onOpenAdd={() => setForm({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", imageUrl: "", order: 0 })}
      onOpenEdit={(item) => setForm({ titleEn: item.titleEn, titleAr: item.titleAr, descriptionEn: item.descriptionEn, descriptionAr: item.descriptionAr, imageUrl: item.imageUrl || "", order: item.order || 0 })}
      renderCard={(service, { onEdit, onDelete }) => (
        <Card className="group overflow-hidden hover:-translate-y-1 transition-all p-0 flex flex-col">
          <div className="relative h-40 bg-surface-100 overflow-hidden flex items-center justify-center p-6 border-b border-surface-200 rounded-t-2xl">
            {service.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={service.imageUrl} alt={service.titleAr} className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" />
            ) : (
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-accent-500/30 shadow-inner">
                <LayoutGrid size={40} />
              </div>
            )}
            <span className="absolute top-3 end-3 bg-white/90 backdrop-blur-md text-[11px] px-2.5 py-1 rounded-md font-bold text-surface-500 shadow-sm flex items-center gap-1">
              <ListOrdered size={12} />
              ترتيب: {service.order}
            </span>
            <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <IconButton variant="secondary" icon={<Edit2 size={16} />} onClick={onEdit} aria-label="تعديل الخدمة" />
              <IconButton variant="danger" icon={<Trash2 size={16} />} onClick={onDelete} aria-label="حذف الخدمة" />
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-brand-900 text-base sm:text-lg mb-1 flex items-center gap-2">{service.titleAr}</h3>
            <p className="text-[12px] font-medium text-accent-500 mb-3 uppercase tracking-wider" dir="ltr">{service.titleEn}</p>
            {service.descriptionAr && (
              <p className="text-[13px] text-surface-600 line-clamp-3 leading-relaxed">{service.descriptionAr}</p>
            )}
          </div>
        </Card>
      )}
      renderModal={(crud) => (
        <Modal isOpen={crud.isAddModalOpen} onClose={() => crud.setIsAddModalOpen(false)} title={crud.editItem ? "تعديل تفاصيل الخدمة" : "إضافة خدمة جديدة"} className="max-w-3xl">
          <div className="space-y-6 mt-4">
            <div className="bg-gradient-to-r from-accent-50 to-surface-50 p-5 rounded-2xl border border-accent-100/50 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
              <div className="bg-white p-2.5 rounded-xl shadow-sm shrink-0"><Tag className="text-accent-500" size={24} strokeWidth={1.5} /></div>
              <div className="flex-1 text-center sm:text-start">
                <h4 className="text-[15px] font-bold text-accent-900">المظهر البصري وتفاصيل الخدمة</h4>
                <p className="text-[13px] text-accent-700/80 mt-1.5 leading-relaxed">يُفضل رفع أيقونات بخلفية شفافة (PNG أو SVG) لتبدو متناسقة مع تصميم الموقع.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
              <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="أيقونة أو صورة الخدمة *" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2">النسخة العربية</h5>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-brand-500" /> العنوان بالعربية <span className="text-red-500">*</span></label>
                    <Input name="titleAr" value={form.titleAr} onChange={(e) => setForm({...form, titleAr: e.target.value})} placeholder="مثال: تطوير الويب" className="bg-surface-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-brand-500" /> الوصف بالعربية <span className="text-red-500">*</span></label>
                    <Textarea name="descriptionAr" value={form.descriptionAr} onChange={(e) => setForm({...form, descriptionAr: e.target.value})} rows={4} placeholder="اكتب وصفاً موجزاً ومقنعاً لهذه الخدمة..." className="bg-surface-50 focus:bg-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2 text-left" dir="ltr">English Version</h5>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-end gap-2 text-[13px] font-bold text-surface-700" dir="ltr"><Edit2 size={14} className="text-brand-500" /> English Title <span className="text-red-500">*</span></label>
                    <Input name="titleEn" value={form.titleEn} onChange={(e) => setForm({...form, titleEn: e.target.value})} dir="ltr" placeholder="Example: Web Development" className="bg-surface-50 focus:bg-white text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-end gap-2 text-[13px] font-bold text-surface-700" dir="ltr"><Edit2 size={14} className="text-brand-500" /> English Description <span className="text-red-500">*</span></label>
                    <Textarea name="descriptionEn" value={form.descriptionEn} onChange={(e) => setForm({...form, descriptionEn: e.target.value})} rows={4} dir="ltr" placeholder="Write a brief, compelling description..." className="bg-surface-50 focus:bg-white text-left" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm space-y-4 max-w-sm">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><ListOrdered size={14} className="text-surface-400" /> الترتيب الأولي للظهور</label>
                <Input type="number" name="order" value={form.order} onChange={(e) => setForm({...form, order: Number(e.target.value)})} min={0} className="bg-surface-50 focus:bg-white" />
                <p className="text-[11px] text-surface-400 mt-1.5">أصحاب الأرقام الأقل يظهرون أولاً (مثال: 0، 1، 2).</p>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-surface-100">
              <Button variant="outline" onClick={() => crud.setIsAddModalOpen(false)} disabled={crud.isSubmitting} className="min-w-[120px]">إلغاء الأمر</Button>
              <Button variant="primary" onClick={crud.handleSave} isLoading={crud.isSubmitting} className="min-w-[160px] shadow-md shadow-brand-500/20">{crud.editItem ? "حفظ التعديلات" : "اعتماد وإضافة"}</Button>
            </div>
          </div>
        </Modal>
      )}
      renderConfirmDialog={(crud) => (
        <ConfirmDialog isOpen={!!crud.deleteItem} onClose={() => crud.setDeleteItem(null)} onConfirm={() => crud.removeItem(crud.deleteItem!.id)} title="حذف الخدمة نهائياً" description={`هل أنت متأكد من رغبتك في حذف خدمة "${crud.deleteItem?.titleAr || ""}"؟ سيؤدي ذلك لإزالتها من صفحات الموقع فوراً.`} isLoading={crud.isSubmitting} />
      )}
    />
  )
}