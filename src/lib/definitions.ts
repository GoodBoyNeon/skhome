import { PaymentMethod, ShippingMethod } from "@/generated/prisma";
import { StringifyOptions } from "querystring";
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
        applianceType: z.string().min(1, "Please select a appliance"),
        brand: z.string().min(1, "Pease enter the brand of your appliance"),
      }),
    )
    .min(1, "At least one appliance must be selected")
    .refine(
      (appliances) =>
        appliances.some((appliance) => appliance.applianceType.length > 0),
      {
        message: "At least one appliance must be selected",
        path: ["appliances"],
      },
    ),
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

export const NewProductFormSchema = z.object({
  name: z.string().min(3, {
    message: "Please provide a valid name with at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Please provide a valid description with at least 10 characters.",
  }),
  specifications: z.string().min(10, {
    message: "Please provide valid specifications with at least 10 characters.",
  }),
  urlSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        "url slug must only contain lowercase characters, numbers and - (hyphens)",
    })
    .min(3, {
      message: "Please enter a valid url slug",
    }),
  MRP: z.coerce.number().int({
    message: "MRP must be a whole number.",
  }),
  price: z.coerce.number().int({
    message: "Price must be a whole number.",
  }),
  stock: z.coerce.number().int({
    message: "Stock must be a whole number.",
  }),
  pIndex: z.coerce.number().int({
    message: "Product index must be a whole number.",
  }),

  brand: z.string({
    required_error: "Please select a brand.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Add at least one tag.",
  }),
});

export type NewProductFormFields = z.infer<typeof NewProductFormSchema>;

export type NewProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    specifications?: string[];
    urlSlug?: string[];
    MRP?: string[];
    price?: string[];
    stock?: string[];
    pIndex?: string[];
    brand?: string[];
    category?: string[];
    tags?: string[];
    images?: string[];
    _form?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export const newCategoryFormSchema = z.object({
  name: z.string().min(3, {
    message: "Please provide a valid name with at least 3 characters.",
  }),

  urlSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        "url slug must only contain lowercase characters, numbers and - (hyphens)",
    })
    .min(3, {
      message: "Please enter a valid url slug",
    }),
});
export type NewCategoryFromFields = z.infer<typeof newCategoryFormSchema>;

export type NewCategoryFormState = {
  errors?: {
    name?: string[];
    urlSlug?: string[];
    image?: string[];
    _form?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export const newBrandFormSchema = z.object({
  name: z.string().min(3, {
    message: "Please provide a valid name with at least 3 characters.",
  }),

  urlSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        "url slug must only contain lowercase characters, numbers and - (hyphens)",
    })
    .min(3, {
      message: "Please enter a valid url slug",
    }),
});
export type NewBrandFormFields = z.infer<typeof newCategoryFormSchema>;

export type NewBrandFormState = {
  errors?: {
    name?: string[];
    urlSlug?: string[];
    image?: string[];
    _form?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export type AdminLoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const UpdateProductFormSchema = z.object({
  name: z.string().min(3, {
    message: "Please provide a valid name with at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Please provide a valid description with at least 10 characters.",
  }),
  specifications: z.string().min(10, {
    message: "Please provide valid specifications with at least 10 characters.",
  }),
  urlSlug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        "url slug must only contain lowercase characters, numbers and - (hyphens)",
    })
    .min(3, {
      message: "Please enter a valid url slug",
    }),
  MRP: z.coerce.number().int({
    message: "MRP must be a whole number.",
  }),
  price: z.coerce.number().int({
    message: "Price must be a whole number.",
  }),
  stock: z.coerce.number().int({
    message: "Stock must be a whole number.",
  }),
  pIndex: z.coerce.number().int({
    message: "Product index must be a whole number.",
  }),

  brand: z.string({
    required_error: "Please select a brand.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Add at least one tag.",
  }),
});

export type UpdateProductFormFields = z.infer<typeof UpdateProductFormSchema>;

export type UpdateProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    specifications?: string[];
    urlSlug?: string[];
    MRP?: string[];
    price?: string[];
    stock?: string[];
    pIndex?: string[];
    brand?: string[];
    category?: string[];
    tags?: string[];
    _form?: string[];
  };
  message?: string | null;
  success?: boolean;
};
