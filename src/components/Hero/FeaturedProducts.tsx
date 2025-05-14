import { prisma } from "@/lib/database";
import React from "react";
import SubHeading from "../SubHeading";
import ProductsList from "../ProductsList";
import { Button } from "../ui/button";
import Link from "next/link";

export const revalidate = 600;

const FeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      pIndex: "desc",
    },
    take: 10,
  });
  return (
    <div className="m-6 space-y-4 lg:mx-16">
      <div className="flex flex-col items-center justify-center">
        <SubHeading>Featured Products</SubHeading>
        <ProductsList products={products} />
        <Button className="m-2 max-w-fit text-base" asChild variant={"link"}>
          <Link prefetch href="/products">
            Show All
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
