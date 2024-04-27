import Categories from "@/components/Categories";
import ProductsSection from "@/components/ProductsSection";
import PromoSlides from "@/components/PromoSlides";
import { prisma } from "@/lib/database";

export default async function Home() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  return (
    <>
      <Categories categories={categories}></Categories>
      <PromoSlides />

      <div className="m-4">
        <h3 className="text-xl mb-2 font-semibold">Featured Products</h3>

        <ProductsSection products={products} />
      </div>
    </>
  );
}
