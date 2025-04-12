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
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().min(10),
  address: z.string().min(3),
  city: z.string(),
  appartment: z.string().optional(),
  postalCode: z.string().optional(),
  shippingMethod: z.nativeEnum(ShippingMethod),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
