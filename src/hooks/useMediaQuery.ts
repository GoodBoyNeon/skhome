import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [v, setV] = useState(false);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setV(e.matches);
    };

    const res = matchMedia(query);
    res.addEventListener("change", onChange);
    setV(res.matches);

    return () => res.removeEventListener("change", onChange);
  }, [query]);

  return v;
}
