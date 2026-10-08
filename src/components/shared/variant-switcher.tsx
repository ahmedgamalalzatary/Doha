"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { variantInfo, variants, type Variant } from "@/lib/variants";
import { useLang } from "@/lib/i18n";

const swatch: Record<Variant, [string, string]> = {
  faiyum: ["#ddb877", "#0d4547"],
  showroom: ["#e7e5e0", "#111111"],
  classic: ["#ffffff", "#c8102e"],
};

/** Demo-only dock for flipping between the three proposals on the same page. */
export function VariantSwitcher({ current }: { current: Variant }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav
      aria-label={lang === "ar" ? "نسخ التصميم" : "Design versions"}
      className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#121212]/90 p-1.5 text-[13px] text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] backdrop-blur-md"
      style={{ fontFamily: "var(--font-alexandria)" }}
    >
      <ul className="flex items-center gap-1">
        {variants.map((v, i) => {
          const active = v === current;
          return (
            <li key={v}>
              <Link
                href={`/${v}${rest ? `/${rest}` : ""}`}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className="relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors hover:text-white"
              >
                {active && (
                  <motion.span
                    layoutId="variant-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className="relative size-3 rounded-full ring-1 ring-white/30"
                  style={{ background: `linear-gradient(135deg, ${swatch[v][0]} 50%, ${swatch[v][1]} 50%)` }}
                />
                <span className={`relative whitespace-nowrap font-medium ${active ? "text-[#121212]" : "text-white/75"}`}>
                  <span className="opacity-60">{String.fromCharCode(65 + i)}</span> {variantInfo[v][lang]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
