import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import SubHeading from "./SubHeading";

export interface ProductsListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
}

const ProductsList = React.forwardRef<HTMLDivElement, ProductsListProps>(
  ({ className, products, ...props }, ref) => {
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
              <ProductCard key={i} {...product} />
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
