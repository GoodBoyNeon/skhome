import { titleFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className }, _ref) => {
    return (
      <h2
        className={cn(
          "mb-4 text-4xl font-bold lg:mb-6 lg:text-5xl",
          titleFont.className,
          className,
        )}
      >
        {children}
      </h2>
    );
  },
);

Heading.displayName = "Heading (h2)";

export default Heading;
