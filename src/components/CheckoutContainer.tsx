"use client";

import { CartItem } from "@/hooks/useCart";
import React, { useState } from "react";
import OrderSummary from "./CheckoutSidebar";
import CheckoutForm from "./CheckoutForm";
import { CheckoutType } from "@/app/checkout/page";

const CheckoutContainer = ({
  items,
  checkoutType,
}: {
  items: CartItem[];
  checkoutType: CheckoutType;
}) => {
  const [shipping, setShipping] = useState(0);
  const [discount, _setDiscount] = useState(0);

  return (
    <div className="grid md:grid-cols-15 gap-8">
      <div className="md:col-span-9">
        <CheckoutForm
          items={items}
          checkoutType={checkoutType}
          setShipping={setShipping}
        />
      </div>
      <OrderSummary
        selectedItems={items}
        shipping={shipping}
        discount={discount}
      />
    </div>
  );
};

export default CheckoutContainer;
