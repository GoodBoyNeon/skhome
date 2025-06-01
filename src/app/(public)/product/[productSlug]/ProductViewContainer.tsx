import Carousel from "@/components/Carousel";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/database";
import { pricify } from "@/lib/utils";
import { Product } from "@/generated/prisma";
import { notFound } from "next/navigation";
import ProductSidebar from "./ProductSidebar";
import ProductViewCTO from "./ProductViewCTO";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProductWhyUs from "./ProductWhyUs";
import Markdown from "@/components/Markdown";

const ProductViewContainer = async ({
  product,
}: {
  product: Product;
  allProducts: Product[];
}) => {
  if (!product) return notFound();

  const {
    name,
    description,
    specifications,
    brandId,
    categoryId,
    MRP,
    price,
    images,
  } = product;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
  });

  const discountPercentage = Math.round(((MRP - price) / MRP) * 100);
  return (
    <div className="bg-white">
      <div>
        <div className="md:bg-background border-b md:flex md:justify-center md:gap-6">
          {/* <DynamicBreadcrumb */}
          {/*   productName={product.name} */}
          {/*   categoryName={category?.name} */}
          {/*   brandName={brand?.name} */}
          {/* /> */}

          <div className="md:my-12">
            <Carousel images={images} />
          </div>

          <div className="bg-background w-full space-y-12 px-3 py-12 lg:max-w-xl">
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-2">
                {category?.name}
              </Badge>

              <h1 className="text-2xl font-bold md:text-3xl">{name}</h1>

              <Badge variant={"secondary"}>Brand: {brand?.name}</Badge>

              {/* <Badge variant={"secondary"}>{category?.name}</Badge> */}
            </div>

            <div className="my-2 md:my-6">
              <h2 className="text-2xl font-semibold md:text-3xl">
                {pricify(price)}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-lg line-through">
                  {pricify(MRP)}
                </span>
                <Badge variant="destructive" className="text-white">
                  {discountPercentage}% OFF
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs">
                Inclusive of all taxes
              </p>
            </div>

            <ProductViewCTO product={product} />
          </div>

          <div className="hidden lg:block">
            <ProductSidebar />
          </div>
        </div>

        <div className="mx-8 mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full">
              {description && (
                <TabsTrigger value="description">Description</TabsTrigger>
              )}
              {specifications && (
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card className="shadow-none">
                <CardContent>
                  <h3 className="mb-4 text-lg font-semibold">
                    Product Description
                  </h3>
                  <Markdown className="text-muted-foreground text-base tracking-wide">
                    {description}
                  </Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            {specifications && (
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent>
                    <h3 className="mb-4 text-lg font-semibold">
                      Specifications
                    </h3>
                    <Markdown className="text-muted-foreground text-base tracking-wide">
                      {specifications}
                    </Markdown>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          <ProductWhyUs />
        </div>
      </div>
    </div>
  );
};

export default ProductViewContainer;
