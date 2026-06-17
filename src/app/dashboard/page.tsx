import { prisma } from "@/lib/prisma";
import { FolderOpen, MessageSquare, MousePointerClick, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const [leadsCount, portfolioCount, whatsappClicks, recentLeads] =
    await Promise.all([
      prisma.contactSubmission.count(),
      prisma.portfolioItem.count(),
      prisma.whatsAppClick.count(),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const stats = [
    {
      label: "الرسائل",
      value: leadsCount,
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "الأعمال",
      value: portfolioCount,
      icon: FolderOpen,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "نقرات واتساب",
      value: whatsappClicks,
      icon: MousePointerClick,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">لوحة التحكم</h1>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* آخر الرسائل */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          آخر الرسائل
        </h2>
        {recentLeads.length === 0 ? (
          <p className="text-gray-400 text-center py-8">لا توجد رسائل بعد.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right p-3 text-gray-500">الاسم</th>
                <th className="text-right p-3 text-gray-500">البريد</th>
                <th className="text-right p-3 text-gray-500">الخدمة</th>
                <th className="text-right p-3 text-gray-500">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.service || "-"}</td>
                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString("ar")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}