import { config } from "@/config";
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
      {config.announcementTexts.map((str) => (
        <p key={str} className="px-32 md:px-48 lg:px-56 text-sm py-1.5">
          {str}
        </p>
      ))}
    </Marquee>
  );
}

export default MarqueeBar;
