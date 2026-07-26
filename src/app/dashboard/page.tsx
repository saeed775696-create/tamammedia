import { PrismaContactRepository } from "@/lib/repositories/contact.repository"
import { PrismaPortfolioRepository } from "@/lib/repositories/portfolio.repository"
import { PrismaTeamRepository } from "@/lib/repositories/team.repository"
import { PrismaServiceRepository } from "@/lib/repositories/service.repository"
import { PrismaPartnerRepository } from "@/lib/repositories/partner.repository"
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
  Activity,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import { Card } from "@/components/ui/Card"
import { getActiveUser } from "@/lib/api"

const contactRepository = new PrismaContactRepository()
const portfolioRepository = new PrismaPortfolioRepository()
const teamRepository = new PrismaTeamRepository()
const serviceRepository = new PrismaServiceRepository()
const partnerRepository = new PrismaPartnerRepository()

function EditorDashboard() {
  const actions = [
    { label: "إدارة الأعمال", desc: "أضف المشاريع وعدّل معرض الأعمال", href: "/dashboard/portfolio", icon: FolderOpen },
    { label: "إدارة الخدمات", desc: "حدّث الخدمات التي يقدمها الموقع", href: "/dashboard/services", icon: Wrench },
    { label: "إدارة الفريق", desc: "حدّث أعضاء فريق العمل", href: "/dashboard/team", icon: Users },
    { label: "إدارة الشركاء", desc: "حدّث شعارات وروابط الشركاء", href: "/dashboard/partners", icon: Briefcase },
  ]

  return (
    <div className="space-y-8 pb-10">
      <PageHeader title="مساحة التحرير" subtitle="يمكنك إدارة المحتوى المنشور. إعدادات الموقع والرسائل والحسابات متاحة للمدير فقط." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="group rounded-3xl border border-surface-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 transition group-hover:scale-110"><action.icon size={23} /></div>
            <h2 className="font-extrabold text-brand-900">{action.label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-surface-500">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getActiveUser()
  if (user?.role === "editor") return <EditorDashboard />

  const [
    leadsCount,
    newLeadsCount,
    portfolioCount,
    teamCount,
    servicesCount,
    partnersCount,
    recentLeads,
  ] = await Promise.all([
    contactRepository.count(),
    contactRepository.count("new"),
    portfolioRepository.count(),
    teamRepository.count(),
    serviceRepository.count(),
    partnerRepository.count(),
    contactRepository.findRecent(5),
  ])

  const stats = [
    {
      label: "رسائل جديدة",
      value: newLeadsCount,
      sub: `${leadsCount} إجمالي`,
      icon: MessageSquare,
      color: "from-red-500 to-rose-400",
      lightColor: "bg-red-50",
      textColor: "text-red-500",
      href: "/dashboard/contacts",
      trend: "+12%",
    },
    {
      label: "الأعمال والمشاريع",
      value: portfolioCount,
      sub: "مشروع مكتمل",
      icon: FolderOpen,
      color: "from-accent-500 to-accent-400",
      lightColor: "bg-accent-50",
      textColor: "text-accent-500",
      href: "/dashboard/portfolio",
      trend: "+3",
    },
    {
      label: "الخدمات المقدمة",
      value: servicesCount,
      sub: "خدمة نشطة",
      icon: Wrench,
      color: "from-blue-500 to-cyan-400",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
      href: "/dashboard/services",
      trend: "مستقر",
    },
    {
      label: "أعضاء الفريق",
      value: teamCount,
      sub: "عضو",
      icon: Users,
      color: "from-purple-500 to-fuchsia-400",
      lightColor: "bg-purple-50",
      textColor: "text-purple-500",
      href: "/dashboard/team",
      trend: "+1",
    },
    {
      label: "شركاء النجاح",
      value: partnersCount,
      sub: "شريك",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-400",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-500",
      href: "/dashboard/partners",
      trend: "مستقر",
    },
  ]

  const quickActions = [
    { label: "إضافة عمل جديد", desc: "أضف مشروعاً لمعرض أعمالك", href: "/dashboard/portfolio", icon: FolderOpen },
    { label: "خدمة جديدة", desc: "أضف خدمة جديدة لقائمتك", href: "/dashboard/services", icon: Wrench },
    { label: "إضافة عضو", desc: "أضف فرداً لفريق العمل", href: "/dashboard/team", icon: Users },
    { label: "صندوق الوارد", desc: "راجع أحدث الرسائل", href: "/dashboard/contacts", icon: Mail },
  ]

  return (
    <div className="space-y-8 pb-10">
      <PageHeader 
        title="نظرة عامة" 
        subtitle="مرحباً بعودتك! إليك ملخص لأداء الموقع اليوم."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-5">
        {stats.map((stat, i) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group relative bg-white rounded-3xl p-8 border border-surface-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center text-center justify-center min-h-[200px] ${
              i < 2 ? "sm:col-span-1 xl:col-span-3" : i === 4 ? "sm:col-span-2 xl:col-span-2" : "sm:col-span-1 xl:col-span-2"
            }`}
          >
            <div className={`absolute 1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-10 bg-gradient-to-br ${stat.color} group-hover:opacity-20 transition-opacity duration-500`} />
            
            <div className={`w-14 h-14 rounded-2xl ${stat.lightColor} flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-sm`}>
              <stat.icon size={26} className={stat.textColor} strokeWidth={2} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[14px] font-bold text-surface-500 mb-2 uppercase tracking-wide">{stat.label}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <p className="text-5xl font-black text-brand-900 tracking-tight leading-none">
                  {stat.value}
                </p>
                {stat.trend && (
                  <div className="flex items-center gap-0.5 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 shadow-sm">
                    {stat.trend}
                    {stat.trend.includes("+") && <ArrowUpRight size={14} className="text-emerald-500" />}
                  </div>
                )}
              </div>
              <p className={`text-[13px] font-medium text-surface-400 flex items-center justify-center gap-1.5`}>
                <Activity size={14} />
                {stat.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 bg-gradient-to-b from-brand-900 to-brand-800 rounded-3xl p-1 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
          
          <div className="relative z-10 p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-accent-500 rounded-full" />
              إجراءات سريعة
            </h2>
            <div className="flex flex-col gap-3 flex-1">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-500/10 text-accent-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(218,136,39,0.4)] transition-all duration-300">
                    <action.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-white group-hover:text-accent-400 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-[12px] text-white/50 mt-0.5 truncate">
                      {action.desc}
                    </p>
                  </div>
                  <ArrowLeft size={16} className="text-white/20 group-hover:text-accent-500 group-hover:-translate-x-1 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Card className="lg:col-span-2 p-0 flex flex-col">
          <div className="px-6 py-5 border-b border-surface-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-50 text-accent-600 flex items-center justify-center">
                <Mail size={16} strokeWidth={2.5} />
              </div>
              أحدث الرسائل الواردة
            </h2>
            {leadsCount > 0 && (
              <Link
                href="/dashboard/contacts"
                className="text-[13px] text-accent-600 bg-accent-50 hover:bg-accent-100 px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
              >
                عرض الكل
                <ArrowLeft size={14} />
              </Link>
            )}
          </div>

          <div className="flex-1 bg-surface-50/50 p-4">
            {recentLeads.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-surface-300 mb-4 border border-surface-200">
                  <Mail size={28} strokeWidth={1.5} />
                </div>
                <p className="text-base font-bold text-surface-700">صندوق الوارد فارغ</p>
                <p className="text-sm text-surface-400 mt-1 max-w-xs mx-auto">
                  لم تتلق أي رسائل حتى الآن من خلال نموذج التواصل.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href="/dashboard/contacts"
                    className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black shrink-0 shadow-sm ${
                        lead.status === "new"
                          ? "bg-gradient-to-br from-red-500 to-rose-400 text-white shadow-red-500/20"
                          : lead.status === "read"
                            ? "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-amber-500/20"
                            : "bg-surface-100 text-surface-500 border border-surface-200"
                      }`}
                    >
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[15px] font-bold text-brand-900 truncate group-hover:text-accent-600 transition-colors">
                          {lead.name}
                        </p>
                        {lead.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-surface-500">
                        <span className="truncate" dir="ltr">{lead.email}</span>
                        <span className="w-1 h-1 rounded-full bg-surface-300" />
                        <span className="truncate font-medium text-surface-600">{lead.service || "استفسار عام"}</span>
                      </div>
                    </div>
                    
                    <div className="text-end shrink-0 flex flex-col items-end gap-2">
                      <p className="text-[12px] font-medium text-surface-500 flex items-center gap-1.5 bg-surface-50 px-2.5 py-1 rounded-md border border-surface-200">
                        <Clock size={12} />
                        {new Date(lead.createdAt).toLocaleDateString("ar-EG", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      {lead.status === "replied" && (
                        <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
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
        </Card>
      </div>
    </div>
  )
}
