import { monoFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const OrderViewTitle = ({ orderId }: { orderId: string }) => {
  return (
    <h2 className="text-2xl font-semibold">
      Order Details of{" "}
      <span className={cn(monoFont.className, "text-primary")}>
        {" "}
        {orderId}
      </span>{" "}
    </h2>
  );
};

export default OrderViewTitle;
