import { siteConfig } from "@/siteConfig";
import React from "react";
import Marquee from "react-fast-marquee";

function MarqueeBar() {
  return (
    <Marquee
      className="bg-black text-white"
      autoFill={true}
      pauseOnHover={true}
      speed={75}
    >
      {siteConfig.announcementTexts.map((str) => (
        <p key={str} className="px-32 py-1.5 text-sm md:px-48 lg:px-56">
          {str}
        </p>
      ))}
    </Marquee>
  );
}

export default MarqueeBar;
