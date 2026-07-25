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
    // تحسين أداء الصور
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // دعم صيغ الصور الحديثة
    formats: ['image/webp', 'image/avif'],
    // تحسين التخزين المؤقت للصور
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // تحسينات الأداء
  experimental: {
    // Enable optimized font loading
    optimizeCss: true,
    // Enable optimized image loading
    optimizePackageImports: ['lucide-react'],
  },

  // رؤوس أمان أساسية
  async headers() {
    return [
      {
        // رؤوس الأمان تُطبق على كل المسارات (بدون كاش — الصفحات ديناميكية)
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
      {
        // الكاش الدائم (immutable) يُحصر على ملفات البناء الثابتة فقط
        // (أسماؤها تحتوي hash فلا تتغير إلا مع بناء جديد)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // الصور العامة — كاش طويل لكن قابل لإعادة التحقق
        // (حتى تظهر الصور المُحدّثة من لوحة التحكم)
        source: "/imgs/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
