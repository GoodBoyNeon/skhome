import { titleFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "mb-4 text-4xl font-bold lg:mb-6 lg:text-5xl",
        titleFont.className,
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
