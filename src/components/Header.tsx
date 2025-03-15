"use client";
import { Search } from "lucide-react";
import Nav from "./Nav";
import { Input } from "./ui/input";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0 && inputRef.current) {
      inputRef.current.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center h-16 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white px-4 border-b gap-4 sm:gap-10 lg:px-6">
      <Nav />

      <form className="flex-1 min-h-max" onSubmit={handleSearch}>
        <div className="relative flex items-center w-full bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400 dark:focus-within:text-gray-400">
          <Input
            className="appearance-none w-full bg-transparent border-none"
            id="search"
            ref={inputRef}
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="cursor-pointer" type="submit">
            <Search className="w-4 h-4 m-3 inset-y-0 right-0 z-10" />
          </button>
        </div>
      </form>

      {/* <Link href={"/cart"} aria-label="Open the Cart"> */}
      {/*   <ShoppingCart /> */}
      {/* </Link> */}

      {/* <DropdownMenu> */}
      {/*   <DropdownMenuTrigger> */}
      {/*     <Avatar className="max-w-9 max-h-9"> */}
      {/*       <AvatarImage */}
      {/*         src={ */}
      {/*           "https://cdn.discordapp.com/attachments/1125984275158806658/1231965185942753362/dc.png?ex=6638dffd&is=66266afd&hm=7d049393a184aeba513a9b68abd48a4beef54aa212f47fe66e2c67529e95d579&" */}
      {/*         } */}
      {/*       /> */}
      {/*       <AvatarFallback>GBN</AvatarFallback> */}
      {/*     </Avatar> */}
      {/*   </DropdownMenuTrigger> */}
      {/*   <DropdownMenuContent> */}
      {/*     <Link href={"/cart"}> */}
      {/*       <DropdownMenuItem>Cart</DropdownMenuItem> */}
      {/*     </Link> */}
      {/**/}
      {/*     <Link href={"/profile"}> */}
      {/*       <DropdownMenuItem>View Profile</DropdownMenuItem> */}
      {/*     </Link> */}
      {/*   </DropdownMenuContent> */}
      {/* </DropdownMenu> */}
    </header>
  );
}

export default Header;
