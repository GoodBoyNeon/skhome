import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import SubHeading from "./SubHeading";

export default function Footer() {
  return (
    <div className="flex flex-col gap-3 items-center p-4 bg-[#f3f4f6]">
      <div className="border-b">
        <SubHeading className="text-xl">S.K. Home Traders</SubHeading>
        <p className="text-muted-foreground mb-3">
          Your go-to store for home appliances in Kathmandu Valley. Visit our
          physical store located at Madhyapur Thimi, Bhaktapur.{" "}
          <Link prefetch href={"/visit"} className="hover:underline text-main">
            Check on Google Maps
          </Link>
        </p>
      </div>

      <div className="text-2xl flex gap-3">
        <Link prefetch href={"https://facebook.com"} aria-label="Facebook Page">
          <FaFacebook />
        </Link>

        <Link
          prefetch
          href={"https://instagram.com"}
          aria-label="Instagram Page"
        >
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
}
