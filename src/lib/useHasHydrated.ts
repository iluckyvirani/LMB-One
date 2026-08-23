"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/persist snapshot loops with Zustand on Next.js */
export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
