"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import logo from "../../public/logo.png";
import { MouseEvent, useState } from "react";
import { redirect } from "next/navigation";
import ProductsListLoading from "./ProductsListLoading";

const navItems = [
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Visit Us",
    href: "/visit",
  },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const drawerItemOnClick = (e: MouseEvent, href: string) => {
    e.preventDefault();

    setIsOpen(false);
    redirect(href);
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <>
      <Link prefetch href={"/"} className="flex shrink-0 items-center max-w-40">
        {/* S.K. Home Traders */}
        <Image src={logo} alt={"logo"} />
      </Link>
      <nav className="flex gap-2 sm:gap-4">
        {navItems.map(({ name, href }, i) => (
          <Link
            prefetch
            href={href}
            key={i}
            className="text-muted-foreground hover:text-black transition"
          >
            {name}
          </Link>
        ))}
      </nav>
    </>
  ) : (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger aria-label="Nav Button">
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>S.K. Home Traders</DrawerTitle>
          </DrawerHeader>

          <Link
            prefetch
            className="p-4 text-base"
            href={"/"}
            onClick={(e) => drawerItemOnClick(e, "/")}
          >
            Home
          </Link>

          {navItems.map(({ name, href }, i) => (
            <Link
              prefetch
              className="p-4 text-base"
              key={i}
              href={href}
              onClick={(e) => drawerItemOnClick(e, href)}
            >
              {name}
            </Link>
          ))}

          <hr />

          {/* <Link prefetch href={"/me"} className="flex flex-row-reverse m-4"> */}
          {/*   <Avatar className="max-w-9 max-h-9"> */}
          {/*     <AvatarImage */}
          {/*       src={ */}
          {/*         "https://cdn.discordapp.com/attachments/1125984275158806658/1231965185942753362/dc.png?ex=6638dffd&is=66266afd&hm=7d049393a184aeba513a9b68abd48a4beef54aa212f47fe66e2c67529e95d579&" */}
          {/*       } */}
          {/*     /> */}
          {/*     <AvatarFallback>GBN</AvatarFallback> */}
          {/*   </Avatar> */}
          {/* </Link> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
