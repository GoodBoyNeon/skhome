import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex flex-col gap-3 items-center p-4 bg-[#f3f4f6]">
      <div className="border-b">
        <h2 className="text-center font-semibold text-lg mb-1">
          S.K. Home Traders
        </h2>
        <p className="text-muted-foreground mb-3">
          Your go-to store for home appliances in Kathmandu Valley. Visit our
          physical store located at Madhyapur Thimi, Bhaktapur.{" "}
          <Link
            prefetch
            // href={"https://maps.app.goo.gl/9EeqihMRFqi5wjQ16"}
            href={"/visit"}
            className="hover:underline text-accent"
          >
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
