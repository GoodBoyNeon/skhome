import ProductsSection from "@/components/ProductsSection";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  const category = await prisma.category.findUnique({
    where: { urlSlug: params.slug },
  });
  if (!category) notFound();
  const products = await prisma.product.findMany({
    where: {
      categoryId: category?.id,
    },
  });
  return (
    <div className="m-2">
      <h2 className="text-2xl font-black">{category?.name}s</h2>

      <ProductsSection products={products} />
    </div>
  );
};

export default Page;
