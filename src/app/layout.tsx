import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import { bodyFont } from "./fonts";
import MarqueeBar from "@/components/MarqueeBar";

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
    <html lang="en" /*className="bg-[#f3f4f6]"*/>
      <body className={cn(bodyFont.className, "overflow-x-hidden")}>
        <QueryProvider>
          <MarqueeBar />
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
