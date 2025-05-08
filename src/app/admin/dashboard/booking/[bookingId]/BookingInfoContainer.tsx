import { monoFont } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Appliance, ServicingBooking } from "@prisma/client";
import FormatStatus from "../../FormatStatus";
import BookingStatusSection from "./BookingStatusSection";
import { capitalize } from "@/lib/capitalize";

const BookingInfoContainer = ({
  booking,
}: {
  booking: {
    appliances: Appliance[];
  } & ServicingBooking;
}) => {
  return (
    <div className="mx-8 my-8 space-y-6">
      <div className="rounded-lg border p-8">
        <h2 className="text-2xl font-semibold">
          Booking Details of{" "}
          <span className={cn(monoFont.className, "text-primary")}>
            {" "}
            {booking.bookingId}
          </span>{" "}
        </h2>

        <Separator className="my-4" />
        <div>
          <ul className="space-y-6 text-gray-600">
            <div className="space-y-1">
              <li>
                <span className="font-medium">Booked By:</span> {booking.name}
              </li>
              <li>
                <span className="font-medium">Contact No.:</span>{" "}
                {booking.phone}
              </li>
            </div>
            <div className="space-y-1">
              <li>
                <span className="font-medium">Address:</span> {booking.address}
              </li>
              <li>
                <span className="font-medium">City:</span> {booking.city}
              </li>
              <li>
                <span className="font-medium">Appartment/Street:</span>{" "}
                {booking.appartment ?? "None"}
              </li>
              <li>
                <span className="font-medium">Postal Code:</span>{" "}
                {booking.postalCode ?? "None"}
              </li>
            </div>
          </ul>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-lg font-semibold">Appliance(s):</h3>
          {booking.appliances.map((appliance, i) => (
            <div key={i}>
              <h2>
                <span className={cn(monoFont.className, "text-sm")}>
                  {i + 1}.{" "}
                </span>
                <span className="font-medium">
                  {capitalize(appliance.type.replace(/_/g, " "), "title")}
                </span>{" "}
                <span className={cn(monoFont.className)}>
                  ({appliance.brand})
                </span>
              </h2>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Booking Status</h2>
        <div>
          <div className="flex gap-2 text-gray-600">
            <span className="font-medium">Current Status --&gt;</span>
            <FormatStatus status={booking.status} />
          </div>
        </div>
        <BookingStatusSection booking={booking} />
      </div>
    </div>
  );
};

export default BookingInfoContainer;
