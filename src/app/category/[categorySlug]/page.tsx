import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();

  return categories.map(({ urlSlug }) => ({
    categorySlug: urlSlug,
  }));
}

const Page = async (props: { params: Promise<{ categorySlug: string }> }) => {
  const params = await props.params;
  const category = await prisma.category.findUnique({
    where: { urlSlug: params.categorySlug },
  });
  if (!category) notFound();
  const products = await prisma.product.findMany({
    where: {
      categoryId: category?.id,
    },
  });
  return (
    <div className="lg:mx-16 min-h-screen">
      {/* <h2 className="my-4 text-2xl font-semibold">{category?.name}s</h2> */}
      <SubHeading>{category?.name}</SubHeading>
      <ProductsList products={products} />
    </div>
  );
};

export default Page;
