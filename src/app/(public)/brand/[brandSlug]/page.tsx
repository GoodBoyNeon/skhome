import FilterSidebar from "@/components/FilterSidebar";
import ProductsList from "@/components/ProductsList";
import SortMenu, { SortType } from "@/components/SortMenu";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import { filterProducts } from "@/lib/filterProducts";
import { sortProducts } from "@/lib/sortProducts";
import { notFound } from "next/navigation";
import ProductsFilterTags from "@/components/ProductsFilterTags";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import React from "react";

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany();

  return brands.map(({ urlSlug }) => ({
    brandSlug: urlSlug,
  }));
}

const Page = async (props: {
  params: Promise<{ brandSlug: string }>;

  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
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

  const sortType = ((await props.searchParams).sort || "featured") as SortType;

  const sortedProducts = sortProducts(products, sortType);

  const categoryFilter = (await props.searchParams).category;

  const finalProducts = filterProducts(
    sortedProducts,
    "category",
    parseInt(categoryFilter as string),
  );

  return (
    <div className="min-h-screen lg:mx-16">
      <SubHeading>Products from {brand?.name}</SubHeading>

      <div className="flex flex-col gap-8 md:grid md:grid-cols-9 md:grid-rows-1">
        <div className="col-span-3 hidden md:block lg:col-span-2">
          <FilterSidebar hideBrand />
        </div>
        <div className="md:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  <span>Filters</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <FilterSidebar />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="h-full md:col-span-6 lg:col-span-7">
          <div className="h-vh mb-6 flex w-full justify-between">
            <ProductsFilterTags />
            <SortMenu />
          </div>
          <ProductsList products={finalProducts} />
        </div>
      </div>
    </div>
  );
};

export default Page;
