"use client";

import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, KeyRound, Loader2, Mail, Plus, ShieldCheck, ShieldOff, UserRoundCog, Users } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type ManagedUser = {
  id: string;
  name: string | null;
  email: string;
  role: "admin" | "editor";
  isActive: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
  createdAt: string;
};

const emptyEditor = { name: "", email: "", temporaryPassword: "" };

function localDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "لم يسجّل دخولاً بعد";
}

export default function UsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [form, setForm] = useState(emptyEditor);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [resetFor, setResetFor] = useState<string | null>(null);
  const [temporaryPassword, setTemporaryPassword] = useState("");

  const load = async () => {
    try {
      const response = await fetch("/api/users", { cache: "no-store" });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "تعذر تحميل المستخدمين");
      setUsers(payload?.data?.items || []);
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const createEditor = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "تعذر إنشاء حساب المحرر");
      setUsers((current) => [payload.data as ManagedUser, ...current]);
      setForm(emptyEditor);
      toast.success("تم إنشاء الحساب. أرسل كلمة المرور المؤقتة للمحرر عبر قناة آمنة.");
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر إنشاء حساب المحرر");
    } finally {
      setSubmitting(false);
    }
  };

  const updateEditor = async (id: string, body: Record<string, unknown>) => {
    setBusyId(id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "تعذر تحديث الحساب");
      setUsers((current) => current.map((user) => user.id === id ? payload.data as ManagedUser : user));
      return true;
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر تحديث الحساب");
      return false;
    } finally {
      setBusyId(null);
    }
  };

  const resetPassword = async (event: FormEvent, id: string) => {
    event.preventDefault();
    const changed = await updateEditor(id, { temporaryPassword });
    if (changed) {
      setResetFor(null);
      setTemporaryPassword("");
      toast.success("تم تعيين كلمة مرور مؤقتة. سيُطلب من المحرر تغييرها عند الدخول.");
    }
  };

  const editors = users.filter((user) => user.role === "editor");
  const admins = users.filter((user) => user.role === "admin");

  return (
    <div className="space-y-7 pb-10">
      <PageHeader
        title="المستخدمون والصلاحيات"
        subtitle="أنشئ حسابات المحررين، أوقف وصولهم فوراً، وأعد تعيين كلمة مرور مؤقتة عند الحاجة."
        breadcrumbs={[{ label: "لوحة التحكم", href: "/dashboard" }, { label: "المستخدمون والصلاحيات" }]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus size={19} className="text-accent-600" />إضافة محرر</CardTitle>
            <p className="text-sm leading-relaxed text-surface-500">الحسابات الجديدة تُنشأ بصلاحية تحرير المحتوى فقط، وتُجبر على تغيير كلمة المرور المؤقتة عند أول دخول.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={createEditor} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-xs font-bold text-surface-700">الاسم الاختياري<Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength={120} autoComplete="name" /></label>
                <label className="space-y-1.5 text-xs font-bold text-surface-700">البريد الإلكتروني<Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} dir="ltr" autoComplete="email" required /></label>
              </div>
              <label className="block space-y-1.5 text-xs font-bold text-surface-700">كلمة المرور المؤقتة<Input type="password" value={form.temporaryPassword} onChange={(event) => setForm({ ...form, temporaryPassword: event.target.value })} dir="ltr" autoComplete="new-password" minLength={12} required /></label>
              <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">اجعلها 12 حرفاً على الأقل وتحتوي حرفاً كبيراً وصغيراً ورقماً ورمزاً. لا تُرسلها بالبريد العام أو تحفظها في النظام.</p>
              <Button type="submit" isLoading={submitting} leftIcon={<UserRoundCog size={16} />}>إنشاء حساب المحرر</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-brand-950 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white"><ShieldCheck size={19} className="text-accent-300" />ضوابط الحماية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-white/75">
            <p>• المدير وحده يدير الحسابات والإعدادات والرسائل الواردة.</p>
            <p>• المحرر يدير الخدمات والأعمال والفريق والشركاء فقط.</p>
            <p>• إيقاف الحساب يمنع الوصول في طلبات الواجهة وواجهات API، وتتحقق اللوحة من حالة الحساب دورياً.</p>
            <p>• تُحفظ كلمات المرور كقيم مشفّرة فقط، مع سجل تدقيق لعمليات الإنشاء والتعطيل وإعادة التعيين.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users size={19} className="text-accent-600" />حسابات المحررين</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? <div className="flex min-h-32 items-center justify-center text-surface-500"><Loader2 className="me-2 animate-spin" size={19} />جارٍ تحميل الحسابات…</div> : editors.length === 0 ? <div className="rounded-2xl border border-dashed border-surface-300 bg-surface-50 p-8 text-center text-sm text-surface-500">لا يوجد محررون بعد.</div> : editors.map((user) => (
            <article key={user.id} className="rounded-2xl border border-surface-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold text-brand-900">{user.name || "محرر"}</h2><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{user.isActive ? "نشط" : "موقوف"}</span>{user.mustChangePassword && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">بانتظار تغيير كلمة المرور</span>}</div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-surface-500" dir="ltr"><Mail size={14} />{user.email}</p>
                  <p className="mt-3 text-xs text-surface-500">آخر دخول: {localDate(user.lastLoginAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant={user.isActive ? "danger" : "secondary"} isLoading={busyId === user.id} leftIcon={user.isActive ? <ShieldOff size={14} /> : <CheckCircle2 size={14} />} onClick={() => void updateEditor(user.id, { isActive: !user.isActive })}>{user.isActive ? "إيقاف الوصول" : "تفعيل الوصول"}</Button>
                  <Button type="button" size="sm" variant="outline" leftIcon={<KeyRound size={14} />} onClick={() => { setResetFor(resetFor === user.id ? null : user.id); setTemporaryPassword(""); }}>إعادة تعيين</Button>
                </div>
              </div>
              {resetFor === user.id && <form onSubmit={(event) => void resetPassword(event, user.id)} className="mt-4 flex flex-col gap-2 rounded-xl bg-surface-50 p-3 sm:flex-row"><Input type="password" value={temporaryPassword} onChange={(event) => setTemporaryPassword(event.target.value)} placeholder="كلمة مرور مؤقتة قوية" dir="ltr" minLength={12} required className="flex-1" /><Button type="submit" size="sm" isLoading={busyId === user.id}>تعيين المؤقتة</Button></form>}
            </article>
          ))}
        </CardContent>
      </Card>

      {admins.length > 0 && <Card>
        <CardHeader><CardTitle>المديرون</CardTitle></CardHeader>
        <CardContent className="space-y-2">{admins.map((user) => <div key={user.id} className="flex items-center justify-between rounded-xl bg-surface-50 px-4 py-3 text-sm"><span className="font-bold text-brand-900">{user.name || "مدير"}</span><span className="text-surface-500" dir="ltr">{user.email}</span></div>)}</CardContent>
      </Card>}
    </div>
  );
}
