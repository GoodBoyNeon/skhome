"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Item,
  Order,
  OrderStatus,
  Product,
  TimelineEvent,
} from "@/generated/prisma";
import { getDateFromId } from "@/lib/idHelpers";
import { pricify } from "@/lib/utils";
import { Record } from "@/generated/prisma/runtime/library";
import { getEstimatedDelivery } from "@/lib/orderHelpers";

interface OrderDetailsProps {
  order: {
    timeline: TimelineEvent[];
    items: ({
      product: Product;
    } & Item)[];
  } & Order;
}

const statusDetails: Record<
  OrderStatus,
  {
    name: string;
    description: string;
  }
> = {
  PLACED: {
    name: "Placed",
    description:
      "Your order has been placed! Our staff will get it ready and packed as soon as possible.",
  },
  PROCESSING: {
    name: "Processing",
    description:
      "Your order is being processed. We will try to deliver it as soon as possible",
  },
  COMPLETED: {
    name: "Completed",
    description:
      "Yay! Your order was completed and delivered! (Please contact support if you haven't received your order)",
  },
  CANCELLED: {
    name: "Cancelled",
    description:
      "Your order was cancelled. Please contact support if this is not expected",
  },
  RETURNED: {
    name: "Returned",
    description:
      "Your order was cancelled. Please contact support if this is not expected",
  },
} as const;

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary");

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PLACED:
        return <Clock className="h-5 w-5 text-blue-500" />;
      case OrderStatus.PROCESSING:
        return <Truck className="h-5 w-5 text-orange-500" />;
      case OrderStatus.COMPLETED:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case OrderStatus.CANCELLED:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case OrderStatus.RETURNED:
        return <Package className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PLACED:
        return "bg-blue-500";
      case OrderStatus.PROCESSING:
        return "bg-orange-500";
      case OrderStatus.COMPLETED:
        return "bg-green-500";
      case OrderStatus.CANCELLED:
        return "bg-red-500";
      case OrderStatus.RETURNED:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PLACED:
        return 33;
      case OrderStatus.PROCESSING:
        return 66;
      case OrderStatus.COMPLETED:
        return 100;
      default:
        return 0;
    }
  };

  const orderDate = getDateFromId(order.orderId) ?? "";
  const dateStr = format(orderDate, "PPPp", {});

  const estimatedDelivery = getEstimatedDelivery(order);
  const isPending = order.status === "PLACED" || order.status === "PROCESSING";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle className="text-2xl">Order Details</CardTitle>
            <CardDescription>
              <span>{order.orderId}</span>
              <br />
              Placed on {dateStr}
            </CardDescription>
          </div>
          <div className="bg-muted gap-2 rounded-lg px-3 py-2">
            <div className="flex items-center gap-1 text-lg font-semibold">
              {getStatusIcon(order.status)}
              <span className="font-medium">
                {statusDetails[order.status].name}
              </span>
            </div>
            <hr className="my-1.5" />
            <p className="text-muted-foreground flex items-center gap-1">
              <Info className="h-4 w-4 shrink-0" />
              <span className="text-sm">
                {statusDetails[order.status].description}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Order Status</h3>
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white uppercase">
                  Order Placed
                </span>
              </div>
              <div>
                <span className="inline-block rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white uppercase">
                  Delivered
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
              <div
                style={{ width: `${getStatusProgress(order.status)}%` }}
                className={`flex flex-col justify-center text-center whitespace-nowrap text-white shadow-none transition-all duration-500 ${getStatusColor(order.status)}`}
              ></div>
            </div>
          </div>
          {isPending && (
            <p className="text-muted-foreground text-sm">
              Estimated delivery:{" "}
              <span className="font-medium">{estimatedDelivery.formatted}</span>
            </p>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Shipping Address</h3>
                <div className="text-sm">
                  <p>{order.name}</p>
                  <p>{order.address}</p>
                  <p>
                    {order.appartment}, {order.city}{" "}
                  </p>
                  <p>{order.postalCode}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{pricify(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {!order.shipping ? "Free" : pricify(order.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-medium">
                    <span>Total</span>
                    <span>{pricify(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="items">
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 border-b py-3 last:border-0"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-medium">
                      {item.product.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      {pricify(item.product.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {pricify(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-muted-foreground text-sm">
          Need help?{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
