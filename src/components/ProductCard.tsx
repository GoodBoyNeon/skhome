"use client";

import { useCartStore } from "@/hooks/useCart";
import { pricify } from "@/lib/utils";
import { Product } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import ProductCardSubHead from "./ProductCardSubHead";
import { Button } from "./ui/button";

export default function ProductCard(product: Product) {
  const { name, MRP, price, images, urlSlug, categoryId, brandId } = product;
  const { items, addItem } = useCartStore();
  const discountPercentage = Math.round(((MRP - price) / MRP) * 100);

  const handleAddToCartOnClick = () => {
    if (items.find((item) => item.product.id === product.id)) {
      toast.info("Item already exists in cart!");
      return;
    }
    addItem(product, 1);
    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-xs rounded-lg border">
      <div className="bg-background rounded-t-lg p-2 transition hover:shadow-md">
        <Link
          prefetch
          className="flex flex-col gap-1"
          href={`/product/${urlSlug}`}
        >
          <div className="overflow-hidden">
            <Image
              src={images[0]}
              alt={name}
              width={300}
              height={300}
              className="transition delay-0 duration-[400ms] hover:scale-110"
            />
          </div>

          <div className="mt-3">
            <div className="space-y-2">
              <div>
                <ProductCardSubHead categoryId={categoryId} brandId={brandId} />
                <h2 className="line-clamp-2 min-h-[calc(2*1.375rem)] text-base leading-snug font-medium">
                  {name}
                </h2>
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {pricify(price, true)}
                </h3>

                <div className="flex gap-2 text-sm">
                  <s className="text-muted-foreground text-sm">
                    {pricify(MRP, true)}
                  </s>

                  <p className="text-red-600">-{discountPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <Button
        className="w-full cursor-pointer rounded-t-none"
        size={"sm"}
        onClick={() => {
          handleAddToCartOnClick();
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}
