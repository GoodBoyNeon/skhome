import { Card, CardContent } from "@/components/ui/card";
import { config } from "@/config";
import { getDateFromId } from "@/lib/IdHelper";
import { MailQuestion, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const OrderSummary = ({ orderId }: { orderId: string }) => {
  const orderDate = getDateFromId(orderId);

  if (!orderDate) return "An unexpected error occured";

  const estimatedDateStart = new Date(orderDate);
  estimatedDateStart.setDate(estimatedDateStart.getDate() + 1);

  const estimatedDateEnd = new Date(estimatedDateStart);
  estimatedDateEnd.setDate(estimatedDateEnd.getDate() + 3);

  const estimatedDelivery = `${estimatedDateStart.toLocaleString("en-US", { month: "long", day: "numeric" })} - ${estimatedDateEnd.toLocaleString("en-US", { month: "long", day: "numeric" })}`;

  return (
    <Card className="mb-8 overflow-hidden border-blue-200 shadow-lg">
      <div className="bg-primary p-4">
        <h2 className="text-lg font-semibold text-white">Order Summary</h2>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium text-gray-500">Order ID</p>
            <p className="mb-4 text-lg font-semibold">{orderId}</p>

            <p className="mb-1 text-sm font-medium text-gray-500">
              Estimated Delivery
            </p>
            <p className="text-lg font-semibold">{estimatedDelivery}</p>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-start gap-3">
              <PhoneCall className="text-primary mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">Reach Us</p>
                <p className="text-sm text-gray-600">
                  {config.contact.map((c, i) => (
                    <Fragment key={i}>
                      <span>{c}</span>
                      <br />
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MailQuestion className="text-primary mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">Got any questions?</p>
                <p className="text-sm text-gray-600">
                  Refer to our{" "}
                  <Link
                    href={"/faq"}
                    className="cursor-pointer text-blue-700 hover:underline"
                  >
                    FAQ section
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
