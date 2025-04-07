"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import NavDrawer from "./NavDrawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NavMenu from "./NavMenu";

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
              <NavMenu title="Water Purifiers" category="water-purifier" />
              <NavMenu title="Chimneys" category="kitchen-chimney" />

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
