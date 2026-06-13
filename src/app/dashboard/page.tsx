
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const leadsCount = await prisma.contactSubmission.count();
  const portfolioCount = await prisma.portfolioItem.count();
  const whatsappClicks = await prisma.whatsAppClick.count();
  const recentLeads = await prisma.contactSubmission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">إجمالي الرسائل</p>
          <p className="text-3xl font-bold">{leadsCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">الأعمال</p>
          <p className="text-3xl font-bold">{portfolioCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">نقرات واتساب</p>
          <p className="text-3xl font-bold">{whatsappClicks}</p>
        </div>
      </div>

      {/* آخر الرسائل */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">آخر الرسائل</h2>
        {recentLeads.length === 0 ? (
          <p className="text-gray-400">لا توجد رسائل بعد.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">الاسم</th>
                <th className="text-left p-2">البريد</th>
                <th className="text-left p-2">الخدمة</th>
                <th className="text-left p-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="p-2">{lead.name}</td>
                  <td className="p-2">{lead.email}</td>
                  <td className="p-2">{lead.service || "-"}</td>
                  <td className="p-2">{new Date(lead.createdAt).toLocaleDateString("ar")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}