import { prisma } from "@/lib/prisma";
import { FolderOpen, MessageSquare, Users, Briefcase, Wrench, CheckCircle, Clock, Mail } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [
    leadsCount,
    newLeadsCount,
    portfolioCount,
    teamCount,
    servicesCount,
    partnersCount,
    recentLeads,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.portfolioItem.count(),
    prisma.teamMember.count(),
    prisma.service.count(),
    prisma.partner.count(),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    {
      label: "الرسائل الجديدة",
      value: newLeadsCount,
      total: leadsCount,
      icon: MessageSquare,
      color: "from-red-500 to-rose-600",
      href: "/dashboard/contacts",
      hint: `${leadsCount} إجمالي`,
    },
    {
      label: "الأعمال",
      value: portfolioCount,
      icon: FolderOpen,
      color: "from-emerald-500 to-teal-600",
      href: "/dashboard/portfolio",
    },
    {
      label: "الخدمات",
      value: servicesCount,
      icon: Wrench,
      color: "from-blue-500 to-indigo-600",
      href: "/dashboard/services",
    },
    {
      label: "الفريق",
      value: teamCount,
      icon: Users,
      color: "from-purple-500 to-violet-600",
      href: "/dashboard/team",
    },
    {
      label: "الشركاء",
      value: partnersCount,
      icon: Briefcase,
      color: "from-amber-500 to-orange-600",
      href: "/dashboard/partners",
    },
  ];

  const quickActions = [
    { label: "إضافة عمل", href: "/dashboard/portfolio", icon: FolderOpen },
    { label: "إضافة خدمة", href: "/dashboard/services", icon: Wrench },
    { label: "إضافة عضو فريق", href: "/dashboard/team", icon: Users },
    { label: "عرض الرسائل", href: "/dashboard/contacts", icon: Mail },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#21214f]">
          لوحة التحكم
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          مرحبًا بعودتك! إليك ملخصًا سريعًا لنشاط الموقع.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#da8827]/30 transition-all"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-105 transition-transform`}
            >
              <stat.icon size={22} />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
              {stat.hint && (
                <span className="text-xs text-gray-400">{stat.hint}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#21214f] mb-4">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-[#da8827]/10 hover:text-[#da8827] border border-transparent hover:border-[#da8827]/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-500 group-hover:text-[#da8827] group-hover:bg-[#da8827]/10 transition-colors">
                <action.icon size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#da8827]">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#21214f] flex items-center gap-2">
            <MessageSquare size={20} className="text-[#da8827]" />
            آخر الرسائل
          </h2>
          {leadsCount > 0 && (
            <Link
              href="/dashboard/contacts"
              className="text-sm text-[#da8827] hover:underline font-medium"
            >
              عرض الكل
            </Link>
          )}
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">لا توجد رسائل بعد</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href="/dashboard/contacts"
                className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    lead.status === "new"
                      ? "bg-red-100 text-red-600"
                      : lead.status === "read"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800 truncate">
                      {lead.name}
                    </p>
                    {lead.status === "new" && (
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {lead.email} • {lead.service || "خدمة عامة"}
                  </p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(lead.createdAt).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {lead.status === "replied" && (
                    <p className="text-xs text-green-600 flex items-center gap-1 justify-end mt-1">
                      <CheckCircle size={12} />
                      تم الرد
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
