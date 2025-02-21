import type { Metadata } from "next";
import { Noto_Sans as MainFont } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mainFont = MainFont({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S.K Home Traders",
  description: "Buy quality home appliances in Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" /*className="bg-[#f3f4f6]"*/>
      <body className={cn(mainFont.className, "overflow-x-hidden")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
