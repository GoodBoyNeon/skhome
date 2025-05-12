"use client";

import { Product } from "@/generated/prisma";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/hooks/useCart";
import { toast } from "sonner";
import QuantityInput from "@/components/QuantityInput";

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
        <QuantityInput
          quantity={quantity}
          // setQuantity={setQuantity}
          decOnClick={() => setQuantity(quantity - 1)}
          incOnClick={() => setQuantity(quantity + 1)}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value));
          }}
        />
        {stock > 0 ? (
          <Button
            asChild
            className="w-full cursor-pointer text-lg md:h-12 md:text-xl"
          >
            <Link
              prefetch
              href={`/checkout?${new URLSearchParams({
                t: "single",
                p: `${product.id}q${quantity}`,
              })}`}
            >
              Buy Now
            </Link>
          </Button>
        ) : (
          <Button variant={"destructive"} disabled>
            Out of Stock
          </Button>
        )}
        <div className="flex space-x-2">
          <Button
            className="flex w-full cursor-pointer gap-1 text-lg md:h-12 md:text-xl"
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
            className="flex w-full cursor-pointer gap-1 text-lg md:h-12 md:text-xl"
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
