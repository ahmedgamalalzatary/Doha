"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X, MapPin } from "lucide-react";
import { FacebookIcon as Facebook, InstagramIcon as Instagram } from "@/components/shared/brand-icons";
import clsx from "clsx";
import { Logo, Wheel } from "@/components/shared/logo";
import { LangToggle, ThemeToggle } from "@/components/shared/toggles";
import { useLockScroll, useNav, useScrolled } from "@/components/shared/nav";
import { useLang } from "@/lib/i18n";
import { useCompare } from "@/lib/compare";
import { brand, salespeople, telHref, waHref } from "@/data/brand";
import { useHref } from "@/lib/use-variant";

export function FaiyumHeader() {
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
          "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled ? "bg-bg/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-6 px-4 md:px-8">
          <Link href={href()} className="text-[26px] text-ink" aria-label="AUTO DOHA">
            <Logo wheelClassName="transition-transform duration-700 [a:hover_&]:rotate-[180deg]" />
          </Link>

          <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label={t("menu")}>
            {nav.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                aria-current={n.active ? "page" : undefined}
                className="group relative px-3 py-2 text-[15px] font-medium"
              >
                {t(n.key)}
                {n.key === "navCompare" && ids.length > 0 && (
                  <span className="tnum ms-1.5 inline-grid size-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-ink">
                    {ids.length}
                  </span>
                )}
                <span
                  className={clsx(
                    "absolute inset-x-3 -bottom-0.5 h-[2px] ltr:origin-left rtl:origin-right bg-accent transition-transform duration-500 ease-out-expo",
                    n.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1">
            <LangToggle className="hover:bg-ink/10" />
            <ThemeToggle className="hover:bg-ink/10" />
            <a
              href={telHref(brand.mainPhone)}
              className="ms-2 hidden items-center gap-2 rounded-ctl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <Phone className="size-4" />
              <span className="tnum" dir="ltr">
                {brand.mainPhone}
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full hover:bg-ink/10 lg:hidden"
              aria-label={t("menu")}
              aria-expanded={open}
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
            className="fixed inset-0 z-[70] flex flex-col bg-alt text-alt-ink"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-[72px] items-center justify-between px-4">
              <Logo className="text-[26px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full hover:bg-alt-ink/10"
                aria-label={t("close")}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {nav.map((n, i) => (
                <motion.div
                  key={n.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={n.href} className="block py-2 font-display text-5xl font-bold tracking-[-0.02em]">
                    {t(n.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-24">
              <a href={telHref(brand.mainPhone)} className="tnum text-2xl font-semibold" dir="ltr">
                {brand.mainPhone}
              </a>
            </div>
            <Wheel className="pointer-events-none absolute -bottom-40 -start-40 size-[420px] animate-[spin_40s_linear_infinite] opacity-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function FaiyumFooter() {
  const { t, pick, lang } = useLang();
  const nav = useNav();
  return (
    <footer className="relative overflow-hidden bg-alt pb-28 pt-20 text-alt-ink">
      <Wheel className="pointer-events-none absolute -end-48 -top-48 size-[560px] opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-script text-6xl leading-none text-alt-ink md:text-7xl" lang="ar">
            {brand.taglineAr}
          </p>
          <p className="mt-6 max-w-sm text-lg opacity-80">{lang === "ar" ? brand.signoffAr : brand.signoffEn}</p>
          <div className="mt-8 flex gap-2">
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-alt-ink/25 transition-colors hover:bg-alt-ink hover:text-alt">
              <Facebook className="size-5" />
            </a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-alt-ink/25 transition-colors hover:bg-alt-ink hover:text-alt">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-semibold opacity-60">{t("salesperson")}</h2>
          <ul className="space-y-3">
            {salespeople.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4">
                <span>{pick({ ar: s.nameAr, en: s.nameEn })}</span>
                <span className="flex items-center gap-3">
                  <a className="tnum underline-offset-4 hover:underline" dir="ltr" href={telHref(s.phone)}>
                    {s.phone}
                  </a>
                  <a className="text-sm opacity-70 hover:opacity-100" href={waHref(s.phone)} target="_blank" rel="noreferrer">
                    {t("whatsapp")}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-semibold opacity-60">{t("visitUs")}</h2>
          <p className="flex gap-2 leading-relaxed">
            <MapPin className="mt-1 size-4 shrink-0" />
            {lang === "ar" ? brand.addressAr : brand.addressEn}
          </p>
          <p className="mt-2 opacity-70">{t("openAlways")}</p>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm opacity-80">
            {nav.map((n) => (
              <Link key={n.key} href={n.href} className="hover:underline">
                {t(n.key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <p className="relative mx-auto mt-16 max-w-[1440px] px-4 text-xs opacity-50 md:px-8">
        © 2026 AUTO DOHA. {t("pricesNote")}
      </p>
    </footer>
  );
}
