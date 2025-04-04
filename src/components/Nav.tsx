"use client";

import { cn } from "@/lib/utils";
import { Category, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import NavDrawer from "./NavDrawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import NavMenuWrapper from "./NavMenuWrapper";

const navItems = [
  {
    name: "All Products",
    href: "/products",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Visit Us",
    href: "/visit",
  },
];

export default function Nav() {
  const productsRes = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch(`/api/product`);
      return res.json();
    },
  });
  const categoriesRes = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const res = await fetch(`/api/category`);
      return res.json();
    },
  });

  if (productsRes.error || categoriesRes.error) {
    return "An unexpected error occured!";
  }
  if (productsRes.isLoading || categoriesRes.isLoading) {
    return "Loading...";
  }

  const { data: products } = productsRes;
  const { data: categories } = categoriesRes;

  const waterPurifers = products
    ?.filter(
      (p) =>
        p.categoryId ===
        categories?.find((c) => c.urlSlug === "water-purifier")?.id,
    )
    .sort((a, b) => b.pIndex - a.pIndex);

  const chimneys = products
    ?.filter(
      (p) =>
        p.categoryId ===
        categories?.find((c) => c.urlSlug === "kitchen-chimney")?.id,
    )
    .sort((a, b) => b.pIndex - a.pIndex);

  if (!waterPurifers) return;
  if (!chimneys) return;

  return (
    <>
      <div className="hidden gap-6 lg:flex">
        <Link
          prefetch
          href={"/"}
          className="flex max-w-40 shrink-0 items-center"
        >
          <Image src={logo} alt={"logo"} />
        </Link>
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuWrapper
                title="Water Purifiers"
                products={waterPurifers}
              />
              <NavMenuWrapper title="Chimneys" products={chimneys} />

              {navItems.map(({ name, href }, i) => (
                <NavigationMenuItem key={i}>
                  <Link prefetch href={href} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                      )}
                    >
                      {name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="lg:hidden">
        <NavDrawer navItems={navItems} />
      </div>
    </>
  );
}
