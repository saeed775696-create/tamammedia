import { prisma } from "@/lib/prisma";
import {
  FolderOpen,
  MessageSquare,
  Users,
  Briefcase,
  Wrench,
  CheckCircle,
  Clock,
  Mail,
  ArrowLeft,
  Plus,
} from "lucide-react";
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
      label: "رسائل جديدة",
      value: newLeadsCount,
      sub: `${leadsCount} إجمالي`,
      icon: MessageSquare,
      color: "bg-red-50 text-red-600",
      ring: "hover:border-red-200",
      href: "/dashboard/contacts",
    },
    {
      label: "الأعمال",
      value: portfolioCount,
      sub: "مشروع",
      icon: FolderOpen,
      color: "bg-emerald-50 text-emerald-600",
      ring: "hover:border-emerald-200",
      href: "/dashboard/portfolio",
    },
    {
      label: "الخدمات",
      value: servicesCount,
      sub: "خدمة",
      icon: Wrench,
      color: "bg-blue-50 text-blue-600",
      ring: "hover:border-blue-200",
      href: "/dashboard/services",
    },
    {
      label: "الفريق",
      value: teamCount,
      sub: "عضو",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      ring: "hover:border-purple-200",
      href: "/dashboard/team",
    },
    {
      label: "الشركاء",
      value: partnersCount,
      sub: "شريك",
      icon: Briefcase,
      color: "bg-amber-50 text-amber-600",
      ring: "hover:border-amber-200",
      href: "/dashboard/partners",
    },
  ];

  const quickActions = [
    { label: "إضافة عمل", href: "/dashboard/portfolio", icon: FolderOpen },
    { label: "إضافة خدمة", href: "/dashboard/services", icon: Wrench },
    { label: "إضافة عضو", href: "/dashboard/team", icon: Users },
    { label: "عرض الرسائل", href: "/dashboard/contacts", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#21214f]">
          لوحة التحكم
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          مرحبًا بعودتك! إليك ملخصًا سريعًا لنشاط الموقع.
        </p>
      </div>

      {/* Stats Grid — كروت أنيقة بأيقونات ملونة */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group bg-white rounded-xl p-4 sm:p-5 border border-gray-100 ${stat.ring} hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={18} strokeWidth={2} />
              </div>
              <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {stat.sub}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 leading-none">
              {stat.value}
            </p>
            <p className="text-[13px] text-gray-500 mt-1.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions — أزرار واضحة */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-[#21214f] mb-4">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 p-3.5 rounded-lg border border-gray-200 hover:border-[#da8827] hover:bg-[#da8827]/5 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#da8827]/10 text-[#da8827] flex items-center justify-center flex-shrink-0 group-hover:bg-[#da8827] group-hover:text-white transition-colors">
                <action.icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-700 group-hover:text-[#da8827] transition-colors truncate">
                  {action.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                  ابدأ الآن
                  <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-0" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#21214f] flex items-center gap-2">
            <MessageSquare size={18} className="text-[#da8827]" />
            آخر الرسائل
          </h2>
          {leadsCount > 0 && (
            <Link
              href="/dashboard/contacts"
              className="text-[13px] text-[#da8827] hover:underline font-medium flex items-center gap-1"
            >
              عرض الكل
              <ArrowLeft size={14} />
            </Link>
          )}
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-3">
              <Mail size={22} />
            </div>
            <p className="text-sm text-gray-500">لا توجد رسائل بعد</p>
            <p className="text-xs text-gray-400 mt-1">
              ستظهر الرسائل الواردة من نموذج التواصل هنا
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href="/dashboard/contacts"
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
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
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {lead.name}
                    </p>
                    {lead.status === "new" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[12px] text-gray-500 truncate mt-0.5">
                    {lead.email} • {lead.service || "خدمة عامة"}
                  </p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 justify-end">
                    <Clock size={11} />
                    {new Date(lead.createdAt).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {lead.status === "replied" && (
                    <p className="text-[11px] text-green-600 flex items-center gap-1 justify-end mt-0.5">
                      <CheckCircle size={11} />
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
