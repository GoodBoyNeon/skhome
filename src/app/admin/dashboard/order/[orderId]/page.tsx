import { prisma } from "@/lib/database";
import OrderInfoContainer from "./OrderInfoContainer";
import CodeText from "@/components/CodeText";

export default async function AdminOrderDetails({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: {
      orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <div className="m-12 text-lg text-red-500">
        Order not found in database! Please re-check the{" "}
        <CodeText>OrderID</CodeText>
      </div>
    );
  }

  return <OrderInfoContainer order={order} />;
}
