import SubHeading from "@/components/SubHeading";
import type { CartItem } from "@/hooks/useCart";
import { prisma } from "@/lib/database";
import CheckoutContainer from "@/components/CheckoutContainer";

export type CheckoutType = "single" | "cart";

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SubHeading>Checkout</SubHeading>
      <CheckoutContainer items={selectedItems} checkoutType={type} />
    </div>
  );
};

export default CheckoutPage;
