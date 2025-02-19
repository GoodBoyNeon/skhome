import ProductsSection from "@/components/ProductsSection";
import { prisma } from "@/lib/database";

export default async function NotFound() {
  const otherProducts = await prisma.product.findMany();
  return (
    <>
      <div className="p-4 border-b text-center">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Product not found :(
        </h2>
        <p>
          We searched wide and far, but could not find the product you&apos;re
          looking for...
        </p>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">Discover other products</h3>

        <ProductsSection products={otherProducts} />
      </div>
    </>
  );
}
