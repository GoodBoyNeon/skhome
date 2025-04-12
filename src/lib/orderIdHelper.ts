import { PaymentMethod } from "@prisma/client";
import { customAlphabet } from "nanoid";

export const generateOrderId = () => {
  const prefix = "ORD";
  const now = new Date();
  const dateCode = now.toISOString().slice(0, 10).replace(/-/g, "");
  const timeCode = now.toTimeString().slice(0, 5).replace(/:/g, "");
  const identifier = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)();

  return [prefix, dateCode, timeCode, identifier].join("-");
};

export const getDateFromOrderId = (orderId: string) => {
  try {
    const splitted = orderId.split("-");
    const dateCode = splitted[1];
    const [year, month, day] = dateCode
      .match(/^.{4}|.{2}/g)
      ?.map(Number) as number[];

    const timeCode = splitted[2];
    const [hour, minute] = timeCode.match(/.{2}/g)?.map(Number) as number[];

    const date = new Date(year, month - 1, day, hour, minute);

    return date;
  } catch {
    return null;
  }
};
