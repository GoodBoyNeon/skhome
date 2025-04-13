import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { monoFont } from "@/app/fonts";

export interface CodeTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CodeText = ({ className, children, ...props }: CodeTextProps) => {
  return (
    <span
      className={cn(
        monoFont.className,
        "rounded-md bg-gray-300 px-1 text-black",
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default CodeText;
