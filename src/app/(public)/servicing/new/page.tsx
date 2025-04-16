import React from "react";
import ServicingForm from "./ServicingForm";
import Heading from "@/components/Heading";

const NewServicingPage = () => {
  return (
    <div className="mx-4 my-8 flex min-h-svh flex-col items-center gap-6 md:mx-16 md:my-12 lg:mx-24 lg:my-16">
      <div className="text-center">
        <Heading>Book a Servicing</Heading>
        <p className="text-muted-foreground text-base">
          Register a servicing for your home appliance using the form below:
        </p>
      </div>
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <ServicingForm />
      </div>
    </div>
  );
};

export default NewServicingPage;
