import { prisma } from "@/lib/database";
import { ServicingBookingFormFields } from "@/lib/definitions";
import { generateId } from "@/lib/IdHelper";
import { ApplianceType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const values = (await request.json()) as ServicingBookingFormFields;

    const { firstName, lastName, appliances, ...bookingInfo } = values;
    const name = `${firstName} ${lastName}`;
    const bookingId = generateId("booking");

    console.log(values);

    const a = await prisma.servicingBooking
      .create({
        data: {
          name,
          bookingId,
          appliances: {
            createMany: {
              data: appliances.map((appliance) => ({
                brand: appliance.brand,
                type: appliance.applianceType as ApplianceType,
              })),
            },
          },
          ...bookingInfo,
        },
      })
      .catch((err) => console.log(err));

    console.log(a);

    return NextResponse.json({ success: true, bookingId }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
