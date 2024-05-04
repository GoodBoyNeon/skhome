"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/slider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

const Images = ({ images }: { images: string[] }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <div className="flex items-center justify-center">
      <Carousel className="">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="p-1 flex items-center justify-center">
                <Image src={img} alt={`image-${i}`} width={450} height={675} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ) : (
    <div className="border-b flex items-center justify-center">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="p-1 flex items-center justify-center">
                <Image src={img} alt={`image-${i}`} width={250} height={375} />
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
