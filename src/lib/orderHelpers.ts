import { Order, OrderStatus } from "@/generated/prisma";
import { getDateFromId } from "./idHelpers";
import { Record } from "@/generated/prisma/runtime/library";

export const getEstimatedDelivery = (order: Order) => {
  const orderDate = getDateFromId(order.orderId);

  if (!orderDate) {
    throw new Error("Invalid order ID");
  }

  const offsetLookup: Record<OrderStatus, number> = {
    PROCESSING: 0,
    PLACED: 1,
    /**/
    CANCELLED: -1,
    COMPLETED: -1,
    RETURNED: -1,
  };

  const offset = offsetLookup[order.status];
  const reqTime = 2;

  const start = new Date(orderDate);
  start.setDate(start.getDate() + offset);

  const end = new Date(start);
  end.setDate(end.getDate() + offset + reqTime);

  const formatted = `${start.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${end.toLocaleString("en-US", { month: "long", day: "numeric" })}`;

  return {
    formatted,
    start,
    end,
  };
};
