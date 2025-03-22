"use client";

import { Brand, Category, Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ProductCard({
  name,
  MRP,
  price,
  stock,
  images,
  urlSlug,
  categoryId,
  brandId,
}: Product) {
  const categoryRes = useQuery({
    queryKey: ["category"],
    queryFn: async (): Promise<Category> => {
      const res = await fetch(`/api/category?id=${categoryId}`);
      return res.json();
    },
  });

  const brandRes = useQuery({
    queryKey: ["brand"],
    queryFn: async (): Promise<Brand> => {
      const res = await fetch(`/api/brand?id=${brandId}`);
      return res.json();
    },
  });

  if (categoryRes.error || brandRes.error) {
    return "An unexpected error occured.";
  }

  if (categoryRes.isLoading || brandRes.isLoading) {
  }

  const { data: category } = categoryRes;
  const { data: brand } = brandRes;

  const discountPercentage = Math.round(((MRP - price) / MRP) * 100);

  return (
    <div className="bg-white border transition hover:shadow-md max-w-md p-2 rounded-lg">
      <Link
        prefetch
        className="flex flex-col gap-1"
        href={`/product/${urlSlug}`}
      >
        <Image src={images[0]} alt={name} width={300} height={300} />

        <div>
          {category && brand && (
            <h2 className="text-xs tracking-tight text-muted-foreground">
              {brand.name} &bull; {category.name}
            </h2>
          )}
          <h2 className="font-normal text-base line-clamp-2">{name}</h2>
        </div>

        <div>
          <h3 className="text-base font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "npr",
              trailingZeroDisplay: "stripIfInteger",
            }).format(price)}
          </h3>

          <div className="flex text-sm gap-2">
            <s className="text-sm text-muted-foreground">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "npr",
                trailingZeroDisplay: "stripIfInteger",
              }).format(MRP)}
            </s>

            <p className="text-red-500">-{discountPercentage}%</p>
          </div>

          {stock && stock > 0 ? (
            <h2 className="tracking-tight text-sm flex gap-1 text-green">
              <Check width={"0.875rem"} /> In stock
            </h2>
          ) : (
            <h2 className="tracking-tight text-sm flex gap-1 text-red-500">
              <X width={"0.875rem"} /> Out of stock
            </h2>
          )}
        </div>
      </Link>
    </div>
  );
}
