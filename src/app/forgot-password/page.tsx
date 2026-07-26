"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "confirm" | "complete">("request");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestCode = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "تعذر إرسال رمز التحقق");
      setStep("confirm");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "تعذر إرسال رمز التحقق");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "الرمز غير صحيح أو انتهت صلاحيته");
      setStep("complete");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "تعذر إعادة تعيين كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-50 p-5">
      <section className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
        <div className="bg-brand-950 px-7 py-9 text-center text-white sm:px-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/20 text-accent-300"><KeyRound size={28} /></div>
          <h1 className="text-2xl font-extrabold">استعادة دخول المدير</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/70">سنرسل رمزاً صالحاً لمرة واحدة إلى البريد المسجل لحساب المدير.</p>
        </div>
        <div className="p-7 sm:p-10">
          {step === "request" && <form onSubmit={requestCode} className="space-y-5">
            <label className="block space-y-2 text-sm font-bold text-brand-900">البريد الإلكتروني للمدير<div className="relative mt-2"><Mail className="absolute start-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required dir="ltr" className="w-full rounded-xl border border-surface-200 bg-surface-50 py-3 ps-10 pe-4 text-left outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" /></div></label>
            <p className="text-xs leading-relaxed text-surface-500">لأسباب أمنية، ستظهر الرسالة نفسها سواء كان البريد مسجلاً أم لا.</p>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
            <button type="submit" disabled={loading || !email} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 py-3.5 font-bold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}إرسال رمز التحقق</button>
          </form>}

          {step === "confirm" && <form onSubmit={resetPassword} className="space-y-5">
            <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium leading-relaxed text-emerald-800">إذا كان البريد مؤهلاً للاستعادة، أرسلنا إليه رمزاً من 6 أرقام. الرمز ينتهي خلال 10 دقائق.</div>
            <label className="block space-y-2 text-sm font-bold text-brand-900">رمز التحقق<input inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} autoComplete="one-time-code" required dir="ltr" className="mt-2 w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-center text-xl font-bold tracking-[0.5em] outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" /></label>
            <label className="block space-y-2 text-sm font-bold text-brand-900">كلمة المرور الجديدة<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={12} autoComplete="new-password" required dir="ltr" className="mt-2 w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-left outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" /></label>
            <p className="text-xs leading-relaxed text-surface-500">استخدم 12 حرفاً على الأقل، مع حرف كبير وصغير ورقم ورمز خاص.</p>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
            <button type="submit" disabled={loading || code.length !== 6 || !newPassword} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 py-3.5 font-bold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}اعتماد كلمة المرور الجديدة</button>
            <button type="button" onClick={() => { setStep("request"); setError(""); }} className="w-full text-sm font-bold text-surface-500 hover:text-brand-900">استخدام بريد آخر</button>
          </form>}

          {step === "complete" && <div className="space-y-5 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><ShieldCheck size={30} /></div><h2 className="text-xl font-extrabold text-brand-900">تمت إعادة تعيين كلمة المرور</h2><p className="text-sm leading-relaxed text-surface-600">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة. تم إبطال الجلسات القديمة للحساب.</p><Link href="/login?passwordChanged=1" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 py-3.5 font-bold text-white"><ArrowRight size={18} className="rotate-180" />الذهاب لتسجيل الدخول</Link></div>}
          {step !== "complete" && <Link href="/login" className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-surface-500 hover:text-brand-900"><ArrowRight size={16} className="rotate-180" />العودة لتسجيل الدخول</Link>}
        </div>
      </section>
    </main>
  );
}
