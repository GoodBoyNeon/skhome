import { prisma } from "@/lib/database";
import React from "react";
import { DataTable } from "./dataTable";
import { columns } from "./columns";

const AdminOrdersPage = async () => {
  const orders = await prisma.order.findMany();

  return (
    <div className="container mx-auto py-12">
      <div className="mx-12">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
