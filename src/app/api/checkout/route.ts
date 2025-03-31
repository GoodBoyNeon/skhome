import { searchParamsToProducts } from "@/lib/utils";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl.searchParams.getAll("p");
  const items = await searchParamsToProducts(url);

  const data = await req.json();

  writeFileSync(
    "orders.json",
    JSON.stringify({ information: data.information, order: items }),
    { flag: "a+" },
  );

  return NextResponse.json({ status: 200 });
}
