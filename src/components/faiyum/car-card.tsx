"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { Car } from "@/data/cars";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { CompareButton } from "@/components/shared/compare-button";
import { monthlyInstallment } from "@/lib/finance";

export function FaiyumCarCard({ car, priority = false, className }: { car: Car; priority?: boolean; className?: string }) {
  const { pick, price, km, t } = useLang();
  const href = useHref();
  return (
    <article className={clsx("group relative flex flex-col bg-surface", "rounded-card", className)}>
      <Link href={href(`/cars/${car.id}`)} className="absolute inset-0 z-10" aria-label={`${car.make} ${car.model} ${car.year}`} />
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-bg-3">
        <Image
          src={car.images[0]}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <span
          dir="ltr"
          className="tnum absolute start-2 top-2 rounded-[3px] bg-plate px-2 py-1 font-[family-name:var(--font-kufi)] text-[11px] font-bold tracking-[0.14em] text-[#d8b25c]"
        >
          {car.code}
        </span>
        {car.real && (
          <span className="absolute end-2 top-2 rounded-[3px] bg-accent px-2 py-1 text-[11px] font-semibold text-accent-ink">
            {t("realCar")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg font-bold leading-tight tracking-[-0.01em]">
          <span dir="ltr">
            {car.make} {car.model}
          </span>
        </h3>
        <p className="text-sm text-muted">
          <span className="tnum">{car.year}</span> — {pick(car.trim)} — <span className="tnum">{km(car.km)}</span>
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="tnum font-display text-lg font-bold text-accent">{price(car.price)}</p>
            <p className="tnum text-xs text-muted">
              {t("from")} {price(monthlyInstallment(car.price, 30, 60))} {t("perMonth")}
            </p>
          </div>
          <CompareButton
            id={car.id}
            iconOnly
            className="relative z-20 grid size-9 place-items-center rounded-full border border-line hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-ink"
          />
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-center scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
    </article>
  );
}
