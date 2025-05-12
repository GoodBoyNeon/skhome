import FilterSidebar from "@/components/FilterSidebar";
import ProductsFilterTags from "@/components/ProductsFilterTags";
import ProductsList from "@/components/ProductsList";
import SortMenu, { SortType } from "@/components/SortMenu";
import SubHeading from "@/components/SubHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllProducts } from "@/db";
import { filterProducts } from "@/lib/filterProducts";
import { sortProducts } from "@/lib/sortProducts";
import { Filter } from "lucide-react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const products = await getAllProducts();
  const sortType = ((await searchParams).sort || "featured") as SortType;
  const categoryFilter = (await searchParams).category;
  const brandFilter = (await searchParams).brand;

  const sortedProducts = sortProducts(products, sortType);
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
    <div className="m-3 md:m-8 lg:mx-8 lg:my-16 xl:mx-12">
      <SubHeading>Our Products</SubHeading>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-9 md:grid-rows-1">
        <div className="col-span-3 hidden md:block lg:col-span-2">
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

export default ProductsPage;
