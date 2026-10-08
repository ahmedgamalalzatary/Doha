"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X, MapPin, Clock } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/shared/logo";
import { LangToggle, ThemeToggle } from "@/components/shared/toggles";
import { useLockScroll, useNav, useScrolled } from "@/components/shared/nav";
import { FacebookIcon, InstagramIcon } from "@/components/shared/brand-icons";
import { useLang } from "@/lib/i18n";
import { useCompare } from "@/lib/compare";
import { brand, salespeople, telHref } from "@/data/brand";
import { useHref } from "@/lib/use-variant";

export function ClassicHeader() {
  const nav = useNav();
  const { t, dir, lang } = useLang();
  const { ids } = useCompare();
  const scrolled = useScrolled(8);
  const from = dir === "rtl" ? "-100%" : "100%";
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const href = useHref();
  useLockScroll(open);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={clsx("sticky top-0 z-50 bg-surface transition-shadow duration-300", scrolled && "shadow-[0_6px_24px_-12px_rgba(15,26,43,0.25)]")}>
      <div className="hidden border-b border-line bg-alt text-alt-ink md:block">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center gap-6 px-6 text-[13px] opacity-90">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {lang === "ar" ? "الفيوم، دلة، شارع مدرسة الزراعة" : "Dala, Faiyum"}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {t("openAlways")}
          </span>
          <span className="ms-auto flex items-center gap-3">
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70">
              <FacebookIcon className="size-4" />
            </a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70">
              <InstagramIcon className="size-4" />
            </a>
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-8 px-4 md:px-6">
        <Link href={href()} className="text-[24px] text-ink">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("menu")}>
          {nav.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={n.active ? "page" : undefined}
              className={clsx(
                "rounded-ctl px-4 py-2 text-[15px] font-medium transition-colors",
                n.active ? "bg-bg-2 text-ink" : "text-muted hover:bg-bg-2 hover:text-ink",
              )}
            >
              {t(n.key)}
              {n.key === "navCompare" && ids.length > 0 && (
                <span className="tnum ms-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-bold text-accent-ink">{ids.length}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <LangToggle className="text-muted hover:bg-bg-2 hover:text-ink" />
          <ThemeToggle className="text-muted hover:bg-bg-2 hover:text-ink" />
          <a
            href={telHref(brand.mainPhone)}
            className="ms-2 hidden h-11 items-center gap-2 rounded-ctl bg-accent px-5 text-sm font-bold text-accent-ink shadow-[0_8px_20px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <Phone className="size-4" />
            {t("callNow")}
          </a>
          <button type="button" onClick={() => setOpen(true)} aria-label={t("menu")} aria-expanded={open} className="grid size-10 place-items-center rounded-ctl hover:bg-bg-2 lg:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[69] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t("menu")}
              className="fixed inset-y-0 end-0 z-[70] flex w-[82vw] max-w-sm flex-col bg-surface p-5 shadow-2xl"
              initial={{ x: from }}
              animate={{ x: 0 }}
              exit={{ x: from }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div className="flex items-center justify-between">
                <Logo className="text-[22px]" />
                <button type="button" onClick={() => setOpen(false)} aria-label={t("close")} className="grid size-10 place-items-center rounded-ctl hover:bg-bg-2">
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link key={n.key} href={n.href} className={clsx("rounded-ctl px-4 py-3 text-lg font-medium", n.active ? "bg-bg-2" : "hover:bg-bg-2")}>
                    {t(n.key)}
                  </Link>
                ))}
              </nav>
              <a href={telHref(brand.mainPhone)} className="mt-auto mb-20 inline-flex h-12 items-center justify-center gap-2 rounded-ctl bg-accent font-bold text-accent-ink">
                <Phone className="size-4" />
                {t("callNow")}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ClassicFooter() {
  const { t, pick, lang } = useLang();
  const nav = useNav();
  return (
    <footer className="bg-[#0b1322] pb-28 pt-16 text-[#dfe5ee]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Logo className="text-[30px] text-white" />
          <p className="mt-4 max-w-[40ch] text-[#9fabbd]">{lang === "ar" ? brand.mottoAr : brand.mottoEn}. {lang === "ar" ? brand.signoffAr : brand.signoffEn}.</p>
          <p className="mt-6 flex max-w-[40ch] gap-2 text-sm text-[#9fabbd]">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {lang === "ar" ? brand.addressAr : brand.addressEn}
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-bold text-white">{t("salesperson")}</h2>
          <ul className="space-y-2 text-sm">
            {salespeople.map((s) => (
              <li key={s.id} className="flex justify-between gap-3">
                <span className="text-[#9fabbd]">{pick({ ar: s.nameAr, en: s.nameEn })}</span>
                <a href={telHref(s.phone)} dir="ltr" className="tnum hover:text-white">
                  {s.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <h2 className="mb-2 font-bold text-white">{t("menu")}</h2>
          {nav.map((n) => (
            <Link key={n.key} href={n.href} className="text-[#9fabbd] hover:text-white">
              {t(n.key)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-white/10 px-4 pt-6 text-xs text-[#7d8aa0] md:px-6">
        © 2026 AUTO DOHA. {t("pricesNote")}
      </div>
    </footer>
  );
}
