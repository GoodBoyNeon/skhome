import Carousel from "@/components/Carousel";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/database";
import { formatText } from "@/lib/formatText";
import { pricify } from "@/lib/utils";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductSidebar from "./ProductSidebar";
import ProductViewCTO from "./ProductViewCTO";

const ProductViewContainer = async ({
  product,
}: {
  product: Product;
  allProducts: Product[];
}) => {
  if (!product) return notFound();

  const { name, description, brandId, categoryId, MRP, price, images } =
    product;

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
        <div className="md:bg-background border-b md:flex md:justify-center md:gap-6">
          <div className="md:my-8">
            <Carousel images={images} />
          </div>

          <div className="bg-background space-y-12 px-3 py-8 lg:max-w-xl">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-semibold md:text-4xl">{name}</h2>

              <p className="text-muted-foreground font-medium">
                Brand: {brand?.name}
              </p>

              <Badge variant={"secondary"}>{category?.name}</Badge>
            </div>

            <div className="my-1.5 md:my-2.5">
              <h2 className="text-2xl font-semibold text-black md:text-3xl">
                {pricify(price)}
              </h2>
              <div className="flex gap-2 text-sm">
                <s className="text-muted-foreground text-lg">
                  {pricify(MRP, true)}
                </s>

                <p className="text-lg text-red-600">-{discountPercentage}%</p>
              </div>
              <p className="text-muted-foreground text-xs">
                Inclusive of all taxes
              </p>
            </div>

            <ProductViewCTO product={product} />

            <div>
              <h3 className="mt-6 text-xl font-semibold">Product Details</h3>
              <p className="text-muted-foreground pb-4 whitespace-pre-wrap">
                {formatText(description)}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <ProductSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewContainer;
