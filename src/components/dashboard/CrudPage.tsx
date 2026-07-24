"use client"

import React, { useMemo } from "react"
import { Plus, Search, Filter } from "lucide-react"
import { useCrud } from "@/hooks/useCrud"
import PageHeader from "@/components/dashboard/PageHeader"
import LoadingState from "@/components/dashboard/LoadingState"
import ErrorState from "@/components/dashboard/ErrorState"
import EmptyState from "@/components/dashboard/EmptyState"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export interface CrudPageProps<T extends { id: string | number }> {
  endpoint: string
  itemName: string
  pageTitle: string
  pageSubtitle: string
  emptyIcon?: React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  emptyActionLabel?: string
  searchPlaceholder?: string
  searchFields?: (keyof T)[]
  renderFilters?: () => React.ReactNode
  renderCard: (item: T, actions: { onEdit: () => void; onDelete: () => void }) => React.ReactNode
  renderModal: (
    crud: ReturnType<typeof useCrud<T>> & {
      form: Record<string, unknown>
      setForm: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
      handleSave: () => Promise<void>
      handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    }
  ) => React.ReactNode
  renderConfirmDialog: (crud: ReturnType<typeof useCrud<T>>) => React.ReactNode
  onOpenAdd?: (crud: ReturnType<typeof useCrud<T>>) => void
  onOpenEdit?: (item: T, crud: ReturnType<typeof useCrud<T>>) => void
}

export function CrudPage<T extends { id: string | number }>({
  endpoint,
  itemName,
  pageTitle,
  pageSubtitle,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  searchPlaceholder,
  searchFields,
  renderFilters,
  renderCard,
  renderModal,
  renderConfirmDialog,
  onOpenAdd,
  onOpenEdit,
}: CrudPageProps<T>) {
  const crud = useCrud<T>({ endpoint, itemName })
  const [search, setSearch] = React.useState("")
  const [form, setForm] = React.useState<Record<string, unknown>>({})

  const filteredItems = useMemo(() => {
    let result = [...crud.data]
    if (search.trim() && searchFields && searchFields.length > 0) {
      const q = search.trim().toLowerCase()
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          return value != null && String(value).toLowerCase().includes(q)
        })
      )
    }
    return result
  }, [crud.data, search, searchFields])

  const handleSave = async () => {
    if (crud.editItem) {
      await crud.updateItem(crud.editItem.id, form as Record<string, unknown>, true)
    } else {
      await crud.createItem(form as Record<string, unknown>, true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const openAdd = () => {
    setForm({})
    crud.setEditItem(null)
    crud.setIsAddModalOpen(true)
    onOpenAdd?.(crud)
  }

  const openEdit = (item: T) => {
    crud.setEditItem(item)
    crud.setIsAddModalOpen(true)
    onOpenEdit?.(item, crud)
  }

  return (
    <div className="pb-10">
      <PageHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        actions={
          <Button onClick={openAdd} variant="primary" leftIcon={<Plus size={18} />}>
            <span className="hidden sm:inline">إضافة {itemName} جديد</span>
            <span className="sm:hidden">إضافة</span>
          </Button>
        }
      />

      {(searchFields || renderFilters) && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-surface-50 p-3 rounded-2xl border border-surface-200">
          {searchFields && (
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none text-surface-400 group-focus-within:text-brand-500 transition-colors">
                <Search size={18} />
              </div>
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder || `ابحث في ${itemName}...`}
                className="ps-11 pe-11 bg-white"
              />
            </div>
          )}
          {renderFilters?.()}
        </div>
      )}

      {crud.isLoading ? (
        <LoadingState text={`جاري جلب ${itemName} من الخادم...`} />
      ) : crud.error ? (
        <ErrorState message={crud.error} onRetry={crud.fetchData} />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={search ? "لا توجد نتائج مطابقة لبحثك" : emptyTitle || `لا توجد ${itemName} بعد`}
          description={
            search
              ? "جرّب استخدام كلمات مفتاحية مختلفة"
              : emptyDescription || `ابدأ بإضافة أول ${itemName} الآن`
          }
          actionLabel={search ? undefined : emptyActionLabel || `إضافة ${itemName} جديد`}
          onAction={search ? undefined : openAdd}
          retryLabel="تحديث الصفحة"
          onRetry={crud.fetchData}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) =>
            renderCard(item, {
              onEdit: () => openEdit(item),
              onDelete: () => crud.setDeleteItem(item),
            })
          )}
        </div>
      )}

      {crud.isAddModalOpen && (
        <div className="modal-wrapper">
          {renderModal({
            ...crud,
            form,
            setForm,
            handleSave,
            handleChange,
          })}
        </div>
      )}

      {renderConfirmDialog(crud)}
    </div>
  )
}