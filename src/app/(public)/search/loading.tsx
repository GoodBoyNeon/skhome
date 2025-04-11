import ProductsListLoading from "@/components/ProductsListLoading";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SearchLoading = () => {
  return (
    <div className="m-6">
      <Skeleton className="w-[450px] mb-2 h-[30px] rounded-xl" />
      <Skeleton className="w-[120px] mb-6 h-[15px] rounded-xl" />
      <ProductsListLoading />
    </div>
  );
};

export default SearchLoading;
