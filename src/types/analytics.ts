export type AnalyticsPeriod = "7d" | "30d" | "90d";

export type AnalyticsMetric = {
  value: number;
  previous: number;
  change: number | null;
};

export type AnalyticsDashboardData = {
  period: AnalyticsPeriod;
  generatedAt: string;
  propertyId: string;
  metrics: {
    activeUsers: AnalyticsMetric;
    newUsers: AnalyticsMetric;
    sessions: AnalyticsMetric;
    pageViews: AnalyticsMetric;
    engagementRate: AnalyticsMetric;
    averageSessionDuration: AnalyticsMetric;
  };
  trend: Array<{
    date: string;
    activeUsers: number;
    sessions: number;
    pageViews: number;
  }>;
  topPages: Array<{
    path: string;
    title: string;
    activeUsers: number;
    pageViews: number;
  }>;
  sources: Array<{
    source: string;
    medium: string;
    activeUsers: number;
    sessions: number;
  }>;
};

export type GoogleAnalyticsConnectionStatus = {
  configured: boolean;
  measurementId: string;
  propertyId: string;
  clientEmail: string;
  projectId: string;
  updatedAt: string | null;
  requiresReconnect: boolean;
};
