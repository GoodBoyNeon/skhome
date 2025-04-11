import { subtitleFont } from "@/app/(public)/fonts";
import { cn } from "@/lib/utils";
import React from "react";

export interface SubHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ children, className }, _ref) => {
    return (
      <h3
        className={cn(
          `mt-10 mb-6 text-center text-3xl font-semibold lg:text-4xl`,
          subtitleFont.className,
          className,
        )}
      >
        {children}
      </h3>
    );
  },
);

SubHeading.displayName = "Sub Heading (h3)";

export default SubHeading;
