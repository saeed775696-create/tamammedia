import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // وضع standalone مخصص لـ Docker/container deployments.
  // على Vercel لا يؤثر (Vercel يتعامل مع البناء بنفسه).
  output: "standalone",

  // السماح بتحميل الصور من Supabase ومن أي مصدر خارجي معروف
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.vercel.app" },
    ],
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
