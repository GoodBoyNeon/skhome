import Carousel from "@/components/Carousel";
import ProductSidebar from "@/components/ProductSidebar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import React from "react";
import { Product } from "@prisma/client";
import ProductViewCTO from "./ProductViewCTO";
import { pricify } from "@/lib/utils";

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
                {pricify(price)}
              </h2>
              <div className="flex text-sm gap-2">
                <s className="text-lg text-muted-foreground">
                  {pricify(MRP, true)}
                </s>

                <p className="text-red-600 text-lg">-{discountPercentage}%</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Inclusive of all taxes
              </p>
            </div>

            <ProductViewCTO product={product} />

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
    </div>
  );
};

export default ProductViewContainer;
