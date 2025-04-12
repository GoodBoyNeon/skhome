import "@/app/globals.css";

import React from "react";
import { Toaster } from "sonner";
import { bodyFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/Admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { decrypt, sessionCookieHelper } from "@/lib/session";
import { cookies } from "next/headers";
import AdminHeader from "@/components/Admin/admin-header";

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
            <AdminSidebar variant="inset" />

            <div className="m-2 w-full rounded-xl bg-white shadow-sm">
              <AdminHeader />
              {children}
            </div>
          </SidebarProvider>
        ) : (
          <>{children}</>
        )}
        <Toaster closeButton richColors theme="light" />
      </body>
    </html>
  );
};

export default AdminLayout;
