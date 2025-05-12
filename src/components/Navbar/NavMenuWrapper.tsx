import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { formatText } from "@/lib/formatText";
import { cn } from "@/lib/utils";
import { Product } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const NavMenuWrapper = ({
  title,
  products,
  isLoading,
  category,
}: {
  title: string;
  products?: Product[];
  isLoading?: boolean;
  category: string;
}) => {
  if (isLoading ?? !products) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent">
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          <Skeleton className="h-96 lg:w-2xl xl:w-[980px]" />
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const productOnDisplay = products[0];
  return (
    <div>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent">
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          <div className="m-8 space-y-4">
            <ul className="grid grid-cols-2 gap-x-4 lg:w-2xl xl:w-[980px] xl:grid-cols-3">
              <li className="hover:bg-accent row-span-3 w-[300px] rounded-md p-2">
                <Link
                  prefetch
                  href={`/product/${productOnDisplay.urlSlug}`}
                  className="rounded-md"
                >
                  <Image
                    src={productOnDisplay.images[0]}
                    width={300}
                    height={300}
                    alt={productOnDisplay.name}
                  />
                  <div className="p-2">
                    <h2 className="font-medium">{productOnDisplay.name}</h2>
                    <p className="text-muted-foreground line-clamp-3 text-sm tracking-tight text-wrap">
                      {formatText(productOnDisplay.description, false)}
                    </p>
                  </div>
                </Link>
              </li>

              {products.slice(1, 4).map((p, i) => (
                <li key={i} className="hover:bg-accent m-2 rounded-md p-2">
                  <Link
                    prefetch
                    href={`/product/${p.urlSlug}`}
                    className={cn("flex gap-2", i == 0 ? "" : "")}
                  >
                    <Image
                      src={p.images[0]}
                      width={100}
                      height={100}
                      alt={p.name}
                    />
                    <div>
                      <h2 className="line-clamp-2 font-medium">{p.name}</h2>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {formatText(p.description, false)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}

              {products.slice(4, 7).map((p, i) => (
                <li
                  key={i}
                  className="hover:bg-accent m-2 hidden rounded-md p-2 xl:block"
                >
                  <Link
                    prefetch
                    href={`/product/${p.urlSlug}`}
                    className={cn("flex gap-2", i == 0 ? "" : "")}
                  >
                    <Image
                      src={p.images[0]}
                      width={100}
                      height={100}
                      alt={p.name}
                    />
                    <div>
                      <h2 className="line-clamp-2 font-medium">{p.name}</h2>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {formatText(p.description, false)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <Link
                href={`category/${category}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Show All
              </Link>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </div>
  );
};

export default NavMenuWrapper;
