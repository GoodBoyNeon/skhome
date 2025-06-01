import { cn } from "@/lib/utils";
import React from "react";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionHeading = React.forwardRef<
  HTMLHeadingElement,
  SectionHeadingProps
>(({ children, className }, _ref) => {
  return (
    <h2
      className={cn(
        "border-primary mb-6 border-l-4 pl-3 text-2xl font-bold",
        className,
      )}
    >
      {children}
    </h2>
  );
});

SectionHeading.displayName = "Section Heading (h2)";

export default SectionHeading;
