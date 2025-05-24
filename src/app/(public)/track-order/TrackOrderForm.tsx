"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrder } from "./actions";
import { Item, Order, Product } from "@/generated/prisma";
import OrderDetails from "./OrderDetails";

type CompleteOrder = {
  items: ({
    product: Product;
  } & Item)[];
} & Order;

const TrackOrderForm = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState<CompleteOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const order = await getOrder(orderId);
      setOrderDetails(order);
    } catch (_err) {
      setError("Order not found. Please check your order ID and try again.");
      setOrderDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="order-id">Order ID</Label>
          <Input
            id="order-id"
            placeholder="Enter your order ID (e.g., ORD-XXXXXXXX-XXXX-ABC123)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Searching..." : "Track Order"}
        </Button>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>

      {orderDetails && <OrderDetails order={orderDetails} />}
    </div>
  );
};

export default TrackOrderForm;
