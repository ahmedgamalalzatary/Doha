"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import { cars, makes, type Body } from "@/data/cars";
import { useLang } from "@/lib/i18n";
import { useVariant } from "@/lib/use-variant";
import { FaiyumCarCard } from "@/components/faiyum/car-card";
import { ShowroomCarCard } from "@/components/showroom/car-card";
import { ClassicCarCard } from "@/components/classic/car-card";

type Sort = "newest" | "priceLow" | "priceHigh" | "km";
const PRICE_MAX = Math.ceil(Math.max(...cars.map((c) => c.price)) / 100_000) * 100_000;
const PRICE_MIN = Math.floor(Math.min(...cars.map((c) => c.price)) / 100_000) * 100_000;

function useFilters() {
  const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [make, setMake] = useState(sp.get("make") ?? "");
  const [body, setBody] = useState<Body | "">((sp.get("body") as Body) ?? "");
  const [max, setMax] = useState(Number(sp.get("max")) || PRICE_MAX);
  const [sort, setSort] = useState<Sort>("newest");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = cars.filter(
      (c) =>
        (!term || `${c.make} ${c.model}`.toLowerCase().includes(term)) &&
        (!make || c.make === make) &&
        (!body || c.body === body) &&
        c.price <= max,
    );
    const sorters: Record<Sort, (a: (typeof cars)[0], b: (typeof cars)[0]) => number> = {
      newest: (a, b) => b.year - a.year || a.km - b.km,
      priceLow: (a, b) => a.price - b.price,
      priceHigh: (a, b) => b.price - a.price,
      km: (a, b) => a.km - b.km,
    };
    return [...list].sort(sorters[sort]);
  }, [q, make, body, max, sort]);

  const dirty = !!(q || make || body || max < PRICE_MAX);
  const clear = () => {
    setQ("");
    setMake("");
    setBody("");
    setMax(PRICE_MAX);
  };
  return { q, setQ, make, setMake, body, setBody, max, setMax, sort, setSort, results, dirty, clear };
}

type F = ReturnType<typeof useFilters>;

function Controls({ f, stacked = false }: { f: F; stacked?: boolean }) {
  const { t, price } = useLang();
  const field = "h-12 w-full rounded-ctl border border-line bg-surface px-3 text-[15px] text-ink transition-colors focus:border-ink focus:outline-none";
  return (
    <div className={clsx("grid gap-4", stacked ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_auto_1.2fr_1fr]")}>
      <label className="relative flex flex-col gap-1.5 text-sm text-muted">
        <span>{t("search")}</span>
        <Search className="pointer-events-none absolute bottom-3.5 start-3 size-5" />
        <input value={f.q} onChange={(e) => f.setQ(e.target.value)} className={clsx(field, "ps-10")} type="search" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-muted">
        <span>{t("make")}</span>
        <select value={f.make} onChange={(e) => f.setMake(e.target.value)} className={field}>
          <option value="">{t("any")}</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="flex flex-col gap-1.5 text-sm text-muted">
        <legend className="mb-1.5">{t("body")}</legend>
        <div className="flex h-12 rounded-ctl border border-line bg-surface p-1">
          {(["", "suv", "sedan"] as const).map((b) => (
            <button
              key={b || "any"}
              type="button"
              onClick={() => f.setBody(b)}
              aria-pressed={f.body === b}
              className={clsx("relative flex-1 rounded-ctl px-3 text-sm font-medium transition-colors", f.body === b ? "text-accent-ink" : "text-ink hover:bg-bg-2")}
            >
              {f.body === b && <motion.span layoutId={`body-pill-${stacked}`} className="absolute inset-0 rounded-ctl bg-accent" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span className="relative whitespace-nowrap">{b ? t(b) : t("any")}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-1.5 text-sm text-muted">
        <span className="flex justify-between gap-2">
          {t("maxPrice")} <span className="tnum font-medium text-ink">{price(f.max)}</span>
        </span>
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={50_000} value={f.max} onChange={(e) => f.setMax(Number(e.target.value))} className="h-12 w-full" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-muted">
        <span>{t("sortBy")}</span>
        <select value={f.sort} onChange={(e) => f.setSort(e.target.value as Sort)} className={field}>
          <option value="newest">{t("sortNewest")}</option>
          <option value="priceLow">{t("sortPriceLow")}</option>
          <option value="priceHigh">{t("sortPriceHigh")}</option>
          <option value="km">{t("sortKm")}</option>
        </select>
      </label>
    </div>
  );
}

function Results({ f }: { f: F }) {
  const v = useVariant();
  const { t } = useLang();
  const Card = v === "faiyum" ? FaiyumCarCard : v === "showroom" ? ShowroomCarCard : ClassicCarCard;
  const cols =
    v === "faiyum" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" : v === "showroom" ? "sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12" : "sm:grid-cols-2 xl:grid-cols-3 gap-6";

  if (!f.results.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-dashed border-line p-10">
        <p className="max-w-[48ch] text-lg">{t("noResults")}</p>
        <button type="button" onClick={f.clear} className="rounded-ctl bg-accent px-5 py-3 font-semibold text-accent-ink">
          {t("clearFilters")}
        </button>
      </div>
    );
  }

  return (
    <motion.ul layout className={clsx("grid grid-cols-1", cols)}>
      <AnimatePresence mode="popLayout">
        {f.results.map((c) => (
          <motion.li
            key={c.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card car={c} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

function InventoryInner() {
  const v = useVariant();
  const f = useFilters();
  const { t, lang } = useLang();
  const [sheet, setSheet] = useState(false);

  const title = lang === "ar" ? "كل العربيات" : "All cars";
  const count = (
    <p className="tnum text-muted" aria-live="polite">
      {f.results.length} {t("results")}
      {f.dirty && (
        <button type="button" onClick={f.clear} className="ms-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          <X className="size-3.5" />
          {t("clearFilters")}
        </button>
      )}
    </p>
  );

  if (v === "classic") {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.01em]">{title}</h1>
        <div className="mt-2">{count}</div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-card border border-line bg-surface p-5">
              <p className="mb-4 flex items-center gap-2 font-bold">
                <SlidersHorizontal className="size-4" />
                {lang === "ar" ? "فلترة" : "Filters"}
              </p>
              <Controls f={f} stacked />
            </div>
          </aside>
          <div>
            <button type="button" onClick={() => setSheet((s) => !s)} className="mb-6 inline-flex h-11 items-center gap-2 rounded-ctl border border-line px-4 font-semibold lg:hidden" aria-expanded={sheet}>
              <SlidersHorizontal className="size-4" />
              {lang === "ar" ? "فلترة" : "Filters"}
            </button>
            <AnimatePresence initial={false}>
              {sheet && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6 overflow-hidden lg:hidden">
                  <Controls f={f} stacked />
                </motion.div>
              )}
            </AnimatePresence>
            <Results f={f} />
          </div>
        </div>
      </div>
    );
  }

  if (v === "showroom") {
    return (
      <div className="mx-auto max-w-[1480px] px-4 pb-24 pt-14 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none">{title}</h1>
          {count}
        </div>
        <div className="py-8">
          <Controls f={f} />
        </div>
        <Results f={f} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-bg-2">
        <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 md:px-8">
          <h1 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold leading-none tracking-[-0.03em]">{title}</h1>
          <div className="mt-4">{count}</div>
        </div>
      </div>
      <div className="bg-bg-3 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--surface)_60%,transparent)]">
        <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
          <Controls f={f} />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
        <Results f={f} />
      </div>
    </div>
  );
}

export function Inventory() {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <InventoryInner />
    </Suspense>
  );
}
