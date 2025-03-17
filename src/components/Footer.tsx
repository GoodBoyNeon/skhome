import Link from "next/link";
import Line from "./Line";
import {
  IconType,
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";

const links: Array<{ title: string; href: string }> = [
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Visit Us",
    href: "/visit",
  },
];

const socials: Array<{ name: string; icon: IconType; href: string }> = [
  {
    name: "Facebook",
    icon: SiFacebook,
    href: "https://www.facebook.com/profile.php?id=61564920013577",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    href: "https://www.instagram.com/skhometraders/",
  },
  {
    name: "Tiktok",
    icon: SiTiktok,
    href: "https://www.tiktok.com/@skhometraders",
  },
];

export default function FooterSection() {
  return (
    <div className="mt-6">
      <Line />
      <footer className="py-2 lg:py-4 bg-[#f3f4f6]">
        <div className="mx-auto max-w-5xl px-6">
          <Link href="/" aria-label="go home">
            <h3 className="text-2xl text-center font-bold">
              S.K. Home Traders
            </h3>
          </Link>

          <div className="my-3 flex flex-wrap justify-center gap-8 text-sm">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {socials.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-muted-foreground hover:text-primary transition"
              >
                <s.icon />
              </Link>
            ))}
          </div>
          <span className="text-muted-foreground block text-center text-sm mt-4">
            &copy; {new Date().getFullYear()} S.K. Home Traders, All rights
            reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
