import { subtitleFont, titleFont } from "@/app/fonts";
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
          `text-3xl font-semibold mb-6 mt-10 text-center lg:text-4xl`,
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
