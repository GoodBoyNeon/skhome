"use client";

import { AdminSidebarTabs } from "@/components/Admin/tabs";
import { UserOptions } from "@/components/Admin/userbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartBar, Command, Home, Package } from "lucide-react";
import * as React from "react";

const data = {
  user: {
    name: "Admin",
    email: "S.K. Home Traders - Admin",
    avatar: "https://neon.is-a.dev/_next/static/media/about-logo.75642e4c.png",
  },
  tabs: [
    {
      name: "Overview",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Orders",
      url: "/admin/dashboard/orders",
      icon: Package,
    },
    {
      name: "Statistics",
      url: "/admin/dashboard/stats",
      icon: ChartBar,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Admin Panel</span>
                  <span className="truncate text-xs">S.K. Home Traders</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarTabs tabs={data.tabs} />
      </SidebarContent>
      <SidebarFooter>
        <UserOptions user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
