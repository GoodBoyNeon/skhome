import { prisma } from "@/lib/database";
import { redirect } from "next/navigation";
import React from "react";
import { SearchIcon } from "lucide-react";
import ProductsList from "@/components/ProductsList";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q: query } = await searchParams;

  if (!query) return redirect("/");

  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: query,
          },
        },
      ],
    },
  });

  return (
    <div className="m-6 min-h-screen">
      <div className="my-4">
        <h2 className="text-xl font-medium">
          Search Results for &quot;{query}&quot;
        </h2>
        <p className="text-muted-foreground text-sm">
          Found {searchResults.length} results
        </p>
      </div>

      {searchResults.length > 0 ? (
        <ProductsList products={searchResults} />
      ) : (
        <div className="m-10 flex flex-col items-center justify-center lg:m-16">
          <SearchIcon className="m-2 size-20" />
          <h2 className="m-2 text-3xl font-bold">
            Sorry, we couldn&apos;t find anything :(
          </h2>
          <p className="text-muted-foreground">
            No results found for &quot;{query}.&quot; Try checking the spelling
            or using different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
