import About from "@/components/About";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
