import ProductsList from "@/components/ProductsList";
import SortMenu, { SortType } from "@/components/SortMenu";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import { sortProducts } from "@/lib/sortProducts";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();

  return categories.map(({ urlSlug }) => ({
    categorySlug: urlSlug,
  }));
}

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const category = await prisma.category.findUnique({
    where: { urlSlug: (await params).categorySlug },
  });
  if (!category) notFound();
  const products = await prisma.product.findMany({
    where: {
      categoryId: category?.id,
    },
  });

  const sortType = ((await searchParams).sort || "featured") as SortType;

  const sortedProducts = sortProducts(products, sortType);
  return (
    <div className="min-h-screen lg:mx-16">
      <SubHeading>{category?.name}</SubHeading>

      <div className="flex">
        <div className="my-6 ml-auto">
          <SortMenu />
        </div>
      </div>
      <ProductsList products={sortedProducts} />
    </div>
  );
};

export default Page;
