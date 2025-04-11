import ProductsListLoading from "@/components/ProductsListLoading";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CategoryLoading = () => {
  return (
    <div className="m-6 lg:m-16">
      <Skeleton className="w-24 h-4"></Skeleton>
      <ProductsListLoading />
    </div>
  );
};

export default CategoryLoading;
