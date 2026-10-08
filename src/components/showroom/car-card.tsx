"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { Car } from "@/data/cars";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { CompareButton } from "@/components/shared/compare-button";

export function ShowroomCarCard({ car, className, tall = false }: { car: Car; className?: string; tall?: boolean }) {
  const { pick, price, km, t } = useLang();
  const href = useHref();
  return (
    <article className={clsx("group relative", className)}>
      <Link href={href(`/cars/${car.id}`)} className="absolute inset-0 z-10" aria-label={`${car.make} ${car.model} ${car.year}`} />
      <div className={clsx("relative overflow-hidden bg-bg-3", tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
        <Image
          src={car.images[0]}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-[transform,filter] duration-[1.4s] ease-out-expo group-hover:scale-[1.04] group-hover:brightness-[1.06]"
        />
        {/* a strip of the LED ceiling passing over the paint */}
        <span className="pointer-events-none absolute inset-y-[-20%] -start-1/3 w-[18%] [--sweep:900%] rtl:[--sweep:-900%] bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 mix-blend-screen group-hover:animate-[sweep_1.1s_cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-16 text-white">
          <span
            dir="ltr"
            className="rounded-[2px] bg-black px-2 py-1 font-display text-[11px] font-bold tracking-[0.16em] text-[#d8b25c] shadow-[inset_0_0_0_1px_#d8b25c]"
          >
            {car.code}
          </span>
          {car.real && <span className="text-xs text-white/85">{t("realCar")}</span>}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="font-display text-xl leading-tight">
            <span dir="ltr">
              {car.make} {car.model}
            </span>
          </h3>
          <p className="mt-1 text-sm text-muted">
            <span className="tnum">{car.year}</span> / {pick(car.trim)} / <span className="tnum">{km(car.km)}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="tnum whitespace-nowrap font-medium">{price(car.price)}</p>
          <CompareButton id={car.id} className="relative z-20 text-xs text-muted hover:text-ink aria-pressed:text-accent" />
        </div>
      </div>
    </article>
  );
}
