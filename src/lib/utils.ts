import { CartItem } from "@/hooks/useCart";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pricify = (price: number, stripDigits?: boolean) => {
  return (
    "Rs " +
    new Intl.NumberFormat("en-IN", {
      trailingZeroDisplay: stripDigits ? "stripIfInteger" : "auto",
    }).format(price)
  );
};

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
