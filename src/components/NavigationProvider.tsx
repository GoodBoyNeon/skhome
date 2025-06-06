"use client";

import { AddToHistory, NavigationHistory } from "@/types/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

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
