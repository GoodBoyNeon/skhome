"use client";

import AddProductForm from "./AddProductForm";

const AddProductPage = () => {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Add New Product</h1>
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProductPage;
