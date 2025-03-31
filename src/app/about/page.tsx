import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Heading from "@/components/Heading";
import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import AboutImg from "@/../public/about-banner-resized.png";

export const metadata: Metadata = {
  title: "About",
};

const Page = () => {
  return (
    <>
      <div className="absolute z-[-2] overflow-hidden [mask-image:linear-gradient(to_top,transparent,white_40%,white_90%,white_100%)]">
        <Image src={AboutImg} alt="banner" aria-hidden />
      </div>
      <div className="mt-[260px]"></div>
      <div className="min-h-screen md:m-12 lg:m-16">
        <Heading>Welcome to S.K. Home Traders</Heading>

        <p className="lg:px-24 px-14 text-balance text-center text-muted-foreground lg:text-lg lg:mt-8">
          S.K Home Traders has been a trusted destination for home appliances
          since 2016, offering a wide range of high-quality products to suit
          every household need and budget. From water purifiers, kitchen
          chimneys, and microwaves to refrigerators, air fryers, and more, we
          provide top brands and the latest technology to enhance your home.
          With options for every price range, we ensure that you find the
          perfect appliance to match your lifestyle and budget. Visit us for the
          best deals and expert advice!
        </p>

        <Features />

        <Testimonials />
      </div>
    </>
  );
};

export default Page;
