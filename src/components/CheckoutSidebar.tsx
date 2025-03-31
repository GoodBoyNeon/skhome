import Image from "next/image";
import type { CartItem } from "@/hooks/useCart";
import { pricify } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

interface CheckoutItemWrapperProps {
  item: CartItem;
}

const OrderSummary = ({
  selectedItems,
  shipping,
  discount,
}: {
  selectedItems: CartItem[];
  shipping: number;
  discount: number;
}) => {
  const subtotal = selectedItems
    .map((item) => item.product.price * item.quantity)
    .reduce((price, total) => total + price, 0);

  let variable = false;
  if (shipping === -1) {
    shipping = 0;
    variable = true;
  }

  const total = subtotal + shipping - discount;
  return (
    <div className="bg-[#f4f5f6] p-6 md:col-span-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
      <div className="">
        <ScrollArea className="space-y-4">
          {selectedItems.map((item) => (
            <CheckoutItemWrapper key={item.product.id} item={item} />
          ))}
        </ScrollArea>

        <Separator className="mt-4 mb-6" />

        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{pricify(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>{variable ? "Variable" : pricify(shipping)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- {pricify(discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <div className="text-right">
              <div>{`${pricify(total)}${variable ? "*" : ""}`}</div>
            </div>
          </div>

          {variable && (
            <p className="flex gap-1 text-muted-foreground font-semibold">
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
        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden relative">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {item.quantity}
        </span>
      </div>

      <div className="flex gap-8">
        <div className="flex">
          <p className="text-wrap truncate">{item.product.name}</p>
        </div>

        <div className="shrink-0 font-medium">
          {pricify(item.product.price * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
