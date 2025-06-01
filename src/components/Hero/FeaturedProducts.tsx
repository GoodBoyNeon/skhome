import { prisma } from "@/lib/database";
import Link from "next/link";
import ProductsList from "../ProductsList";
import SectionHeading from "../SectionHeading";
import { Button } from "../ui/button";

export const revalidate = 600;

const FeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      pIndex: "desc",
    },
    take: 10,
  });
  return (
    <div className="m-6 space-y-4 md:my-12 lg:mx-16">
      <SectionHeading>Featured Products</SectionHeading>
      <div className="flex flex-col items-center justify-center space-y-6">
        <ProductsList products={products} />
        <Button
          className="text-primary border-primary hover:bg-primary/10 hover:text-primary m-2 text-base"
          asChild
          variant={"outline"}
        >
          <Link prefetch href="/products">
            Show All
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
