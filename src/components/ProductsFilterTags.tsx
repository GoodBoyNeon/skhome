"use client";

import { Brand, Category } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterType } from "@/lib/filterProducts";
import { useRouter } from "next/navigation";
import { getBrandById, getCategoryById } from "@/db";

const ProductsFilterTags = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const brandId = searchParams.get("brand");
  const filters = [];

  const categoryQuery = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      if (categoryId) {
        return await getCategoryById(parseInt(categoryId));
      }
      return null;
    },
  });
  const brandQuery = useQuery({
    queryKey: ["brand", brandId],
    queryFn: async () => {
      if (brandId) {
        return await getBrandById(parseInt(brandId));
      }
      return null;
    },
  });

  if (categoryQuery.data)
    filters.push({
      type: "category",
      id: categoryQuery.data.id,
      name: categoryQuery.data.name,
    });
  if (brandQuery.data)
    filters.push({
      type: "brand",
      id: brandQuery.data.id,
      name: brandQuery.data.name,
    });

  const handleXClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: FilterType,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    params.delete(type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex h-full w-[50%] items-stretch gap-3">
      {filters.map((f) => (
        <div
          key={f.name}
          className={cn(
            "space-x-3",
            buttonVariants({ variant: "secondary", size: "sm" }),
          )}
        >
          <span>{f.name}</span>
          <button
            onClick={(e) => handleXClick(e, f.type as FilterType)}
            className="text-muted-foreground hover:text-secondary-foreground/80 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsFilterTags;
