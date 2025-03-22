import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany();

  return brands.map(({ urlSlug }) => ({
    brandSlug: urlSlug,
  }));
}

const Page = async (props: { params: Promise<{ brandSlug: string }> }) => {
  const params = await props.params;
  const brand = await prisma.brand.findUnique({
    where: { urlSlug: params.brandSlug },
  });
  if (!brand) notFound();
  const products = await prisma.product.findMany({
    where: {
      brandId: brand?.id,
    },
  });
  return (
    <div className="m-6">
      <SubHeading>Products from {brand?.name}</SubHeading>
      <ProductsList products={products} />
    </div>
  );
};

export default Page;
