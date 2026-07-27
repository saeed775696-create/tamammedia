"use client"

import { useState } from "react"
import { Trash2, Edit2, Users, Quote } from "lucide-react"
import { CrudPage } from "@/components/dashboard/CrudPage"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import ImageUpload from "@/components/dashboard/ImageUpload"

type TeamMember = {
  id: string
  name: string
  role: string
  bio?: string | null
  imageUrl?: string | null
  order: number
}

export default function TeamDashboard() {
  const [form, setForm] = useState({ name: "", role: "", bio: "", imageUrl: "", order: 0 })

  return (
    <CrudPage<TeamMember>
      endpoint="/api/team"
      formData={form}
      itemName="عضو الفريق"
      pageTitle="فريق العمل"
      pageSubtitle="إدارة أعضاء الفريق وإبراز كفاءات الشركة"
      emptyIcon={<Users size={40} />}
      emptyTitle="لا يوجد أعضاء في الفريق"
      emptyDescription="ابدأ ببناء فريقك عبر إضافة العضو الأول"
      emptyActionLabel="أضف عضو الآن"
      searchPlaceholder="ابحث باسم العضو أو مسماه الوظيفي..."
      searchFields={["name", "role"]}
      onOpenAdd={() => setForm({ name: "", role: "", bio: "", imageUrl: "", order: 0 })}
      onOpenEdit={(item) => setForm({ name: item.name, role: item.role, bio: item.bio || "", imageUrl: item.imageUrl || "", order: item.order || 0 })}
      renderCard={(member, { onEdit, onDelete }) => (
        <Card className="group overflow-hidden hover:-translate-y-1 transition-all p-0 flex flex-col">
          <div className="pt-8 pb-6 px-6 text-center relative z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-brand-50 text-brand-700 flex items-center justify-center mb-4 border-4 border-white shadow-md group-hover:border-accent-200 group-hover:shadow-lg transition-all overflow-hidden relative">
              {member.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-3xl font-black">${member.name.charAt(0)}</span>`
                    }
                  }}
                />
              ) : (
                <span className="text-3xl font-black">{member.name.charAt(0)}</span>
              )}
            </div>
            <h3 className="font-bold text-brand-900 text-base sm:text-lg mb-1 truncate">{member.name}</h3>
            <p className="text-[13px] text-accent-500 font-bold truncate">{member.role}</p>
            {member.bio && (
              <p className="text-[12px] text-surface-500 mt-3 line-clamp-3 leading-relaxed relative px-4">
                <Quote size={12} className="absolute end-0 top-0 text-surface-200 rotate-180" />
                {member.bio}
              </p>
            )}
          </div>
          <div className="bg-surface-50 px-6 py-3 border-t border-surface-200 flex items-center justify-between mt-auto">
            <span className="text-[11px] font-bold text-surface-400">ترتيب العرض: {member.order}</span>
            <div className="flex gap-2">
              <IconButton variant="ghost" icon={<Edit2 size={14} />} onClick={onEdit} aria-label="تعديل" />
              <IconButton variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" icon={<Trash2 size={14} />} onClick={onDelete} aria-label="حذف" />
            </div>
          </div>
        </Card>
      )}
      renderModal={(crud) => (
        <Modal isOpen={crud.isAddModalOpen} onClose={() => crud.setIsAddModalOpen(false)} title={crud.editItem ? "تحديث بيانات العضو" : "إضافة عضو جديد للفريق"} className="max-w-2xl">
          <div className="space-y-6 mt-4">
            <div className="bg-gradient-to-r from-brand-50 to-surface-50 p-5 rounded-2xl border border-brand-100/50 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm">
              <div className="bg-white p-2.5 rounded-xl shadow-sm shrink-0"><Users className="text-brand-500" size={24} strokeWidth={1.5} /></div>
              <div className="flex-1 text-center sm:text-start">
                <h4 className="text-[15px] font-bold text-brand-900">بيانات عضو الفريق</h4>
                <p className="text-[13px] text-surface-500 mt-1.5 leading-relaxed">يُفضل رفع صور ذات خلفية موحدة (مثل الرمادي أو الأبيض) وبجودة عالية لضمان مظهر احترافي وموحد للفريق.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
              <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="الصورة الشخصية للعضو" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-5 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm">
                <h5 className="text-[13px] font-extrabold text-surface-400 uppercase tracking-wider mb-4 border-b border-surface-100 pb-2">التفاصيل الشخصية والوظيفية</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-accent-500" /> الاسم الكامل <span className="text-red-500">*</span></label>
                    <Input name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="مثال: أحمد محمد" className="bg-surface-50 focus:bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Edit2 size={14} className="text-accent-500" /> المسمى الوظيفي <span className="text-red-500">*</span></label>
                    <Input name="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} placeholder="مثال: المدير التنفيذي" className="bg-surface-50 focus:bg-white" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Quote size={14} className="text-accent-500" /> نبذة قصيرة <span className="text-surface-400 font-normal">(اختياري)</span></label>
                    <Textarea name="bio" value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} rows={3} placeholder="اكتب نبذة مختصرة عن خبراته ودوره..." className="bg-surface-50 focus:bg-white" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-surface-100 shadow-sm space-y-4 max-w-sm">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-surface-700"><Users size={14} className="text-surface-400" /> ترتيب الظهور في الموقع</label>
                  <Input type="number" name="order" value={form.order} onChange={(e) => setForm({...form, order: Number(e.target.value)})} min={0} className="bg-surface-50 focus:bg-white" />
                  <p className="text-[11px] text-surface-400 mt-1.5">أصحاب الأرقام الأقل يظهرون أولاً.</p>
                </div>
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
        <ConfirmDialog isOpen={!!crud.deleteItem} onClose={() => crud.setDeleteItem(null)} onConfirm={() => crud.removeItem(crud.deleteItem!.id)} title="إزالة عضو" description={`هل أنت متأكد من إزالة "${crud.deleteItem?.name || ""}" من قائمة الفريق؟ لن يظهر مجدداً في الموقع.`} isLoading={crud.isSubmitting} />
      )}
    />
  )
}
