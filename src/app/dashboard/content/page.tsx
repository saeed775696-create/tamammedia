"use client";

import { useEffect, useState, useCallback } from "react";
import { Save, RotateCcw, Eye, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import EditableField from "@/components/dashboard/EditableField";
import ContentTabs from "@/components/dashboard/ContentTabs";
import SaveBar from "@/components/dashboard/SaveBar";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import Link from "next/link";

// تعريف تسميات الحقول بالعربية لمساعدة المستخدم
const FIELD_LABELS: Record<string, { label: string; hint?: string; multiline?: boolean; dir?: "rtl" | "ltr" }> = {
  // Hero
  "hero.badge.ar": { label: "شارة (عربي)", hint: "النص الصغير أعلى العنوان" },
  "hero.badge.en": { label: "شارة (إنجليزي)", dir: "ltr" },
  "hero.title1.ar": { label: "العنوان الأول (عربي)" },
  "hero.title1.en": { label: "العنوان الأول (إنجليزي)", dir: "ltr" },
  "hero.title2.ar": { label: "العنوان المميز (عربي)", hint: "الكلمة المظللة بالبرتقالي" },
  "hero.title2.en": { label: "العنوان المميز (إنجليزي)", dir: "ltr" },
  "hero.subtitle.ar": { label: "الوصف (عربي)", multiline: true },
  "hero.subtitle.en": { label: "الوصف (إنجليزي)", multiline: true, dir: "ltr" },
  "hero.cta1.ar": { label: "زر الإجراء 1 (عربي)", hint: "مثل: ابدأ مشروعك" },
  "hero.cta1.en": { label: "زر الإجراء 1 (إنجليزي)", dir: "ltr" },
  "hero.cta2.ar": { label: "زر الإجراء 2 (عربي)", hint: "مثل: استكشف الخدمات" },
  "hero.cta2.en": { label: "زر الإجراء 2 (إنجليزي)", dir: "ltr" },
  "hero.stat1.value": { label: "إحصائية 1 - القيمة", hint: "مثل: +50" },
  "hero.stat1.label.ar": { label: "إحصائية 1 - الوصف (عربي)" },
  "hero.stat1.label.en": { label: "إحصائية 1 - الوصف (إنجليزي)", dir: "ltr" },
  "hero.stat2.value": { label: "إحصائية 2 - القيمة" },
  "hero.stat2.label.ar": { label: "إحصائية 2 - الوصف (عربي)" },
  "hero.stat2.label.en": { label: "إحصائية 2 - الوصف (إنجليزي)", dir: "ltr" },
  "hero.stat3.value": { label: "إحصائية 3 - القيمة" },
  "hero.stat3.label.ar": { label: "إحصائية 3 - الوصف (عربي)" },
  "hero.stat3.label.en": { label: "إحصائية 3 - الوصف (إنجليزي)", dir: "ltr" },

  // About
  "about.title.ar": { label: "العنوان (عربي)" },
  "about.title.en": { label: "العنوان (إنجليزي)", dir: "ltr" },
  "about.subtitle.ar": { label: "العنوان الفرعي (عربي)" },
  "about.subtitle.en": { label: "العنوان الفرعي (إنجليزي)", dir: "ltr" },
  "about.p1.ar": { label: "الفقرة 1 (عربي)", multiline: true },
  "about.p1.en": { label: "الفقرة 1 (إنجليزي)", multiline: true, dir: "ltr" },
  "about.p2.ar": { label: "الفقرة 2 (عربي)", multiline: true },
  "about.p2.en": { label: "الفقرة 2 (إنجليزي)", multiline: true, dir: "ltr" },
  "about.p3.ar": { label: "الفقرة 3 (عربي)", multiline: true },
  "about.p3.en": { label: "الفقرة 3 (إنجليزي)", multiline: true, dir: "ltr" },
  "about.vision.ar": { label: "الرؤية (عربي)", multiline: true },
  "about.vision.en": { label: "الرؤية (إنجليزي)", multiline: true, dir: "ltr" },
  "about.mission.ar": { label: "الرسالة (عربي)", multiline: true },
  "about.mission.en": { label: "الرسالة (إنجليزي)", multiline: true, dir: "ltr" },
  "about.values.ar": { label: "القيم (عربي)", multiline: true },
  "about.values.en": { label: "القيم (إنجليزي)", multiline: true, dir: "ltr" },

  // Contact
  "contact.phone": { label: "رقم الهاتف (دولي)", dir: "ltr", hint: "بدون + مثل: 967733579558" },
  "contact.phoneDisplay": { label: "عرض الهاتف", dir: "ltr", hint: "مثل: +967 733 579 558" },
  "contact.email": { label: "البريد الإلكتروني", dir: "ltr" },
  "contact.address.ar": { label: "العنوان (عربي)" },
  "contact.address.en": { label: "العنوان (إنجليزي)", dir: "ltr" },
  "contact.whatsapp": { label: "رقم واتساب (دولي)", dir: "ltr" },
  "contact.facebook": { label: "رابط فيسبوك", dir: "ltr" },
  "contact.instagram": { label: "رابط إنستغرام", dir: "ltr" },
  "contact.linkedin": { label: "رابط لينكدإن", dir: "ltr" },
  "contact.hours.days": { label: "أيام العمل" },
  "contact.hours.time": { label: "ساعات العمل" },

  // SEO
  "seo.title": { label: "عنوان الصفحة (Meta Title)", multiline: true, hint: "60-70 حرفًا - يظهر في تبويب المتصفح" },
  "seo.description": { label: "وصف الصفحة (Meta Description)", multiline: true, hint: "150-160 حرفًا - يظهر في نتائج البحث" },
  "seo.keywords": { label: "الكلمات المفتاحية", multiline: true, hint: "مفصولة بفواصل" },

  // General
  "general.siteName.ar": { label: "اسم الموقع (عربي)" },
  "general.siteName.en": { label: "اسم الموقع (إنجليزي)", dir: "ltr" },
  "general.designerName": { label: "اسم المصمم" },
  "general.designerPhone": { label: "هاتف المصمم (دولي)", dir: "ltr" },
  "general.designerPhoneDisplay": { label: "عرض هاتف المصمم", dir: "ltr" },
};

const SECTIONS = [
  { id: "hero", label: "القسم الرئيسي (Hero)", prefix: "hero" },
  { id: "about", label: "صفحة من نحن", prefix: "about" },
  { id: "contact", label: "معلومات التواصل", prefix: "contact" },
  { id: "seo", label: "تحسين محركات البحث (SEO)", prefix: "seo" },
  { id: "general", label: "إعدادات عامة", prefix: "general" },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function ContentEditor() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [status, setStatus] = useState<SaveStatus>("idle");

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("فشل تحميل المحتوى");
      const data = await res.json();
      const contentData = data?.data || data || {};
      // ادمج مع defaults لضمان وجود كل المفاتيح
      const merged = { ...DEFAULT_CONTENT, ...contentData };
      setContent(merged);
      setOriginal(merged);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل المحتوى"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  };

  const hasChanges = JSON.stringify(content) !== JSON.stringify(original);

  const handleSave = async () => {
    if (status === "saving" || !hasChanges) return;

    // احسب فقط التغييرات
    const changes: Record<string, string> = {};
    for (const [key, value] of Object.entries(content)) {
      if (original[key] !== value) {
        changes[key] = value;
      }
    }

    if (Object.keys(changes).length === 0) return;

    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error?.message || "فشل الحفظ");
      }
      setOriginal({ ...content });
      setStatus("saved");
      toast.success(`تم حفظ ${Object.keys(changes).length} تغيير`);
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof Error ? err.message : "فشل الحفظ");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleReset = () => {
    setContent(original);
    setStatus("idle");
    toast("تم التراجع عن التغييرات", { icon: "↩️" });
  };

  const handleResetToDefaults = () => {
    if (!confirm("هل تريد استعادة كل القيم الافتراضية؟ سيتم فقدان كل تعديلاتك.")) return;
    setContent({ ...DEFAULT_CONTENT });
    setStatus("idle");
    toast("تم استعادة القيم الافتراضية (لم تُحفظ بعد)");
  };

  // المفاتيح في الـ tab النشط
  const activeKeys = Object.keys(DEFAULT_CONTENT).filter((k) =>
    k.startsWith(`${activeTab}.`)
  );

  // عرض الحقول في مجموعات (لمحتوى ثنائي اللغة)
  const groupedFields = activeKeys.reduce<
    Record<string, string[]>
  >((acc, key) => {
    // استخرج المجموعة: hero.badge → "badge"، hero.title1 → "title1"
    const parts = key.split(".");
    const group =
      parts.length >= 2
        ? parts.slice(0, parts.length - 1).join(".")
        : "general";
    if (!acc[group]) acc[group] = [];
    acc[group].push(key);
    return acc;
  }, {});

  // تسمية كل مجموعة
  const groupLabels: Record<string, string> = {
    "hero.badge": "الشارة العلوية",
    "hero.title1": "العنوان الرئيسي",
    "hero.title2": "الكلمة المميزة",
    "hero.subtitle": "الوصف",
    "hero.cta1": "الزر الأول",
    "hero.cta2": "الزر الثاني",
    "hero.stat1": "الإحصائية 1",
    "hero.stat2": "الإحصائية 2",
    "hero.stat3": "الإحصائية 3",
    "about.title": "العنوان",
    "about.subtitle": "العنوان الفرعي",
    "about.p1": "الفقرة الأولى",
    "about.p2": "الفقرة الثانية",
    "about.p3": "الفقرة الثالثة",
    "about.vision": "الرؤية",
    "about.mission": "الرسالة",
    "about.values": "القيم",
    "contact.phone": "رقم الهاتف",
    "contact.phoneDisplay": "عرض الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.address": "العنوان الجغرافي",
    "contact.whatsapp": "واتساب",
    "contact.facebook": "فيسبوك",
    "contact.instagram": "إنستغرام",
    "contact.linkedin": "لينكدإن",
    "contact.hours.days": "أيام العمل",
    "contact.hours.time": "ساعات العمل",
    "seo.title": "عنوان الصفحة",
    "seo.description": "وصف الصفحة",
    "seo.keywords": "الكلمات المفتاحية",
    "general.siteName": "اسم الموقع",
    "general.designerName": "اسم المصمم",
    "general.designerPhone": "هاتف المصمم",
    "general.designerPhoneDisplay": "عرض هاتف المصمم",
  };

  if (loading) {
    return (
      <div>
        <PageHeader
          title="تحرير محتوى الموقع"
          subtitle="عدّل النصوص والمعلومات الظاهرة في الموقع"
          breadcrumbs={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: "المحتوى" },
          ]}
        />
        <LoadingState text="جارٍ تحميل المحتوى..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="تحرير محتوى الموقع"
          subtitle="عدّل النصوص والمعلومات الظاهرة في الموقع"
          breadcrumbs={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: "المحتوى" },
          ]}
        />
        <ErrorState message={error} onRetry={fetchContent} />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <PageHeader
        title="تحرير محتوى الموقع"
        subtitle="عدّل النصوص والمعلومات الظاهرة في الموقع — التغييرات تُطبق فورًا بعد الحفظ"
        breadcrumbs={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "المحتوى" },
        ]}
        actions={
          <>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              title="معاينة الموقع"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">معاينة</span>
              <ExternalLink size={11} className="hidden sm:inline" />
            </Link>
            <button
              onClick={handleResetToDefaults}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              title="استعادة القيم الافتراضية"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">استعادة الافتراضي</span>
            </button>
          </>
        }
      />

      {/* Tabs */}
      <div className="mb-5">
        <ContentTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Fields */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-6">
        {Object.entries(groupedFields).map(([group, keys]) => (
          <div
            key={group}
            className="pb-6 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <h3 className="text-sm font-semibold text-[#21214f] mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#da8827] rounded-full" />
              {groupLabels[group] || group}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keys.map((key) => {
                const config = FIELD_LABELS[key] || {
                  label: key,
                };
                return (
                  <EditableField
                    key={key}
                    label={config.label}
                    value={content[key] ?? ""}
                    onChange={(v) => handleChange(key, v)}
                    multiline={config.multiline}
                    dir={config.dir}
                    hint={config.hint}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <SaveBar
        status={status}
        onSave={handleSave}
        onReset={handleReset}
        hasChanges={hasChanges}
      />
    </div>
  );
}
