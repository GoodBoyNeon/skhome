"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Record } from "@prisma/client/runtime/library";
import axios from "axios";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CartItem, useCartStore } from "@/hooks/useCart";
import { redirect } from "next/navigation";

const shippingMethodSchema = z.enum(["InsideValley", "OutsideValley"]);
type ShippingMethod = z.infer<typeof shippingMethodSchema>;
type ShippingType = {
  id: ShippingMethod;
  label: string;
  price: string;
};
const shippingTypes: ShippingType[] = [
  {
    id: "InsideValley",
    label: "Inside Kathmandu Valley",
    price: "FREE",
  },
  {
    id: "OutsideValley",
    label: "Outside Kathmandu Valley",
    price: "variable",
  },
] as const;

const shippingCostLookup: Record<ShippingMethod, number> = {
  InsideValley: 0,
  OutsideValley: -1,
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

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().min(10),
  address: z.string().min(3),
  city: z.string(),
  appartment: z.string().optional(),
  postalCode: z.string().optional(),
  shippingMethod: shippingMethodSchema,
  paymentMethod: paymentMethodSchema,
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm = ({
  items,
  setShipping,
}: {
  items: CartItem[];
  setShipping: Dispatch<SetStateAction<number>>;
}) => {
  const { clear } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("InsideValley");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      appartment: "",
      postalCode: "",
      shippingMethod: "InsideValley",
      paymentMethod: "COD",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    axios.post(
      `/api/checkout?${new URLSearchParams(
        items.map((item) => ["p", `${item.product.id}q${item.quantity}`]),
      )}`,
      {
        information: values,
      },
    );
    clear();
    redirect("/thankyou");
  }

  const handleShippingMethodChange = (value: ShippingMethod) => {
    setShippingMethod(value);
    setShipping(shippingCostLookup[value]);
    form.setValue("shippingMethod", value);
  };
  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    form.setValue("paymentMethod", value);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <h2 className="text-xl font-semibold mb-4">Shipping method</h2>
          <div className="space-y-3">
            <RadioGroup
              defaultValue="InsideValley"
              onValueChange={handleShippingMethodChange}
            >
              {shippingTypes.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between border p-4 rounded-md ${shippingMethod === s.id ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={s.id} id={s.id}></RadioGroupItem>
                    <Label htmlFor={s.id}>{s.label}</Label>
                  </div>
                  <div className="font-semibold">{s.price}</div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="space-y-3">
            <RadioGroup
              defaultValue="COD"
              onValueChange={handlePaymentMethodChange}
            >
              {paymentTypes.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between border p-4 rounded-md ${paymentMethod === p.id ? "bg-blue-50" : ""}`}
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

        <Button type="submit" className="w-full py-6 text-lg cursor-pointer">
          Place Order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
