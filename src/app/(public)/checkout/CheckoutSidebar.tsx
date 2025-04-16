import Image from "next/image";
import type { CartItem } from "@/hooks/useCart";
import { pricify } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CheckoutItemWrapperProps {
  item: CartItem;
}

const OrderSummary = ({
  selectedItems,
  shipping,
  discount,
  subtotal,
  total,
}: {
  selectedItems: CartItem[];
  shipping: number | null;
  discount: number;
  subtotal: number;
  total: number;
}) => {
  const variable = shipping === null;
  return (
    <div className="rounded-lg bg-[#f4f5f6] p-6 md:col-span-6">
      <h3 className="mb-4 text-2xl font-bold">Order Summary</h3>
      <div className="">
        <ScrollArea className="space-y-4">
          {selectedItems.map((item) => (
            <CheckoutItemWrapper key={item.product.id} item={item} />
          ))}
        </ScrollArea>

        <Separator className="mt-4 mb-6" />

        <div className="space-y-2">
          <div className="text-muted-foreground flex justify-between">
            <span>Subtotal</span>
            <span>{pricify(subtotal)}</span>
          </div>
          <div className="text-muted-foreground flex justify-between">
            <span>Shipping</span>
            <span>{variable ? "Variable" : pricify(shipping)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- {pricify(discount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>Total</span>
            <div className="text-right">
              <div>{`${pricify(total)}${variable ? "*" : ""}`}</div>
            </div>
          </div>

          {variable && (
            <p className="text-muted-foreground flex gap-1 font-semibold">
              <span>*</span>
              <span className="text-muted-foreground font-semibold">
                Additional shipping charge will be notified to you via a phone
                call before your order is confirmed.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutItemWrapper = ({ item }: CheckoutItemWrapperProps) => {
  return (
    <div className="flex items-center gap-4 py-4">
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
        <div className="flex">
          <p className="truncate text-wrap">{item.product.name}</p>
        </div>

        <div className="shrink-0 font-medium">
          {pricify(item.product.price * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
