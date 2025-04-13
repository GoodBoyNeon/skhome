"use client";

import Confetti from "@/components/Confetti";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const orderId = use(searchParams).orderId;

  if (!orderId || typeof orderId !== "string") {
    redirect("/");
  }

  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50/50 to-white p-4">
      {mounted && showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <CheckCircle className="text-primary h-10 w-10" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl">
            Thank You for Your Purchase!
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Your order has been received and is being processed. We will call
            you within 24 hours for confirming your order.
          </p>
        </div>

        <OrderSummary orderId={orderId} />

        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Button asChild className="">
            <Link href="/orders">
              View Order Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="text-primary border-blue-200 hover:bg-blue-50"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
