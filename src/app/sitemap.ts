import { prisma } from "@/lib/database";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://skhometraders.com.np";

  const products = await prisma.product.findMany({
    select: {
      urlSlug: true,
    },
  });
  const categories = await prisma.brand.findMany({
    select: {
      urlSlug: true,
    },
  });
  const brands = await prisma.brand.findMany({
    select: {
      urlSlug: true,
    },
  });

  const productsUrl = products.map((p) => ({
    url: `${baseUrl}/products/${p.urlSlug}`,
  }));
  const categoriesUrl = categories.map((p) => ({
    url: `${baseUrl}/products/${p.urlSlug}`,
  }));
  const brandsUrl = brands.map((p) => ({
    url: `${baseUrl}/products/${p.urlSlug}`,
  }));

  return [
    {
      url: "https://",
    },
    ...productsUrl,
  ];
}
