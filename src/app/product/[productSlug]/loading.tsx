import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductLoading = () => {
  return (
    <div className="flex m-12 space-y-6 space-x-6">
      <Skeleton className="w-[350px] h-[350px] rounded-xl" />
      <div className="flex-col space-y-3">
        <Skeleton className="w-[300px] h-[35px] rounded-xl" />
        <Skeleton className="w-[80px] h-[15px] rounded-xl" />
        <Skeleton className="w-[500px] h-[45px] rounded-xl" />
        <Skeleton className="w-[500px] h-[45px] rounded-xl" />

        <Skeleton className="w-[385px] h-[15px] rounded-xl" />
        <Skeleton className="w-[410px] h-[15px] rounded-xl" />
        <Skeleton className="w-[390px] h-[15px] rounded-xl" />
        <Skeleton className="w-[420px] h-[15px] rounded-xl" />
        <Skeleton className="w-[400px] h-[15px] rounded-xl" />
        <Skeleton className="w-[530px] h-[15px] rounded-xl" />
      </div>
    </div>
  );
};

export default ProductLoading;
