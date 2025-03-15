import { prisma } from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const category =
    id === null
      ? await prisma.category.findMany({})
      : await prisma.category.findUnique({
          where: {
            id: parseInt(id),
          },
        });
  return Response.json(category);
}
