import { config } from "@/config";
import { getBrands, getCategories, getProducts } from "@/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { baseUrl } = config;

  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();

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
      changeFrequency: "weekly",
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
