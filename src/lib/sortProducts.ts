import { SortType } from "@/components/SortMenu";
import { Product } from "@/generated/prisma";

export const sortProducts = (products: Product[], sortOption: SortType) => {
  return products.sort((a, b) => {
    if (sortOption === "featured") return b.pIndex - a.pIndex;
    else if (sortOption === "alphabetical") return a.name.localeCompare(b.name);
    else if (sortOption === "price-low") return a.price - b.price;
    else if (sortOption === "price-high") return b.price - a.price;
    else return 0; /* Unreachable */
  });
};
