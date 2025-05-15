"use client";

import { motion } from "motion/react";
import React, { Fragment } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { getAllBrands } from "@/db";

const LoadingSkeleton = () => {
  return (
    <section className="mx-12 overflow-x-clip lg:mx-28">
      <div className="mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <motion.div
          className="flex flex-none gap-24 pr-24"
          animate={{
            x: "-50%",
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <Fragment key={i}>
              <Skeleton className="h-[100px] w-[100px]" />
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default function LogoTicker() {
  const {
    data: brands,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });

  if (error) {
    console.log("Error: ", error);
    return <div>failed to load</div>;
  }
  if (!brands || isLoading) return <LoadingSkeleton />;

  return (
    <section className="mx-12 overflow-x-clip lg:mx-28">
      <div className="mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <motion.div
          className="flex flex-none gap-24 pr-24"
          animate={{
            x: "-50%",
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <Fragment key={i}>
              {brands?.map((brand) => {
                return (
                  brand.image &&
                  brand.image !== "" && (
                    <Link
                      prefetch
                      key={brand.name}
                      href={`/brand/${brand.urlSlug}`}
                    >
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        className="cursor-pointer grayscale transition duration-300 hover:grayscale-0"
                        width={"100"}
                        height={"100"}
                      />
                    </Link>
                  )
                );
              })}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
