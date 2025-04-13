"use client";

import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";
import { startTransition, useActionState } from "react";
import { updateOrderStatus } from "./actions";

const OrderStatusSection = ({ order }: { order: Order }) => {
  const [_, action, pending] = useActionState(updateOrderStatus, null);

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Update Status:</h3>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          disabled={pending}
          onClick={() => {
            startTransition(() => {
              action({ orderId: order.orderId, newStatus: "PENDING" });
            });
          }}
          className="cursor-pointer border-dashed border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Mark Pending
        </Button>
        <Button
          variant={"outline"}
          disabled={pending}
          onClick={async () =>
            startTransition(() =>
              action({ orderId: order.orderId, newStatus: "PROCESSING" }),
            )
          }
          className="cursor-pointer border-dashed border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        >
          Mark processing
        </Button>
        <Button
          variant={"outline"}
          disabled={pending}
          onClick={async () =>
            startTransition(() =>
              action({ orderId: order.orderId, newStatus: "COMPLETED" }),
            )
          }
          className="cursor-pointer border-dashed border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
        >
          Mark completed
        </Button>
      </div>
    </div>
  );
};
export default OrderStatusSection;
