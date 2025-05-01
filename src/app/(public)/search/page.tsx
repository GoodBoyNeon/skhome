import { prisma } from "@/lib/database";
import { redirect } from "next/navigation";
import React from "react";
import { Filter, SearchIcon } from "lucide-react";
import ProductsList from "@/components/ProductsList";
import SortMenu, { SortType } from "@/components/SortMenu";
import { sortProducts } from "@/lib/sortProducts";
import { filterProducts } from "@/lib/filterProducts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductsFilterTags from "@/components/ProductsFilterTags";
import FilterSidebar from "@/components/FilterSidebar";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    category?: string;
    brand?: string;
  }>;
}) => {
  const sortType = ((await searchParams).sort || "featured") as SortType;
  const categoryFilter = (await searchParams).category;
  const brandFilter = (await searchParams).brand;

  const { q: query } = await searchParams;

  if (!query) return redirect("/");

  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: query,
          },
        },
      ],
    },
  });

  const sortedProducts = sortProducts(searchResults, sortType);

  let finalProducts = sortedProducts;
  if (typeof categoryFilter === "string")
    finalProducts = filterProducts(
      finalProducts,
      "category",
      parseInt(categoryFilter),
    );
  if (typeof brandFilter === "string")
    finalProducts = filterProducts(
      finalProducts,
      "brand",
      parseInt(brandFilter),
    );

  return (
    <div className="m-6 min-h-screen">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-9 md:grid-rows-1">
        <div className="col-span-3 my-4 hidden md:block lg:col-span-2">
          <FilterSidebar />
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
          <div className="my-4">
            <h2 className="text-xl font-medium lg:text-2xl">
              Search Results for &quot;{query}&quot;
            </h2>
            <p className="text-muted-foreground text-sm">
              Found {finalProducts.length} results
            </p>
          </div>
          <div className="h-vh mb-6 flex w-full justify-between">
            <ProductsFilterTags />
            <SortMenu />
          </div>
          {finalProducts.length > 0 ? (
            <ProductsList products={finalProducts} />
          ) : (
            <div className="m-10 flex flex-col items-center justify-center lg:m-16">
              <SearchIcon className="m-2 size-20" />
              <h2 className="m-2 text-3xl font-bold">
                Sorry, we couldn&apos;t find anything :(
              </h2>
              <p className="text-muted-foreground">
                No results found for &quot;{query}.&quot; Try checking the
                spelling or using different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
