import "@/app/globals.css";

import React from "react";
import { Toaster } from "sonner";
import { bodyFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "./dashboard/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { decrypt, sessionCookieHelper } from "@/lib/session";
import { cookies } from "next/headers";
import AdminHeader from "./dashboard/AdminHeader";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sessionCookie = (await cookies()).get(sessionCookieHelper.name)?.value;
  const token = await decrypt(sessionCookie);
  return (
    <>
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
    </>
  );
};

export default AdminLayout;
