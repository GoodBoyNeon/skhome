import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { getBrandById, getCategoryById } from "@/db";

const ProductCardSubHead = ({
  categoryId,
  brandId,
}: {
  categoryId: number;
  brandId: number;
}) => {
  const categoryResp = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => await getCategoryById(categoryId),
  });

  const brandResp = useQuery({
    queryKey: ["brand", brandId],
    queryFn: async () => await getBrandById(brandId),
  });

  if (categoryResp.error || brandResp.error) {
    return "Error!";
  }

  if (categoryResp.isLoading || brandResp.isLoading) {
    return <Skeleton className="h-[12px] w-[120px]" />;
  }

  const { data: category } = categoryResp;
  const { data: brand } = brandResp;
  return (
    <>
      {category && brand && (
        <h2 className="text-muted-foreground text-xs tracking-tight">
          {brand.name} &bull; {category.name}
        </h2>
      )}
    </>
  );
};

export default ProductCardSubHead;
