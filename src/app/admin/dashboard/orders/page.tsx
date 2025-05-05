import { prisma } from "@/lib/database";
import React from "react";
import { DataTable } from "./dataTable";
import { columns } from "./columns";

const AdminOrdersPage = async () => {
  const orders = await prisma.order.findMany();

  return (
    <div className="py-16">
      <div className="mx-12">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
