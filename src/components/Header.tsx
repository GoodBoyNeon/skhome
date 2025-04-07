"use client";

import Nav from "./Navbar";
import { useEffect, useState } from "react";
import Cart from "./CartMenu";
import SearchBar from "./SearchBar";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${isScrolled ? "supports-[backdrop-filter]:bg-background/60 backdrop-blur" : "bg-background"} sticky top-0 z-50 flex h-16 w-full items-center gap-4 border-b px-4 sm:gap-10 lg:px-6`}
    >
      <Nav />
      <SearchBar />
      <Cart />
    </header>
  );
}

export default Header;
