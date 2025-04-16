import React from "react";
import Image from "next/image";
import img_full from "@/../public/banner_sm.png";
import img_cropped from "@/../public/banner_nr.jpg";

export default function PromoSlides() {
  return (
    <div>
      <div className="bg-sky-50 md:hidden">
        <Image src={img_cropped} alt="banner" priority placeholder="blur" />
      </div>

      <div className="hidden bg-sky-50 md:block">
        <Image src={img_full} alt="banner" priority placeholder="blur" />
      </div>
    </div>
  );
}
