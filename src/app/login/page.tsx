"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Loader2, Lock, Mail, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";

function getSignInErrorMessage(errorCode: string | null | undefined) {
  switch (errorCode) {
    case "forbidden":
      return "ليس لديك صلاحية الوصول للوحة التحكم.";
    case "access-revoked":
      return "تم إيقاف وصول هذا الحساب. راجع مدير النظام.";
    case "CredentialsSignin":
      return "بيانات الدخول غير صحيحة. تأكد من البريد وكلمة المرور.";
    case "RATE_LIMITED":
      return "تم إيقاف المحاولات مؤقتًا لحماية الحساب. انتظر 15 دقيقة ثم حاول مجددًا.";
    case "AUTH_SERVICE_UNAVAILABLE":
    case "Callback":
    case "Configuration":
      return "تعذّر إكمال تسجيل الدخول بسبب عطل مؤقت في خدمة المصادقة. حاول بعد قليل.";
    default:
      return errorCode ? "تعذّر إكمال تسجيل الدخول. حاول مرة أخرى بعد قليل." : "";
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(() => getSignInErrorMessage(errorParam));
  const passwordChanged = searchParams.get("passwordChanged") === "1";
  const passwordReset = searchParams.get("passwordReset") === "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(getSignInErrorMessage(res.error));
      } else if (res?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
      }
    } catch {
      setError("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-50 font-sans selection:bg-accent-500/20 selection:text-accent-500 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      {/* Right side: Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-950 text-white p-16 flex-col justify-between relative overflow-hidden border-l border-white/5 shadow-2xl z-10 rounded-l-[3rem]">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center justify-center flex-1">
          <div className="inline-flex flex-col items-center gap-3 mb-12 group">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center font-extrabold text-white text-3xl shadow-lg shadow-accent-500/25 group-hover:scale-105 transition-all duration-300">
              T
            </div>
            <div>
              <h1 className="font-extrabold text-2xl tracking-tight">تمام ميديا</h1>
              <p className="text-sm text-surface-400 font-medium mt-1">بوابة الإدارة المركزية</p>
            </div>
          </div>

          <h2 className="text-5xl font-black leading-[1.3] mb-6 tracking-tight">
            أهلاً بك مجدداً في<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-200">
              مركز التحكم
            </span>
          </h2>
          <p className="text-surface-300 text-lg leading-relaxed max-w-md font-medium mx-auto">
            مساحتك الآمنة لإدارة المحتوى، متابعة الرسائل، والإشراف على شركاء النجاح بكل سهولة واحترافية.
          </p>
        </div>

        <div className="relative z-10 text-sm font-medium text-surface-500 flex flex-col items-center gap-2 mt-8">
          <span>© {new Date().getFullYear()} تمام ميديا</span>
          <span className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-accent-500" /> اتصال آمن ومشفر
          </span>
        </div>
      </div>

      {/* Left side: Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="w-full max-w-[28rem] relative">
          
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center justify-center gap-4 mb-10 group">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center font-extrabold text-white text-3xl shadow-xl shadow-accent-500/20 group-hover:scale-105 transition-transform duration-300">
              T
            </div>
            <div className="text-center">
              <h1 className="font-black text-2xl text-brand-900 tracking-tight">تمام ميديا</h1>
              <p className="text-sm font-medium text-surface-500">لوحة التحكم</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white p-10 sm:p-14 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            <div className="mb-12 text-center">
              <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center text-accent-500 mb-6 mx-auto shadow-sm ring-1 ring-accent-100">
                <Lock size={28} strokeWidth={2} />
              </div>
              <h2 className="text-[28px] font-extrabold text-brand-900 mb-3 tracking-tight">
                تسجيل الدخول
              </h2>
              <p className="text-surface-500 text-[15px] font-medium leading-relaxed">
                يرجى إدخال بيانات الاعتماد الخاصة بك للمتابعة إلى لوحة التحكم
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldAlert
                  size={20}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <p className="text-red-700 text-sm font-bold leading-relaxed">{error}</p>
              </div>
            )}
            {(passwordChanged || passwordReset) && !error && (
              <div className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <ShieldAlert size={20} className="mt-0.5 shrink-0 text-emerald-600" />
                <p className="text-sm font-bold leading-relaxed text-emerald-700">{passwordChanged ? "تم تغيير كلمة المرور بنجاح. سجّل الدخول بكلمة المرور الجديدة." : "تمت إعادة تعيين كلمة المرور من قبل المدير. استخدم كلمة المرور المؤقتة الجديدة."}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-[15px] font-bold text-brand-900 ps-1"
                >
                  البريد الإلكتروني
                </label>
                <div className="relative group">
                  <Mail
                    size={22}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-accent-500 transition-colors pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    dir="ltr"
                    className="w-full px-14 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl text-[16px] font-medium text-brand-900 focus:ring-4 focus:ring-accent-500/10 focus:bg-white focus:border-accent-500 outline-none transition-all placeholder:text-surface-400 text-right"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ps-1 pe-1">
                  <label
                    htmlFor="password"
                    className="block text-[15px] font-bold text-brand-900"
                  >
                    كلمة المرور
                  </label>
                  <Link href="/forgot-password" className="text-xs font-bold text-accent-600 hover:text-accent-800">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative group">
                  <Lock
                    size={22}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-accent-500 transition-colors pointer-events-none"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    dir="ltr"
                    className="w-full px-14 py-4 bg-surface-50 border-2 border-surface-200 rounded-2xl text-[16px] font-medium text-brand-900 focus:ring-4 focus:ring-accent-500/10 focus:bg-white focus:border-accent-500 outline-none transition-all placeholder:text-surface-400 text-right tracking-wider"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-brand-900 focus:text-brand-900 transition-colors p-1"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-brand-900 text-white py-4 mt-4 rounded-2xl font-bold text-[16px] hover:bg-brand-800 transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowRight size={20} className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-[14px] font-bold text-surface-500 hover:text-brand-900 transition-colors inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full hover:bg-surface-100/80"
            >
              <ArrowRight size={16} className="rotate-180" />
              العودة إلى الموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface-50">
          <Loader2 size={36} className="text-accent-500 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
