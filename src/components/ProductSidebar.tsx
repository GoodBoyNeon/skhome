"use client";
import { Phone, Mail } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import Link from "next/link";

const PHONE_I = "01-6635223";
const PHONE_II = "9851181186";
const EMAIL = "skhome2072@gmail.com";

export default function ProductSidebar() {
  function handleClick(type: "PhoneI" | "PhoneII" | "Email") {
    const contactLookup: Record<typeof type, string> = {
      PhoneI: PHONE_I,
      PhoneII: PHONE_II,
      Email: EMAIL,
    };

    navigator.clipboard.writeText(contactLookup[type]);
    toast.info("Copied to Clipboard!");
  }

  return (
    <>
      <div className="border-x py-8 bg-background max-w-72 p-4 h-full">
        <h2 className="text-2xl mb-6 font-semibold">Contact Us</h2>
        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => handleClick("PhoneI")}
                className={"flex gap-1 cursor-pointer text-primary"}
              >
                <Phone /> {PHONE_I}
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
                className={"flex gap-1 text-primary cursor-pointer"}
              >
                <Phone /> {PHONE_II}
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
                className={"flex gap-1 text-primary cursor-pointer"}
              >
                <Mail /> {EMAIL}
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to Clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator className="my-2" />

        <p className="text-muted-foreground text-base tracking-tight">
          You may also visit our store at Radhe Radhe, Bhaktapur.{" "}
          <Link
            prefetch
            className="text-primary hover:underline"
            href={"/visit"}
          >
            Click here
          </Link>
        </p>
      </div>
    </>
  );
}
