import SubHeading from "@/components/SubHeading";
import React from "react";

const Page = () => {
  return (
    <div className="m-4 md:m-6 lg:m-8">
      <SubHeading>Welcome to S.K. Home Traders</SubHeading>

      <p className="text-base lg:text-lg lg:mt-16">
        We have been providing quality services to our customers since 2016.
        That&apos;s 8 years of excellent trust between us and our customers.
      </p>

      <span className="h-24 flex w-screen"></span>

      <h2 className="font-bold text-3xl text-center m-3">Why Us?</h2>
    </div>
  );
};

export default Page;
