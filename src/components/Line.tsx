import { cn } from "@/lib/utils";
import React from "react";

export interface LineProps extends React.HTMLAttributes<HTMLHRElement> {}

const Line = React.forwardRef<HTMLHRElement, LineProps>(
  ({ className }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
          className,
        )}
      />
    );
  },
);

Line.displayName = "Line";

export default Line;
