import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"

export interface CrudOptions {
  endpoint: string
  itemName: string
  onSuccess?: () => void
}

export function useCrud<T extends { id: string | number }>(options: CrudOptions) {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<T | null>(null)
  const [deleteItem, setDeleteItem] = useState<T | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch(options.endpoint)
      if (!res.ok) throw new Error(`فشل تحميل ${options.itemName}`)
      const json = await res.json()
      // handle common API response structures
      const items = json.data?.items || json.items || json.data || json
      setData(Array.isArray(items) ? items : [])
      setError(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير معروف"
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [options.endpoint, options.itemName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const createItem = async (formData: FormData | Record<string, unknown>, isJson = false) => {
    try {
      setIsSubmitting(true)
      const res = await fetch(options.endpoint, {
        method: "POST",
        body: isJson ? JSON.stringify(formData) : (formData as BodyInit),
        headers: isJson ? { "Content-Type": "application/json" } : undefined,
      })
      if (!res.ok) throw new Error(`فشل إضافة ${options.itemName}`)
      
      toast.success(`تمت إضافة ${options.itemName} بنجاح`)
      setIsAddModalOpen(false)
      fetchData()
      options.onSuccess?.()
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير معروف"
      toast.error(msg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateItem = async (id: string | number, formData: FormData | Record<string, unknown>, isJson = false) => {
    try {
      setIsSubmitting(true)
      const res = await fetch(`${options.endpoint}/${id}`, {
        method: "PUT",
        body: isJson ? JSON.stringify(formData) : (formData as BodyInit),
        headers: isJson ? { "Content-Type": "application/json" } : undefined,
      })
      if (!res.ok) throw new Error(`فشل تحديث ${options.itemName}`)
      
      toast.success(`تم تحديث ${options.itemName} بنجاح`)
      setEditItem(null)
      fetchData()
      options.onSuccess?.()
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير معروف"
      toast.error(msg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeItem = async (id: string | number) => {
    try {
      setIsSubmitting(true)
      const res = await fetch(`${options.endpoint}/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error(`فشل حذف ${options.itemName}`)
      
      toast.success(`تم حذف ${options.itemName} بنجاح`)
      setDeleteItem(null)
      fetchData()
      options.onSuccess?.()
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير معروف"
      toast.error(msg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    data,
    isLoading,
    isSubmitting,
    error,
    isAddModalOpen,
    setIsAddModalOpen,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    fetchData,
    createItem,
    updateItem,
    removeItem,
  }
}
