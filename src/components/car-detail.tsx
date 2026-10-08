"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronDown, Expand, MessageCircle, Phone, X, Check } from "lucide-react";
import clsx from "clsx";
import { cars, credits, featureGroupLabel, getCar, type Car } from "@/data/cars";
import { salespeople, telHref, waHref } from "@/data/brand";
import { useLang } from "@/lib/i18n";
import { useHref, useVariant } from "@/lib/use-variant";
import { monthlyInstallment } from "@/lib/finance";
import { InstallmentCalculator } from "@/components/shared/installment-calculator";
import { CompareButton } from "@/components/shared/compare-button";
import { useLockScroll } from "@/components/shared/nav";
import { FaiyumCarCard } from "@/components/faiyum/car-card";
import { ShowroomCarCard } from "@/components/showroom/car-card";
import { ClassicCarCard } from "@/components/classic/car-card";

const EASE = [0.16, 1, 0.3, 1] as const;

function Lightbox({ car, index, onClose, onIndex }: { car: Car; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const { dir, t } = useLang();
  const n = car.images.length;
  useLockScroll(true);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      const fwd = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
      const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) onIndex((index + 1) % n);
      if (e.key === back) onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [dir, index, n, onClose, onIndex]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${car.make} ${car.model}`}
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between p-4">
        <span className="tnum text-sm text-white/70" dir="ltr">
          {index + 1} / {n}
        </span>
        <button type="button" onClick={onClose} autoFocus aria-label={t("close")} className="grid size-11 place-items-center rounded-full hover:bg-white/10">
          <X className="size-6" />
        </button>
      </div>
      <div className="relative flex-1">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const dx = info.offset.x * (dir === "rtl" ? -1 : 1);
              if (dx < -60) onIndex((index + 1) % n);
              if (dx > 60) onIndex((index - 1 + n) % n);
            }}
          >
            <Image src={car.images[index]} alt="" fill sizes="100vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 overflow-x-auto p-4 pb-24">
        {car.images.map((src, i) => (
          <button key={src} type="button" onClick={() => onIndex(i)} aria-label={`${i + 1}`} className={clsx("relative size-16 shrink-0 overflow-hidden rounded-md transition-opacity", i === index ? "ring-2 ring-white" : "opacity-50 hover:opacity-100")}>
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Gallery({ car }: { car: Car }) {
  const v = useVariant();
  const { dir, lang } = useLang();
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = car.images.length;
  const Prev = dir === "rtl" ? ArrowRight : ArrowLeft;
  const Next = dir === "rtl" ? ArrowLeft : ArrowRight;
  const setIndex = useCallback((x: number) => setI(x), []);

  return (
    <div>
      <div className={clsx("group relative aspect-[4/3] overflow-hidden bg-bg-3", v === "classic" ? "rounded-card" : v === "faiyum" ? "rounded-card" : "")}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={v === "showroom" ? { clipPath: dir === "rtl" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" } : { opacity: 0 }}
            animate={v === "showroom" ? { clipPath: "inset(0 0% 0 0)" } : { opacity: 1 }}
            exit={{ opacity: 0.999 }}
            transition={{ duration: v === "showroom" ? 0.9 : 0.5, ease: EASE }}
          >
            <Image src={car.images[i]} alt={`${car.make} ${car.model}, ${lang === "ar" ? "صورة" : "photo"} ${i + 1}`} fill priority={i === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={() => setOpen(true)} className="absolute inset-0 z-10 cursor-zoom-in" aria-label={lang === "ar" ? "عرض الصور بحجم كامل" : "View photos full screen"} />
        <span className="pointer-events-none absolute end-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
          <Expand className="size-3.5" />
          <span className="tnum">{n}</span>
        </span>
        {n > 1 && (
          <div className="absolute bottom-3 end-3 z-20 flex gap-2">
            <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label={lang === "ar" ? "الصورة السابقة" : "Previous photo"} className="grid size-11 place-items-center rounded-full bg-white/90 text-black shadow transition-transform hover:scale-105">
              <Prev className="size-5" />
            </button>
            <button type="button" onClick={() => setI((i + 1) % n)} aria-label={lang === "ar" ? "الصورة التالية" : "Next photo"} className="grid size-11 place-items-center rounded-full bg-white/90 text-black shadow transition-transform hover:scale-105">
              <Next className="size-5" />
            </button>
          </div>
        )}
      </div>
      {n > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" data-lenis-prevent>
          {car.images.map((src, x) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(x)}
              aria-label={`${x + 1}`}
              aria-current={x === i}
              className={clsx("relative aspect-[4/3] w-24 shrink-0 overflow-hidden bg-bg-3 transition-opacity md:w-28", v !== "showroom" && "rounded-[6px]", x === i ? "opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-60 hover:opacity-100")}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <AnimatePresence>{open && <Lightbox car={car} index={i} onIndex={setIndex} onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}

function Features({ car }: { car: Car }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<string>(car.features[0]?.group ?? "");
  return (
    <section>
      <h2 className="font-display text-2xl font-bold md:text-3xl">{t("features")}</h2>
      <div className="mt-5 divide-y divide-line border-y border-line">
        {car.features.map((g) => {
          const isOpen = open === g.group;
          const items = lang === "ar" ? g.ar : g.en;
          return (
            <div key={g.group}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : g.group)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-start text-lg font-semibold"
              >
                <span>
                  {featureGroupLabel[g.group][lang]} <span className="tnum ms-1 text-sm font-normal text-muted">{items.length}</span>
                </span>
                <ChevronDown className={clsx("size-5 transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                    <ul className="grid gap-x-6 gap-y-2.5 pb-5 sm:grid-cols-2">
                      {items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[15px]">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DetailInner({ car }: { car: Car }) {
  const v = useVariant();
  const { t, pick, price, km, lang, dir } = useLang();
  const href = useHref();
  const seller = salespeople.find((s) => s.id === car.salesperson) ?? salespeople[0];
  const sellerName = pick({ ar: seller.nameAr, en: seller.nameEn });
  const msg = `${lang === "ar" ? "السلام عليكم، مهتم بـ" : "Hello, I'm interested in"} ${car.make} ${car.model} ${car.year} (${car.code})`;
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;
  const similar = cars.filter((c) => c.id !== car.id && c.body === car.body).slice(0, 3);
  const Card = v === "faiyum" ? FaiyumCarCard : v === "showroom" ? ShowroomCarCard : ClassicCarCard;
  const credit = car.credit ? credits[car.credit] : null;

  const specs: [string, React.ReactNode][] = [
    [t("year"), <span key="y" className="tnum">{car.year}</span>],
    [t("mileage"), <span key="k" className="tnum">{km(car.km)}</span>],
    [t("trim"), pick(car.trim)],
    [t("engine"), <span key="e" dir="ltr">{car.engine}</span>],
    [t("gearbox"), pick(car.gearbox)],
    [
      t("color"),
      <span key="c" className="inline-flex items-center gap-2">
        <span className="size-4 rounded-full ring-1 ring-line" style={{ background: car.color.hex }} />
        {pick(car.color)}
      </span>,
    ],
    [t("body"), t(car.body)],
    [t("condition"), pick(car.condition)],
  ];

  const wrap = v === "showroom" ? "max-w-[1480px] md:px-10" : v === "classic" ? "max-w-[1280px] md:px-6" : "max-w-[1440px] md:px-8";
  const btnSolid =
    v === "showroom"
      ? "bg-ink text-bg hover:bg-accent hover:text-accent-ink"
      : "rounded-ctl bg-accent text-accent-ink hover:-translate-y-0.5";
  const btnLine = v === "showroom" ? "border border-line hover:border-ink" : "rounded-ctl border border-line hover:border-ink";

  return (
    <div
      style={{ ["--paint" as string]: car.color.hex }}
      className={clsx(v === "faiyum" && "bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--paint)_38%,var(--bg))_0,color-mix(in_oklab,var(--paint)_38%,var(--bg))_420px,var(--bg)_420px)]")}
    >
      <div className={clsx("mx-auto px-4 pb-24 pt-8", wrap)}>
        <Link href={href("/cars")} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
          <Back className="size-4" />
          {t("allCars")}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="min-w-0">
            <Gallery car={car} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className={clsx(v === "classic" && "rounded-card border border-line bg-surface p-6 shadow-[0_20px_50px_-30px_rgba(15,26,43,0.35)]")}>
              <div className="flex flex-wrap items-center gap-2">
                <span dir="ltr" className="rounded-[3px] bg-[#050505] px-2.5 py-1 font-[family-name:var(--font-kufi)] text-xs font-bold tracking-[0.16em] text-[#d8b25c] shadow-[inset_0_0_0_1px_#d8b25c]">
                  {car.code}
                </span>
                <span className={clsx("rounded-full px-2.5 py-1 text-xs font-semibold", car.real ? "bg-accent text-accent-ink" : "bg-bg-3 text-muted")}>
                  {car.real ? t("realCar") : t("demoCar")}
                </span>
              </div>
              <h1 className={clsx("mt-4 font-display leading-[1.05] tracking-[-0.02em]", v === "showroom" ? "text-[clamp(2.4rem,4vw,3.6rem)]" : "text-[clamp(2.2rem,3.6vw,3.2rem)] font-extrabold")}>
                <span dir="ltr">
                  {car.make} {car.model}
                </span>
              </h1>
              <p className="mt-2 text-lg text-muted">
                <span className="tnum">{car.year}</span> — {pick(car.trim)} — <span className="tnum">{km(car.km)}</span>
              </p>

              <div className="mt-6 border-t border-line pt-6">
                <p className="tnum font-display text-4xl font-bold text-accent">{price(car.price)}</p>
                <p className="tnum mt-1 text-muted">
                  {t("from")} {price(monthlyInstallment(car.price, 30, 60))} {t("perMonth")}
                </p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {car.highlights.map((h) => (
                  <li key={h.en} className={clsx("border border-line px-3 py-1.5 text-sm", v === "showroom" ? "" : "rounded-full")}>
                    {pick(h)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={waHref(seller.phone, msg)} target="_blank" rel="noreferrer" className={clsx("inline-flex h-[52px] items-center justify-center gap-2 font-semibold transition", btnSolid)}>
                  <MessageCircle className="size-5" />
                  {t("whatsapp")} {sellerName}
                </a>
                <a href={telHref(seller.phone)} className={clsx("inline-flex h-[52px] items-center justify-center gap-2 font-semibold transition-colors", btnLine)}>
                  <Phone className="size-5" />
                  <span className="tnum" dir="ltr">
                    {seller.phone}
                  </span>
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="text-muted">
                  {t("salesperson")}: <span className="font-medium text-ink">{sellerName}</span>
                </span>
                <CompareButton id={car.id} className="text-ink hover:text-accent aria-pressed:text-accent" />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex flex-col gap-14">
            <section>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{t("specs")}</h2>
              <dl className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                {specs.map(([k, val]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-end font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <Features car={car} />
          </div>
          <section className={clsx("self-start p-6 md:p-8", v === "classic" ? "rounded-card bg-bg-2" : v === "showroom" ? "bg-bg-2" : "rounded-card bg-surface")}>
            <h2 className="font-display text-2xl font-bold">{t("installments")}</h2>
            <InstallmentCalculator price={car.price} className="mt-6" />
            <a href={waHref(seller.phone, `${msg}. ${t("askInstallment")}`)} target="_blank" rel="noreferrer" className={clsx("mt-6 inline-flex h-12 w-full items-center justify-center gap-2 font-semibold transition", btnLine)}>
              <MessageCircle className="size-4" />
              {t("askInstallment")}
            </a>
          </section>
        </div>

        {credit && (
          <p className="mt-10 text-xs text-muted">
            {t("photoCredit")}:{" "}
            <a href={credit.source} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              {credit.author}
            </a>
            , {credit.license}, Wikimedia Commons. {t("demoCar")}.
          </p>
        )}

        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold md:text-3xl">{t("similar")}</h2>
            <div className={clsx("mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
              {similar.map((c) => (
                <Card key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const car = getCar(id);
  if (!car) notFound();
  return <DetailInner key={car.id} car={car} />;
}
