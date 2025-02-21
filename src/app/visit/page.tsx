import SubHeading from "@/components/SubHeading";
import React from "react";

const Visit = () => {
  return (
    <div className="min-h-screen">
      <SubHeading>Visit Us</SubHeading>

      <p className="m-4 text-base lg:text-lg md:m-6 lg:m-8">
        Our physical store is located at Radhe Radhe, Bhaktapur. We always
        recommend you visit us to learn more about the products you&apos;d like
        to buy or to see it in action. You may also give us a call on
        985-1181186 or 01-6635223 to learn more about the product you&apos;re
        interested in.
        <br />
        <br />
        <span className="italic">
          Our opening hours are 8 A.M to 8 P.M, all days of the week!
        </span>
      </p>

      <hr className="mx-8 md:mx-10 lg:mx-12" />

      <h3 className="font-semibold text-lg lg:text-xl mt-4 m-2 md:m-4 lg:m-6">
        Check us out on Google Maps:
      </h3>
      <div className="flex items-center justify-center m-2 md:m-4 lg:m-6 rounded-lg">
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
