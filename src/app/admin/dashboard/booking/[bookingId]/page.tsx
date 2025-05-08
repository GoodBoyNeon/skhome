import { prisma } from "@/lib/database";
import BookingInfoContainer from "./BookingInfoContainer";
import CodeText from "@/components/CodeText";

export default async function AdminOrderDetails({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  const booking = await prisma.servicingBooking.findUnique({
    where: {
      bookingId,
    },
    include: {
      appliances: true,
    },
  });

  if (!booking) {
    return (
      <div className="m-12 text-lg text-red-500">
        Booking not found in database! Please re-check the{" "}
        <CodeText>BookingID</CodeText>
      </div>
    );
  }
  return <BookingInfoContainer booking={booking} />;
}
