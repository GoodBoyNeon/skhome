import Images from "@/components/ProductPage/Images";
import ProductSidebar from "@/components/ProductSidebar";
import ProductsSection from "@/components/ProductsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const allProducts = await prisma.product.findMany();

  const product = allProducts.find(
    (p) => p.urlSlug.toLowerCase() === params.slug.toLowerCase(),
  );

  if (!product) notFound();

  const similar = allProducts.filter(
    (p) => p.categoryId === product.categoryId,
  );

  const category = await prisma.category.findUnique({
    where: { id: product.categoryId },
  });

  return (
    <>
      <div className="m-4 md:flex md:border-b">
        <Images images={product.images} />
        <div className="gap-2 border-b md:border-none">
          <h2 className="font-semibold my-1.5 text-2xl md:text-4xl">
            {product.name}
          </h2>
          <Badge variant={"secondary"}>{category?.name}</Badge>

          <h2 className="my-1.5 md:my-2.5 text-green text-xl md:text-3xl font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "npr",
            }).format(product.price)}
          </h2>

          <div className="flex flex-col gap-2">
            {product.stock > 0 ? (
              <Button className="w-full md:h-12 text-lg md:text-xl">
                Buy Now
              </Button>
            ) : (
              <Button variant={"destructive"} disabled>
                Out of Stock
              </Button>
            )}
            <Button
              className="w-full md:h-12 text-lg md:text-xl"
              variant={"secondary"}
            >
              Add to Cart
            </Button>
          </div>

          <h3 className="text-xl font-semibold mt-6">Product Details</h3>
          <p className="text-muted-foreground pb-4 whitespace-pre-wrap">
            {product.description.replace(/\\n/gm, "\n")}
          </p>
        </div>
        <div className="m-auto w-0 h-0">
          <ProductSidebar />
        </div>
      </div>
      <div className="p-4 md:p-8">
        <h3 className="text-xl font-semibold mb-4 md:text-2xl">
          Similar products
        </h3>

        <ProductsSection products={similar} />
      </div>
    </>
  );
}
