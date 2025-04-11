import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation";
import ProductViewContainer from "@/components/ProductViewContainer";

export async function generateStaticParams() {
  const products = await prisma.product.findMany();

  return products.map(({ urlSlug }) => ({
    productSlug: urlSlug,
  }));
}

export default async function ProductPage(props: {
  params: Promise<{ productSlug: string }>;
}) {
  const params = await props.params;
  const allProducts = await prisma.product.findMany();

  const product = allProducts.find(
    (p) => p.urlSlug.toLowerCase() === params.productSlug.toLowerCase(),
  );

  if (!product) return notFound();

  const similar = allProducts.filter(
    (p) => p.categoryId === product.categoryId,
  );

  return (
    <div>
      <ProductViewContainer product={product} allProducts={allProducts} />

      <div className="lg:mx-16 md:mx-12 mx-4">
        <SubHeading className="text-xl font-semibold mb-4 md:text-2xl">
          Similar products
        </SubHeading>

        <ProductsList products={similar} />
      </div>
    </div>
  );
}
