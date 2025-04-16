import { PaymentMethod } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { customAlphabet } from "nanoid";

export type IdType = "order" | "booking";

const prefixLookup: Record<IdType, string> = {
  booking: "SRV",
  order: "ORD",
};

export const generateId = (type: IdType) => {
  const prefix = prefixLookup[type];
  const now = new Date();
  const dateCode = now.toISOString().slice(0, 10).replace(/-/g, "");
  const timeCode = now.toTimeString().slice(0, 5).replace(/:/g, "");
  const identifier = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)();

  return [prefix, dateCode, timeCode, identifier].join("-");
};

export const getDateFromId = (id: string) => {
  try {
    const splitted = id.split("-");
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
