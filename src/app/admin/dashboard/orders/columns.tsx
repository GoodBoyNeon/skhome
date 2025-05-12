"use client";

import { monoFont } from "@/app/fonts";
import ClipboardIcon from "@/components/ClipboardIcon";
import { Button } from "@/components/ui/button";
import { cn, pricify } from "@/lib/utils";
import { Order, OrderStatus, ShippingMethod } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import FormatStatus from "../FormatStatus";

export const columns: ColumnDef<Order>[] = [
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
    header: "Order ID",
    accessorKey: "orderId",
    cell: ({ getValue }) => {
      const orderId = getValue() as string;
      return (
        <div className={cn(monoFont.className, "text flex items-center gap-2")}>
          <p>{orderId}</p>
          <ClipboardIcon text={orderId} />
        </div>
      );
    },
  },
  {
    header: "Ordered By",
    accessorKey: "name",
  },
  {
    header: "Contact No.",
    accessorKey: "phone",
  },
  {
    header: "Shipping Method",
    accessorKey: "shippingMethod",
    cell: ({ getValue }) => {
      const method = getValue() as ShippingMethod;

      if (method === "INSIDE_VALLEY") {
        return <div className="font-medium text-blue-600">Inside Valley</div>;
      } else if (method === "OUTSIDE_VALLEY") {
        return (
          <div className="font-medium text-yellow-500">Outside Valley</div>
        );
      }
    },
  },
  {
    header: "Receivable Amount",
    accessorKey: "total",
    cell: ({ getValue }) => {
      return (
        <div className="font-medium">{pricify(Number(getValue()), false)}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as OrderStatus;

      return <FormatStatus status={status} />;
    },
  },
];
