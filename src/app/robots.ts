import { siteConfig } from "@/siteConfig";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/priv/", "/admin/"],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
