export type Referrer = "category" | "brand" | "products" | "direct" | null;

export type NavigationHistory = {
  path: string;
  referrer: Referrer;
  timestamp: number /* timestamp is required to filter duplicates */;
};

export type AddToHistory = (
  entry: Omit<NavigationHistory, "timestamp">,
) => void;
