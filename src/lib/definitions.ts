import { z } from "zod";

export type CheckoutType = "single" | "cart";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long!")
    .trim(),
  password: z.string().trim(),
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
