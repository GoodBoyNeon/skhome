"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

const Images = ({ images }: { images: string[] }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <div className="overflow-hidden">
      <Carousel className="border rounded-xl">
        <CarouselContent className="md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]">
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <Image src={img} alt={`${i}-img`} width={450} height={450} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ) : (
    <div className="border-b flex items-center justify-center">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="p-1 flex items-center justify-center">
                <Image src={img} alt={`image-${i}`} width={250} height={250} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Images;
