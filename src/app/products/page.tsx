import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";

const Page = async () => {
  const products = await prisma.product.findMany();
  return (
    <div className="m-6">
      <SubHeading>Our Products</SubHeading>
      <ProductsList products={products} />
    </div>
  );
};

export default Page;
