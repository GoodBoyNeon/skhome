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
import { env as clientEnv } from "@/data/env/client";
import { config } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_BASE_URL),
  title: {
    default: config.metadata.title,
    template: `%s - ${config.metadata.title}`,
  },
  description: config.metadata.description,
  openGraph: {
    title: config.metadata.title,
    description: config.metadata.description,
    url: "./",
    siteName: config.metadata.title,
    type: "website",
  },
  keywords: config.metadata.keywords,
  creator: "Sushant Ray",
  authors: [
    {
      name: "Sushant Ray",
      url: "https://neon.is-a.dev",
    },
    {
      name: "Khusbu Ray",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
