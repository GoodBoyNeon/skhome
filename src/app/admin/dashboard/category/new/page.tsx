"use client";

import AddCategoryForm from "./NewCategoryForm";

const AddCategoryPage = () => {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Add New Category</h1>
        <AddCategoryForm />
      </div>
    </div>
  );
};

export default AddCategoryPage;
