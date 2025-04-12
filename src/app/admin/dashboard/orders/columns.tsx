"use client";

import { Order, ShippingMethod, OrderStatus } from "@prisma/client";
import { Info, Check, Waypoints, ArrowUpDown, Clipboard } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn, pricify } from "@/lib/utils";
import { monoFont } from "@/app/fonts";
import { toast } from "sonner";

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
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(orderId);
              toast.info("Copied to clipboard");
            }}
            className="cursor-pointer"
          >
            <Clipboard className="text-muted-foreground h-4 w-4 transition hover:text-black" />
          </Button>
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

      if (status === "PENDING") {
        return (
          <div className="flex items-center gap-1 font-medium text-red-500">
            <Info className="size-4" /> {status}
          </div>
        );
      } else if (status === "PROCESSING") {
        return (
          <div className="flex items-center gap-1 font-medium text-orange-500">
            <Waypoints className="size-4" /> {status}
          </div>
        );
      } else if (status === "COMPLETED") {
        return (
          <div className="flex items-center gap-1 font-medium text-green-500">
            <Check className="size-4" /> {status}
          </div>
        );
      }
    },
  },
];
