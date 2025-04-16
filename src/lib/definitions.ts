import { PaymentMethod, ShippingMethod } from "@prisma/client";
import { z } from "zod";

export type CheckoutType = "single" | "cart";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long!")
    .trim(),
  password: z.string().trim(),
});

export const CheckoutFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "This field is required!",
  }),
  lastName: z.string().min(1, {
    message: "This field is required!",
  }),
  phone: z.string().min(10, {
    message:
      "Phone number must be at least 10 characters. (If you're using a number wihout 10 characters, append '0' to the numbers)",
  }),
  address: z.string().min(3, {
    message: "Please provide a valid address with at least 3 characters.",
  }),
  city: z.string().min(3, {
    message: "Please provide a valid city name with at least 3 characters.",
  }),
  appartment: z.string().optional(),
  postalCode: z.string().optional(),
  shippingMethod: z.nativeEnum(ShippingMethod),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export const ServicingBookingFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "This field is required!",
  }),
  lastName: z.string().min(1, {
    message: "This field is required!",
  }),
  phone: z.string().min(10, {
    message:
      "Phone number must be at least 10 characters. (If you're using a number wihout 10 characters, append '0' to the numbers)",
  }),
  appliances: z
    .array(
      z.object({
        value: z.string().min(1, "Please select a appliance"),
      }),
    )
    .min(1, "At least one appliance must be selected")
    .refine((items) => items.some((item) => item.value.length > 0), {
      message: "At least one appliance must be selected",
      path: ["appliances"],
    }),
  address: z.string().min(3, {
    message: "Please provide a valid address with at least 3 characters.",
  }),
  city: z.string().min(3, {
    message: "Please provide a valid city name with at least 3 characters.",
  }),
  appartment: z.string().optional(),
  postalCode: z.string().optional(),
});

export type ServicingBookingFormFields = z.infer<
  typeof ServicingBookingFormSchema
>;

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
