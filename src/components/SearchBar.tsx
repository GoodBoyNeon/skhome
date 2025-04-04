"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0 && inputRef.current) {
      inputRef.current.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  return (
    <form className="flex-1 min-h-max" onSubmit={handleSearch}>
      <div className="relative flex items-center w-full bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400 dark:focus-within:text-gray-400">
        <Input
          className="appearance-none w-full bg-transparent border-none"
          id="search"
          ref={inputRef}
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="cursor-pointer" type="submit">
          <Search className="w-4 h-4 m-3 inset-y-0 right-0 z-10" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
