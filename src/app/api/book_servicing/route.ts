import { prisma } from "@/lib/database";
import { ServicingBookingFormFields } from "@/lib/definitions";
import { generateId } from "@/lib/IdHelper";
import { ServicingAppliance } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const values = (await request.json()) as ServicingBookingFormFields;

    const { firstName, lastName, appliances, ...bookingInfo } = values;
    const name = `${firstName} ${lastName}`;
    const bookingId = generateId("booking");

    await prisma.servicingBooking
      .create({
        data: {
          name,
          bookingId,
          appliances: appliances.map((v) => v.value as ServicingAppliance),
          ...bookingInfo,
        },
      })
      .catch((err) => console.log(err));

    return NextResponse.json({ success: true, bookingId }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
