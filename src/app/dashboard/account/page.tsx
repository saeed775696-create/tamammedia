"use client";

import { type FormEvent, useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { KeyRound, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import AccountEmailForm from "@/components/dashboard/AccountEmailForm";

export default function AccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || "تعذر تغيير كلمة المرور");
      toast.success("تم تغيير كلمة المرور. سجّل الدخول مرة أخرى للمتابعة.");
      await signOut({ callbackUrl: "/login?passwordChanged=1" });
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "تعذر تغيير كلمة المرور");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-7 pb-10">
      <PageHeader title="حسابي وأمان" subtitle="غيّر كلمة مرورك من داخل لوحة التحكم. سيُطلب منك تسجيل الدخول مجدداً بعد الحفظ." breadcrumbs={[{ label: "لوحة التحكم", href: "/dashboard" }, { label: "حسابي وأمان" }]} />
      <AccountEmailForm />
      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><KeyRound size={19} className="text-accent-600" />تغيير كلمة المرور</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-5">
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">كلمة المرور الحالية<Input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required dir="ltr" /></label>
            <label className="block space-y-1.5 text-sm font-bold text-surface-700">كلمة المرور الجديدة<Input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" minLength={12} required dir="ltr" /></label>
            <p className="rounded-xl bg-surface-50 p-3 text-xs leading-relaxed text-surface-500">يجب أن تتكون كلمة المرور من 12 حرفاً على الأقل، وتضم حرفاً كبيراً وصغيراً ورقماً ورمزاً خاصاً. تغييرها يبطل الجلسات القديمة للحساب.</p>
            <Button type="submit" isLoading={saving} leftIcon={<ShieldCheck size={16} />}>حفظ كلمة المرور الجديدة</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
