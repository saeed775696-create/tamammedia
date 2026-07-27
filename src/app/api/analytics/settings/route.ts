import { NextRequest } from "next/server";
import {
  ApiResponseHandler,
  AppError,
  getActiveUser,
  requireAdmin,
} from "@/lib/api";
import { prisma } from "@/lib/prisma";
import {
  analyticsConnectionSchema,
  googleServiceAccountSchema,
} from "@/lib/validations";
import {
  deleteGoogleAnalyticsConnection,
  getStoredGoogleAnalyticsConnection,
  loadGoogleAnalyticsConnection,
  saveGoogleAnalyticsConnection,
} from "@/lib/analytics/credentials.server";
import {
  clearGoogleAnalyticsCache,
  testGoogleAnalyticsConnection,
} from "@/lib/analytics/google-analytics.server";
import { getSiteSettings, saveSiteSettings } from "@/lib/site-settings.server";
import type {
  GoogleAnalyticsConnectionStatus,
} from "@/types/analytics";

async function connectionStatus(): Promise<GoogleAnalyticsConnectionStatus> {
  const settings = await getSiteSettings();

  try {
    const stored = await getStoredGoogleAnalyticsConnection();
    if (!stored?.connection) {
      return {
        configured: false,
        measurementId: settings.analytics.googleMeasurementId,
        propertyId: "",
        clientEmail: "",
        projectId: "",
        updatedAt: null,
        requiresReconnect: false,
      };
    }

    let requiresReconnect = false;
    try {
      await loadGoogleAnalyticsConnection();
    } catch {
      requiresReconnect = true;
    }

    return {
      configured: !requiresReconnect,
      measurementId: settings.analytics.googleMeasurementId,
      propertyId: stored.connection.propertyId,
      clientEmail: stored.connection.clientEmail,
      projectId: stored.connection.projectId,
      updatedAt: stored.updatedAt.toISOString(),
      requiresReconnect,
    };
  } catch {
    return {
      configured: false,
      measurementId: settings.analytics.googleMeasurementId,
      propertyId: "",
      clientEmail: "",
      projectId: "",
      updatedAt: null,
      requiresReconnect: true,
    };
  }
}

export async function GET(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(request, connectionStatus);
}

export async function PUT(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(
    request,
    async () => {
      const input = analyticsConnectionSchema.parse(await request.json());
      const existing = await loadGoogleAnalyticsConnection().catch(() => null);
      let credentials = existing?.credentials;

      if (input.serviceAccountJson) {
        let rawCredentials: unknown;
        try {
          rawCredentials = JSON.parse(input.serviceAccountJson);
        } catch {
          throw new AppError({
            message: "ملف حساب الخدمة ليس JSON صالحًا.",
            statusCode: 400,
            code: "INVALID_SERVICE_ACCOUNT_JSON",
          });
        }
        credentials = googleServiceAccountSchema.parse(rawCredentials);
      }

      if (!credentials) {
        throw new AppError({
          message: "أدخل ملف JSON الخاص بحساب الخدمة لإتمام الربط.",
          statusCode: 400,
          code: "SERVICE_ACCOUNT_REQUIRED",
        });
      }

      await testGoogleAnalyticsConnection(input.propertyId, credentials);
      await saveGoogleAnalyticsConnection(input.propertyId, credentials);

      const settings = await getSiteSettings();
      await saveSiteSettings({
        ...settings,
        analytics: {
          googleMeasurementId: input.measurementId,
        },
      });

      clearGoogleAnalyticsCache();

      const user = await getActiveUser();
      if (user) {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: existing
              ? "GOOGLE_ANALYTICS_UPDATED"
              : "GOOGLE_ANALYTICS_CONNECTED",
            metadata: {
              propertyId: input.propertyId,
              clientEmail: credentials.client_email,
            },
          },
        });
      }

      return connectionStatus();
    },
    { successMessage: "تم التحقق من Google Analytics وحفظ الاتصال" }
  );
}

export async function DELETE(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  return ApiResponseHandler.handle(
    request,
    async () => {
      const current = await getStoredGoogleAnalyticsConnection().catch(
        () => null
      );
      await deleteGoogleAnalyticsConnection();
      const settings = await getSiteSettings();
      await saveSiteSettings({
        ...settings,
        analytics: { googleMeasurementId: "" },
      });
      clearGoogleAnalyticsCache();

      const user = await getActiveUser();
      if (user) {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "GOOGLE_ANALYTICS_DISCONNECTED",
            metadata: current?.connection
              ? { propertyId: current.connection.propertyId }
              : undefined,
          },
        });
      }

      return connectionStatus();
    },
    { successMessage: "تم إيقاف التتبع وفصل Google Analytics" }
  );
}
