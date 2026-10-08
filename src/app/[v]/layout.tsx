import { Suspense } from "react";
import { variants } from "@/lib/variants";
import { VariantShell } from "@/components/variant-shell";

export function generateStaticParams() {
  return variants.map((v) => ({ v }));
}

export default function VariantLayout({ children }: LayoutProps<"/[v]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <VariantShell>{children}</VariantShell>
    </Suspense>
  );
}
