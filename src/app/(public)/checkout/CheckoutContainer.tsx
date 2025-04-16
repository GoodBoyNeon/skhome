"use client";

import { CartItem } from "@/hooks/useCart";
import { CheckoutType } from "@/lib/definitions";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./CheckoutSidebar";

const CheckoutContainer = ({
  items,
  checkoutType,
}: {
  items: CartItem[];
  checkoutType: CheckoutType;
}) => {
  const [shipping, setShipping] = useState<number | null>(0);
  const [discount, _setDiscount] = useState(0);

  const subtotal = items
    .map((item) => item.product.price * item.quantity)
    .reduce((price, total) => total + price, 0);

  const total = subtotal + Number(shipping) - discount;

  return (
    <div className="grid gap-8 md:grid-cols-15">
      <div className="md:col-span-9">
        <CheckoutForm
          items={items}
          checkoutType={checkoutType}
          shipping={shipping}
          setShipping={setShipping}
          subtotal={subtotal}
          discount={discount}
          total={total}
        />
      </div>
      <OrderSummary
        subtotal={subtotal}
        total={total}
        selectedItems={items}
        shipping={shipping}
        discount={discount}
      />
    </div>
  );
};

export default CheckoutContainer;
