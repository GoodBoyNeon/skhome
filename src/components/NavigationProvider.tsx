"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type Referrer = "category" | "brand" | "products" | "direct" | null;

type NavigationHistory = {
  path: string;
  referrer: Referrer;
  timestamp: number /* timestamp is required to filter duplicates */;
};

type AddToHistory = (entry: Omit<NavigationHistory, "timestamp">) => void;

const NavigationContext = createContext<{
  history: NavigationHistory[];
  addToHistory: AddToHistory;
}>({
  history: [],
  addToHistory: () => {},
});

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<NavigationHistory[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          path: "/",
          referrer: null,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [history.length]);

  const addToHistory: AddToHistory = (entry) => {
    setHistory((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].path === entry.path) {
        return prev;
      }

      return [
        ...prev,
        {
          ...entry,
          timestamp: Date.now(),
        },
      ];
    });
  };

  return (
    <NavigationContext.Provider value={{ history, addToHistory }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
