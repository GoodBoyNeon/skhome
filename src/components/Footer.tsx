import { config } from "@/config";
import { prisma } from "@/lib/database";
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
    links: (
      await prisma.category.findMany({ select: { name: true, urlSlug: true } })
    ).map(({ name, urlSlug }) => ({ name, href: `/category/${urlSlug}` })),
  },
  {
    title: "By Brand",
    links: (
      await prisma.brand.findMany({ select: { name: true, urlSlug: true } })
    ).map(({ name, urlSlug }) => ({ name, href: `/brand/${urlSlug}` })),
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
    href: "https://www.instagram.com/skhometraders/",
  },
  {
    name: "Tiktok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@skhometraders",
  },
];

const Footer = () => {
  return (
    <section className="py-24 bg-[#f3f4f6]">
      <div className="container mx-auto px-12 md:px-16 lg:px-24">
        <footer className="">
          <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link prefetch href="/">
                  <h2 className="text-xl font-semibold">{config.title}</h2>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {socials.map((s, i) => (
                  <li
                    key={i}
                    className="font-medium hover:text-accent-foreground"
                  >
                    <Link
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                    >
                      <s.icon className="size-6" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, i) => (
                <div key={i}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, i) => (
                      <li
                        key={i}
                        className="font-medium hover:text-accent-foreground"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
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

// export default async function FooterSection() {
//   return (
//     <div className="mt-6">
//       <Line />
//       <footer className="py-2 lg:py-4 bg-[#f3f4f6]">
//         <div className="mx-auto max-w-5xl px-6">
//           <Link href="/" aria-label="go home">
//             <h3 className="text-2xl text-center font-bold">
//               S.K. Home Traders
//             </h3>
//           </Link>
//
//           <div className="my-3 flex flex-wrap justify-center gap-8 text-sm">
//             {links.map((link, index) => (
//               <Link
//                 key={index}
//                 href={link.href}
//                 className="text-muted-foreground hover:text-accent-foreground block duration-150"
//               >
//                 <span>{link.title}</span>
//               </Link>
//             ))}
//           </div>
//           <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
//             {socials.map((s, i) => (
//               <Link
//                 key={i}
//                 href={s.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={s.name}
//                 className="text-muted-foreground hover:text-accent-foreground transition"
//               >
//                 <s.icon />
//               </Link>
//             ))}
//           </div>
//           <span className="text-muted-foreground block text-center text-sm mt-4">
//             &copy; {new Date().getFullYear()} S.K. Home Traders, All rights
//             reserved
//           </span>
//         </div>
//       </footer>
//     </div>
//   );
// }
