import "@/app/globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarqueeBar from "@/components/MarqueeBar";
import { env as clientEnv } from "@/data/env/client";
import { config } from "@/siteConfig";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

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

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarqueeBar />
      <Header />
      {children}
      <SpeedInsights />
      <Analytics />
      <Footer />
    </>
  );
}
