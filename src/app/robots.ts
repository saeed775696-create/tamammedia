import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Administrative and authentication routes must never be discovered from
      // crawl directives. Authentication still protects these routes; robots is
      // an additional discovery-control layer, not an access-control mechanism.
      disallow: [
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/login",
        "/forgot-password",
        "/change-password",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
