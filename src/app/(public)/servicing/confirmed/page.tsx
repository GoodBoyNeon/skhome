"use client";

import Confetti from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BookingSummary from "./BookingSummary";
import FullPageSpinner from "@/components/FullPageSpinner";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  if (!bookingId || typeof bookingId !== "string") {
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
    <Suspense fallback={<FullPageSpinner />}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-50/50 to-white p-4">
        {mounted && showConfetti && <Confetti />}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <div className="mb-8 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-100">
              <CheckCircle className="h-10 w-10 text-pink-500" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-pink-600 md:text-5xl">
              Thank You for your Booking!
            </h1>
            <p className="mx-auto max-w-xl text-lg text-gray-600">
              Your servicing requested has been booked and is being processed.
              We will call you within 24 hours for confirming your booking.
            </p>
          </div>

          <BookingSummary bookingId={bookingId} />

          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Button asChild className="bg-pink-500 hover:bg-pink-400">
              <Link href="/servicing">
                View Booking Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-pink-200 text-pink-500 hover:bg-pink-50"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
}
