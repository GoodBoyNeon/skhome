import { saveOrder } from "@/lib/saveOrder";
import { searchParamsToProducts } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = req.nextUrl.searchParams.getAll("p");
  const items = await searchParamsToProducts(url);
  const data = await req.json();

  const orderData = {
    information: data.information,
    order: items?.map((item) => ({
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/place_order`,
    {
      message: JSON.stringify(orderData),
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_MESSAGE_AUTH_TOKEN}`,
      },
    },
  );

  console.log(res.data);

  // const res = await axios.post(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/place_order`,
  //   {
  //     phone: process.env.WHATSAPP_ORDER_PLACEMENT_PHONE_NUMBER,
  //     message: "Test Message from skhometraders.com.np",
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.WHATSAPP_MESSAGE_AUTH_TOKEN}`,
  //     },
  //   },
  // );
  //
  return NextResponse.json(res.data, { status: res.status });

  return NextResponse.json({ status: 200 });
}
