import { prisma } from "./database";
import { CartItem } from "@/hooks/useCart";

export const searchParamsToProducts = async (
  params: string | string[] | undefined,
) => {
  const items: CartItem[] = [];
  if (typeof params === "object") {
    for (const cartId of params) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(cartId.split("q")[0]) },
      });

      if (!product) return;

      items.push({
        product,
        quantity: parseInt(cartId.split("q")[1]),
      });
    }
  }
  if (typeof params === "string") {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.split("q")[0]) },
    });
    if (!product) return;
    items.push({
      product,
      quantity: parseInt(params.split("q")[1]),
    });
  }
  return items;
};

export const productsToSearchParams = (items: CartItem[]) => {
  return new URLSearchParams(
    items.map((item) => ["p", `${item.product.id}q${item.quantity}`]),
  );
};
