import { Brand, Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductCardSubHead = ({
  categoryId,
  brandId,
}: {
  categoryId: number;
  brandId: number;
}) => {
  const categoryRes = useQuery({
    queryKey: [`category-${categoryId}`],
    queryFn: async (): Promise<Category> => {
      const res = await fetch(`/api/category?id=${categoryId}`);
      return res.json();
    },
  });
  const brandRes = useQuery({
    queryKey: [`brand-${brandId}`],
    queryFn: async (): Promise<Brand> => {
      const res = await fetch(`/api/brand?id=${brandId}`);
      return res.json();
    },
  });

  if (categoryRes.error || brandRes.error) {
    return "Error!";
  }

  if (categoryRes.isLoading || brandRes.isLoading) {
    return <Skeleton className="w-[120px] h-[12px]" />;
  }

  const { data: category } = categoryRes;
  const { data: brand } = brandRes;
  return (
    <>
      {category && brand && (
        <h2 className="text-xs tracking-tight text-muted-foreground">
          {brand.name} &bull; {category.name}
        </h2>
      )}
    </>
  );
};

export default ProductCardSubHead;
