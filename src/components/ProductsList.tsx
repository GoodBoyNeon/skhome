import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import SubHeading from "./SubHeading";
import { Referrer } from "@/types/navigation";

export interface ProductsListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  isTracked?: boolean;
  referrer?: Referrer;
}

const ProductsList = React.forwardRef<HTMLDivElement, ProductsListProps>(
  ({ className, products, isTracked, referrer, ...props }, ref) => {
    return (
      <div className="w-full">
        {products.length > 0 ? (
          <div
            className={cn(
              "grid grid-cols-[repeat(auto-fit,minmax(min(260px,50%-0.75rem),1fr))] gap-3 md:gap-4",

              className,
            )}
            ref={ref}
            {...props}
          >
            {products.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                isTracked={isTracked}
                referrer={referrer}
              />
            ))}
          </div>
        ) : (
          <div>
            <SubHeading>No products found :(</SubHeading>
            <p className="text-muted-foreground text-center">
              Sorry, we do not have the products meeting your criteria...
            </p>
          </div>
        )}
      </div>
    );
  },
);

ProductsList.displayName = "Product Section";

export default ProductsList;
