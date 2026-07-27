"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Link2,
  Loader2,
  ShieldCheck,
  Unplug,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { GoogleAnalyticsConnectionStatus } from "@/types/analytics";

type ConnectionError = {
  code: string;
  message: string;
};

function connectionErrorHints(code: string) {
  switch (code) {
    case "GOOGLE_ANALYTICS_API_DISABLED":
      return [
        "افتح Google Cloud بالمشروع الموجود في project_id داخل ملف JSON.",
        "فعّل Google Analytics Data API، ثم انتظر دقيقة قبل إعادة الاختبار.",
      ];
    case "GOOGLE_ANALYTICS_PERMISSION_DENIED":
      return [
        "أضف قيمة client_email في إدارة وصول الخاصية داخل Google Analytics، وليس كدور IAM في Google Cloud.",
        "تأكد أن الخاصية التي منحتها Viewer تحمل Property ID نفسه المكتوب أعلاه.",
      ];
    case "GOOGLE_ANALYTICS_INVALID_CREDENTIALS":
      return [
        "احذف المفتاح القديم من تبويب Keys لحساب الخدمة وأنشئ مفتاح JSON جديدًا.",
        "لا ترسل المفتاح في المحادثات ولا تحفظه داخل ملفات المشروع.",
      ];
    case "GOOGLE_ANALYTICS_INVALID_PROPERTY":
      return [
        "انسخ Property ID الرقمي من المشرف ← إعدادات الخاصية.",
        "لا تستخدم Measurement ID الذي يبدأ بـ G- في حقل Property ID.",
      ];
    case "GOOGLE_ANALYTICS_QUOTA_EXCEEDED":
      return ["انتظر بضع دقائق، ثم استخدم زر الحفظ والاختبار مرة أخرى."];
    default:
      return ["تحقق من اتصال Google ثم أعد المحاولة بعد قليل."];
  }
}

function SettingField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs font-bold text-surface-700">{label}</span>
      {children}
      {hint && (
        <span className="block text-[11px] leading-relaxed text-surface-400">
          {hint}
        </span>
      )}
    </label>
  );
}

