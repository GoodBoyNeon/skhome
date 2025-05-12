import { Separator } from "@/components/ui/separator";
import { pricify } from "@/lib/utils";
import { Item, Order, Product } from "@/generated/prisma";
import Image from "next/image";
import FormatStatus from "../../FormatStatus";
import OrderStatusSection from "./OrderStatus";
import OrderViewTitle from "./OrderViewTitle";

type OrderType = {
  items: ({
    product: Product;
  } & Item)[];
} & Order;

const OrderInfoContainer = ({ order }: { order: OrderType }) => {
  return (
    <div className="mx-8 my-8 space-y-6">
      <div className="rounded-lg border p-8">
        <OrderViewTitle orderId={order.orderId} />

        <Separator className="my-4" />
        <div>
          <ul className="space-y-6 text-gray-600">
            <div className="space-y-1">
              <li>
                <span className="font-medium">Ordered By:</span> {order.name}
              </li>
              <li>
                <span className="font-medium">Contact No.:</span> {order.phone}
              </li>
            </div>
            <div className="space-y-1">
              <li>
                <span className="font-medium">Address:</span> {order.address}
              </li>
              <li>
                <span className="font-medium">City:</span> {order.city}
              </li>
              <li>
                <span className="font-medium">Appartment/Street:</span>{" "}
                {order.appartment ?? "None"}
              </li>
              <li>
                <span className="font-medium">Postal Code:</span>{" "}
                {order.postalCode ?? "None"}
              </li>
            </div>
            <div className="space-y-1">
              <li>
                <span className="font-medium">Payment Method:</span>{" "}
                {order.paymentMethod}
              </li>
              <li>
                <span className="font-medium">Shipping Method:</span>{" "}
                {order.shippingMethod}
              </li>
            </div>
          </ul>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-lg font-semibold">Ordered Products:</h3>
          {order.items.map((item, i) => (
            <div key={i}>
              <div className="flex gap-4 py-4">
                <div className="relative">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex gap-8">
                  <div className="">
                    <p className="line-clamp-3 font-medium">
                      {item.product.name}
                    </p>

                    <div className="text-muted-foreground shrink-0 font-medium">
                      Sub-Total Price:{" "}
                      {pricify(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="text-muted-foreground flex justify-between">
            <span>Subtotal</span>
            <span>{pricify(order.subtotal)}</span>
          </div>
          <div className="text-muted-foreground flex justify-between">
            <span>Shipping</span>
            <span>
              {order.shipping === null
                ? "Not specified"
                : pricify(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>- {pricify(order.discount)}</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>Total</span>
            <div className="text-right">
              <div>{`${pricify(order.total)}`}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Order Status</h2>
        <div>
          <div className="flex gap-2 text-gray-600">
            <span className="font-medium">Current Status --&gt;</span>
            <FormatStatus status={order.status} />
          </div>
        </div>
        <OrderStatusSection order={order} />
      </div>
    </div>
  );
};

export default OrderInfoContainer;
