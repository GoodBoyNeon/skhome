import SubHeading from "@/components/SubHeading";
import type { CartItem } from "@/hooks/useCart";
import { prisma } from "@/lib/database";
import { CheckoutType } from "@/lib/definitions";
import CheckoutContainer from "./CheckoutContainer";
import { Suspense } from "react";
import FullPageSpinner from "@/components/FullPageSpinner";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const type = (await searchParams).t as CheckoutType;
  const cartIds = (await searchParams).p;

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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <SubHeading>Checkout</SubHeading>
      <Suspense fallback={<FullPageSpinner />}>
        <CheckoutContainer items={selectedItems} checkoutType={type} />
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
