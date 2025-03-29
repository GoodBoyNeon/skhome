import { CartItem } from "@/hooks/useCart";
import { prisma } from "@/lib/database";
import { Product } from "@prisma/client";
import React from "react";

type CheckoutType = "single" | "cart";

type CheckoutParams = {
  t: CheckoutType;
  p: CartItem;
};

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const type = params.t as CheckoutType;
  const cartIds = params.p;

  const selectedItems: CartItem[] = [];
  if (typeof cartIds === "object") {
    for (const cartId of cartIds) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(cartId.split("q")[0]) },
      });

      if (!product) return;

      selectedItems.push({
        product,
        quantity: parseInt(cartId.split("q")[1]),
      });
    }
  }
  if (typeof cartIds === "string") {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(cartIds.split("q")[0]) },
    });
    if (!product) return;
    selectedItems.push({
      product,
      quantity: parseInt(cartIds.split("q")[1]),
    });
  }
  return (
    <div>
      {selectedItems.map((item) => (
        <div key={item.product.id}>
          {item.quantity}x {item.product.name}
        </div>
      ))}
    </div>
  );
};

export default CheckoutPage;
