"use client";
import { Phone, Mail } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const PHONE_I = "01-6635223";
const PHONE_II = "9851181186";
const EMAIL = "info@skhometraders.com.np";

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
      <div className="bg-base-bg h-full max-w-72 border-x p-4 py-8">
        <h2 className="mb-6 text-2xl font-semibold">Contact Us</h2>
        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => handleClick("PhoneI")}
                className={
                  "text-primary flex cursor-pointer gap-1 transition hover:text-blue-600"
                }
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
                className="text-primary flex cursor-pointer gap-1 transition hover:text-blue-600"
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
                className="text-primary flex cursor-pointer gap-1 transition hover:text-blue-600"
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
          You may also visit our showroom at Radhe Radhe, Bhaktapur.{" "}
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
