"use client";

import { type FormEvent, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function AccountEmailForm() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [code, setCode] = useState("");
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [saving, setSaving] = useState(false);

  const normalizedEmail = email.trim().toLowerCase();

  const requestCode = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    if (normalizedEmail !== confirmEmail.trim().toLowerCase()) {
      toast.error("تأكيد البريد الإلكتروني لا يطابق البريد الجديد.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/account/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, currentPassword }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error?.message || "تعذر إرسال رمز التأكيد.");
      }
      setAwaitingCode(true);
      toast.success("أُرسل رمز التأكيد إلى البريد الجديد.");
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر إرسال رمز التأكيد.");
    } finally {
      setSaving(false);
    }
  };

  const confirmChange = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const response = await fetch("/api/account/email/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, code }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error?.message || "تعذر تأكيد البريد الإلكتروني.");
      }
      toast.success("تم تغيير بريد الحساب. سجّل الدخول بالبريد الجديد.");
      await signOut({ callbackUrl: "/login?emailChanged=1" });
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر تأكيد البريد الإلكتروني.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail size={19} className="text-accent-600" />
          بريد الحساب ورموز الاستعادة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!awaitingCode ? (
          <form onSubmit={requestCode} className="space-y-5">
            <p className="rounded-xl bg-surface-50 p-3 text-sm text-surface-600">
              البريد الحالي: <span dir="ltr" className="font-bold">{session?.user?.email || "—"}</span>
            </p>
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">
              البريد الإلكتروني الجديد
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required dir="ltr" />
            </label>
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">
              تأكيد البريد الإلكتروني الجديد
              <Input type="email" value={confirmEmail} onChange={(event) => setConfirmEmail(event.target.value)} autoComplete="email" required dir="ltr" />
            </label>
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">
              كلمة المرور الحالية للتأكيد
              <Input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required dir="ltr" />
            </label>
            <p className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
              لن يتغير البريد إلا بعد إدخال رمز يُرسل إلى البريد الجديد. سيصلك أيضًا تنبيه على البريد السابق عند اكتمال التغيير.
            </p>
            <Button type="submit" isLoading={saving} leftIcon={<ShieldCheck size={16} />}>
              إرسال رمز التأكيد
            </Button>
          </form>
        ) : (
          <form onSubmit={confirmChange} className="space-y-5">
            <p className="rounded-xl bg-surface-50 p-3 text-sm text-surface-600">
              أدخل الرمز المكوّن من ستة أرقام المُرسل إلى <span dir="ltr" className="font-bold">{normalizedEmail}</span>.
            </p>
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">
              رمز التأكيد
              <Input type="text" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} dir="ltr" />
            </label>
            <p className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
              ينتهي الرمز خلال 10 دقائق. بعد التأكيد ستُلغى كل الجلسات ورموز الاستعادة السابقة، ثم تسجّل الدخول بالبريد الجديد.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" isLoading={saving} leftIcon={<ShieldCheck size={16} />}>تأكيد وتغيير البريد</Button>
              <Button type="button" variant="outline" onClick={() => { setAwaitingCode(false); setCode(""); }} disabled={saving}>تعديل البريد</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
