import ProductsSection from "@/components/ProductsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/slider";
import { prisma } from "@/lib/database";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
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
      <div className="m-4">
        <div className="border-b flex items-center justify-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {product.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="p-1 flex items-center justify-center">
                    <Image
                      src={img}
                      alt={`${product.name} img-{i}`}
                      width={250}
                      height={375}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="gap-2">
          <h2 className="font-semibold my-1.5 text-2xl">{product.name}</h2>
          <Badge variant={"secondary"}>{category?.name}</Badge>

          <h2 className="my-1.5 text-green-400 text-xl font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "npr",
            }).format(product.price)}
          </h2>

          <div className="flex flex-col gap-2">
            {product.stock > 0 ? (
              <Button className="w-full">Buy Now</Button>
            ) : (
              <Button variant={"destructive"} disabled>
                Out of Stock
              </Button>
            )}
            <Button className="w-full" variant={"secondary"}>
              Add to Cart
            </Button>
          </div>

          <h3 className="text-xl font-semibold mt-6">Product Details</h3>
          <p className="text-muted-foreground pb-4 border-b">
            {product.description}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">Similar products</h3>

        <ProductsSection products={similar} />
      </div>
    </>
  );
}
