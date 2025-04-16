import { OrderStatus, ServicingBookingStatus } from "@prisma/client";
import { Check, Info, Timer } from "lucide-react";

const FormatStatus = ({
  status,
}: {
  status: OrderStatus | ServicingBookingStatus;
}) => {
  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-1 font-medium text-red-500">
        <Info className="size-4" /> {status}
      </div>
    );
  } else if (status === "PROCESSING") {
    return (
      <div className="flex items-center gap-1 font-medium text-orange-500">
        <Timer className="size-4" /> {status}
      </div>
    );
  } else if (status === "COMPLETED") {
    return (
      <div className="flex items-center gap-1 font-medium text-green-500">
        <Check className="size-4" /> {status}
      </div>
    );
  }
};

export default FormatStatus;
