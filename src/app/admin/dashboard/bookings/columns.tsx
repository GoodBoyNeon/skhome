"use client";

import { monoFont } from "@/app/fonts";
import ClipboardIcon from "@/components/ClipboardIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ServicingBooking, ServicingBookingStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import FormatStatus from "../FormatStatus";

export const columns: ColumnDef<ServicingBooking>[] = [
  {
    accessorKey: "id",
    cell: ({ getValue }) => {
      return <p className="ml-2">{getValue() as string}.</p>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          S.N.
          <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4 transition hover:text-black" />
        </Button>
      );
    },
  },
  {
    header: "Booking ID",
    accessorKey: "bookingId",
    cell: ({ getValue }) => {
      const bookingId = getValue() as string;
      return (
        <div className={cn(monoFont.className, "text flex items-center gap-2")}>
          <p>{bookingId}</p>
          <ClipboardIcon text={bookingId} />
        </div>
      );
    },
  },
  {
    header: "Booked By",
    accessorKey: "name",
  },
  {
    header: "Contact No.",
    accessorKey: "phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as ServicingBookingStatus;

      return <FormatStatus status={status} />;
    },
  },
];
