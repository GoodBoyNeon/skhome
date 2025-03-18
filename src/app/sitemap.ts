import { MetadataRoute } from "next";
import { config } from "@/config";
import { prisma } from "@/lib/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { baseUrl } = config;

  const products = await prisma.product.findMany({
    select: {
      urlSlug: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const categories = await prisma.category.findMany({
    select: {
      urlSlug: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const brands = await prisma.brand.findMany({
    select: {
      urlSlug: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const productMaps: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.urlSlug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const categoryMaps: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/category/${c.urlSlug}`,
    lastModified: c.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const brandMaps: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/brand/${b.urlSlug}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/visit`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...productMaps,
    ...categoryMaps,
    ...brandMaps,
  ];
}
