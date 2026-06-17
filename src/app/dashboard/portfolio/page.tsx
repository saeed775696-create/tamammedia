"use client";

import { useEffect, useState } from "react";

type PortfolioItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  category: string;
  clientName?: string;
  link?: string;
  featured: boolean;
};

const categoryLabels: Record<string, string> = {
  branding: "هوية بصرية",
  video: "فيديو",
  social: "سوشيال ميديا",
  website: "موقع إلكتروني",
  ecommerce: "متجر إلكتروني",
  web: "ويب",
};

export default function PortfolioDashboardPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        setItems(await res.json());
      } else {
        console.error("فشل في جلب البيانات");
      }
    } catch (error) {
      console.error("خطأ في الاتصال:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;

    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });

      if (res.ok) {
        // إزالة العنصر من الواجهة فورًا
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("فشل في حذف العمل: " + (errorData.message || "خطأ غير معروف"));
      }
    } catch (error) {
      alert("تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الأعمال</h1>
        <button
          onClick={() => (window.location.href = "/dashboard/portfolio/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          + إضافة عمل
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12">جار التحميل...</p>
      ) : items.length === 0 ? (
        <p className="text-center py-12 text-gray-500">لا توجد أعمال بعد.</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-right">
                <th className="p-3">الصورة</th>
                <th className="p-3">العنوان AR</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">العميل</th>
                <th className="p-3">مميز</th>
                <th className="p-3">حذف</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">
                    <img
                      src={item.imageUrl}
                      alt={item.titleAr}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => (e.currentTarget.src = "/imgs/2-3.png")}
                    />
                  </td>
                  <td className="p-3">{item.titleAr}</td>
                  <td className="p-3">
                    {categoryLabels[item.category] || item.category}
                  </td>
                  <td className="p-3">{item.clientName || "-"}</td>
                  <td className="p-3">{item.featured ? "⭐" : "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 underline hover:text-red-800"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}