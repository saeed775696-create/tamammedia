"use client";

import { type FormEvent, useState } from "react";
import { signOut } from "next-auth/react";
import { Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from "lucide-react";

export default function ChangePasswordForm({ email }: { email: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const getNewPasswordError = (password: string) => {
    if (password.length < 12) return "يجب أن تتكون كلمة المرور الجديدة من 12 حرفًا على الأقل.";
    if (!/[a-z]/.test(password)) return "يجب أن تحتوي كلمة المرور الجديدة على حرف إنجليزي صغير.";
    if (!/[A-Z]/.test(password)) return "يجب أن تحتوي كلمة المرور الجديدة على حرف إنجليزي كبير.";
    if (!/\d/.test(password)) return "يجب أن تحتوي كلمة المرور الجديدة على رقم واحد على الأقل.";
    if (!/[^A-Za-z0-9]/.test(password)) return "يجب أن تحتوي كلمة المرور الجديدة على رمز خاص، مثل ! أو @.";
    if (password === currentPassword) return "يجب أن تختلف كلمة المرور الجديدة عن كلمة المرور المؤقتة.";
    return null;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setError("");

    const passwordError = getNewPasswordError(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("تأكيد كلمة المرور لا يطابق كلمة المرور الجديدة.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error?.message || "تعذر تغيير كلمة المرور");
      }
      await signOut({ callbackUrl: "/login?passwordChanged=1" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "تعذر تغيير كلمة المرور");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-50 p-5">
      <section className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
        <div className="bg-brand-950 px-7 py-9 text-center text-white sm:px-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/20 text-accent-300"><ShieldCheck size={28} /></div>
          <h1 className="text-2xl font-extrabold">تأمين حسابك</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/70">هذه أول مرة تدخل فيها بكلمة المرور المؤقتة. أنشئ كلمة مرور خاصة بك للمتابعة.</p>
        </div>
        <form onSubmit={submit} className="space-y-5 p-7 sm:p-10">
          <p className="rounded-xl bg-surface-50 px-4 py-3 text-center text-sm font-medium text-surface-600" dir="ltr">{email}</p>
          <label className="block space-y-2 text-sm font-bold text-brand-900">
            كلمة المرور المؤقتة
            <div className="relative mt-2">
              <KeyRound className="absolute start-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input type={showPassword ? "text" : "password"} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-xl border border-surface-200 bg-surface-50 py-3 pe-11 ps-10 text-left outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" dir="ltr" />
            </div>
          </label>
          <label className="block space-y-2 text-sm font-bold text-brand-900">
            كلمة المرور الجديدة
            <div className="relative mt-2">
              <KeyRound className="absolute start-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" required minLength={12} className="w-full rounded-xl border border-surface-200 bg-surface-50 py-3 pe-11 ps-10 text-left outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" dir="ltr" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute end-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-brand-900" aria-label={showPassword ? "إخفاء كلمات المرور" : "إظهار كلمات المرور"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </label>
          <p className="text-xs leading-relaxed text-surface-500">12 حرفاً على الأقل، وتتضمن حرفاً كبيراً وصغيراً ورقماً ورمزاً خاصاً.</p>
          <label className="block space-y-2 text-sm font-bold text-brand-900">
            تأكيد كلمة المرور الجديدة
            <div className="relative mt-2">
              <KeyRound className="absolute start-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
              <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required minLength={12} className="w-full rounded-xl border border-surface-200 bg-surface-50 py-3 pe-11 ps-10 text-left outline-none transition focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10" dir="ltr" />
            </div>
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
          <button type="submit" disabled={saving || !currentPassword || !newPassword} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 py-3.5 font-bold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />} حفظ كلمة المرور والمتابعة
          </button>
        </form>
      </section>
    </main>
  );
}
