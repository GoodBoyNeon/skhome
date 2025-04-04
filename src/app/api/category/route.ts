import { prisma } from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const name = req.nextUrl.searchParams.get("name");
  const category = id
    ? await prisma.category.findUnique({
        where: {
          id: parseInt(id),
        },
      })
    : name
      ? await prisma.category.findFirst({
          where: {
            name,
          },
        })
      : await prisma.category.findMany({});
  return Response.json(category);
}
