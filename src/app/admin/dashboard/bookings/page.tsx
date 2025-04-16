import { prisma } from "@/lib/database";
import React from "react";
import { DataTable } from "./dataTable";
import { columns } from "./columns";

const AdminBookingsPage = async () => {
  const bookings = await prisma.servicingBooking.findMany();

  return (
    <div className="container mx-auto py-12">
      <div className="mx-12">
        <DataTable data={bookings} columns={columns} />
      </div>
    </div>
  );
};

export default AdminBookingsPage;
