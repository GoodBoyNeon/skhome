import "@/app/globals.css";

import React from "react";
import { Toaster } from "sonner";
import { bodyFont } from "@/app/(public)/fonts";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/Admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { decrypt, sessionCookieHelper } from "@/lib/session";
import { cookies } from "next/headers";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sessionCookie = (await cookies()).get(sessionCookieHelper.name)?.value;
  const token = await decrypt(sessionCookie);
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, "bg-base-bg overflow-x-hidden")}>
        {token ? (
          <SidebarProvider>
            <AdminSidebar />
            {children}
          </SidebarProvider>
        ) : (
          <>{children}</>
        )}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
};

export default AdminLayout;
