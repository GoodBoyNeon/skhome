import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { getProducts } from "@/db";
import { SearchIcon } from "lucide-react";

export default async function NotFound() {
  const otherProducts = await getProducts();
  return (
    <>
      <div className="m-12 flex flex-col items-center justify-center">
        <SearchIcon className="m-2 size-20" />
        <SubHeading>Brand not found :(</SubHeading>
        <p>
          We searched wide and far, but could not find the brand you&apos;re
          looking for...
        </p>
      </div>
      <hr className="mx-6 lg:mx-12" />
      <div className="p-4">
        <SubHeading>Discover other products</SubHeading>
        <ProductsList products={otherProducts} />
      </div>
    </>
  );
}
