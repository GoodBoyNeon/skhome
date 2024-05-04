import ProductsSection from "@/components/ProductsSection";
import { prisma } from "@/lib/database";

const Page = async () => {
  const products = await prisma.product.findMany();
  return (
    <div className="m-2">
      <h2 className="text-2xl font-bold">Our Products</h2>

      <ProductsSection products={products} />
    </div>
  );
};

export default Page;
