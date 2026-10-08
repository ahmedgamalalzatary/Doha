"use client";

import { useId, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { downPaymentAmount, monthlyInstallment } from "@/lib/finance";

const TERMS = [12, 24, 36, 48, 60];

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [mv, value]);
  return <motion.span className="tnum">{text}</motion.span>;
}

export function InstallmentCalculator({
  price,
  className,
  compact = false,
}: {
  price: number;
  className?: string;
  compact?: boolean;
}) {
  const { t, price: fmt, lang } = useLang();
  const [down, setDown] = useState(30);
  const [months, setMonths] = useState(36);
  const id = useId();
  const monthly = monthlyInstallment(price, down, months);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <div>
        <p className="text-sm text-muted">{t("monthly")}</p>
        <p className={clsx("font-display font-bold tracking-[-0.02em]", compact ? "text-3xl" : "text-4xl md:text-5xl")}>
          <AnimatedNumber value={monthly} format={fmt} />
          <span className="ms-2 text-base font-medium text-muted">{t("perMonth")}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <label htmlFor={`${id}-down`} className="font-medium">
            {t("downPayment")} <span className="tnum text-muted">{down}%</span>
          </label>
          <span className="tnum text-muted">{fmt(downPaymentAmount(price, down))}</span>
        </div>
        <input
          id={`${id}-down`}
          type="range"
          min={10}
          max={70}
          step={5}
          value={down}
          onChange={(e) => setDown(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium">{t("months")}</legend>
        <div className="grid grid-cols-5 gap-1.5">
          {TERMS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              aria-pressed={months === m}
              className={clsx(
                "tnum relative rounded-ctl border py-2 text-sm font-semibold transition-colors",
                months === m ? "border-transparent text-accent-ink" : "border-line hover:border-ink/40",
              )}
            >
              {months === m && (
                <motion.span
                  layoutId={`${id}-term`}
                  className="absolute inset-0 rounded-ctl bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative">{m}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">{lang === "ar" ? "بالشهور" : "in months"}</p>
      </fieldset>

      <p className="text-xs leading-relaxed text-muted">{t("financeNote")}</p>
    </div>
  );
}
