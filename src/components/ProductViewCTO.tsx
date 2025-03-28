"use client";

import { Product } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/hooks/useCart";
import { toast } from "sonner";
import { Input } from "./ui/input";

const ProductViewCTO = ({ product }: { product: Product }) => {
  const { items, addItem, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const addOnClick = () => {
    if (items.find((item) => item.product.id === product.id)) {
      toast.info("Item already exists in cart!");
      return;
    }

    addItem(product, quantity);

    toast.success("Added to cart!", {
      description: `${product.name} has been added to cart`,
      action: {
        label: "Undo",
        onClick: () => {
          removeOnClick();
        },
      },
    });
  };
  const removeOnClick = () => {
    removeItem(product.id);

    toast.success("Removed from cart!", {
      description: `${product.name} has been removed from cart`,
      action: {
        label: "Undo",
        onClick: addOnClick,
      },
    });
  };

  const { stock } = product;
  return (
    <div>
      <div className="space-y-2">
        <div className="flex gap-0.5">
          <Button
            variant={"secondary"}
            size={"sm"}
            className="h-8 w-8 px-2 cursor-pointer"
            disabled={quantity < 2}
            onClick={() => setQuantity(quantity - 1)}
          >
            <Minus />
          </Button>
          <Input
            type="number"
            className="w-10 text-center h-8 font-mono rounded-none bg-white border-none focus:outline-hidden outline-none focus:outline-none"
            value={quantity}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
          ></Input>
          <Button
            variant={"secondary"}
            size={"sm"}
            className="h-8 w-8 px-2 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
        {stock > 0 ? (
          <Button className="bg-cyan-700 hover:bg-cyan-600 cursor-pointer w-full md:h-12 text-lg md:text-xl">
            Buy Now
          </Button>
        ) : (
          <Button variant={"destructive"} disabled>
            Out of Stock
          </Button>
        )}
        <div className="flex space-x-2">
          <Button
            className="w-full flex gap-1 cursor-pointer md:h-12 text-lg md:text-xl"
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              addOnClick();
            }}
          >
            <ShoppingCart />
            {"Add to Cart"}
          </Button>
          <Button
            asChild
            className="w-full flex gap-1 cursor-pointer md:h-12 text-lg md:text-xl"
            variant={"secondary"}
          >
            <Link href="/visit" prefetch>
              <MapPin />
              Contact/Visit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewCTO;
