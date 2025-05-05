import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { getProducts } from "@/db";
import { notFound } from "next/navigation";
import ProductViewContainer from "./ProductViewContainer";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map(({ urlSlug }) => ({
    productSlug: urlSlug,
  }));
}

export default async function ProductPage(props: {
  params: Promise<{ productSlug: string }>;
}) {
  const params = await props.params;
  const allProducts = await getProducts();

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

      <div className="mx-4 md:mx-12 lg:mx-16">
        <SubHeading className="mb-4 text-xl font-semibold md:text-2xl">
          Similar products
        </SubHeading>

        <ProductsList products={similar} />
      </div>
    </div>
  );
}
