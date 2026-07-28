"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Clock3,
  Eye,
  MousePointerClick,
  RefreshCw,
  Settings2,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type {
  AnalyticsDashboardData,
  AnalyticsMetric,
  AnalyticsPeriod,
} from "@/types/analytics";

const periods: Array<{ value: AnalyticsPeriod; label: string }> = [
  { value: "7d", label: "7 أيام" },
  { value: "30d", label: "30 يومًا" },
  { value: "90d", label: "90 يومًا" },
];

const numberFormatter = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 0,
});

function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value));
}

function formatDuration(value: number) {
  const totalSeconds = Math.max(0, Math.round(value));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function ChangeBadge({ metric }: { metric: AnalyticsMetric }) {
  if (metric.change === null) {
    return (
      <span className="rounded-lg bg-surface-100 px-2 py-1 text-[11px] font-bold text-surface-500">
        لا مقارنة
      </span>
    );
  }

  const positive = metric.change >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${
        positive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
      {Math.abs(metric.change).toLocaleString("ar-EG", {
        maximumFractionDigits: 1,
      })}
      %
    </span>
  );
}

function TrendChart({
  data,
}: {
  data: AnalyticsDashboardData["trend"];
}) {
  const width = 820;
  const height = 250;
  const paddingX = 26;
  const paddingY = 24;
  const maxValue = Math.max(1, ...data.map((item) => item.pageViews));
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;
  const points = data.map((item, index) => {
    const x =
      paddingX +
      (data.length <= 1 ? usableWidth / 2 : (index / (data.length - 1)) * usableWidth);
    const y = paddingY + usableHeight - (item.pageViews / maxValue) * usableHeight;
    return { ...item, x, y };
  });
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points.at(-1)?.x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : "";
  const labelStep = Math.max(1, Math.ceil(data.length / 6));

  if (!data.length) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-surface-400">
        لا توجد مشاهدات في هذه الفترة بعد
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height + 34}`}
        className="min-w-[650px]"
        role="img"
        aria-label="اتجاه مشاهدات الصفحات خلال الفترة المحددة"
      >
        <defs>
          <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5782d" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f5782d" stopOpacity="0.02" />
          </linearGradient>
          <filter id="analytics-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingY + usableHeight * ratio;
          return (
            <line
              key={ratio}
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="4 7"
            />
          );
        })}

        <path d={areaPath} fill="url(#analytics-area)" />
        <path
          d={linePath}
          fill="none"
          stroke="#f5782d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#analytics-glow)"
        />

        {points.map((point, index) => (
          <g key={`${point.date}-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4.5"
              fill="#fff"
              stroke="#f5782d"
              strokeWidth="3"
            >
              <title>
                {new Date(`${point.date}T12:00:00`).toLocaleDateString("ar-EG")}:{" "}
                {formatNumber(point.pageViews)} مشاهدة
              </title>
            </circle>
            {(index % labelStep === 0 || index === points.length - 1) && (
              <text
                x={point.x}
                y={height + 17}
                textAnchor="middle"
                fontSize="11"
                fill="#94a3b8"
              >
                {new Date(`${point.date}T12:00:00`).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "short",
                })}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

type AnalyticsDashboardProps = {
  initialData?: AnalyticsDashboardData | null;
  initialError?: { code?: string; message: string } | null;
};

export default function AnalyticsDashboard({
  initialData = null,
  initialError = null,
}: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState<AnalyticsPeriod>(
    initialData?.period || "30d"
  );
  const [data, setData] = useState<AnalyticsDashboardData | null>(initialData);
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<{ code?: string; message: string } | null>(
    initialError
  );
  const skipInitialFetch = useRef(Boolean(initialData || initialError));

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`/api/analytics?period=${period}`, {
        cache: "no-store",
        signal,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.data) {
        setData(null);
        setError({
          code: payload?.error?.code,
          message:
            payload?.error?.message || "تعذر تحميل إحصاءات Google Analytics",
        });
        return;
      }
      setData(payload.data as AnalyticsDashboardData);
      setError(null);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === "AbortError") {
        return;
      }
      setError({ message: "تعذر الاتصال بخادم الإحصاءات" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [period]);

  const refresh = () => {
    setRefreshing(true);
    void load();
  };

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => void load(controller.signal), 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [load]);

  const metricCards = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: "الزوار النشطون",
        value: formatNumber(data.metrics.activeUsers.value),
        metric: data.metrics.activeUsers,
        icon: Users,
        color: "bg-violet-50 text-violet-600",
      },
      {
        label: "المشاهدات",
        value: formatNumber(data.metrics.pageViews.value),
        metric: data.metrics.pageViews,
        icon: Eye,
        color: "bg-orange-50 text-orange-600",
      },
      {
        label: "الجلسات",
        value: formatNumber(data.metrics.sessions.value),
        metric: data.metrics.sessions,
        icon: MousePointerClick,
        color: "bg-cyan-50 text-cyan-600",
      },
      {
        label: "زوار جدد",
        value: formatNumber(data.metrics.newUsers.value),
        metric: data.metrics.newUsers,
        icon: UserPlus,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "معدل التفاعل",
        value: `${(data.metrics.engagementRate.value * 100).toLocaleString(
          "ar-EG",
          { maximumFractionDigits: 1 }
        )}%`,
        metric: data.metrics.engagementRate,
        icon: Activity,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "متوسط مدة الجلسة",
        value: formatDuration(data.metrics.averageSessionDuration.value),
        metric: data.metrics.averageSessionDuration,
        icon: Clock3,
        color: "bg-rose-50 text-rose-600",
      },
    ];
  }, [data]);

  if (loading) {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-label="جاري تحميل الإحصاءات"
      >
        <div className="h-[58px] animate-pulse rounded-2xl border border-surface-200 bg-white" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[162px] animate-pulse rounded-3xl border border-surface-200 bg-white"
            />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-3xl border border-surface-200 bg-white" />
      </div>
    );
  }

  if (error && !data) {
    const disconnected = error.code === "GOOGLE_ANALYTICS_NOT_CONNECTED";
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-surface-200 bg-white px-6 text-center shadow-sm">
        <div
          className={`mb-5 flex size-20 items-center justify-center rounded-3xl ${
            disconnected
              ? "bg-orange-50 text-orange-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          <BarChart3 size={36} />
        </div>
        <h2 className="text-xl font-extrabold text-brand-900">
          {disconnected
            ? "اربط Google Analytics لبدء عرض الإحصاءات"
            : "تعذر تحميل الإحصاءات"}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-surface-500">
          {error.message}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/settings"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-900 px-5 text-sm font-bold text-white transition hover:bg-brand-800"
          >
            <Settings2 size={17} />
            إعدادات الربط
          </Link>
          {!disconnected && (
            <Button
              type="button"
              variant="outline"
              onClick={refresh}
              leftIcon={<RefreshCw size={16} />}
            >
              إعادة المحاولة
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const maxPageViews = Math.max(1, ...data.topPages.map((page) => page.pageViews));
  const maxSourceSessions = Math.max(
    1,
    ...data.sources.map((source) => source.sessions)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-surface-200 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {periods.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setLoading(true);
                setPeriod(item.value);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                period === item.value
                  ? "bg-brand-900 text-white shadow-sm"
                  : "text-surface-500 hover:bg-surface-100 hover:text-brand-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 px-2">
          <span className="hidden text-[11px] text-surface-400 sm:inline">
            آخر تحديث{" "}
            {new Date(data.generatedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            aria-label="تحديث الإحصاءات"
            className="rounded-xl p-2 text-surface-500 transition hover:bg-surface-100 hover:text-brand-900 disabled:opacity-50"
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="group rounded-3xl border border-surface-200 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-surface-500">{card.label}</p>
                <p className="mt-3 text-3xl font-black tracking-tight text-brand-950">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex size-11 items-center justify-center rounded-2xl transition group-hover:scale-105 ${card.color}`}
              >
                <card.icon size={21} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-surface-100 pt-3">
              <ChangeBadge metric={card.metric} />
              <span className="text-[10px] font-medium text-surface-400">
                مقارنة بالفترة السابقة
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-100 px-6 py-5">
          <div>
            <h2 className="font-extrabold text-brand-900">اتجاه المشاهدات</h2>
            <p className="mt-1 text-xs text-surface-400">
              عدد مشاهدات الصفحات يوميًا خلال الفترة المحددة
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600">
            <span className="size-2 rounded-full bg-orange-500" />
            مشاهدات الصفحات
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <TrendChart data={data.trend} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="font-extrabold text-brand-900">
              الصفحات الأكثر مشاهدة
            </h2>
            <p className="mt-1 text-xs text-surface-400">
              ترتيب الصفحات بحسب عدد المشاهدات
            </p>
          </div>
          <div className="space-y-4">
            {data.topPages.length ? (
              data.topPages.map((page, index) => (
                <div key={`${page.path}-${index}`} className="group">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-brand-900">
                        {page.title}
                      </p>
                      <p
                        className="mt-0.5 truncate text-[11px] text-surface-400"
                        dir="ltr"
                      >
                        {page.path}
                      </p>
                    </div>
                    <div className="shrink-0 text-end">
                      <p className="text-sm font-black text-brand-900">
                        {formatNumber(page.pageViews)}
                      </p>
                      <p className="text-[10px] text-surface-400">مشاهدة</p>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-orange-500 to-orange-300 transition-all"
                      style={{
                        width: `${Math.max(
                          4,
                          (page.pageViews / maxPageViews) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-surface-400">
                لا توجد بيانات صفحات بعد
              </p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="font-extrabold text-brand-900">مصادر الزيارات</h2>
            <p className="mt-1 text-xs text-surface-400">
              القنوات التي أوصلت الزوار إلى الموقع
            </p>
          </div>
          <div className="space-y-3">
            {data.sources.length ? (
              data.sources.map((source, index) => (
                <div
                  key={`${source.source}-${source.medium}-${index}`}
                  className="relative overflow-hidden rounded-2xl border border-surface-100 bg-surface-50/60 p-4"
                >
                  <div
                    className="absolute inset-y-0 start-0 bg-brand-900/[0.04]"
                    style={{
                      width: `${Math.max(
                        5,
                        (source.sessions / maxSourceSessions) * 100
                      )}%`,
                    }}
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-accent-600 shadow-sm">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-brand-900">
                          {source.source === "(direct)"
                            ? "زيارة مباشرة"
                            : source.source}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-surface-400">
                          {source.medium === "(none)"
                            ? "بدون وسيط"
                            : source.medium}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-end">
                      <p className="text-sm font-black text-brand-900">
                        {formatNumber(source.sessions)}
                      </p>
                      <p className="text-[10px] text-surface-400">جلسة</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-surface-400">
                لا توجد بيانات مصادر بعد
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
