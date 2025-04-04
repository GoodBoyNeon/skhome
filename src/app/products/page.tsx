import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import SortMenu, { SortType } from "@/components/SortMenu";
import { sortProducts } from "@/lib/sortProducts";
import { prisma } from "@/lib/database";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const products = await prisma.product.findMany();
  const sortType = ((await searchParams).sort || "featured") as SortType;

  const sortedProducts = sortProducts(products, sortType);

  return (
    <div className="m-6 md:m-12 lg:m-16">
      <SubHeading>Our Products</SubHeading>
      <div className="flex">
        <div className="my-6 ml-auto">
          <SortMenu />
        </div>
      </div>
      <ProductsList products={sortedProducts} />
    </div>
  );
};

export default ProductsPage;
