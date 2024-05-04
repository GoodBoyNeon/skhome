import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { prisma } from "@/lib/database";

export default async function ProductCard({
  name,
  description,
  price,
  stock,
  images,
  urlSlug,
  categoryId,
}: Product) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  return (
    <div className="border max-w-md p-2 rounded-lg">
      <Link className="flex flex-col gap-1" href={`/product/${urlSlug}`}>
        <Image src={images[0]} alt={`${name} image`} width={300} height={300} />

        <div>
          {category && (
            <h2 className="text-xs tracking-tight text-muted-foreground">
              {category.name}
            </h2>
          )}
          <h2 className="font-medium line-clamp-2">{name}</h2>
        </div>

        <div>
          <h2 className="text-accent">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "npr",
            }).format(price)}
          </h2>

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
