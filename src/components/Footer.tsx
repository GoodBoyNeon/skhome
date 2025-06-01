import { siteConfig } from "@/siteConfig";
import { getAllBrands, getAllCategories } from "@/db";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const sections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Visit", href: "/visit" },
    ],
  },
  {
    title: "By Category",
    links: (await getAllCategories()).map(({ name, urlSlug }) => ({
      name,
      href: `/category/${urlSlug}`,
    })),
  },
  {
    title: "By Brand",
    links: (await getAllBrands()).map(({ name, urlSlug }) => ({
      name,
      href: `/brand/${urlSlug}`,
    })),
  },
  {
    title: "Customer Care",
    links: [{ name: "Track Order", href: "/track-order" }],
  },
];

const socials: Array<{ name: string; icon: IconType; href: string }> = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61564920013577",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/waterfilternepal/",
  },
  {
    name: "Tiktok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@skhometraders",
  },
];

const Footer = () => {
  return (
    <section className="bg-[#f3f4f6] py-24">
      <div className="container mx-auto px-12 md:px-16 lg:px-24">
        <footer>
          <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link prefetch href="/">
                  <h2 className="text-xl font-semibold">
                    {siteConfig.metadata.title}
                  </h2>
                </Link>
              </div>
              <p className="text-muted-foreground text-sm">
                {siteConfig.metadata.description}
              </p>
              <ul className="text-muted-foreground flex items-center space-x-6">
                {socials.map((s, i) => (
                  <li key={i} className="hover:text-primary font-medium">
                    <Link
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                    >
                      <s.icon className="hover:text-primary size-6 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="text-muted-foreground space-y-0.5 text-sm">
                {siteConfig.phone.map((phone, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Phone className="text-primary size-5" />
                    <span>{phone}</span>
                  </li>
                ))}
                <li className="flex items-start space-x-3">
                  <Mail className="text-primary size-5" />
                  <span>{siteConfig.email}</span>
                </li>
                <li className="mt-1.5 flex items-start space-x-3">
                  <MapPin className="text-primary mt-1 h-5 w-5" />
                  <span className="">
                    Radhe Radhe Road,
                    <br />
                    Nikoshera,
                    <br />
                    Bhaktapur - 44811
                    <br />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-20">
              {sections.map((section, i) => (
                <div key={i} className="mb-12 shrink-0">
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="text-muted-foreground space-y-4 text-sm">
                    {section.links.map((link, i) => (
                      <li key={i} className="hover:text-primary font-medium">
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium lg:flex-row lg:items-center lg:text-left">
            <p>
              &copy; {new Date().getFullYear()} S.K. Home Traders. All rights
              reserved
            </p>
            {/* TODO! */}
            {/* <ul className="flex justify-center gap-4 lg:justify-start"> */}
            {/*   <li className="hover:text-accent-foreground"> */}
            {/*     <a href="#"> Privacy Policy</a> */}
            {/*   </li> */}
            {/* </ul> */}
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
