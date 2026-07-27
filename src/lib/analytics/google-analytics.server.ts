import { JWT } from "google-auth-library";
import { AppError } from "@/lib/api";
import type { GoogleServiceAccount } from "@/lib/validations/analytics.schema";
import type {
  AnalyticsDashboardData,
  AnalyticsMetric,
  AnalyticsPeriod,
} from "@/types/analytics";

type ReportValue = { value?: string };

type ReportRow = {
  dimensionValues?: ReportValue[];
  metricValues?: ReportValue[];
};

type Report = {
  rows?: ReportRow[];
};

type BatchReportResponse = {
  reports?: Report[];
};

const periodDays: Record<AnalyticsPeriod, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const summaryMetricNames = [
  "activeUsers",
  "newUsers",
  "sessions",
  "screenPageViews",
  "engagementRate",
  "averageSessionDuration",
] as const;

const publicPageFilter = {
  notExpression: {
    filter: {
      fieldName: "pagePath",
      stringFilter: {
        matchType: "FULL_REGEXP",
        value:
          "^/(dashboard|login|forgot-password|change-password)(/.*)?$",
        caseSensitive: false,
      },
    },
  },
};

const analyticsCache = new Map<
  string,
  { expiresAt: number; data: AnalyticsDashboardData }
>();

function createClient(credentials: GoogleServiceAccount) {
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
}

function numberValue(value: string | null | undefined) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function metricValues(report: Report) {
  const values = report.rows?.[0]?.metricValues || [];
  return Object.fromEntries(
    summaryMetricNames.map((name, index) => [
      name,
      numberValue(values[index]?.value),
    ])
  ) as Record<(typeof summaryMetricNames)[number], number>;
}

function metric(current: number, previous: number): AnalyticsMetric {
  const change =
    previous === 0
      ? current === 0
        ? null
        : 100
      : ((current - previous) / previous) * 100;

  return {
    value: current,
    previous,
    change: change === null ? null : Math.round(change * 10) / 10,
  };
}

function dateRanges(period: AnalyticsPeriod) {
  const days = periodDays[period];
  return {
    current: { startDate: `${days - 1}daysAgo`, endDate: "today" },
    previous: {
      startDate: `${days * 2 - 1}daysAgo`,
      endDate: `${days}daysAgo`,
    },
  };
}

function translateGoogleError(error: unknown): never {
  const code =
    typeof error === "object" && error && "code" in error
      ? Number((error as { code?: unknown }).code)
      : 0;
  const httpStatus =
    typeof error === "object" &&
    error &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object"
      ? Number(
          (
            error as {
              response?: { status?: unknown };
            }
          ).response?.status
        )
      : 0;

  if (code === 7 || httpStatus === 403) {
    throw new AppError({
      message:
        "لا يملك حساب الخدمة صلاحية قراءة هذه الخاصية. أضف بريده كمشاهد في Google Analytics.",
      statusCode: 502,
      code: "GOOGLE_ANALYTICS_PERMISSION_DENIED",
    });
  }

  if (
    code === 3 ||
    code === 5 ||
    httpStatus === 400 ||
    httpStatus === 404
  ) {
    throw new AppError({
      message: "معرّف خاصية Google Analytics غير صحيح أو غير متاح.",
      statusCode: 400,
      code: "GOOGLE_ANALYTICS_INVALID_PROPERTY",
    });
  }

  throw new AppError({
    message: "تعذر الاتصال بخدمة Google Analytics حاليًا.",
    statusCode: 502,
    code: "GOOGLE_ANALYTICS_UNAVAILABLE",
  });
}

export async function testGoogleAnalyticsConnection(
  propertyId: string,
  credentials: GoogleServiceAccount
) {
  const client = createClient(credentials);

  try {
    await client.request({
      url: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      method: "POST",
      data: {
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
        limit: 1,
      },
    });
  } catch (error) {
    translateGoogleError(error);
  }
}

