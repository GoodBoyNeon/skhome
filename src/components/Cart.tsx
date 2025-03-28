"use client";

import { ShoppingCart, X } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { type CartItem, useCartStore } from "@/hooks/useCart";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Cart = () => {
  const { items } = useCartStore();
  const totalPrice = items
    .map((item) => item.product.price * item.quantity)
    .reduce((price, total) => total + price, 0);
  const count = items.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex items-center hover:bg-black/10 transition gap-1 rounded-md p-2">
          <ShoppingCart aria-hidden={true} className="shrink-0" />
          <span>{count}</span>
        </div>
      </SheetTrigger>

      <SheetContent className="flex pr-0 flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Cart {count > 0 ? `- ${count} items` : ""}
          </SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <div className="flex p-4 flex-col justify-between h-screen">
            <ScrollArea className="">
              {items.map((item) => (
                <CartItemWrapper key={item.product.id} item={item} />
              ))}
            </ScrollArea>
            <div className="text-muted-foreground">
              <hr className="py-2" />

              <div className="flex justify-between">
                <p>Sub-total</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "npr",
                    trailingZeroDisplay: "stripIfInteger",
                  }).format(totalPrice)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Delivery fee</p>
                <p>Free (inside valley)</p>
              </div>
              <div className="flex justify-between text-black font-semibold pt-1 pb-4">
                <p>Total</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "npr",
                    trailingZeroDisplay: "stripIfInteger",
                  }).format(totalPrice)}
                </p>
              </div>

              <Button className="w-full cursor-pointer text-base">
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <h3 className="font-bold text-2xl">No items in cart...</h3>
            <p className="text-center">
              Explore and add products to your cart from the{" "}
              <Link
                prefetch
                href={"/products"}
                className="font-semibold hover:underline text-primary"
              >
                Products Page
              </Link>
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const CartItemWrapper = ({ item }: { item: CartItem }) => {
  const { removeItem } = useCartStore();
  const { quantity, product } = item;
  return (
    <>
      <div className="flex m-2 gap-4 justify-between">
        <Link
          prefetch
          href={`/product/${product.urlSlug}`}
          className="flex min-w-0 cursor-pointer gap-2 w-full rounded p-2 hover:bg-black/10"
        >
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Image
              src={product.images[0]}
              alt={product.name}
              className="absolute"
              width={64}
              height={64}
            />
          </div>
          <div className="min-w-0 w-full">
            <p className="truncate">{product.name}</p>
            <p className="text-muted-foreground text-sm">Qty: {quantity}</p>
            <p className="text-sm font-semibold text-right">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "npr",
                trailingZeroDisplay: "stripIfInteger",
              }).format(product.price)}
            </p>
          </div>
        </Link>
        <button
          className="cursor-pointer w-6 h-6 text-muted-foreground hover:text-red-500 transition"
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
