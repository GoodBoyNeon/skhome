"use client";

import Link from "next/link";
import { useNavigation } from "./NavigationProvider";
import { Referrer } from "@/types/navigation";

export function TrackedLink({
  href,
  referrer,
  children,
  ...props
}: {
  href: string;
  referrer: Referrer;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>) {
  const { addToHistory } = useNavigation();

  return (
    <Link
      href={href}
      onClick={() => {
        addToHistory({
          path: href,
          referrer: referrer || null,
        });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
