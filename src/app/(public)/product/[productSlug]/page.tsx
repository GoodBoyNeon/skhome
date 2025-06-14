import ProductsList from "@/components/ProductsList";
import SubHeading from "@/components/SubHeading";
import { getAllProducts, getProductBySlug } from "@/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductViewContainer from "./ProductViewContainer";
import ProductWhyUs from "./ProductWhyUs";

export type Props = {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);

  return {
    title: product?.name,
    description: product?.description,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map(({ urlSlug }) => ({
    productSlug: urlSlug,
  }));
}

export default async function ProductPage(props: Props) {
  const params = await props.params;

  const product = await getProductBySlug(params.productSlug);

  if (!product) return notFound();

  const allProducts = await getAllProducts();
  const similar = allProducts.filter(
    (p) => p.categoryId === product.categoryId,
  );

  return (
    <div className="mb-12">
      <ProductViewContainer product={product} allProducts={allProducts} />

      <div className="mx-4 md:mx-12 lg:mx-16">
        <SubHeading>Similar Products</SubHeading>

        <ProductsList products={similar} />
      </div>
    </div>
  );
}
