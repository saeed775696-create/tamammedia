"use client"

import { useState, useMemo } from "react"
import { useCrud } from "@/hooks/useCrud"
import toast from "react-hot-toast"

export interface EntityCrudConfig<T, TForm> {
  endpoint: string
  itemName: string
  emptyForm: TForm
  requiredFields?: (keyof TForm)[]
  requiredFieldErrors?: Partial<Record<keyof TForm, string>>
  searchFields?: (keyof T)[]
  defaultSortField?: keyof T
  defaultSortDir?: "asc" | "desc"
  transformEdit?: (item: T) => TForm
  onSave?: (form: TForm, editItem: T | null) => Promise<boolean>
}

export function useEntityCrud<T extends { id: string | number }, TForm extends Record<string, unknown>>({
  endpoint,
  itemName,
  emptyForm,
  requiredFields = [],
  requiredFieldErrors,
  searchFields,
  defaultSortField,
  defaultSortDir = "asc",
  transformEdit,
  onSave,
}: EntityCrudConfig<T, TForm>) {
  const crud = useCrud<T>({ endpoint, itemName })
  const [form, setForm] = useState<TForm>(emptyForm)
  const [search, setSearch] = useState("")

  const openAdd = () => {
    crud.setEditItem(null)
    setForm(emptyForm)
    crud.setIsAddModalOpen(true)
  }

  const openEdit = (item: T) => {
    crud.setEditItem(item)
    setForm(transformEdit ? transformEdit(item) : emptyForm)
    crud.setIsAddModalOpen(true)
  }

  const validateForm = (): boolean => {
    for (const field of requiredFields) {
      const value = form[field]
      if (!value || (typeof value === "string" && !value.trim())) {
        const msg = requiredFieldErrors?.[field] || `حقل ${String(field)} مطلوب`
        toast.error(msg)
        return false
 }
 }
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    if (onSave) {
      const success = await onSave(form, crud.editItem)
      if (success) {
        crud.setIsAddModalOpen(false)
        crud.setEditItem(null)
        crud.fetchData()
      }
      return
    }

    // Default save logic
    if (crud.editItem) {
      await crud.updateItem(crud.editItem.id, form as unknown as Record<string, unknown>, true)
    } else {
      await crud.createItem(form as unknown as Record<string, unknown>, true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: Number(e.target.value) }))
  }

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
    if (defaultSortField) {
      result.sort((a, b) => {
        const aVal = a[defaultSortField] ?? 0
        const bVal = b[defaultSortField] ?? 0
        const cmp = typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal))
        return defaultSortDir === "desc" ? -cmp : cmp
      })
    }
    return result
  }, [crud.data, search, searchFields, defaultSortField, defaultSortDir])

  return {
    ...crud,
    form,
    setForm,
    search,
    setSearch,
    openAdd,
    openEdit,
    handleSave,
    handleChange,
    handleNumberChange,
    filteredItems,
  }
}