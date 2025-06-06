import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FullPageSpinner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
      {...props}
    >
      <Loader2 className="text-muted-foreground h-16 w-16 animate-spin" />
    </div>
  );
}
