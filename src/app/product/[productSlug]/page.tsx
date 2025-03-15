import Images from "@/components/ProductPage/Images";
import ProductSidebar from "@/components/ProductSidebar";
import ProductsList from "@/components/ProductsList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";

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
    <>
      <div className="my-12 space-x-12 md:flex">
        <div className="ml-12">
          <Images images={images} />
        </div>

        <div className="space-y-12">
          <div className="space-y-0.5">
            <h2 className="font-semibold text-2xl md:text-4xl">{name}</h2>

            <p className="font-bold text-muted-foreground">
              Brand: {brand?.name}
            </p>

            <Badge variant={"secondary"}>{category?.name}</Badge>
          </div>

          <div className="my-1.5 md:my-2.5 ">
            <h2 className="text-green text-xl md:text-3xl font-semibold">
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

              <p className="text-red-400 text-lg">-{discountPercentage}%</p>
            </div>
          </div>

          <div className="space-y-2">
            {stock > 0 ? (
              <Button className="cursor-pointer w-full md:h-12 text-lg md:text-xl">
                Buy Now
              </Button>
            ) : (
              <Button variant={"destructive"} disabled>
                Out of Stock
              </Button>
            )}
            <Button
              className="w-full cursor-pointer md:h-12 text-lg md:text-xl"
              variant={"secondary"}
            >
              Add to Cart
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mt-6">Product Details</h3>
            <p className="text-muted-foreground pb-4 whitespace-pre-wrap">
              {description.replace(/\\n/gm, "\n")}
            </p>
          </div>
        </div>

        <div>
          <ProductSidebar />
        </div>
      </div>

      <div className="p-4 md:p-8">
        <h3 className="text-xl font-semibold mb-4 md:text-2xl">
          Similar products
        </h3>

        <ProductsList products={similar} />
      </div>
    </>
  );
}
