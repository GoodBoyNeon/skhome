import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";
import { env } from "@/data/env/server";
import React from "react";

const Visit = () => {
  return (
    <div className="mx-4 my-12 min-h-screen md:mx-18 lg:mx-36 lg:my-16">
      <Heading>Visit Us</Heading>

      <p className="text-muted-foreground my-4 text-justify md:m-6 md:text-center lg:m-8 lg:text-lg">
        Our physical store is located at Radhe Radhe, Bhaktapur. We always
        recommend you visit us to learn more about the products you&apos;d like
        to buy or to see it in action. You may also give us a call on
        985-1181186 or 01-6635223 to learn more about the product you&apos;re
        interested in.
        <br />
        <br />
        <span className="font-semibold text-slate-500">
          Our opening hours are 8 A.M to 8 P.M, all days of the week!
        </span>
      </p>

      <hr className="mx-8 md:mx-10 lg:mx-12" />

      <SubHeading className="text-center text-2xl lg:text-3xl">
        Check us out on Google Maps
      </SubHeading>
      <div className="flex items-center justify-center rounded-lg">
        <iframe
          className="aspect-video w-full max-w-3xl rounded-lg border shadow-md"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${env.GOOGLE_API_KEY}&q=S.K Home Traders`}
        ></iframe>
      </div>
    </div>
  );
};

export default Visit;
