"use client";

import { cn } from "@/lib/utils";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";

const Carousel = ({
  images,
  emblaOptions,
}: {
  images: string[];
  emblaOptions?: EmblaOptionsType;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const { onDotButtonClick, scrollSnaps, selectedIndex } =
    useDotButton(emblaApi);

  const {
    nextBtnDisabled,
    prevBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="h-auto w-auto">
      <div className="relative flex items-center">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="overflow-hidden lg:rounded-xl lg:border" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom rounded-xl md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px]">
            {images.map((img, i) => (
              <Image
                className="min-w-0 flex-[0_0_100%] translate-3d"
                key={i}
                src={img}
                alt="image"
                width={768}
                height={768}
              />
            ))}
          </div>
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="">
        <div
          className={cn(
            "flex flex-wrap items-center justify-center",
            scrollSnaps.length === 1 ? "hidden" : "",
          )}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "mx-1 my-5 inline-flex h-2.5 w-2.5 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-black/10",
                index === selectedIndex ? "bg-black/70" : "",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type ButtonPropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<ButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button--prev absolute z-10 m-2 flex h-6 w-6 cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 bg-white/40 p-0 text-black/70 disabled:hidden"
      type="button"
      {...restProps}
    >
      <ChevronLeft />
      {children}
    </button>
  );
};

export const NextButton: React.FC<ButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button--next absolute right-0 z-10 m-2 flex h-6 w-6 cursor-pointer touch-manipulation items-center justify-center rounded-full border-0 bg-white/40 p-0 text-black/70 disabled:hidden"
      type="button"
      {...restProps}
    >
      <ChevronRight />
      {children}
    </button>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton: React.FC<ButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export default Carousel;
