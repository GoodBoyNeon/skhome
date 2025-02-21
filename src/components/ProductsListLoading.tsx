import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductsListLoading = () => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center sm:place-items-start">
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
      <Skeleton className="w-[280px] h-[380px] rounded-xl" />
    </div>
  );
};

export default ProductsListLoading;
