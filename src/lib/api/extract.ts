/**
 * يستخرج قائمة العناصر من استجابة API الموحدة.
 *
 * الـ API يُرجع أحد الأشكال التالية:
 *   { success, data: { items, total }, meta }
 *   { success, data: [...] }              (توافق مع الإصدارات السابقة)
 *   [...]                                  (مصفوفة مباشرة)
 */
export function extractItems<T = unknown>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];

  const obj = data as { data?: unknown; items?: unknown } | null;
  if (obj && typeof obj === "object") {
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (obj.data && typeof obj.data === "object") {
      const inner = obj.data as { items?: unknown };
      if (Array.isArray(inner.items)) return inner.items as T[];
    }
    if (Array.isArray(obj.items)) return obj.items as T[];
  }

  return [];
}

/**
 * يستخرج عنصرًا واحدًا من استجابة API موحدة.
 */
export function extractItem<T = unknown>(data: unknown): T | null {
  if (!data || typeof data !== "object") return data as T | null;
  const obj = data as { data?: unknown };
  return (obj.data ?? data) as T;
}
