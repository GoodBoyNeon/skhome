"use client";

import { type CartItem, useCartStore } from "@/hooks/useCart";
import { productsToSearchParams } from "@/lib/productParamHelper";
import { pricify } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "./QuantityInput";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Cart = () => {
  const { items } = useCartStore();
  const count = items.length;

  const [totalPrice, totalShipping] = items.reduce(
    ([priceSum, shippingSum], item) => [
      priceSum + item.product.price,
      shippingSum + item.product.insideValleyShippingCost,
    ],
    [0, 0],
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex cursor-pointer items-center gap-1 rounded-md p-2"
        >
          <ShoppingCart aria-hidden={true} className="shrink-0" />
          <span>{count}</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className="bg-background flex w-full flex-col pr-0 sm:max-w-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Cart {count > 0 ? `- ${count} items` : ""}
          </SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <div className="flex h-screen flex-col justify-between p-4">
            <ScrollArea className="">
              {items.map((item) => (
                <CartItemWrapper key={item.product.id} item={item} />
              ))}
            </ScrollArea>
            <div className="text-muted-foreground">
              <hr className="py-2" />

              <div className="flex justify-between">
                <p>Sub-total</p>
                <p>{pricify(totalPrice, true)}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery fee</p>
                <p>
                  {totalShipping === 0 ? "FREE" : pricify(totalShipping)}{" "}
                  (inside valley)
                </p>
              </div>
              <div className="flex justify-between pt-1 pb-4 font-semibold text-black">
                <p>Total</p>
                <p>{pricify(totalPrice, true)}</p>
              </div>

              <SheetClose asChild>
                <Button asChild className="w-full cursor-pointer text-base">
                  <Link
                    prefetch
                    href={`/checkout?t=cart&${productsToSearchParams(items)}`}
                  >
                    Checkout
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <h3 className="text-2xl font-bold">Uh oh... Your cart is empty!</h3>
            <p className="text-muted-foreground text-center">
              Explore and add products to your cart from the{" "}
              <SheetClose asChild>
                <Link
                  prefetch
                  href={"/products"}
                  className="text-primary font-medium hover:underline"
                >
                  Products Page
                </Link>
              </SheetClose>
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const CartItemWrapper = ({ item }: { item: CartItem }) => {
  const { removeItem, setQuantity } = useCartStore();
  const { quantity, product } = item;
  return (
    <>
      <div className="m-2 flex justify-between gap-4">
        <div className="flex w-full min-w-0 gap-2 rounded p-2">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Link
              prefetch
              className="absolute cursor-pointer"
              href={`/product/${product.urlSlug}`}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={64}
                height={64}
              />
            </Link>
          </div>
          <div className="w-full min-w-0">
            <Link
              prefetch
              className="cursor-pointer"
              href={`/product/${product.urlSlug}`}
            >
              <p className="mb-1.5 truncate">{product.name}</p>
            </Link>
            <QuantityInput
              size="sm"
              quantity={quantity}
              decOnClick={() => setQuantity(product, quantity - 1)}
              incOnClick={() => setQuantity(product, quantity + 1)}
              onChange={(e) => {
                setQuantity(product, parseInt(e.target.value));
              }}
            />
            <p className="text-right text-sm font-semibold">
              {pricify(product.price, true)}
            </p>
          </div>
        </div>
        <button
          className="text-muted-foreground h-6 w-6 cursor-pointer transition hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            removeItem(item.product.id);
          }}
        >
          <X />
        </button>
      </div>
      <hr className="mx-4" />
    </>
  );
};

export default Cart;
