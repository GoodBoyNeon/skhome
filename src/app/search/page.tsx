import ProductsSection from '@/components/ProductsSection';
import { prisma } from '@/lib/database';
import { redirect } from 'next/navigation';
import React from 'react'
import { SearchIcon } from 'lucide-react';

const Search = async ({ searchParams }: {
  searchParams: Promise<{ q?: string }>
}) => {
  const { q: query } = await searchParams;

  if (!query) return redirect('/');

  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          }

        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          }

        },
      ]
    }
  })

  return (
    <div className="m-6">
      <div className='my-4'>
        <h2 className="text-xl font-medium">Search Results for "{query}"</h2>
        <p className='text-muted-foreground text-sm'>Found {searchResults.length} results</p>
      </div>

      {searchResults.length > 0 ? (

        <ProductsSection products={searchResults} />
      ) : (
        <div className='h-screen m-12 flex flex-col items-center justify-center'>
          <SearchIcon className='m-2 size-20' />
          <h2 className='m-2 font-bold text-3xl'>Sorry, we couldn&apos;t find anything :(</h2>
          <p className='text-muted-foreground'>No results found for "{query}." Try checking the spelling or using different keywords.</p>
        </div>
      )}
    </div>
  )
}

export default Search;
