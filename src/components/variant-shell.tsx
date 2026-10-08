"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { isVariant } from "@/lib/variants";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { VariantSwitcher } from "@/components/shared/variant-switcher";
import { FaiyumHeader, FaiyumFooter } from "@/components/faiyum/chrome";
import { ShowroomHeader, ShowroomFooter } from "@/components/showroom/chrome";
import { ClassicHeader, ClassicFooter } from "@/components/classic/chrome";

const chrome = {
  faiyum: [FaiyumHeader, FaiyumFooter],
  showroom: [ShowroomHeader, ShowroomFooter],
  classic: [ClassicHeader, ClassicFooter],
} as const;

export function VariantShell({ children }: { children: React.ReactNode }) {
  const { v } = useParams<{ v: string }>();
  if (!isVariant(v)) notFound();
  const variant = v;
  const [Header, Footer] = chrome[variant];

  useEffect(() => {
    document.documentElement.dataset.variant = variant;
  }, [variant]);

  return (
    <div data-variant={variant} className="flex min-h-dvh flex-col">
      <SmoothScroll />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <VariantSwitcher current={variant} />
    </div>
  );
}
