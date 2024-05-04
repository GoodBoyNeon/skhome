"use client";

import { Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PHONE_ONE = "9851181186";
const PHONE_TWO = "9849508186";
const EMAIL = "skhome2072@gmail.com";

export default function ProductSidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  function handleClick(i: number) {
    navigator.clipboard.writeText(
      i === 1 ? PHONE_ONE : i === 2 ? PHONE_TWO : EMAIL,
    );
    toast("Copied to Clipboard!");
  }

  return (
    isDesktop ?? (
      <div className="border rounded-lg w-72 p-4 h-full">
        <h2 className="text-2xl mb-2 font-semibold">Contact Us</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"link"}
                onClick={() => handleClick(1)}
                className="flex gap-1"
              >
                <Phone /> {PHONE_ONE}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"link"}
                onClick={() => handleClick(2)}
                className="flex gap-1"
              >
                <Phone /> {PHONE_TWO}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"link"}
                onClick={() => handleClick(2)}
                className="flex gap-1"
              >
                <Mail /> {EMAIL}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Toaster />

        <Separator className="my-2" />

        <p className="text-muted-foreground text-base tracking-tight">
          We are a Authorized Dealer of CG, trusted by thousands of satisfied
          customers.
        </p>
      </div>
    )
  );
}
