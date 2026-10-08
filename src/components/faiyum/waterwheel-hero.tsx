"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { cars, type Car } from "@/data/cars";
import { brand, salespeople, waHref } from "@/data/brand";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { monthlyInstallment } from "@/lib/finance";
import { Wheel } from "@/components/shared/logo";

const N = cars.length;
const STEP = 360 / N;
const EASE = [0.16, 1, 0.3, 1] as const;

function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

/** The sāqiya: Faiyum's waterwheel, carrying the stock like clay pots. */
function WheelArt() {
  return (
    <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full text-ink" aria-hidden="true">
      <circle cx="500" cy="500" r="430" fill="none" stroke="currentColor" strokeWidth="14" />
      <circle cx="500" cy="500" r="392" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.55" />
      <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeDasharray="2 14" />
      {Array.from({ length: N }).map((_, i) => (
        <g key={i} transform={`rotate(${i * STEP} 500 500)`}>
          <line x1="500" y1="500" x2="500" y2="70" stroke="currentColor" strokeWidth="7" />
          <line x1="500" y1="160" x2={500 + Math.sin((STEP * Math.PI) / 180) * 340} y2={500 - Math.cos((STEP * Math.PI) / 180) * 340} stroke="currentColor" strokeWidth="2" opacity="0.4" />
          {/* paddle */}
          <rect x="484" y="52" width="32" height="56" rx="3" fill="currentColor" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

function Bucket({ car, index, rot, active, onSelect }: { car: Car; index: number; rot: MotionValue<number>; active: boolean; onSelect: () => void }) {
  const counter = useTransform(rot, (r) => -(r + index * STEP));
  return (
    <div
      className="absolute left-1/2 top-1/2 size-0"
      style={{ transform: `rotate(${index * STEP}deg) translateY(calc(var(--D) * -0.43))` }}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        tabIndex={-1}
        aria-hidden="true"
        style={{ rotate: counter }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: active ? 1.45 : 1, opacity: 1 }}
        transition={{ scale: { type: "spring", stiffness: 260, damping: 24 }, opacity: { delay: 0.5 + index * 0.05 } }}
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <span
          className="block overflow-hidden rounded-full border-[3px] bg-bg-3 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] transition-[border-color] duration-500"
          style={{
            width: "calc(var(--D) * 0.13)",
            height: "calc(var(--D) * 0.13)",
            borderColor: active ? "var(--accent)" : "var(--ink)",
          }}
        >
          <Image src={car.images[0]} alt="" width={240} height={240} className="size-full object-cover" />
        </span>
      </motion.button>
    </div>
  );
}

export function WaterwheelHero() {
  const { t, pick, price, km, lang, dir } = useLang();
  const href = useHref();
  const reduce = useReducedMotion();
  const mobile = useMedia("(max-width: 1023px)");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const turns = useRef(0);

  // Where the featured bucket rests: toward the copy on desktop, the top on phones.
  const rest = mobile ? 0 : dir === "rtl" ? 30 : -30;
  const target = useMotionValue(rest - 140);
  const rot = useSpring(target, { stiffness: 38, damping: 14, mass: 1.1 });

  useEffect(() => {
    target.set(rest - turns.current * STEP);
  }, [rest, target]);

  const go = useCallback(
    (delta: number) => {
      turns.current += delta;
      setActive((a) => (((a + delta) % N) + N) % N);
      target.set(rest - turns.current * STEP);
    },
    [rest, target],
  );

  const select = (i: number) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    if (d) go(d);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, 4800);
    return () => clearInterval(id);
  }, [go, paused, reduce]);

  const car = cars[active];
  const seller = salespeople.find((s) => s.id === car.salesperson) ?? salespeople[0];
  const Prev = dir === "rtl" ? ArrowRight : ArrowLeft;
  const Next = dir === "rtl" ? ArrowLeft : ArrowRight;

  const stage = (
    <>
        {/* The wheel */}
        <motion.div
          className="absolute [--D:min(112vw,600px)] lg:[--D:min(118vh,1120px)]"
          style={{
            width: "var(--D)",
            height: "var(--D)",
            insetInlineEnd: mobile ? "calc(50% - var(--D) / 2)" : "calc(var(--D) * -0.3)",
            bottom: mobile ? "calc(var(--D) * -0.36)" : "calc(var(--D) * -0.38)",
          }}
          onPanEnd={(_, info) => {
            const dx = info.offset.x * (dir === "rtl" ? -1 : 1);
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          <motion.div className="absolute inset-0" style={{ rotate: rot }}>
            <WheelArt />
            <div className="absolute left-1/2 top-1/2 grid size-[16%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg text-ink">
              <Wheel className="size-[78%]" spokes={5} />
            </div>
            {cars.map((c, i) => (
              <Bucket key={c.id} car={c} index={i} rot={rot} active={i === active} onSelect={() => select(i)} />
            ))}
          </motion.div>
        </motion.div>

        {/* Lake Qarun: the wheel turns in it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] bg-alt/92 lg:h-[19svh]">
          <div className="absolute inset-x-0 top-0 h-px bg-alt-ink/30" />
          <div className="absolute inset-x-0 top-4 flex overflow-hidden text-alt-ink/70" dir="ltr">
            <div className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-10 pe-10 font-display text-sm tracking-[0.02em]">
              {[...cars, ...cars].map((c, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                  {c.make} {c.model} {c.year}
                  <Wheel className="size-3 opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </div>
    </>
  );

  return (
    <section
      className="relative -mt-[72px] min-h-[100svh] overflow-hidden pt-[72px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={lang === "ar" ? "العربيات على الساقية" : "Cars on the waterwheel"}
    >
      {!mobile && stage}

      {/* Copy */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-4 pb-24 pt-6 md:px-8 lg:min-h-[calc(100svh-72px)] lg:justify-center lg:pb-[22svh] lg:pt-0">
        <div className="max-w-[640px]">
          <motion.p
            lang="ar"
            className="font-script text-[clamp(4.2rem,10vw,8.6rem)] leading-[1.05] text-accent"
            initial={{ clipPath: dir === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
          >
            {brand.taglineAr}
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3.25rem)] font-extrabold leading-[1.15] tracking-[-0.02em] [text-wrap:balance]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          >
            {lang === "ar" ? "مملكة كسر الزيرو الحقيقي، في قلب الفيوم" : "Truly like-new cars, in the heart of Faiyum"}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          >
            {lang === "ar"
              ? "عربيات مستعملة بحالة الزيرو، العداد الحقيقي في كل إعلان، وصيانات لآخر كيلو. لف الساقية واختار عربيتك."
              : "Used cars in showroom condition, honest mileage on every listing, serviced to the last kilometre. Turn the wheel and pick yours."}
          </motion.p>

          {mobile && <div className="relative -mx-4 mt-4 h-[min(80vw,450px)] overflow-hidden">{stage}</div>}

          {/* Featured bucket readout */}
          <motion.div
            className="mt-8 border-t border-line pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="flex items-start justify-between gap-6">
              <div aria-live="polite" className="min-h-[124px] min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight tracking-[-0.02em]">
                      <span dir="ltr">
                        {car.make} {car.model}
                      </span>{" "}
                      <span className="tnum font-medium text-muted">{car.year}</span>
                    </p>
                    <p className="mt-1 text-muted">
                      {pick(car.trim)} — <span className="tnum">{km(car.km)}</span> — {pick(car.color)}
                    </p>
                    <p className="tnum mt-3 text-xl font-bold text-accent">
                      {price(car.price)}
                      <span className="ms-3 text-sm font-medium text-muted">
                        {t("from")} {price(monthlyInstallment(car.price, 30, 60))} {t("perMonth")}
                      </span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={() => go(-1)} aria-label={lang === "ar" ? "العربية السابقة" : "Previous car"} className="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-bg">
                  <Prev className="size-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={lang === "ar" ? "العربية التالية" : "Next car"} className="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-bg">
                  <Next className="size-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={href(`/cars/${car.id}`)}
                className="inline-flex items-center gap-2 rounded-ctl bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                {t("viewCar")}
                <Next className="size-4" />
              </Link>
              <a
                href={waHref(seller.phone, `${lang === "ar" ? "مهتم بـ" : "Interested in"} ${car.make} ${car.model} ${car.year} (${car.code})`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-ctl border border-ink/30 px-5 py-3.5 font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                <MessageCircle className="size-4" />
                {t("whatsapp")} {pick({ ar: seller.nameAr, en: seller.nameEn })}
              </a>
              <span className="tnum ms-auto text-sm text-muted" dir="ltr">
                {String(active + 1).padStart(2, "0")} / {N}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
