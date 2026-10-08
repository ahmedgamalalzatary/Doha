"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MapPin } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/shared/logo";
import { Plate } from "@/components/shared/plate";
import { LangToggle, ThemeToggle } from "@/components/shared/toggles";
import { useLockScroll, useNav, useScrolled } from "@/components/shared/nav";
import { FacebookIcon, InstagramIcon } from "@/components/shared/brand-icons";
import { useLang } from "@/lib/i18n";
import { useCompare } from "@/lib/compare";
import { brand, salespeople, telHref } from "@/data/brand";
import { useHref } from "@/lib/use-variant";

/** The plate doubles as the call button, with a light line passing over it on hover. */
export function PlateCall({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <a
      href={telHref(brand.mainPhone)}
      aria-label={`${t("callNow")} ${brand.mainPhone}`}
      className={clsx("group relative inline-flex overflow-hidden rounded-[3px] transition-transform hover:-translate-y-0.5", className)}
    >
      <Plate />
      <span className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 [--sweep:480%] rtl:[--sweep:-480%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-none group-hover:animate-[sweep_0.9s_ease-out] group-hover:opacity-100" />
    </a>
  );
}

export function ShowroomHeader() {
  const nav = useNav();
  const { t } = useLang();
  const { ids } = useCompare();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const href = useHref();
  useLockScroll(open);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 border-b transition-colors duration-500",
          scrolled ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg",
        )}
      >
        <div className="mx-auto grid h-[76px] max-w-[1480px] grid-cols-[auto_1fr_auto] items-center gap-6 px-4 md:px-10">
          <Link href={href()} className="text-[24px]">
            <Logo />
          </Link>
          <nav className="hidden justify-center gap-8 lg:flex" aria-label={t("menu")}>
            {nav.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                aria-current={n.active ? "page" : undefined}
                className={clsx(
                  "relative py-2 text-[15px] transition-colors",
                  n.active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {t(n.key)}
                {n.key === "navCompare" && ids.length > 0 && <sup className="tnum ms-0.5 text-accent">{ids.length}</sup>}
                {n.active && <motion.span layoutId="sr-nav" className="absolute inset-x-0 -bottom-[19px] h-px bg-ink" />}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-1">
            <LangToggle className="text-muted hover:text-ink" />
            <ThemeToggle className="text-muted hover:text-ink" />
            <span className="ms-3 hidden sm:inline-flex">
              <PlateCall className="text-[15px]" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="grid size-10 place-items-center lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className="fixed inset-0 z-[70] flex flex-col bg-[#141517] text-[#f1efea]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
              {[18, 34, 50, 66, 82].map((x, i) => (
                <motion.line
                  key={x}
                  x1={`${x}%`}
                  y1="0"
                  x2={`${x - 22}%`}
                  y2="100%"
                  stroke="white"
                  strokeOpacity="0.14"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </svg>
            <div className="relative flex h-[76px] items-center justify-between px-4">
              <Logo className="text-[24px]" />
              <button type="button" onClick={() => setOpen(false)} aria-label={t("close")} className="grid size-10 place-items-center">
                <X className="size-5" />
              </button>
            </div>
            <nav className="relative flex flex-1 flex-col justify-center gap-3 px-6">
              {nav.map((n, i) => (
                <motion.div
                  key={n.key}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={n.href} className="font-display text-5xl">
                    {t(n.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative px-6 pb-24">
              <PlateCall className="text-xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ShowroomFooter() {
  const { t, pick, lang } = useLang();
  const nav = useNav();
  return (
    <footer className="bg-alt pb-28 pt-16 text-alt-ink">
      <div className="mx-auto max-w-[1480px] px-4 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-alt-ink/20 pb-12">
          <div>
            <Logo className="text-[44px]" />
            <p lang="ar" className="mt-3 font-script text-4xl text-alt-ink/90">
              {brand.taglineAr}
            </p>
          </div>
          <div className="flex gap-2">
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center border border-alt-ink/30 transition-colors hover:bg-alt-ink hover:text-alt">
              <FacebookIcon className="size-5" />
            </a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-alt-ink/30 transition-colors hover:bg-alt-ink hover:text-alt">
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
        <div className="grid gap-10 pt-12 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-sm opacity-70">{t("visitUs")}</h2>
            <p className="flex max-w-[34ch] gap-2 leading-relaxed">
              <MapPin className="mt-1 size-4 shrink-0" />
              {lang === "ar" ? brand.addressAr : brand.addressEn}
            </p>
            <a href={brand.mapUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">
              {t("directions")}
            </a>
          </div>
          <div>
            <h2 className="mb-4 text-sm opacity-70">{t("salesperson")}</h2>
            <ul className="space-y-2">
              {salespeople.map((s) => (
                <li key={s.id} className="flex justify-between gap-4">
                  <span>{pick({ ar: s.nameAr, en: s.nameEn })}</span>
                  <a href={telHref(s.phone)} dir="ltr" className="tnum hover:underline">
                    {s.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="flex flex-col gap-2 md:items-end">
            {nav.map((n) => (
              <Link key={n.key} href={n.href} className="hover:underline">
                {t(n.key)}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-14 text-xs opacity-60">© 2026 AUTO DOHA. {t("pricesNote")}</p>
      </div>
    </footer>
  );
}
