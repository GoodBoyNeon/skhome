"use client";

import { updateBookingStatus } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { ServicingBooking } from "@prisma/client";
import { startTransition, useActionState } from "react";

const BookingStatusSection = ({ booking }: { booking: ServicingBooking }) => {
  const [_, action, pending] = useActionState(updateBookingStatus, null);

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Update Status:</h3>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          disabled={pending}
          onClick={() => {
            startTransition(() => {
              action({ bookingId: booking.bookingId, newStatus: "PENDING" });
            });
          }}
          className="cursor-pointer border-dashed border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Mark Pending
        </Button>
        <Button
          variant={"outline"}
          disabled={pending}
          onClick={async () =>
            startTransition(() =>
              action({ bookingId: booking.bookingId, newStatus: "COMPLETED" }),
            )
          }
          className="cursor-pointer border-dashed border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
        >
          Mark completed
        </Button>
      </div>
    </div>
  );
};
export default BookingStatusSection;
