import { getProducts } from "@/db";
import { prisma } from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const products =
    id === null
      ? await getProducts()
      : await prisma.product.findUnique({
          where: {
            id: parseInt(id),
          },
        });
  return Response.json(products);
}
