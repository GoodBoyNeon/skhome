import { Product } from "@prisma/client";

export type FilterType = "brand" | "category";

export const filterProducts = (
  products: Product[],
  filterType: FilterType,
  filterId: number,
) => {
  return filterType === "brand"
    ? products.filter((p) => p.brandId === filterId)
    : filterType === "category"
      ? products.filter((p) => p.categoryId === filterId)
      : [];
};
