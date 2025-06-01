import { cn } from "@/lib/utils";
import React from "react";

export interface SubHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ children, className }, _ref) => {
    return (
      <h2
        className={cn(
          `mt-10 mb-6 text-center text-2xl font-bold lg:text-3xl`,
          className,
        )}
      >
        {children}
      </h2>
    );
  },
);

SubHeading.displayName = "Sub Heading (h3)";

export default SubHeading;
