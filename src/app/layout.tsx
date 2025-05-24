import { cn } from "@/lib/utils";
import { bodyFont } from "./fonts";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/components/TRPCProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, "bg-base-bg overflow-x-hidden")}>
        <TRPCProvider>
          {children}
          <Toaster closeButton richColors theme="light" />
        </TRPCProvider>
      </body>
    </html>
  );
}
