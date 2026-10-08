"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const MAX = 3;
const KEY = "doha-compare";

type Ctx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => "added" | "removed" | "full";
  remove: (id: string) => void;
  clear: () => void;
  full: boolean;
};

const CompareCtx = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw).slice(0, MAX));
    } catch {}
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle: (id) => {
        if (ids.includes(id)) {
          persist(ids.filter((x) => x !== id));
          return "removed";
        }
        if (ids.length >= MAX) return "full";
        persist([...ids, id]);
        return "added";
      },
      remove: (id) => persist(ids.filter((x) => x !== id)),
      clear: () => persist([]),
      full: ids.length >= MAX,
    }),
    [ids, persist],
  );

  return <CompareCtx.Provider value={value}>{children}</CompareCtx.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