export async function getGoogleAnalyticsDashboardData({
  propertyId,
  credentials,
  period,
}: {
  propertyId: string;
  credentials: GoogleServiceAccount;
  period: AnalyticsPeriod;
}): Promise<AnalyticsDashboardData> {
  const cacheKey = `${propertyId}:${period}`;
  const cached = analyticsCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const ranges = dateRanges(period);
  const summaryMetrics = summaryMetricNames.map((name) => ({ name }));
  const property = `properties/${propertyId}`;
  const client = createClient(credentials);

  try {
    const response = await client.request<BatchReportResponse>({
      url: `https://analyticsdata.googleapis.com/v1beta/${property}:batchRunReports`,
      method: "POST",
      data: {
        requests: [
          {
            dateRanges: [ranges.current],
            metrics: summaryMetrics,
            dimensionFilter: publicPageFilter,
          },
          {
            dateRanges: [ranges.previous],
            metrics: summaryMetrics,
            dimensionFilter: publicPageFilter,
          },
          {
            dateRanges: [ranges.current],
            dimensions: [{ name: "date" }],
            metrics: [
              { name: "activeUsers" },
              { name: "sessions" },
              { name: "screenPageViews" },
            ],
            dimensionFilter: publicPageFilter,
            orderBys: [{ dimension: { dimensionName: "date" } }],
            limit: periodDays[period],
          },
          {
            dateRanges: [ranges.current],
            dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
            metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
            dimensionFilter: publicPageFilter,
            orderBys: [
              { metric: { metricName: "screenPageViews" }, desc: true },
            ],
            limit: 8,
          },
          {
            dateRanges: [ranges.current],
            dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
            metrics: [{ name: "activeUsers" }, { name: "sessions" }],
            dimensionFilter: publicPageFilter,
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 8,
          },
        ],
      },
    });

    const reports = response.data.reports || [];
    const current = metricValues(reports[0] || {});
    const previous = metricValues(reports[1] || {});
    const trendReport = reports[2];
    const pagesReport = reports[3];
    const sourcesReport = reports[4];

    const data: AnalyticsDashboardData = {
      period,
      generatedAt: new Date().toISOString(),
      propertyId,
      metrics: {
        activeUsers: metric(current.activeUsers, previous.activeUsers),
        newUsers: metric(current.newUsers, previous.newUsers),
        sessions: metric(current.sessions, previous.sessions),
        pageViews: metric(
          current.screenPageViews,
          previous.screenPageViews
        ),
        engagementRate: metric(
          current.engagementRate,
          previous.engagementRate
        ),
        averageSessionDuration: metric(
          current.averageSessionDuration,
          previous.averageSessionDuration
        ),
      },
      trend: (trendReport?.rows || []).map((row) => {
        const rawDate = row.dimensionValues?.[0]?.value || "";
        return {
          date:
            rawDate.length === 8
              ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6)}`
              : rawDate,
          activeUsers: numberValue(row.metricValues?.[0]?.value),
          sessions: numberValue(row.metricValues?.[1]?.value),
          pageViews: numberValue(row.metricValues?.[2]?.value),
        };
      }),
      topPages: (pagesReport?.rows || []).map((row) => ({
        path: row.dimensionValues?.[0]?.value || "/",
        title: row.dimensionValues?.[1]?.value || "بدون عنوان",
        activeUsers: numberValue(row.metricValues?.[0]?.value),
        pageViews: numberValue(row.metricValues?.[1]?.value),
      })),
      sources: (sourcesReport?.rows || []).map((row) => ({
        source: row.dimensionValues?.[0]?.value || "مباشر",
        medium: row.dimensionValues?.[1]?.value || "غير محدد",
        activeUsers: numberValue(row.metricValues?.[0]?.value),
        sessions: numberValue(row.metricValues?.[1]?.value),
      })),
    };

    analyticsCache.set(cacheKey, {
      expiresAt: Date.now() + 5 * 60 * 1000,
      data,
    });
    return data;
  } catch (error) {
    translateGoogleError(error);
  }
}

export function clearGoogleAnalyticsCache() {
  analyticsCache.clear();
}
