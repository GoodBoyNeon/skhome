import { SortType } from "@/components/SortMenu";
import { Product } from "@prisma/client";

export const refineProducts = (products: Product[], sortOption: SortType) => {
  return products.sort((a, b) => {
    if (sortOption === "Alphabetical") return a.name.localeCompare(b.name);
    if (sortOption === "PriceLow") return a.price - b.price;
    if (sortOption === "PriceHigh") return b.price - a.price;
    else return 0; /* Unreachable */
  });
};
