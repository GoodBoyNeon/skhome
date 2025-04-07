import Categories from "@/components/CategoriesBar";
import LogoTicker from "@/components/LogoTicker";
import ProductsList from "@/components/ProductsList";
import PromoSlides from "@/components/PromoSlides";
import SubHeading from "@/components/SubHeading";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import Link from "next/link";

export default async function Home() {
  const categories = (await prisma.category.findMany()).sort(
    (a, b) => a.id - b.id,
  );

  const products = (await prisma.product.findMany())
    .sort((a, b) => b.pIndex - a.pIndex)
    .slice(0, 15);
  return (
    <>
      <Categories categories={categories}></Categories>
      <PromoSlides />

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
      <div className="bg-background py-12">
        <h3 className="text-muted-foreground text-center text-2xl font-bold">
          The Brands We Offer
        </h3>
        <LogoTicker />
      </div>
    </>
  );
}
