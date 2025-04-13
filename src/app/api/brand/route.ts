import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const brands =
    id == null
      ? await prisma.brand.findMany()
      : await prisma.brand.findUnique({
          where: {
            id: parseInt(id),
          },
        });
  return NextResponse.json(brands);
}
