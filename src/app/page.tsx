import Categories from "@/components/Categories";
import ProductsList from "@/components/ProductsList";
import PromoSlides from "@/components/PromoSlides";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import LogoTicker from "@/components/LogoTicker";
import { Button } from "@/components/ui/button";
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

      <div className="m-6 lg:mx-16 space-y-4">
        <div className="flex flex-col items-center justify-center">
          <SubHeading>Featured Products</SubHeading>

          <ProductsList products={products} />

          <Button className="max-w-fit text-base m-2" asChild variant={"link"}>
            <Link prefetch href="/products">
              Show All
            </Link>
          </Button>
        </div>

        <hr className="my-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />

        <h3 className="text-center text-muted-foreground text-2xl font-bold">
          The Brands We Offer
        </h3>

        <LogoTicker />
      </div>
    </>
  );
}
