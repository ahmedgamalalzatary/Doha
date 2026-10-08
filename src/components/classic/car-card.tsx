"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Calendar, Gauge, Cog } from "lucide-react";
import type { Car } from "@/data/cars";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { CompareButton } from "@/components/shared/compare-button";
import { monthlyInstallment } from "@/lib/finance";

export function ClassicCarCard({ car, className }: { car: Car; className?: string }) {
  const { pick, price, km, t } = useLang();
  const href = useHref();
  return (
    <article
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,26,43,0.35)]",
        className,
      )}
    >
      <Link href={href(`/cars/${car.id}`)} className="absolute inset-0 z-10" aria-label={`${car.make} ${car.model} ${car.year}`} />
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-3">
        <Image
          src={car.images[0]}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute start-3 top-3 flex gap-2">
          {car.real && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-ink">{t("realCar")}</span>}
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-[#0f1a2b]">{t(car.body)}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">
          <span dir="ltr">
            {car.make} {car.model}
          </span>
          <span className="ms-2 text-sm font-medium text-muted">{pick(car.trim)}</span>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <span className="tnum">{car.year}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Gauge className="size-4" />
            <span className="tnum">{km(car.km)}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Cog className="size-4" />
            {car.engine}
          </li>
        </ul>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="tnum text-xl font-extrabold text-accent">{price(car.price)}</p>
            <p className="tnum text-xs text-muted">
              {t("from")} {price(monthlyInstallment(car.price, 30, 60))} {t("perMonth")}
            </p>
          </div>
          <CompareButton
            id={car.id}
            className="relative z-20 rounded-ctl border border-line px-3 py-2 text-xs hover:border-ink aria-pressed:border-accent aria-pressed:text-accent"
          />
        </div>
      </div>
    </article>
  );
}
