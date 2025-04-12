import { Information } from "@/components/CheckoutForm";
import { env as clientEnv } from "@/data/env/client";
import { env } from "@/data/env/server";
import { searchParamsToProducts } from "@/lib/productParamHelper";
import { saveOrder } from "@/lib/saveOrder";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export type CheckoutItem = {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
};

export async function POST(req: NextRequest) {
  const url = req.nextUrl.searchParams.getAll("p");
  const items = (await searchParamsToProducts(url)) ?? [];

  if (!items) {
    return NextResponse.json(
      { error: "An unexpected error occured..." },
      { status: 400 },
    );
  }
  const {
    information,
  }: {
    information: Information;
  } = await req.json();

  const orderData: {
    information: Information;
    items: CheckoutItem[];
  } = {
    information: information,
    items: items?.map((item) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
      },
      quantity: item.quantity,
    })),
  };

  saveOrder(orderData);

  const res = await axios.post(
    `${clientEnv.NEXT_PUBLIC_BASE_URL}/api/place_order`,
    {
      message: JSON.stringify(orderData),
    },
    {
      headers: {
        Authorization: `Bearer ${env.PLACE_ORDER_AUTH_TOKEN}`,
      },
    },
  );

  return NextResponse.json(res.data, { status: res.status });
}
