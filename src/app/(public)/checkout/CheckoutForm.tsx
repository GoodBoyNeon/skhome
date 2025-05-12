"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartItem, useCartStore } from "@/hooks/useCart";
import { CheckoutFormSchema, CheckoutType } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingMethod } from "@/generated/prisma";
import axios from "axios";
import { Loader2, ShoppingBag } from "lucide-react";
import { redirect } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ShippingType = {
  id: ShippingMethod;
  label: string;
  priceLabel: string;
};
const shippingTypes: ShippingType[] = [
  {
    id: "INSIDE_VALLEY",
    label: "Inside Kathmandu Valley",
    priceLabel: "FREE",
  },
  {
    id: "OUTSIDE_VALLEY",
    label: "Outside Kathmandu Valley",
    priceLabel: "variable",
  },
] as const;

const shippingCostLookup: Record<ShippingMethod, number | null> = {
  INSIDE_VALLEY: 0,
  OUTSIDE_VALLEY: null,
};

const paymentMethodSchema = z.enum(["COD"]);
type PaymentMethod = z.infer<typeof paymentMethodSchema>;
type PaymentType = {
  id: PaymentMethod;
  label: string;
};
const paymentTypes: PaymentType[] = [
  {
    id: "COD",
    label: "Cash on Delivery (COD)",
  },
] as const;

type FormFields = z.infer<typeof CheckoutFormSchema>;

export type Information = FormFields & {
  shipping: number;
  subtotal: number;
  discount: number;
  total: number;
};

const CheckoutForm = ({
  items,
  shipping,
  setShipping,
  subtotal,
  discount,
  total,
  checkoutType,
}: {
  items: CartItem[];
  checkoutType: CheckoutType;
  shipping: number | null;
  subtotal: number;
  discount: number;
  total: number;
  setShipping: Dispatch<SetStateAction<number | null>>;
}) => {
  const { clear } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("INSIDE_VALLEY");

  const form = useForm<FormFields>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      appartment: "",
      postalCode: "",
      shippingMethod: "INSIDE_VALLEY",
      paymentMethod: "COD",
    },
  });
  const { handleSubmit, setValue } = form;

  async function onSubmit(values: FormFields) {
    // TODO: Refine this cause using params is stupid when you're doing a POST request
    const res = await axios.post(
      `/api/checkout?${new URLSearchParams(
        items.map((item) => ["p", `${item.product.id}q${item.quantity}`]),
      )}`,
      {
        information: {
          shipping,
          subtotal,
          discount,
          total,
          ...values,
        } as Information,
      },
    );

    if (checkoutType === "cart") clear();

    if (res.status !== 200 || !res.data.orderId) {
      return "An unexpected error occured!";
    } else {
      redirect(`/order/confirmed?orderId=${res.data.orderId}`);
    }
  }

  const handleShippingMethodChange = (value: ShippingMethod) => {
    setShippingMethod(value);
    setShipping(shippingCostLookup[value]);
    setValue("shippingMethod", value);
  };
  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setValue("paymentMethod", value);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Contact</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Delivery</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appartment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, street, etc. (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="postal code (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Shipping method</h2>
          <div className="space-y-3">
            <RadioGroup
              defaultValue="INSIDE_VALLEY"
              onValueChange={handleShippingMethodChange}
            >
              {shippingTypes.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between rounded-md border p-4 ${shippingMethod === s.id ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={s.id} id={s.id}></RadioGroupItem>
                    <Label htmlFor={s.id}>{s.label}</Label>
                  </div>
                  <div className="font-semibold">{s.priceLabel}</div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Payment</h2>
          <div className="space-y-3">
            <RadioGroup
              defaultValue="COD"
              onValueChange={handlePaymentMethodChange}
            >
              {paymentTypes.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between rounded-md border p-4 ${paymentMethod === p.id ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={p.id} id={p.id}></RadioGroupItem>
                    <Label htmlFor={p.id}>{p.label}</Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer gap-2 py-6 text-lg"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShoppingBag />
          )}{" "}
          Place Order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
