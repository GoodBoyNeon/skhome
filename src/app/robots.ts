import { config } from "@/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/priv/",
    },
    sitemap: `${config.baseUrl}/sitemap.xml`,
  };
}
