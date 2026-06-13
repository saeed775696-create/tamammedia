import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tamammedia.vercel.app";

  // مثال: يمكنك لاحقاً جلب المشاريع من API وإدراجها
  const portfolioImages = [
    { url: "/projects/1.jpg", title: "E-commerce Redesign" },
    { url: "/projects/2.jpg", title: "Brand Identity" },
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      // تضمين الصور لتحسين فهرستها
     images: portfolioImages.map((img) => `${baseUrl}${img.url}`),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
