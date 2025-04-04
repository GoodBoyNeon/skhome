import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";
import React from "react";

const Visit = () => {
  return (
    <div className="min-h-screen mx-4 my-12 md:mx-18 lg:my-16 lg:mx-36">
      <Heading>Visit Us</Heading>

      <p className="text-justify my-4 md:text-center text-muted-foreground lg:text-lg md:m-6 lg:m-8">
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
          className="w-full aspect-video rounded-lg border shadow-md max-w-3xl"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=S.K Home Traders`}
        ></iframe>
      </div>
    </div>
  );
};

export default Visit;
