import Image from "next/image";
import React from "react";
import bannerImg from "@/../public/servicing-banner-img.png";
import { Button } from "../ui/button";
import { Wrench } from "lucide-react";
import Link from "next/link";

const ServicingBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[oklch(0.48_0.22_259.8)] via-[oklch(0.42_0.18_259.8)] to-[oklch(0.36_0.14_259.8)] text-white md:flex-row md:justify-between">
      <div className="md:w-lg lg:w-2xl">
        <Image
          src={bannerImg}
          className="h-full w-full"
          alt="Servicing image"
        />
      </div>
      <div className="flex max-w-4xl flex-col items-center justify-center space-y-2 p-6 pr-8 md:items-start md:justify-start md:pr-16 lg:pr-24">
        <h2 className="text-2xl font-bold drop-shadow-md md:text-3xl lg:text-4xl">
          Need Servicing?
        </h2>
        <p className="mb-6 text-center text-base tracking-wide text-pretty text-gray-50 drop-shadow-2xl md:text-left lg:text-lg">
          We provide quality servicing for all sorts of home appliances,
          including Water Purifiers, Kitchen Chimneys, Washing Machines, Solar
          Water Heaters, and much more (all brands!) Click the button below to
          book a servicing for your device.
        </p>
        <div className="group relative w-fit">
          <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-[hsl(221.2_83.2%_53.3%)] transition-all duration-200" />

          <Button
            asChild
            size={"lg"}
            className={
              "text-primary-foreground relative cursor-pointer gap-2 bg-blue-950 text-base shadow-sm transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1 hover:bg-blue-950"
            }
          >
            <Link href={"/servicing/new"}>
              <Wrench /> Book Servicing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicingBanner;