export default function AnalyticsSettingsPanel({
  measurementId,
  onMeasurementIdChange,
}: {
  measurementId: string;
  onMeasurementIdChange: (value: string) => void;
}) {
  const [status, setStatus] =
    useState<GoogleAnalyticsConnectionStatus | null>(null);
  const [propertyId, setPropertyId] = useState("");
  const [serviceAccountJson, setServiceAccountJson] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [connectionError, setConnectionError] =
    useState<ConnectionError | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/analytics/settings", {
          cache: "no-store",
        });
        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.data) {
          throw new Error(
            payload?.error?.message || "تعذر تحميل إعدادات Google Analytics"
          );
        }
        if (!active) return;
        const nextStatus = payload.data as GoogleAnalyticsConnectionStatus;
        setStatus(nextStatus);
        setPropertyId(nextStatus.propertyId);
        onMeasurementIdChange(nextStatus.measurementId);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "تعذر تحميل إعدادات Google Analytics"
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, [onMeasurementIdChange]);

  const connect = async () => {
    if (!measurementId.trim()) {
      toast.error("أدخل معرّف القياس الذي يبدأ بـ G-");
      return;
    }
    if (!propertyId.trim()) {
      toast.error("أدخل معرّف خاصية Google Analytics الرقمي");
      return;
    }
    if (!status?.configured && !serviceAccountJson.trim()) {
      toast.error("ألصق محتوى ملف JSON الخاص بحساب الخدمة");
      return;
    }

    const suppliedCredentials = Boolean(serviceAccountJson.trim());
    setConnectionError(null);
    setSaving(true);
    try {
      const response = await fetch("/api/analytics/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          measurementId,
          propertyId,
          serviceAccountJson: serviceAccountJson.trim() || undefined,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.data) {
        const nextError = {
          code: payload?.error?.code || "GOOGLE_ANALYTICS_UNAVAILABLE",
          message:
            payload?.error?.message ||
            "تعذر التحقق من اتصال Google Analytics",
        };
        setConnectionError(nextError);
        throw new Error(nextError.message);
      }

      const nextStatus = payload.data as GoogleAnalyticsConnectionStatus;
      setConnectionError(null);
      setStatus(nextStatus);
      setPropertyId(nextStatus.propertyId);
      setServiceAccountJson("");
      onMeasurementIdChange(nextStatus.measurementId);
      toast.success("تم ربط Google Analytics والتحقق من قراءة التقارير");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "تعذر التحقق من اتصال Google Analytics"
      );
    } finally {
      if (suppliedCredentials) setServiceAccountJson("");
      setSaving(false);
    }
  };

  const disconnect = async () => {
    if (
      !window.confirm(
        "سيتم إيقاف التتبع وحذف بيانات حساب الخدمة المشفرة وفصل تقارير Google. هل تريد المتابعة؟"
      )
    ) {
      return;
    }

    setDisconnecting(true);
    try {
      const response = await fetch("/api/analytics/settings", {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.data) {
        throw new Error(
          payload?.error?.message || "تعذر فصل Google Analytics"
        );
      }
      setStatus(payload.data as GoogleAnalyticsConnectionStatus);
      setConnectionError(null);
      setPropertyId("");
      setServiceAccountJson("");
      onMeasurementIdChange("");
      toast.success("تم إيقاف التتبع وفصل Google Analytics");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "تعذر فصل Google Analytics"
      );
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-3xl border border-surface-200 bg-white text-sm text-surface-500">
        <Loader2 className="me-2 animate-spin" size={20} />
        جارٍ تحميل إعدادات التحليلات…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="border-b border-surface-200 bg-gradient-to-l from-brand-950 to-brand-800 px-6 py-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/15">
                <BarChart3 size={22} />
              </div>
              <div>
                <h2 className="font-extrabold">Google Analytics 4</h2>
                <p className="mt-1 text-xs text-white/60">
                  جمع الزيارات وعرض تقارير الأداء داخل لوحة التحكم
                </p>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${
                status?.configured
                  ? "bg-emerald-400/15 text-emerald-200 ring-emerald-300/25"
                  : status?.requiresReconnect
                    ? "bg-amber-400/15 text-amber-200 ring-amber-300/25"
                    : "bg-white/10 text-white/70 ring-white/15"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  status?.configured
                    ? "bg-emerald-300"
                    : status?.requiresReconnect
                      ? "bg-amber-300"
                      : "bg-white/40"
                }`}
              />
              {status?.configured
                ? "متصل ويعمل"
                : status?.requiresReconnect
                  ? "يحتاج إعادة ربط"
                  : "غير متصل"}
            </div>
          </div>
        </div>

        <CardContent className="grid gap-5 pt-6 lg:grid-cols-2">
          {connectionError && (
            <div
              role="alert"
              className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950 lg:col-span-2"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="text-sm font-extrabold">
                    تعذر التحقق من اتصال Google Analytics
                  </p>
                  <p className="mt-1 text-xs leading-relaxed">
                    {connectionError.message}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 ps-5 text-xs leading-relaxed">
                    {connectionErrorHints(connectionError.code).map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <SettingField
            label="معرّف القياس (Measurement ID)"
            hint="يوجد داخل تفاصيل Web Data Stream ويبدأ عادةً بـ G-. هذا المعرّف عام ويُضاف إلى صفحات الموقع."
          >
            <Input
              value={measurementId}
              onChange={(event) =>
                onMeasurementIdChange(event.target.value.toUpperCase())
              }
              placeholder="G-XXXXXXXXXX"
              dir="ltr"
              className="h-11 text-left font-mono"
              autoComplete="off"
            />
          </SettingField>

          <SettingField
            label="معرّف الخاصية (Property ID)"
            hint="رقم الخاصية فقط، دون كتابة properties/ قبله."
          >
            <Input
              value={propertyId}
              onChange={(event) =>
                setPropertyId(event.target.value.replace(/\D/g, ""))
              }
              placeholder="123456789"
              dir="ltr"
              inputMode="numeric"
              className="h-11 text-left font-mono"
              autoComplete="off"
            />
          </SettingField>

          <div className="lg:col-span-2">
            <SettingField
              label={
                status?.configured
                  ? "ملف حساب الخدمة JSON (اختياري عند التحديث)"
                  : "ملف حساب الخدمة JSON"
              }
              hint={
                status?.configured
                  ? "اتركه فارغًا للاحتفاظ بالحساب الحالي، أو ألصق ملفًا جديدًا لاستبداله."
                  : "ألصق محتوى الملف كاملًا. يُشفّر المفتاح الخاص قبل حفظه ولا يُعاد إلى المتصفح بعد ذلك."
              }
            >
              <Textarea
                value={serviceAccountJson}
                onChange={(event) =>
                  setServiceAccountJson(event.target.value)
                }
                placeholder='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
                dir="ltr"
                rows={7}
                spellCheck={false}
                autoComplete="off"
                className="text-left font-mono text-[11px] leading-relaxed"
              />
            </SettingField>
          </div>

          {status?.configured && (
            <div className="lg:col-span-2 grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 sm:grid-cols-2">
              <div>
                <span className="block font-bold text-emerald-700">
                  حساب الخدمة
                </span>
                <span className="mt-1 block truncate font-mono" dir="ltr">
                  {status.clientEmail}
                </span>
              </div>
              <div>
                <span className="block font-bold text-emerald-700">
                  مشروع Google Cloud
                </span>
                <span className="mt-1 block truncate font-mono" dir="ltr">
                  {status.projectId}
                </span>
              </div>
            </div>
          )}

          <div className="lg:col-span-2 flex flex-wrap items-center gap-3 border-t border-surface-200 pt-5">
            <Button
              type="button"
              onClick={connect}
              isLoading={saving}
              leftIcon={
                status?.configured ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Link2 size={17} />
                )
              }
            >
              {status?.configured
                ? "حفظ واختبار الاتصال"
                : "ربط Google والتحقق"}
            </Button>

            {status?.configured && (
              <>
                <Link
                  href="/dashboard/analytics"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-surface-200 bg-white px-4 text-sm font-bold text-brand-800 transition hover:border-brand-300 hover:bg-surface-50"
                >
                  <BarChart3 size={16} />
                  فتح الإحصاءات
                </Link>
                <Button
                  type="button"
                  variant="danger"
                  onClick={disconnect}
                  isLoading={disconnecting}
                  leftIcon={<Unplug size={16} />}
                >
                  فصل التقارير
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" />
            خطوات الربط الآمن
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-3 text-sm leading-relaxed text-surface-600 lg:grid-cols-2">
            {[
              "أنشئ GA4 Web Data Stream وانسخ Measurement ID وProperty ID.",
              "فعّل Google Analytics Data API في مشروع Google Cloud.",
              "أنشئ Service Account وحمّل مفتاحه بصيغة JSON.",
              "أضف بريد حساب الخدمة إلى خاصية Analytics بصلاحية Viewer فقط.",
              "فعّل Enhanced Measurement وخيار Page changes based on browser history لقياس تنقلات الموقع.",
            ].map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-2xl border border-surface-200 bg-surface-50/60 p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-900 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <a
            href="https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-accent-600 hover:text-accent-700"
          >
            <KeyRound size={15} />
            دليل Google الرسمي لإعداد Data API
            <ExternalLink size={13} />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
