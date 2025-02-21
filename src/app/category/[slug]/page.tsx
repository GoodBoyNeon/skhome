import ProductsList from "@/components/ProductsList";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import React from "react";

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
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
    <div className="m-6">
      <h2 className="my-4 text-2xl font-semibold">{category?.name}s</h2>

      <ProductsList products={products} />
    </div>
  );
};

export default Page;
