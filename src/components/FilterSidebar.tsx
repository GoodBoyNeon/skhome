"use client";

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand, Category } from "@prisma/client";

const FilterSidebar = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const res = await fetch(`/api/category`);
      return res.json();
    },
  });
  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async (): Promise<Brand[]> => {
      const res = await fetch("/api/brand");
      return res.json();
    },
  });

  if (categoriesQuery.error || brandsQuery.error) {
    throw new Error();
  }

  const { data: categories } = categoriesQuery;
  const { data: brands } = brandsQuery;

  const [categoryValue, setCategoryValue] = useState("");
  const [brandValue, setBrandValue] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryFilter = params.get("category");
    const brandFilter = params.get("brand");

    setCategoryValue(categoryFilter ?? "");
    setBrandValue(brandFilter ?? "");
  }, [searchParams]);

  const handleCategoryChange = (newValue: string) => {
    setCategoryValue(newValue);

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", newValue);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleBrandChange = (newValue: string) => {
    setBrandValue(newValue);

    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", newValue);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h3 className="text-base font-medium">By Category</h3>
        <RadioGroup value={categoryValue} onValueChange={handleCategoryChange}>
          {categories &&
            categories.map((c) => (
              <div key={c.name} className="flex items-center space-x-1">
                <RadioGroupItem
                  value={c.id.toString()}
                  id={`category-${c.id}`}
                />
                <Label className="font-normal" htmlFor={`category-${c.id}`}>
                  {c.name}
                </Label>
              </div>
            ))}
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-medium">By Brand</h3>
        <RadioGroup value={brandValue} onValueChange={handleBrandChange}>
          {brands &&
            brands.map((c) => (
              <div key={c.id} className="flex items-center space-x-1">
                <RadioGroupItem
                  className="decoratio"
                  value={c.id.toString()}
                  id={`brand-${c.id}`}
                />
                <Label className="font-normal" htmlFor={`brand-${c.id}`}>
                  {c.name}
                </Label>
              </div>
            ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
