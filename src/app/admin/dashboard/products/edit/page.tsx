"use client";

import { prisma } from "@/lib/database";
import EditProductForm from "./EditProductForm";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/generated/prisma";
import { capitalize } from "@/lib/capitalize";

export default function AdminProductEdit() {
  const searchParams = useSearchParams();
  const urlSlug = searchParams.get("id") ?? "";
  const query = useQuery({
    queryKey: ["product", urlSlug],
    queryFn: async (): Promise<Product> => {
      return await (await fetch(`/api/product?id=${urlSlug}`)).json();
    },
  });
  const { isError, isLoading, error } = query;

  if (isLoading) {
    return <Skeleton className="h-[12px] w-[120px]" />;
  }
  if (isError) return <h1>Error occured: {error.message}</h1>;

  if (query.data)
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold">
            Editing {capitalize(query.data.urlSlug.replace(/-/g, " "), "title")}
          </h1>
          <EditProductForm curProduct={query.data} />
        </div>
      </div>
    );
}
