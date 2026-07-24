"use client"

import { useMemo, useState } from "react"
import {
  CheckCircle,
  Eye,
  Mail,
  MessageSquare,
  Trash2,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react"
import toast from "react-hot-toast"
import { useCrud } from "@/hooks/useCrud"
import PageHeader from "@/components/dashboard/PageHeader"
import LoadingState from "@/components/dashboard/LoadingState"
import ErrorState from "@/components/dashboard/ErrorState"
import EmptyState from "@/components/dashboard/EmptyState"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { IconButton } from "@/components/ui/IconButton"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

type Contact = {
  id: string
  name: string
  email: string
  phone?: string | null
  service?: string | null
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

type StatusFilter = "all" | "new" | "read" | "replied"

const statusConfig = {
  new: { label: "جديد", variant: "danger" as const },
  read: { label: "مقروء", variant: "secondary" as const },
  replied: { label: "تم الرد", variant: "success" as const },
}

export default function ContactsDashboard() {
  const {
    data: contacts,
    isLoading,
    error,
    fetchData,
    deleteItem,
    setDeleteItem,
    removeItem,
    isSubmitting
  } = useCrud<Contact>({
    endpoint: "/api/contacts",
    itemName: "الرسالة",
  })

  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [search, setSearch] = useState("")

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("فشل التحديث")

      toast.success("تم تحديث الحالة")
      fetchData()
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: status as Contact["status"] })
      }
    } catch {
      toast.error("حدث خطأ أثناء التحديث")
    }
  }

  const handleViewMessage = (contact: Contact) => {
    setSelectedMessage(contact)
    if (contact.status === "new") {
      updateStatus(contact.id, "read")
    }
  }

  const filteredContacts = useMemo(() => {
    let result = [...contacts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q)
      )
    }

    return result
  }, [contacts, statusFilter, search])

  const counts = useMemo(() => {
    return {
      all: contacts.length,
      new: contacts.filter((c) => c.status === "new").length,
      read: contacts.filter((c) => c.status === "read").length,
      replied: contacts.filter((c) => c.status === "replied").length,
    }
  }, [contacts])

  const statusBadge = (status: string) => {
    const cfg = statusConfig[status as keyof typeof statusConfig]
    if (!cfg) return <Badge variant="outline">{status}</Badge>
    return <Badge variant={cfg.variant}>{cfg.label}</Badge>
  }

  return (
    <div className="pb-10">
      <PageHeader
        title="الرسائل الواردة"
        subtitle="متابعة وإدارة طلبات التواصل بفعالية"
      />

      {/* Stats Filter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { key: "all" as const, label: "إجمالي الرسائل", color: "text-brand-900", activeBorder: "border-accent-500" },
          { key: "new" as const, label: "رسائل جديدة", color: "text-red-500", activeBorder: "border-red-500" },
          { key: "read" as const, label: "مقروءة", color: "text-accent-500", activeBorder: "border-accent-500" },
          { key: "replied" as const, label: "تم الرد عليها", color: "text-green-500", activeBorder: "border-green-500" },
        ].map((s) => (
          <Card
            key={s.key}
            onClick={() => setStatusFilter(s.key)}
            className={`cursor-pointer p-6 text-center flex flex-col items-center justify-center transition-all hover:-translate-y-1 ${
              statusFilter === s.key ? `ring-2 ring-offset-2 ${s.activeBorder}` : ""
            }`}
          >
            <div className={`text-4xl font-black mb-2 ${s.color}`}>
              {counts[s.key]}
            </div>
            <div className="text-sm font-bold text-surface-600">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative group">
        <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none text-surface-400 group-focus-within:text-accent-500 transition-colors">
          <Search size={20} />
        </div>
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم، البريد الإلكتروني، أو محتوى الرسالة..."
          className="ps-12 pe-12 bg-white"
        />
        <div className="absolute inset-y-0 start-4 flex items-center">
          <Filter size={18} className="text-surface-400" />
        </div>
      </div>

      {isLoading ? (
        <LoadingState text="جاري جلب الرسائل من الخادم..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchData} />
      ) : filteredContacts.length === 0 ? (
        <EmptyState
          icon={<Mail size={40} />}
          title={search || statusFilter !== "all" ? "لا توجد نتائج مطابقة لبحثك" : "صندوق الوارد فارغ"}
          description={
            search || statusFilter !== "all"
              ? "جرب استخدام كلمات مفتاحية مختلفة أو تغيير فلتر التصنيف"
              : "لم تتلق أي رسائل حتى الآن. ستظهر الرسائل الجديدة هنا تلقائياً."
          }
          retryLabel="تحديث الصفحة"
          onRetry={fetchData}
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table className="bg-white">
              <TableHeader>
                <TableRow>
                  <TableHead>المرسل</TableHead>
                  <TableHead>معلومات الاتصال</TableHead>
                  <TableHead>الخدمة المطلوبة</TableHead>
                  <TableHead>تاريخ الإرسال</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-center">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    onClick={() => handleViewMessage(contact)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 font-bold text-brand-700">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-brand-900 group-hover:text-accent-500 transition-colors">
                          {contact.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-surface-700" dir="ltr">{contact.email}</span>
                        {contact.phone && <span className="text-xs text-surface-400" dir="ltr">{contact.phone}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.service ? (
                        <Badge variant="outline">{contact.service}</Badge>
                      ) : (
                        <span className="text-surface-400 font-medium text-sm">غير محدد</span>
                      )}
                    </TableCell>
                    <TableCell className="text-surface-500 font-medium" dir="ltr">
                      {new Date(contact.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{statusBadge(contact.status)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2 justify-center">
                        <IconButton
                          variant="ghost"
                          icon={<Eye size={16} />}
                          onClick={() => handleViewMessage(contact)}
                          aria-label="عرض التفاصيل"
                        />
                        {contact.status !== "replied" && (
                          <IconButton
                            variant="ghost"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            icon={<CheckCircle size={16} />}
                            onClick={() => updateStatus(contact.id, "replied")}
                            aria-label="تعليم كمردود"
                          />
                        )}
                        <IconButton
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          icon={<Trash2 size={16} />}
                          onClick={() => setDeleteItem(contact)}
                          aria-label="حذف"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                onClick={() => handleViewMessage(contact)}
                className="cursor-pointer p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 font-bold text-brand-700">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-brand-900 truncate">
                      {contact.name}
                    </span>
                  </div>
                  {statusBadge(contact.status)}
                </div>
                
                <div className="bg-surface-50 rounded-xl p-3 mb-3">
                  <p className="text-sm text-surface-700 truncate font-medium mb-1" dir="ltr">
                    {contact.email}
                  </p>
                  {contact.phone && (
                    <p className="text-xs text-surface-400 truncate" dir="ltr">
                      {contact.phone}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-surface-500 font-medium">
                  {contact.service ? <Badge variant="outline">{contact.service}</Badge> : <span>عام</span>}
                  <span dir="ltr">
                    {new Date(contact.createdAt).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Message Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="تفاصيل رسالة التواصل"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 shadow-none">
                <p className="text-xs font-bold text-surface-400 mb-1">المرسل</p>
                <p className="font-bold text-brand-900">{selectedMessage.name}</p>
              </Card>
              <Card className="p-4 shadow-none">
                <p className="text-xs font-bold text-surface-400 mb-1">الخدمة المطلوبة</p>
                <p className="font-bold text-accent-500">
                  {selectedMessage.service || "لم يتم تحديد خدمة"}
                </p>
              </Card>
              
              <Card className="p-4 shadow-none">
                <p className="text-xs font-bold text-surface-400 mb-1">البريد الإلكتروني</p>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-2"
                  dir="ltr"
                >
                  {selectedMessage.email}
                  <ExternalLink size={14} className="shrink-0" />
                </a>
              </Card>
              
              {selectedMessage.phone && (
                <Card className="p-4 shadow-none">
                  <p className="text-xs font-bold text-surface-400 mb-1">رقم الهاتف</p>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-2"
                    dir="ltr"
                  >
                    {selectedMessage.phone}
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                </Card>
              )}
            </div>

            <Card className="p-4 shadow-none flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-bold text-surface-400 mb-1">تاريخ الإرسال</p>
                <p className="font-bold text-brand-900" dir="ltr">
                  {new Date(selectedMessage.createdAt).toLocaleString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-end">
                <p className="text-xs font-bold text-surface-400 mb-1">الحالة الحالية</p>
                {statusBadge(selectedMessage.status)}
              </div>
            </Card>

            <div className="mt-6">
              <p className="text-sm font-bold text-brand-800 mb-3 flex items-center gap-2">
                <MessageSquare size={18} className="text-accent-500" />
                محتوى الرسالة
              </p>
              <div className="bg-surface-50 border border-surface-200 p-6 rounded-2xl text-surface-700 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
               <Button
                  variant="danger"
                  leftIcon={<Trash2 size={18} />}
                  onClick={() => {
                    setSelectedMessage(null)
                    setDeleteItem(selectedMessage)
                  }}
                >
                  حذف
                </Button>
                {selectedMessage.status !== "replied" && (
                  <Button
                    variant="primary"
                    leftIcon={<CheckCircle size={18} />}
                    onClick={() => updateStatus(selectedMessage.id, "replied")}
                  >
                    تأكيد الرد
                  </Button>
                )}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => removeItem(deleteItem!.id)}
        title="حذف الرسالة نهائياً"
        description={`هل أنت متأكد من رغبتك في حذف رسالة ${deleteItem?.name || ""}؟ لن تتمكن من التراجع عن هذا الإجراء لاحقاً.`}
        isLoading={isSubmitting}
      />
    </div>
  )
}
