import ProductsListLoading from "@/components/ProductsListLoading";
import SubHeading from "@/components/SubHeading";
import React from "react";

const ProductsLoading = () => {
  return (
    <div className="m-6">
      <SubHeading>Our Products</SubHeading>
      <ProductsListLoading />
    </div>
  );
};

export default ProductsLoading;
