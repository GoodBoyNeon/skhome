import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortType = "Featured" | "Alphabetical" | "PriceLow" | "PriceHigh";

const SortMenu = ({
  sortType,
  setSortType,
}: {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}) => {
  return (
    <Select value={sortType} onValueChange={(v: SortType) => setSortType(v)}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Sort By.."></SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="cursor-pointer" value="Featured">
          Featured
        </SelectItem>
        <SelectItem className="cursor-pointer" value="Alphabetical">
          Title (A-Z)
        </SelectItem>
        <SelectItem className="cursor-pointer" value="PriceLow">
          Price (low to high)
        </SelectItem>
        <SelectItem className="cursor-pointer" value="PriceHigh">
          Price (high to low)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortMenu;
