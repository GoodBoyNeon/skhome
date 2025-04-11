import "@/app/globals.css";

import React from "react";
import { Toaster } from "sonner";
import { bodyFont } from "@/app/(public)/fonts";
import { cn } from "@/lib/utils";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, "bg-base-bg overflow-x-hidden")}>
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
};

export default AdminLayout;
