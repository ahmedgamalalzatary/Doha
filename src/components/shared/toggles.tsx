"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLang();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={t("theme")}
      title={t("theme")}
      className={clsx("relative grid size-10 place-items-center overflow-hidden rounded-full transition-colors", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {dark ? <Moon className="size-[18px]" strokeWidth={1.8} /> : <Sun className="size-[18px]" strokeWidth={1.8} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function LangToggle({ className }: { className?: string }) {
  const { t, toggle, lang } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      lang={lang === "ar" ? "en" : "ar"}
      className={clsx("h-10 rounded-full px-3 text-sm font-semibold transition-colors", className)}
    >
      {t("language")}
    </button>
  );
}
