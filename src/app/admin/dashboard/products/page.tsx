"use client";

import { monoFont } from "@/app/fonts";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, pricify } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteProductDialog } from "./delete-product-dialog";

const AdminProductsPage = () => {
  const productsResp = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch(`/api/product`);
      return res.json();
    },
  });

  if (productsResp.isLoading) {
    return "Loading...";
  }
  if (productsResp.error) {
    throw new Error(productsResp.error?.message);
  }

  const products = productsResp.data?.sort((a, b) => a.id - b.id);

  return (
    <div className="container mx-auto py-12">
      <div className="mx-12 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Products</h3>

          <Link
            href={"/admin/dashboard/products/new"}
            className={buttonVariants({ variant: "ghost", className: "gap-1" })}
          >
            <Plus size={18} /> Add New
          </Link>
        </div>

        <div className="rounded-lg border border-double py-4">
          {products?.map((product, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between px-4",
                i % 2 != 0 ? "bg-gray-50" : "",
              )}
            >
              <div className="flex gap-4 py-4">
                <div className="text-center">
                  <p className={cn(monoFont.className, "")}>{product.id}.</p>
                </div>

                <div className="relative">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-200">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="">
                    <Link
                      href={`/product/${product.urlSlug}`}
                      className="line-clamp-3 cursor-pointer font-medium hover:underline"
                    >
                      {product.name}
                    </Link>

                    <div className="text-muted-foreground shrink-0 font-medium">
                      {pricify(product.price)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 flex gap-4">
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:text-primary/80 cursor-pointer gap-1"
                  size="sm"
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <DeleteProductDialog
                  productId={product.id}
                  productName={product.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
