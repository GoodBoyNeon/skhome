import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";

export interface ProductSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
}

const ProductsSection = React.forwardRef<HTMLDivElement, ProductSectionProps>(
  ({ className, products, ...props }, ref) => {
    return (
      <div
        className={cn(
          className,
          "grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center sm:place-items-start",
        )}
        ref={ref}
        {...props}
      >
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    );
  },
);

ProductsSection.displayName = "Product Section";

export default ProductsSection;
