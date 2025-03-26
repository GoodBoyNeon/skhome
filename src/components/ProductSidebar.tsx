"use client";
import { Phone, Mail } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import Link from "next/link";

const PHONEI = "9851181186";
const PHONEII = "9849508186";
const EMAIL = "skhome2072@gmail.com";

export default function ProductSidebar() {
  function handleClick(type: "PhoneI" | "PhoneII" | "Email") {
    const lot: Record<typeof type, string> = {
      PhoneI: PHONEI,
      PhoneII: PHONEII,
      Email: EMAIL,
    };

    navigator.clipboard.writeText(lot[type]);
    toast("Copied to Clipboard!");
  }

  return (
    <div className="border-x py-8 bg-background max-w-72 p-4 h-full">
      <h2 className="text-2xl mb-6 font-semibold">Contact Us</h2>
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => handleClick("PhoneI")}
              className={"flex gap-1 text-primary"}
            >
              <Phone /> {PHONEI}
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => handleClick("PhoneII")}
              className={"flex gap-1 text-primary"}
            >
              <Phone /> {PHONEII}
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => handleClick("Email")}
              className={"flex gap-1 text-primary"}
            >
              <Mail /> {EMAIL}
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Toaster />

      <Separator className="my-2" />

      <p className="text-muted-foreground text-base tracking-tight">
        You may also visit our store at Radhe Radhe, Bhaktapur.{" "}
        <Link prefetch className="text-primary hover:underline" href={"/visit"}>
          Click here
        </Link>
      </p>
    </div>
  );
}
