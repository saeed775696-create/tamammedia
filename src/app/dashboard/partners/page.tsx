"use client"

import { useState } from "react"
import { Trash2, Edit2, ExternalLink, Briefcase } from "lucide-react"
import { CrudPage } from "@/components/dashboard/CrudPage"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Input } from "@/components/ui/Input"
import ImageUpload from "@/components/dashboard/ImageUpload"
import { isSafeExternalUrl } from "@/lib/utils"

type Partner = {
  id: string
  name: string
  imageUrl: string
  website?: string | null
  order: number
}

export default function PartnersDashboard() {
  const [form, setForm] = useState({ name: "", imageUrl: "", website: "", order: 0 })

  return (
    <CrudPage<Partner>
      endpoint="/api/partners"
      formData={form}
      itemName="الشريك"
      pageTitle="شركاء النجاح"
      pageSubtitle="إدارة قائمة الشركاء والعملاء المميزين"
      emptyIcon={<Briefcase size={40} />}
      emptyTitle="لا يوجد شركاء مسجلين"
      emptyDescription="قم بإضافة عملائك وشركاء نجاحك لتعزيز ثقة زوار الموقع"
      emptyActionLabel="أضف شريكك الأول"
      searchPlaceholder="ابحث باسم الشريك أو رابطه الإلكتروني..."
      searchFields={["name", "website"]}
      onOpenAdd={() => setForm({ name: "", imageUrl: "", website: "", order: 0 })}
      onOpenEdit={(item) => setForm({ name: item.name, imageUrl: item.imageUrl, website: item.website || "", order: item.order || 0 })}
      renderCard={(partner, { onEdit, onDelete }) => (
        <Card className="group overflow-hidden hover:-translate-y-1 transition-all p-0 flex flex-col">
          <div className="h-32 bg-surface-50 flex items-center justify-center p-6 relative group-hover:bg-surface-100 transition-colors rounded-t-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.imageUrl}
              alt={partner.name}
              className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              onError={(e) => { e.currentTarget.src = "/imgs/2-3.png" }}
            />
            <div className="absolute inset-0 bg-brand-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <IconButton variant="secondary" icon={<Edit2 size={14} />} onClick={onEdit} aria-label="تعديل" />
                <IconButton variant="danger" icon={<Trash2 size={14} />} onClick={onDelete} aria-label="حذف" />
              </div>
              {isSafeExternalUrl(partner.website) && (
                <a href={partner.website ?? undefined} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-white bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1.5">
                  <ExternalLink size={12} />
                  زيارة الموقع
                </a>
              )}
            </div>
          </div>
          <div className="p-3 text-center border-t border-surface-100 flex-1 flex flex-col justify-center bg-white">
            <h3 className="font-bold text-brand-900 text-[13px] line-clamp-1">{partner.name}</h3>
            <span className="text-[10px] text-surface-400 font-medium mt-0.5">الترتيب: {partner.order}</span>
          </div>
        </Card>
      )}
      renderModal={(crud) => (
        <Modal isOpen={crud.isAddModalOpen} onClose={() => crud.setIsAddModalOpen(false)} title={crud.editItem ? "تحديث بيانات الشريك" : "إضافة شريك جديد"}>
          <div className="space-y-6 mt-4">
            <div className="bg-gradient-to-r from-brand-50 to-surface-50 p-5 rounded-2xl border border-brand-100/50 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
              <div className="bg-white p-2.5 rounded-xl shadow-sm shrink-0">
                <Briefcase className="text-brand-500" size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-center sm:text-start">
                <h4 className="text-[15px] font-bold text-brand-900">بيانات شريك النجاح</h4>
                <p className="text-[13px] text-surface-500 mt-1.5 leading-relaxed">يُفضل استخدام شعارات بصيغة PNG أو SVG ذات خلفية شفافة للحصول على أفضل مظهر في الموقع.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
              <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="شعار الشريك (اللوجو) *" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2">تفاصيل الشريك</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-accent-500" /> اسم الشريك <span className="text-red-500">*</span></label>
                    <Input name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="مثال: شركة التقنية الحديثة" className="bg-surface-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><ExternalLink size={14} className="text-accent-500" /> رابط الموقع <span className="text-surface-400 font-normal">(اختياري)</span></label>
                    <div className="relative">
                      <ExternalLink size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-surface-400" />
                      <Input name="website" value={form.website} onChange={(e) => setForm({...form, website: e.target.value})} className="ps-11 bg-surface-50 focus:bg-white" dir="ltr" placeholder="https://example.com" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm space-y-4 max-w-sm">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Briefcase size={14} className="text-surface-400" /> ترتيب الظهور في قائمة الشركاء</label>
                  <Input type="number" name="order" value={form.order} onChange={(e) => setForm({...form, order: Number(e.target.value)})} min={0} className="bg-surface-50 focus:bg-white" />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-surface-100">
              <Button variant="outline" onClick={() => crud.setIsAddModalOpen(false)} disabled={crud.isSubmitting} className="min-w-[120px]">إلغاء الأمر</Button>
              <Button variant="primary" onClick={crud.handleSave} isLoading={crud.isSubmitting} className="min-w-[160px] shadow-md shadow-brand-500/20">{crud.editItem ? "حفظ التعديلات" : "إضافة الشريك"}</Button>
            </div>
          </div>
        </Modal>
      )}
      renderConfirmDialog={(crud) => (
        <ConfirmDialog isOpen={!!crud.deleteItem} onClose={() => crud.setDeleteItem(null)} onConfirm={() => crud.removeItem(crud.deleteItem!.id)} title="إزالة شريك" description={`هل أنت متأكد من رغبتك في إزالة "${crud.deleteItem?.name || ""}" من قائمة شركاء النجاح؟`} isLoading={crud.isSubmitting} />
      )}
    />
  )
}
