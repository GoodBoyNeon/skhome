"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Menu } from "lucide-react";

const NavDrawer = ({
  navItems,
}: {
  navItems: {
    name: string;
    href: string;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const drawerItemOnClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    setIsOpen(false);
    redirect(href);
  };
  return (
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
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
