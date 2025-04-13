import React from "react";
import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ClipboardIconProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

const ClipboardIcon = ({ className, text, ...props }: ClipboardIconProps) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard");
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <Clipboard className="text-muted-foreground h-4 w-4 transition hover:text-black" />
    </Button>
  );
};

export default ClipboardIcon;
