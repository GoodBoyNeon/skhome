"use server";

import { prisma } from "@/lib/database";

export async function getOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { orderId },
    include: {
      timeline: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orderId || !orderId.startsWith("ORD-")) {
    throw new Error("Order not found");
  }

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}
