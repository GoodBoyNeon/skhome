"use client";

import NewBrandForm from "./NewBrandForm";

const AddBrandPage = () => {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Add New Brand</h1>
        <NewBrandForm />
      </div>
    </div>
  );
};

export default AddBrandPage;
