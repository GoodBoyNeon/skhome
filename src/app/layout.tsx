import { cn } from "@/lib/utils";
import { bodyFont } from "./fonts";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, "bg-base-bg overflow-x-hidden")}>
        <QueryProvider>
          {children}

          <Toaster closeButton richColors theme="light" />
        </QueryProvider>
      </body>
    </html>
  );
}
