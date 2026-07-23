"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Loader2, Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    errorParam === "forbidden"
      ? "ليس لديك صلاحية الوصول للوحة التحكم"
      : ""
  );

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
        setError("بيانات الدخول غير صحيحة. تأكد من البريد وكلمة المرور.");
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8f9fc]">
      {/* Right side: Brand panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#21214f] to-[#3a3a7a] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#da8827] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-xl flex items-center justify-center font-extrabold text-white text-xl shadow-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <h1 className="font-bold text-xl">تمام ميديا</h1>
              <p className="text-xs text-white/60">لوحة التحكم الإدارية</p>
            </div>
          </Link>

          <h2 className="text-4xl font-bold leading-tight mb-4">
            أهلًا بعودتك!
            <br />
            <span className="text-[#da8827]">إدارة احترافية</span>
            <br />
            لمشروعك الرقمي
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            ادخل إلى لوحة التحكم لإدارة الأعمال والخدمات والرسائل الواردة من
            عملائك.
          </p>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          © {new Date().getFullYear()} تمام ميديا — جميع الحقوق محفوظة
        </div>
      </div>

      {/* Left side: Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#da8827] to-[#e5a04f] rounded-xl flex items-center justify-center font-extrabold text-white text-xl shadow-lg">
              T
            </div>
            <div className="text-right">
              <h1 className="font-bold text-xl text-[#21214f]">تمام ميديا</h1>
              <p className="text-xs text-gray-500">لوحة التحكم</p>
            </div>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <div className="w-14 h-14 bg-[#da8827]/10 rounded-2xl flex items-center justify-center text-[#da8827] mb-4">
                <Lock size={28} />
              </div>
              <h2 className="text-2xl font-bold text-[#21214f] mb-1">
                تسجيل الدخول
              </h2>
              <p className="text-gray-500 text-sm">
                أدخل بياناتك للوصول إلى لوحة التحكم
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <ShieldAlert
                  size={20}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@tamammedia.com"
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#da8827] focus:bg-white focus:border-transparent outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#da8827] focus:bg-white focus:border-transparent outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-[#da8827] text-white py-3 rounded-xl font-medium hover:bg-[#b8701e] transition-all shadow-md shadow-[#da8827]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جارٍ تسجيل الدخول...
                  </>
                ) : (
                  <>
                    دخول
                    <ArrowRight size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-[#da8827] transition-colors inline-flex items-center gap-1"
              >
                <ArrowRight size={14} />
                العودة إلى الموقع
              </Link>
            </div>
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
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
          <Loader2 size={32} className="text-[#da8827] animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
