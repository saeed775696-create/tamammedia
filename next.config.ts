import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // وضع standalone مخصص لـ Docker/container deployments.
  // على Vercel لا يؤثر (Vercel يتعامل مع البناء بنفسه).
  output: "standalone",

  // السماح بتحميل الصور من أي مصدر HTTPS.
  // ملاحظة: لوحة التحكم تسمح للمسؤول بلصق رابط أي صورة يدويًا
  // (ImageUpload / الحقول اليدوية في صفحات portfolio, services, team, partners)،
  // وليس فقط روابط Supabase. حصر remotePatterns على نطاقات معدودة كان يتسبب
  // بانهيار next/image ("hostname is not configured") في صفحات الأعمال
  // والخدمات العامة كلما استخدم المسؤول رابط صورة من مصدر خارج القائمة.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  // رؤوس أمان أساسية
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
