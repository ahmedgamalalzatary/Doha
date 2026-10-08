"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import clsx from "clsx";
import { cars, getCar, type Car } from "@/data/cars";
import { useCompare } from "@/lib/compare";
import { useLang } from "@/lib/i18n";
import { useHref, useVariant } from "@/lib/use-variant";
import { monthlyInstallment } from "@/lib/finance";

export function CompareView() {
  const v = useVariant();
  const { ids, remove, toggle, full } = useCompare();
  const { t, pick, price, km, lang } = useLang();
  const href = useHref();
  const list = ids.map(getCar).filter(Boolean) as Car[];
  const suggestions = cars.filter((c) => !ids.includes(c.id)).slice(0, 4);

  const best = {
    price: Math.min(...list.map((c) => c.price)),
    km: Math.min(...list.map((c) => c.km)),
    year: Math.max(...list.map((c) => c.year)),
  };

  const rows: { label: string; render: (c: Car) => React.ReactNode; win?: (c: Car) => boolean }[] = [
    { label: t("price"), render: (c) => <span className="tnum font-bold">{price(c.price)}</span>, win: (c) => c.price === best.price },
    { label: t("monthly"), render: (c) => <span className="tnum">{price(monthlyInstallment(c.price, 30, 60))}</span>, win: (c) => c.price === best.price },
    { label: t("year"), render: (c) => <span className="tnum">{c.year}</span>, win: (c) => c.year === best.year },
    { label: t("mileage"), render: (c) => <span className="tnum">{km(c.km)}</span>, win: (c) => c.km === best.km },
    { label: t("trim"), render: (c) => pick(c.trim) },
    { label: t("engine"), render: (c) => <span dir="ltr">{c.engine}</span> },
    { label: t("gearbox"), render: (c) => pick(c.gearbox) },
    { label: t("color"), render: (c) => pick(c.color) },
    { label: t("body"), render: (c) => t(c.body) },
    { label: t("condition"), render: (c) => pick(c.condition) },
  ];

  const wrap = v === "showroom" ? "max-w-[1480px] md:px-10" : v === "classic" ? "max-w-[1280px] md:px-6" : "max-w-[1440px] md:px-8";
  const heading = v === "classic" ? "text-4xl font-extrabold" : v === "showroom" ? "font-display text-[clamp(2.6rem,6vw,5rem)] leading-none" : "font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.03em]";

  return (
    <div className={clsx("mx-auto px-4 pb-28 pt-14", wrap)}>
      <h1 className={heading}>{t("compareTitle")}</h1>
      <p className="mt-3 text-muted">
        {lang === "ar" ? "الأفضل في كل صف معلّم باللون." : "The best value in each row is highlighted."} {t("pricesNote")}
      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-line p-8 md:p-12">
          <p className="max-w-[52ch] text-lg">{t("compareEmpty")}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((c) => (
              <button key={c.id} type="button" onClick={() => toggle(c.id)} className="group flex items-center gap-3 rounded-card border border-line bg-surface p-2 text-start transition-colors hover:border-ink">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-[6px] bg-bg-3">
                  <Image src={c.images[0]} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold" dir="ltr">
                    {c.make} {c.model}
                  </span>
                  <span className="tnum text-sm text-muted">{c.year}</span>
                </span>
                <Plus className="me-2 size-5 text-muted group-hover:text-ink" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-scrollbar mt-10 overflow-x-auto" data-lenis-prevent>
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-start">
            <thead>
              <tr>
                <th className="sticky start-0 z-10 w-[180px] bg-bg" />
                <AnimatePresence initial={false}>
                  {list.map((c) => (
                    <motion.th key={c.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-3 pb-6 align-top font-normal">
                      <div className="relative">
                        <Link href={href(`/cars/${c.id}`)} className="group block">
                          <span className="relative block aspect-[4/3] overflow-hidden rounded-card bg-bg-3">
                            <Image src={c.images[0]} alt="" fill sizes="30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          </span>
                          <span className="mt-3 block text-start font-display text-xl font-bold" dir="ltr">
                            {c.make} {c.model}
                          </span>
                        </Link>
                        <button type="button" onClick={() => remove(c.id)} aria-label={`${t("remove")} ${c.make} ${c.model}`} className="absolute end-2 top-2 grid size-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black">
                          <X className="size-4" />
                        </button>
                      </div>
                    </motion.th>
                  ))}
                </AnimatePresence>
                {!full && (
                  <th className="px-3 pb-6 align-top">
                    <Link href={href("/cars")} className="grid aspect-[4/3] place-items-center rounded-card border border-dashed border-line text-muted transition-colors hover:border-ink hover:text-ink">
                      <span className="flex flex-col items-center gap-2 text-sm font-medium">
                        <Plus className="size-6" />
                        {t("addCompare")}
                      </span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="sticky start-0 z-10 border-t border-line bg-bg py-4 pe-4 text-start text-sm font-medium text-muted">
                    {r.label}
                  </th>
                  {list.map((c) => {
                    const win = list.length > 1 && r.win?.(c);
                    return (
                      <td key={c.id} className={clsx("border-t border-line px-3 py-4 align-top", win && "text-accent")}>
                        {r.render(c)}
                      </td>
                    );
                  })}
                  {!full && <td className="border-t border-line" />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
