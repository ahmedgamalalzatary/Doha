"use client";

import { useParams } from "next/navigation";
import { isVariant, type Variant } from "./variants";

export function useVariant(): Variant {
  const { v } = useParams<{ v: string }>();
  return isVariant(v) ? v : "faiyum";
}

export function useHref() {
  const v = useVariant();
  return (path = "") => `/${v}${path}`;
}
