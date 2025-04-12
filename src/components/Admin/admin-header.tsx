import React from "react";
import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";

const AdminHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>{/* ... */}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AdminHeader;
