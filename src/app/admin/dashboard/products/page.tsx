"use client";

import { monoFont } from "@/app/fonts";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/db";
import { cn, pricify } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteProductDialog } from "./delete-product-dialog";

const AdminProductsPage = () => {
  const productsResp = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getAllProducts(),
  });

  if (productsResp.isLoading) {
    return <Skeleton className="h-[600px] w-3xl" />;
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

          <div className="hover:bg-accent flex items-center rounded-md transition">
            <Link
              href={"/admin/dashboard/products/new"}
              className={buttonVariants({
                variant: "ghost",
                className: "gap-1",
              })}
            >
              <Plus size={18} /> <span>Add New</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="mr-1 h-full cursor-pointer rounded-md transition hover:bg-gray-200"
              >
                <Button variant={"ghost"}>
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={"/admin/dashboard/products/new"}>
                    Add Product
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/admin/dashboard/category/new"}>
                    Add Category
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/admin/dashboard/brand/new"}>Add Brand</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                <Link
                  href={`/admin/dashboard/products/edit?id=${product.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "text-primary border-primary hover:text-primary/80 cursor-pointer gap-1",
                  )}
                >
                  <Pencil className="size-4" />
                  Edit
                </Link>
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
