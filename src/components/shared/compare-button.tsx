"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import clsx from "clsx";
import { useCompare } from "@/lib/compare";
import { useLang } from "@/lib/i18n";

export function CompareButton({ id, className, iconOnly = false }: { id: string; className?: string; iconOnly?: boolean }) {
  const { has, toggle } = useCompare();
  const { t } = useLang();
  const [msg, setMsg] = useState<string | null>(null);
  const active = has(id);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-pressed={active}
        aria-label={iconOnly ? (active ? t("inCompare") : t("addCompare")) : undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const r = toggle(id);
          if (r === "full") {
            setMsg(t("compareFull"));
            setTimeout(() => setMsg(null), 2200);
          }
        }}
        className={clsx("inline-flex items-center gap-1.5 text-sm font-semibold transition-colors", className)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active ? "y" : "n"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {active ? <Check className="size-4" /> : <Plus className="size-4" />}
          </motion.span>
        </AnimatePresence>
        {!iconOnly && <span>{active ? t("inCompare") : t("addCompare")}</span>}
      </button>
      <AnimatePresence>
        {msg && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full start-0 z-20 mb-2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-xs text-bg"
          >
            {msg}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
