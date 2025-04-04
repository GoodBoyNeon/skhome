"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

export const sortType = [
  "featured",
  "alphabetical",
  "price-low",
  "price-high",
] as const;
const sortTypeEnum = z.enum(sortType);
export type SortType = z.infer<typeof sortTypeEnum>;

const SortMenu = () => {
  const searchParams = useSearchParams();
  let currentSort = (searchParams.get("sort") || "featured") as SortType;

  if (!sortType.includes(currentSort)) {
    currentSort = "featured";
  }

  const router = useRouter();

  const handleSortChange = (newValue: string) => {
    router.push(`?sort=${newValue}`, { scroll: false });
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Sort By.."></SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="cursor-pointer" value="featured">
          Featured
        </SelectItem>
        <SelectItem className="cursor-pointer" value="alphabetical">
          Title (A-Z)
        </SelectItem>
        <SelectItem className="cursor-pointer" value="price-low">
          Price (low to high)
        </SelectItem>
        <SelectItem className="cursor-pointer" value="price-high">
          Price (high to low)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortMenu;
