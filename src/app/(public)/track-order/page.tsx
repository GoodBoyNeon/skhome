import { Metadata } from "next";
import TrackOrderForm from "./TrackOrderForm";

export const metadata: Metadata = {
  title: "Track your order",
  description:
    "Track the status and details of your order in S.K. Home Traders",
};

export default function TrackOrderPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="container max-w-5xl space-y-8 py-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to check the status and details of your purchase
          </p>
        </div>
        <TrackOrderForm />
      </div>
    </div>
  );
}
