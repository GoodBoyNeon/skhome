import "@/app/globals.css";

import { bodyFont } from "@/app/fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarqueeBar from "@/components/MarqueeBar";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "S.K Home Traders",
    template: "%s - S.K Home Traders",
  },
  description:
    "Buy quality home appliances in Nepal at reasonable prices. Visit us at Radhe Radhe, Bhaktapur.",
  keywords: [
    "sk home traders",
    "home appliance",
    "home appliances",
    "appliances",
    "solar",
    "chimney",
    "water purfier",
    "water filter",
    "fridge",
    "refrigerator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, "bg-base-bg overflow-x-hidden")}>
        <QueryProvider>
          <MarqueeBar />
          <Header />
          {children}
          <SpeedInsights />
          <Analytics />
          <Toaster closeButton richColors theme="light" />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
