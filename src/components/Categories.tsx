import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <div className="bg-background flex gap-8 m-2 overflow-x-auto justify-center">
      {categories.map((category) => (
        <div key={category.id} className="text-center max-w-xl">
          <Link
            prefetch
            href={`category/${category.urlSlug}`}
            className="flex items-center justify-center p-2 flex-col rounded hover:bg-accent"
          >
            {category.image != "" && (
              <Image
                src={category.image}
                alt={`${category.name}-image`}
                className="object-cover"
                width={60}
                height={60}
              />
            )}
            <h3 className="font-normal text-sm">{category.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
