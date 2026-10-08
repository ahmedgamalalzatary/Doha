"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { DictKey } from "@/lib/i18n";
import { useVariant } from "@/lib/use-variant";

export const navItems: { path: string; key: DictKey }[] = [
  { path: "", key: "navHome" },
  { path: "/cars", key: "navCars" },
  { path: "/compare", key: "navCompare" },
  { path: "/sell", key: "navSell" },
];

export function useNav() {
  const v = useVariant();
  const pathname = usePathname();
  return navItems.map((n) => {
    const href = `/${v}${n.path}`;
    const active = n.path === "" ? pathname === href : pathname.startsWith(href);
    return { ...n, href, active };
  });
}

export function useScrolled(threshold = 24) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

/** Lock page scroll while an overlay is open. */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}
