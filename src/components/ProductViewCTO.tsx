"use client";
import { Product } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/hooks/useCart";

const ProductViewCTO = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore();
  const { stock } = product;
  return (
    <div className="space-y-2">
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
            addItem(product);
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
  );
};

export default ProductViewCTO;
