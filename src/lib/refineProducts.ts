import { SortType } from "@/components/SortMenu";
import { Product } from "@prisma/client";

export const refineProducts = (products: Product[], sortOption: SortType) => {
  return products.sort((a, b) => {
    if (sortOption === "Featured") return b.pIndex - a.pIndex;
    else if (sortOption === "Alphabetical") return a.name.localeCompare(b.name);
    else if (sortOption === "PriceLow") return a.price - b.price;
    else if (sortOption === "PriceHigh") return b.price - a.price;
    else return 0; /* Unreachable */
  });
};
