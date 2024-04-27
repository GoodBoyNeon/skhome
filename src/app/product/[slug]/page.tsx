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
import { Product } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const allProducts = await prisma.product.findMany();
  // const product = allProducts.find(p => p.urlSlug.toLowerCase() === params.slug.toLowerCase())

  const product: Product = {
    name: "Kent Grand with Alkaline Filter",
    description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
    images: [
      "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
      "https://www.cgdigital.com.np/api/images/products/5n8DxF_1685517910-KENT%20GRAND%20PLUS-B%20MINERAL%20RO%20WATER-Update.jpg",
    ],
    urlSlug: "kent-grand-with-alkaline",
    price: 28_490,
    stock: -1,
    id: 123,
    categoryId: 345,
  };

  const similar = allProducts.filter(
    (p) => p.categoryId === product.categoryId,
  );

  const category = await prisma.category.findUnique({
    where: { id: product.categoryId },
  });

  // const product = await prisma.product.findUnique({
  //   where: {
  //     urlSlug: params.slug,
  //   },
  // });

  if (!product) notFound();

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
