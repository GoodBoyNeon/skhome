import "@/app/globals.css";

import Footer from "@/components/Footer";
import FullPageSpinner from "@/components/FullPageSpinner";
import Header from "@/components/Header";
import MarqueeBar from "@/components/MarqueeBar";
import { NavigationProvider } from "@/components/NavigationProvider";
import { env as clientEnv } from "@/data/env/client";
import { siteConfig } from "@/siteConfig";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_BASE_URL),
  title: {
    default: siteConfig.metadata.title,
    template: `%s - ${siteConfig.metadata.title}`,
  },
  description: siteConfig.metadata.description,
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: "./",
    siteName: siteConfig.metadata.title,
    type: "website",
  },
  keywords: siteConfig.metadata.keywords,
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
    // NOTE: Temporary fix, will remove when github issue is resolved
    <Suspense fallback={<FullPageSpinner />}>
      <NavigationProvider>
        <MarqueeBar />
        <Header />
        {children}
        <SpeedInsights />
        <Analytics />
        <Footer />
      </NavigationProvider>
    </Suspense>
  );
}
