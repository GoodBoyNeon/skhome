import Categories from "@/components/Categories";
import ProductsList from "@/components/ProductsList";
import PromoSlides from "@/components/PromoSlides";
import { prisma } from "@/lib/database";

export default async function Home() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  return (
    <>
      <Categories categories={categories}></Categories>
      <PromoSlides />

      <div className="m-6">
        <h2 className="text-3xl font-bold mb-6 mt-10 text-center">
          Featured Products
        </h2>
        <h3 className="text-xl mb-2 font-semibold">Featured Products</h3>

        <ProductsList products={products} />
      </div>
    </>
  );
}
