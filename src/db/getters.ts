import { prisma } from "@/lib/database";
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany();
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);
