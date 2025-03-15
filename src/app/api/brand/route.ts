import { prisma } from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const brands = await prisma.brand.findMany({});
  // return Response.json(brands);
  const id = req.nextUrl.searchParams.get("id");
  const brands =
    id == null
      ? await prisma.brand.findMany({})
      : await prisma.brand.findUnique({
          where: {
            id: parseInt(id),
          },
        });
  return Response.json(brands);
}
