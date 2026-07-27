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

type GoogleErrorContext = {
  httpStatus: number;
  canonicalStatus: string;
  reasons: Set<string>;
  normalizedMessage: string;
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

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function googleErrorContext(error: unknown): GoogleErrorContext {
  const root = asRecord(error);
  const response = asRecord(root?.response);
  const data = asRecord(response?.data);
  const nestedError = asRecord(data?.error);
  const apiError = nestedError || data;
  const details = Array.isArray(apiError?.details) ? apiError.details : [];
  const reasons = new Set(
    details
      .map((detail) => asRecord(detail)?.reason)
      .filter((reason): reason is string => typeof reason === "string")
      .map((reason) => reason.toUpperCase())
  );

  const messageParts = [
    apiError?.message,
    data?.error_description,
    typeof data?.error === "string" ? data.error : undefined,
    root?.message,
  ].filter((value): value is string => typeof value === "string");

  return {
    httpStatus:
      Number(response?.status) ||
      Number(apiError?.code) ||
      Number(root?.code) ||
      0,
    canonicalStatus:
      typeof apiError?.status === "string"
        ? apiError.status.toUpperCase()
        : "",
    reasons,
    normalizedMessage: messageParts.join(" ").toLowerCase(),
  };
}

export function mapGoogleAnalyticsError(error: unknown): AppError {
  const context = googleErrorContext(error);
  const apiDisabled =
    context.reasons.has("SERVICE_DISABLED") ||
    context.reasons.has("SERVICE_NOT_ACTIVATED") ||
    context.reasons.has("API_DISABLED") ||
    context.normalizedMessage.includes("has not been used in project") ||
    context.normalizedMessage.includes("service disabled") ||
    context.normalizedMessage.includes("api is disabled") ||
    context.normalizedMessage.includes("it is disabled");

  if (apiDisabled) {
    return new AppError({
      message:
        "تم توثيق حساب الخدمة، لكن Google Analytics Data API غير مفعّلة في مشروع Google Cloud الخاص به. فعّل الواجهة في مشروع project_id، انتظر دقيقة، ثم أعد الاختبار.",
      statusCode: 400,
      code: "GOOGLE_ANALYTICS_API_DISABLED",
    });
  }

  const invalidCredentials =
    context.httpStatus === 401 ||
    context.httpStatus === 16 ||
    context.canonicalStatus === "UNAUTHENTICATED" ||
    context.normalizedMessage.includes("invalid_grant") ||
    context.normalizedMessage.includes("invalid jwt") ||
    context.normalizedMessage.includes("invalid credentials") ||
    context.normalizedMessage.includes("service account has been disabled");

  if (invalidCredentials) {
    return new AppError({
      message:
        "تعذر توثيق حساب الخدمة. احذف المفتاح القديم أو المكشوف، وأنشئ مفتاح JSON جديدًا لحساب خدمة فعّال، ثم أعد الربط.",
      statusCode: 400,
      code: "GOOGLE_ANALYTICS_INVALID_CREDENTIALS",
    });
  }

  if (
    context.httpStatus === 429 ||
    context.httpStatus === 8 ||
    context.canonicalStatus === "RESOURCE_EXHAUSTED"
  ) {
    return new AppError({
      message:
        "تم تجاوز حصة طلبات Google Analytics مؤقتًا. انتظر بضع دقائق ثم أعد الاختبار.",
      statusCode: 429,
      code: "GOOGLE_ANALYTICS_QUOTA_EXCEEDED",
    });
  }

  if (
    context.httpStatus === 400 ||
    context.httpStatus === 404 ||
    context.httpStatus === 3 ||
    context.httpStatus === 5 ||
    context.canonicalStatus === "INVALID_ARGUMENT" ||
    context.canonicalStatus === "NOT_FOUND"
  ) {
    return new AppError({
      message:
        "معرّف الخاصية غير صحيح أو لا يخص خاصية GA4. استخدم Property ID الرقمي من إعدادات الخاصية، وليس Measurement ID الذي يبدأ بـ G-.",
      statusCode: 400,
      code: "GOOGLE_ANALYTICS_INVALID_PROPERTY",
    });
  }

  if (
    context.httpStatus === 403 ||
    context.httpStatus === 7 ||
    context.canonicalStatus === "PERMISSION_DENIED"
  ) {
    return new AppError({
      message:
        "تم الاتصال بـ Google، لكن حساب الخدمة لا يملك وصولًا إلى هذه الخاصية. أضف client_email في Google Analytics ← المشرف ← إدارة وصول الخاصية للخاصية المطابقة لـ Property ID، وليس في IAM داخل Google Cloud.",
      statusCode: 502,
      code: "GOOGLE_ANALYTICS_PERMISSION_DENIED",
    });
  }

  return new AppError({
    message: "تعذر الاتصال بخدمة Google Analytics حاليًا.",
    statusCode: 502,
    code: "GOOGLE_ANALYTICS_UNAVAILABLE",
  });
}

function translateGoogleError(error: unknown): never {
  throw mapGoogleAnalyticsError(error);
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
