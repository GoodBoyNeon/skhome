"use client";

import { motion } from "motion/react";
import React, { Fragment } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Brand } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const LoadingSkeleton = () => {
  return (
    <section className="mx-12 lg:mx-28 overflow-x-clip">
      <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
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
              <Skeleton className="w-[100px] h-[100px]" />
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
    queryFn: async (): Promise<Brand[]> => {
      const res = await fetch("/api/brand");
      return res.json();
    },
  });

  if (error) {
    console.log("Error: ", error);
    return <div>failed to load</div>;
  }
  if (!brands || isLoading) return <LoadingSkeleton />;

  return (
    <section className="mx-12 lg:mx-28 overflow-x-clip">
      <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
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
                        className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
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
