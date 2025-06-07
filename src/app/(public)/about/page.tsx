import AboutImg from "@/../public/about-banner-resized.png";
import Heading from "@/components/Heading";
import { Metadata } from "next";
import Image from "next/image";
import Features from "./Features";
import Stats from "./Stats";
import ReviewTestimonials from "./Testimonials";
import WhyUs from "./WhyUs";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div>
      <div className="absolute z-[-2] overflow-hidden [mask-image:linear-gradient(to_top,transparent,white_40%,white_90%,white_100%)]">
        <Image src={AboutImg} alt="banner" aria-hidden />
      </div>
      <div className="mt-[260px]"></div>
      <div className="min-h-screen md:mx-16 md:my-12 lg:mx-32 lg:my-16">
        <Heading className="text-center">Welcome to S.K. Home Traders</Heading>

        <p className="text-muted-foreground px-14 text-center text-balance lg:mt-8 lg:px-24 lg:text-lg">
          S.K Home Traders has been a trusted destination for home appliances
          since 2016, offering a wide range of high-quality products to suit
          every household need and budget. From water purifiers, kitchen
          chimneys, and microwaves to refrigerators, air fryers, and more, we
          provide top brands and the latest technology to enhance your home.
          With options for every price range, we ensure that you find the
          perfect appliance to match your lifestyle and budget. Visit us for the
          best deals and expert advice!
        </p>

        <WhyUs />

        <Features />

        <Stats />

        <ReviewTestimonials />
      </div>
    </div>
  );
}
