"use client";

import React from "react";
import Image from "next/image";
import img_sm from "../../public/banner_sm.png";
import img_nr from "../../public/banner_nr.jpg";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function PromoSlides() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div>
      {isDesktop && (
        <div className="bg-sky-50">
          <Image
            src={
              // "https://cdn.discordapp.com/attachments/1125984275158806658/1233077835812438087/banner.png?ex=662bc8b9&is=662a7739&hm=e742b16476f5f95e8c189e015db2747eea39e548718596e323fbc30cd7a85be9&"
              img_sm
            }
            alt="banner"
          />
        </div>
      )}

      {!isDesktop && (
        <div className="bg-sky-50">
          <Image
            src={
              // "https://cdn.discordapp.com/attachments/1125984275158806658/1233077835812438087/banner.png?ex=662bc8b9&is=662a7739&hm=e742b16476f5f95e8c189e015db2747eea39e548718596e323fbc30cd7a85be9&"
              img_nr
            }
            alt="banner"
          />
        </div>
      )}
    </div>
  );
}
