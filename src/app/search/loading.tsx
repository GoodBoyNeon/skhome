import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductLoading = () => {
  return (
    <div className="m-6 space-y-4">
      <Skeleton className="w-[300px] h-[30px] rounded-xl" />
      <Skeleton className="w-[100px] h-[15px] rounded-xl" />
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
    </div>
  );
};

export default ProductLoading;
