import Carousel from "@/components/Carousel";
import ProductSidebar from "@/components/ProductSidebar";
import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import { ShoppingCart, MapPin } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const products = await prisma.product.findMany();

  return products.map(({ urlSlug }) => ({
    productSlug: urlSlug,
  }));
}

export default async function ProductPage(props: {
  params: Promise<{ productSlug: string }>;
}) {
  const params = await props.params;
  const allProducts = await prisma.product.findMany();

  const product = allProducts.find(
    (p) => p.urlSlug.toLowerCase() === params.productSlug.toLowerCase(),
  );

  if (!product) return notFound();

  const { name, description, brandId, categoryId, MRP, price, stock, images } =
    product;

  const similar = allProducts.filter((p) => p.categoryId === categoryId);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
  });

  const discountPercentage = Math.round(((MRP - price) / MRP) * 100);

  return (
    <div>
      <div>
        <div className="md:bg-white border-b md:gap-6 md:flex md:justify-center">
          <div className="md:my-8">
            <Carousel images={images} />
          </div>

          <div className="bg-white lg:max-w-xl px-3 py-8 space-y-12">
            <div className="space-y-0.5">
              <h2 className="font-semibold text-2xl md:text-4xl">{name}</h2>

              <p className="font-bold text-muted-foreground">
                Brand: {brand?.name}
              </p>

              <Badge variant={"secondary"}>{category?.name}</Badge>
            </div>

            <div className="my-1.5 md:my-2.5 ">
              <h2 className="text-cyan-800 text-2xl md:text-3xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "npr",
                }).format(price)}
              </h2>
              <div className="flex text-sm gap-2">
                <s className="text-lg text-muted-foreground">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "npr",
                    trailingZeroDisplay: "stripIfInteger",
                  }).format(MRP)}
                </s>

                <p className="text-red-600 text-lg">-{discountPercentage}%</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Inclusive of all taxes
              </p>
            </div>

            <div className="space-y-2">
              {stock > 0 ? (
                <Button className="bg-cyan-700 hover:bg-cyan-600 cursor-pointer w-full md:h-12 text-lg md:text-xl">
                  Buy Now
                </Button>
              ) : (
                <Button variant={"destructive"} disabled>
                  Out of Stock
                </Button>
              )}
              <div className="flex space-x-2">
                <Button
                  className="w-full flex gap-1 cursor-pointer md:h-12 text-lg md:text-xl"
                  variant={"secondary"}
                >
                  <ShoppingCart />
                  {"Add to Cart"}
                </Button>
                <Button
                  asChild
                  className="w-full flex gap-1 cursor-pointer md:h-12 text-lg md:text-xl"
                  variant={"secondary"}
                >
                  <Link href="/visit" prefetch>
                    <MapPin />
                    Contact/Visit
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mt-6">Product Details</h3>
              <p className="text-muted-foreground pb-4 whitespace-pre-wrap">
                {description.replace(/\\n/gm, "\n")}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <ProductSidebar />
          </div>
        </div>
      </div>
      <div className="lg:mx-16 md:mx-12 mx-4">
        <SubHeading className="text-xl font-semibold mb-4 md:text-2xl">
          Similar products
        </SubHeading>

        <ProductsList products={similar} />
      </div>
    </div>
  );
}
