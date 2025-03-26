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
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { Button } from "./ui/button";
import Line from "./Line";
import { Separator } from "@radix-ui/react-select";

const Cart = () => {
  const { items } = useCartStore();

  const count = items.length;

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer flex items-center hover:bg-black/10 transition gap-1 rounded-md p-2">
        <ShoppingCart aria-hidden={true} className="shrink-0" />
        <span>{count}</span>
      </SheetTrigger>

      <SheetContent className="flex pr-0 flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Cart - {count} items
          </SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <div>
            <ScrollArea>
              {items.map((item) => (
                <CartItemWrapper key={item.product.id} item={item} />
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div>No items</div>
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
      <div className="flex m-4 gap-4 justify-between">
        <Link
          prefetch
          href={`/product/${product.urlSlug}`}
          className="flex cursor-pointer gap-2 w-full rounded p-2 hover:bg-black/10"
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
          <div className="w-full">
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

CartItemWrapper;
export default Cart;
