import { prisma } from "@/lib/database";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany();
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

export const getProduct = cache(async (urlSlug: string) => {
  const product = await prisma.product.findUnique({ where: { urlSlug } });
  return product;
});

export const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany();
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getCategory = cache(async (urlSlug: string) => {
  const category = await prisma.category.findUnique({ where: { urlSlug } });
  return category;
});

export const getBrands = unstable_cache(
  async () => {
    return await prisma.brand.findMany();
  },
  ["brands"],
  { revalidate: 3600, tags: ["brands"] },
);

export const getBrand = cache(async (urlSlug: string) => {
  const brand = await prisma.brand.findUnique({ where: { urlSlug } });
  return brand;
});
