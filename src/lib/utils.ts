import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pricify = (price: number, stripDigits?: boolean) => {
  return (
    "Rs " +
    new Intl.NumberFormat("en-IN", {
      trailingZeroDisplay: stripDigits ? "stripIfInteger" : "auto",
    }).format(price)
  );
};
