"use client";

import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import LoadingSkeleton from "./loading";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import SortMenu, { SortType } from "@/components/SortMenu";
import { refineProducts } from "@/lib/refineProducts";
import { useState } from "react";

const Page = () => {
  const [sortType, setSortType] = useState<SortType>("Featured");

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> =>
      (await fetch("/api/product")).json(),
  });

  if (error) {
    console.log("Error: ", error);
    return <div>failed to load</div>;
  }
  if (!data || isLoading) return <LoadingSkeleton />;

  const refinedProducts = refineProducts(data, sortType);

  return (
    <div className="m-6 lg:m-16">
      <SubHeading>Our Products</SubHeading>
      <div className="flex flex-row-reverse justify-between my-4">
        <div>
          <SortMenu sortType={sortType} setSortType={setSortType} />
        </div>
      </div>
      <ProductsList products={refinedProducts} />
    </div>
  );
};

export default Page;
