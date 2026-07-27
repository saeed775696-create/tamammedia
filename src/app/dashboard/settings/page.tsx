"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarChart3, Image as ImageIcon, LayoutTemplate, Loader2, Save, Settings2, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import AnalyticsSettingsPanel from "@/components/dashboard/AnalyticsSettingsPanel";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { defaultSiteSettings } from "@/config/site-settings";
import type { SiteSettings } from "@/types/site-settings";

type Tab = "identity" | "hero" | "home" | "analytics";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs font-bold text-surface-700">{label}</span>
      {children}
      {hint && <span className="block text-[11px] leading-relaxed text-surface-400">{hint}</span>}
    </label>
  );
}

function LanguageFields({
  label,
  ar,
  en,
  onArChange,
  onEnChange,
  multiline = false,
}: {
  label: string;
  ar: string;
  en: string;
  onArChange: (value: string) => void;
  onEnChange: (value: string) => void;
  multiline?: boolean;
}) {
  const Component = multiline ? Textarea : Input;
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-surface-700">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="العربية">
          <Component value={ar} onChange={(event) => onArChange(event.target.value)} />
        </Field>
        <Field label="English">
          <Component value={en} onChange={(event) => onEnChange(event.target.value)} dir="ltr" className="text-left" />
        </Field>
      </div>
    </div>
  );
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [activeTab, setActiveTab] = useState<Tab>("identity");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/site-settings", { cache: "no-store" });
        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.data) {
          throw new Error(payload?.error?.message || "تعذر تحميل إعدادات الموقع");
        }
        setSettings(payload.data as SiteSettings);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "تعذر تحميل إعدادات الموقع");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const update = <K extends keyof SiteSettings>(section: K, patch: Partial<SiteSettings[K]>) => {
    setSettings((current) => ({
      ...current,
      [section]: { ...current[section], ...patch },
    }));
  };

  const updateAnalyticsMeasurementId = useCallback((googleMeasurementId: string) => {
    setSettings((current) => ({
      ...current,
      analytics: { googleMeasurementId },
    }));
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message || "تعذر حفظ الإعدادات");
      }
      setSettings(payload.data as SiteSettings);
      toast.success("تم نشر التعديلات على الموقع");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Settings2 }[] = [
    { id: "identity", label: "الهوية والتواصل", icon: Settings2 },
    { id: "hero", label: "واجهة الصفحة الرئيسية", icon: LayoutTemplate },
    { id: "home", label: "محتوى الصفحة والفوتر", icon: Users },
    { id: "analytics", label: "التحليلات وGoogle", icon: BarChart3 },
  ];

  return (
    <form onSubmit={save} className="pb-10">
      <PageHeader
        title="إعدادات الموقع"
        subtitle="تحكم في الهوية والمعلومات وواجهات الموقع العامة من مكان واحد."
        breadcrumbs={[{ label: "لوحة التحكم", href: "/dashboard" }, { label: "إعدادات الموقع" }]}
        actions={activeTab !== "analytics" ? (
          <Button type="submit" isLoading={saving || loading} leftIcon={saving ? <Loader2 size={16} /> : <Save size={16} />}>
            حفظ ونشر
          </Button>
        ) : undefined}
      />

      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-surface-200 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${selected ? "bg-brand-900 text-white shadow-sm" : "text-surface-600 hover:bg-surface-100 hover:text-brand-900"}`}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-3xl border border-surface-200 bg-white text-surface-500">
          <Loader2 className="me-2 animate-spin" size={20} /> جارٍ تحميل الإعدادات…
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === "identity" && (
            <>
              <Card>
                <CardHeader><CardTitle>هوية العلامة التجارية</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <ImageUpload label="شعار الموقع" value={settings.branding.logoUrl} onChange={(logoUrl) => update("branding", { logoUrl })} />
                  <LanguageFields
                    label="اسم العلامة التجارية"
                    ar={settings.branding.nameAr}
                    en={settings.branding.nameEn}
                    onArChange={(nameAr) => update("branding", { nameAr })}
                    onEnChange={(nameEn) => update("branding", { nameEn })}
                  />
                  <LanguageFields
                    label="الشعار النصي القصير"
                    ar={settings.branding.taglineAr}
                    en={settings.branding.taglineEn}
                    onArChange={(taglineAr) => update("branding", { taglineAr })}
                    onEnChange={(taglineEn) => update("branding", { taglineEn })}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>بيانات التواصل والموقع</CardTitle></CardHeader>
                <CardContent className="grid gap-5 md:grid-cols-2">
                  <Field label="البريد الإلكتروني"><Input type="email" value={settings.contact.email} onChange={(e) => update("contact", { email: e.target.value })} dir="ltr" /></Field>
                  <Field label="رقم الهاتف الدولي" hint="أرقام فقط، من دون + أو مسافات."><Input value={settings.contact.phone} onChange={(e) => update("contact", { phone: e.target.value })} dir="ltr" /></Field>
                  <Field label="رقم الهاتف الظاهر للزوار"><Input value={settings.contact.phoneDisplay} onChange={(e) => update("contact", { phoneDisplay: e.target.value })} dir="ltr" /></Field>
                  <Field label="رابط خريطة Google Embed" hint="استخدم رابط التضمين من Google Maps."><Input value={settings.contact.mapEmbedUrl} onChange={(e) => update("contact", { mapEmbedUrl: e.target.value })} dir="ltr" /></Field>
                  <LanguageFields
                    label="الموقع الجغرافي"
                    ar={settings.contact.locationAr}
                    en={settings.contact.locationEn}
                    onArChange={(locationAr) => update("contact", { locationAr })}
                    onEnChange={(locationEn) => update("contact", { locationEn })}
                  />
                  <LanguageFields
                    label="ساعات العمل"
                    ar={settings.contact.workingHoursAr}
                    en={settings.contact.workingHoursEn}
                    onArChange={(workingHoursAr) => update("contact", { workingHoursAr })}
                    onEnChange={(workingHoursEn) => update("contact", { workingHoursEn })}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>روابط التواصل الاجتماعي</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {(["facebook", "instagram", "linkedin", "whatsapp"] as const).map((name) => (
                    <Field key={name} label={name === "linkedin" ? "LinkedIn" : name.charAt(0).toUpperCase() + name.slice(1)}>
                      <Input value={settings.social[name]} onChange={(e) => update("social", { [name]: e.target.value })} dir="ltr" />
                    </Field>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "hero" && (
            <>
              <Card>
                <CardHeader><CardTitle>النصوص والأزرار الرئيسية</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <LanguageFields label="الشارة أعلى العنوان" ar={settings.hero.badgeAr} en={settings.hero.badgeEn} onArChange={(badgeAr) => update("hero", { badgeAr })} onEnChange={(badgeEn) => update("hero", { badgeEn })} />
                  <LanguageFields label="العنوان الرئيسي" ar={settings.hero.headingAr} en={settings.hero.headingEn} onArChange={(headingAr) => update("hero", { headingAr })} onEnChange={(headingEn) => update("hero", { headingEn })} />
                  <LanguageFields label="العبارة الملوّنة في العنوان" ar={settings.hero.accentAr} en={settings.hero.accentEn} onArChange={(accentAr) => update("hero", { accentAr })} onEnChange={(accentEn) => update("hero", { accentEn })} />
                  <LanguageFields label="الوصف" ar={settings.hero.descriptionAr} en={settings.hero.descriptionEn} onArChange={(descriptionAr) => update("hero", { descriptionAr })} onEnChange={(descriptionEn) => update("hero", { descriptionEn })} multiline />
                  <LanguageFields label="زر التواصل الرئيسي" ar={settings.hero.primaryCtaAr} en={settings.hero.primaryCtaEn} onArChange={(primaryCtaAr) => update("hero", { primaryCtaAr })} onEnChange={(primaryCtaEn) => update("hero", { primaryCtaEn })} />
                  <LanguageFields label="زر الخدمات" ar={settings.hero.secondaryCtaAr} en={settings.hero.secondaryCtaEn} onArChange={(secondaryCtaAr) => update("hero", { secondaryCtaAr })} onEnChange={(secondaryCtaEn) => update("hero", { secondaryCtaEn })} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>صورة البانر وعُقد شبكة الخدمات</CardTitle>
                  <p className="mt-1 text-xs leading-relaxed text-surface-500">تظهر الصورة الأولى خلفيةً للبانر، بينما تمثل العناوين جميعها عُقد شبكة الخدمات المتحركة على الشاشات الكبيرة.</p>
                </CardHeader>
                <CardContent className="grid gap-6 lg:grid-cols-2">
                  {settings.hero.cards.map((card, index) => (
                    <div key={index} className="space-y-4 rounded-2xl border border-surface-200 bg-surface-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-brand-900"><ImageIcon size={17} /> {index === 0 ? "العقدة الأولى وصورة البانر" : `عقدة الشبكة ${index + 1}`}</div>
                      {index === 0 && (
                        <ImageUpload
                          label="صورة خلفية البانر"
                          value={card.imageUrl}
                          onChange={(imageUrl) => {
                            const cards = settings.hero.cards.map((item, itemIndex) => itemIndex === index ? { ...item, imageUrl } : item);
                            update("hero", { cards });
                          }}
                        />
                      )}
                      <LanguageFields
                        label="اسم الخدمة أو العمل"
                        ar={card.ar}
                        en={card.en}
                        onArChange={(ar) => update("hero", { cards: settings.hero.cards.map((item, itemIndex) => itemIndex === index ? { ...item, ar } : item) })}
                        onEnChange={(en) => update("hero", { cards: settings.hero.cards.map((item, itemIndex) => itemIndex === index ? { ...item, en } : item) })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>الإحصاءات</CardTitle></CardHeader>
                <CardContent className="grid gap-5 lg:grid-cols-3">
                  {settings.hero.stats.map((stat, index) => (
                    <div key={index} className="space-y-3 rounded-2xl border border-surface-200 bg-surface-50/60 p-4">
                      <Field label="القيمة"><Input value={stat.value} onChange={(e) => update("hero", { stats: settings.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, value: e.target.value } : item) })} dir="ltr" /></Field>
                      <LanguageFields label="الوصف" ar={stat.ar} en={stat.en} onArChange={(ar) => update("hero", { stats: settings.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, ar } : item) })} onEnChange={(en) => update("hero", { stats: settings.hero.stats.map((item, itemIndex) => itemIndex === index ? { ...item, en } : item) })} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "home" && (
            <>
              <Card>
                <CardHeader><CardTitle>قسم «من نحن» في الصفحة الرئيسية</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <LanguageFields label="العنوان الصغير" ar={settings.homeAbout.eyebrowAr} en={settings.homeAbout.eyebrowEn} onArChange={(eyebrowAr) => update("homeAbout", { eyebrowAr })} onEnChange={(eyebrowEn) => update("homeAbout", { eyebrowEn })} />
                  <LanguageFields label="العنوان" ar={settings.homeAbout.titleAr} en={settings.homeAbout.titleEn} onArChange={(titleAr) => update("homeAbout", { titleAr })} onEnChange={(titleEn) => update("homeAbout", { titleEn })} />
                  <LanguageFields label="الوصف" ar={settings.homeAbout.descriptionAr} en={settings.homeAbout.descriptionEn} onArChange={(descriptionAr) => update("homeAbout", { descriptionAr })} onEnChange={(descriptionEn) => update("homeAbout", { descriptionEn })} multiline />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>الفوتر وبيانات المصمم</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <LanguageFields label="وصف الشركة في الفوتر" ar={settings.footer.descriptionAr} en={settings.footer.descriptionEn} onArChange={(descriptionAr) => update("footer", { descriptionAr })} onEnChange={(descriptionEn) => update("footer", { descriptionEn })} multiline />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="اسم المصمم"><Input value={settings.footer.designerName} onChange={(e) => update("footer", { designerName: e.target.value })} /></Field>
                    <Field label="رقم المصمم الدولي"><Input value={settings.footer.designerPhone} onChange={(e) => update("footer", { designerPhone: e.target.value })} dir="ltr" /></Field>
                    <Field label="رقم المصمم الظاهر"><Input value={settings.footer.designerPhoneDisplay} onChange={(e) => update("footer", { designerPhoneDisplay: e.target.value })} dir="ltr" /></Field>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "analytics" && (
            <AnalyticsSettingsPanel
              measurementId={settings.analytics.googleMeasurementId}
              onMeasurementIdChange={updateAnalyticsMeasurementId}
            />
          )}
        </div>
      )}

      {activeTab !== "analytics" && (
        <div className="sticky bottom-4 mt-8 flex justify-end">
          <Button type="submit" size="lg" isLoading={saving || loading} leftIcon={<Save size={17} />} className="shadow-xl">
            حفظ ونشر التعديلات
          </Button>
        </div>
      )}
    </form>
  );
}
