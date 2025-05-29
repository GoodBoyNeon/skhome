"use client";

import { Product } from "@/generated/prisma";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ShoppingBag } from "lucide-react";
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
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Quantity</h3>
        <QuantityInput
          quantity={quantity}
          // setQuantity={setQuantity}
          decOnClick={() => setQuantity(quantity - 1)}
          incOnClick={() => setQuantity(quantity + 1)}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value));
          }}
        />
      </div>
      <div className="space-y-3">
        {stock > 0 ? (
          <Button
            asChild
            className="w-full cursor-pointer bg-blue-600 text-base hover:bg-blue-600/90"
            size={"lg"}
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
          <Button
            size={"lg"}
            className="w-full text-base"
            variant={"destructive"}
            disabled
          >
            Out of Stock
          </Button>
        )}
        <div className="flex gap-3 font-medium">
          <Button
            className="flex-1 cursor-pointer text-base"
            variant={"outline"}
            size={"lg"}
            onClick={(e) => {
              e.preventDefault();
              addOnClick();
            }}
          >
            <ShoppingBag className="mr-2 size-4" />
            Add to Cart
          </Button>
          <Button
            asChild
            className="flex-1 cursor-pointer text-base"
            size={"lg"}
            variant={"outline"}
          >
            <Link href="/visit" prefetch>
              <MapPin className="mr-2 size-4" />
              Contact/Visit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewCTO;
