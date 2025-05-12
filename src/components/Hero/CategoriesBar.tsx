import { getAllCategories } from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="bg-background m-2 flex justify-center gap-8 overflow-x-auto">
      {categories.map((category) => (
        <div key={category.id} className="max-w-xl text-center">
          <Link
            prefetch
            href={`category/${category.urlSlug}`}
            className="hover:bg-accent flex flex-col items-center justify-center rounded p-2"
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
            <h3 className="text-sm font-normal">{category.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
