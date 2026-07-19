import { prisma } from "@/lib/prisma";
import { FolderOpen, MessageSquare, Users, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const [leadsCount, portfolioCount, teamCount, recentLeads] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.portfolioItem.count(),
    prisma.teamMember.count(),
    prisma.contactSubmission.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    { label: "الرسائل", value: leadsCount, icon: MessageSquare, color: "from-blue-500 to-blue-600" },
    { label: "الأعمال", value: portfolioCount, icon: FolderOpen, color: "from-emerald-500 to-emerald-600" },
    { label: "الفريق", value: teamCount, icon: Users, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1>لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1">مرحباً بعودتك! إليك ملخص اليوم.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-[#da8827]" />
          آخر الرسائل
        </h2>
        {recentLeads.length === 0 ? (
          <p className="text-gray-400 text-center py-8">لا توجد رسائل بعد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right p-3 text-gray-500">الاسم</th>
                  <th className="text-right p-3 text-gray-500">البريد</th>
                  <th className="text-right p-3 text-gray-500">الخدمة</th>
                  <th className="text-right p-3 text-gray-500">التاريخ</th>
                  <th className="text-right p-3 text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-3 font-medium">{lead.name}</td>
                    <td className="p-3 text-gray-600">{lead.email}</td>
                    <td className="p-3">{lead.service || "-"}</td>
                    <td className="p-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString("ar")}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "new" ? "bg-red-100 text-red-600" :
                        lead.status === "read" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                      }`}>
                        {lead.status === "new" ? "جديد" : lead.status === "read" ? "مقروء" : "تم الرد"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}