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
    <form className="min-h-max flex-1" onSubmit={handleSearch}>
      <div className="relative flex w-full items-center rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:focus-within:text-gray-400">
        <Input
          className="w-full appearance-none border-none bg-transparent"
          id="search"
          ref={inputRef}
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="cursor-pointer"
          type="submit"
          aria-label="search-button"
        >
          <Search className="inset-y-0 right-0 z-10 m-3 h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
