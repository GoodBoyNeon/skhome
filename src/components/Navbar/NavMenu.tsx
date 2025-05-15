"use client";

import { getAllCategories, getAllProducts } from "@/db";
import { useQuery } from "@tanstack/react-query";
import NavMenuWrapper from "./NavMenuWrapper";

const NavMenu = ({ title, category }: { title: string; category: string }) => {
  const productsRes = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getAllProducts(),
  });
  const categoriesRes = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
  });

  if (productsRes.isLoading || categoriesRes.isLoading) {
    return (
      <NavMenuWrapper title={title} isLoading={true} category={category} />
    );
  }
  if (productsRes.error || categoriesRes.error) {
    return "An unexpected error occured!";
  }

  const { data: products } = productsRes;
  const { data: categories } = categoriesRes;

  const filteredProducts = products
    ?.filter(
      (p) =>
        p.categoryId === categories?.find((c) => c.urlSlug === category)?.id,
    )
    .sort((a, b) => b.pIndex - a.pIndex);

  if (!filteredProducts) {
    throw Error;
  }

  return (
    <NavMenuWrapper
      title={title}
      products={filteredProducts}
      category={category}
    />
  );
};

export default NavMenu;
