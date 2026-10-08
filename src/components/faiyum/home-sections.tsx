"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, MessageCircle, Phone, Repeat } from "lucide-react";
import { cars } from "@/data/cars";
import { brand, salespeople, telHref, waHref } from "@/data/brand";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { monthlyInstallment } from "@/lib/finance";
import { FaiyumCarCard } from "./car-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = new Intl.NumberFormat("en-US").format(Math.round(v))),
    });
    return c.stop;
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat("en-US").format(to)}
    </span>
  );
}

/** Dune strata: each proof is one course of sand. */
export function Strata() {
  const { lang } = useLang();
  const cheapest = [...cars].sort((a, b) => a.price - b.price)[0];
  const rows = [
    {
      n: 42000,
      unit: lang === "ar" ? "كم" : "km",
      title: lang === "ar" ? "العداد زي ما هو" : "The odometer, as it reads",
      body:
        lang === "ar"
          ? "بنكتب العداد الحقيقي في كل إعلان. السبورتاج 2022 اللي في المعرض على 42 ألف كم، وصيانتها متعملة لآخر كيلو مع طقم كاوتش جديد."
          : "Every listing states the real mileage. The 2022 Sportage on the floor reads 42,000 km, serviced to the last kilometre, on a brand-new set of tyres.",
    },
    {
      n: 16000,
      unit: lang === "ar" ? "كم" : "km",
      title: lang === "ar" ? "زيرو بجد" : "Like new, literally",
      body:
        lang === "ar"
          ? "الإلنترا 2026 لسه الاستيكر على الكبوت وبدون خدش. ده اللي بنقصده بكسر الزيرو."
          : "The 2026 Elantra still has its factory film on the bonnet, not a scratch on it. That is what we mean by like-new.",
    },
    {
      n: monthlyInstallment(cheapest.price, 30, 60),
      unit: lang === "ar" ? "ج.م شهرياً" : "EGP / month",
      title: lang === "ar" ? "اعرف القسط قبل ما تتصل" : "Know the instalment before you call",
      body:
        lang === "ar"
          ? `كل عربية في صفحتها حاسبة تقسيط. مثلاً ${cheapest.make} ${cheapest.model} بمقدم 30% على 5 سنين. (حساب توضيحي)`
          : `Every car page has an instalment calculator. Example: ${cheapest.make} ${cheapest.model}, 30% down over 5 years. (Illustrative)`,
    },
    {
      n: salespeople.length,
      unit: lang === "ar" ? "مسؤولين بيع" : "salespeople",
      title: lang === "ar" ? "كلّم حد بالاسم" : "Talk to someone by name",
      body:
        lang === "ar"
          ? "وليد ومصطفى وممدوح وخالد على الواتساب مباشرة. مفيش كول سنتر ومفيش انتظار."
          : "Waleed, Mostafa, Mamdouh and Khaled answer WhatsApp directly. No call centre, no queue.",
    },
  ];

  return (
    <section aria-labelledby="strata-h" className="relative">
      <h2 id="strata-h" className="sr-only">
        {lang === "ar" ? "ليه دوحه موتورز" : "Why AUTO DOHA"}
      </h2>
      {rows.map((r, i) => (
        <div
          key={i}
          className={i % 2 ? "bg-bg-3" : "bg-bg-2"}
          style={{ boxShadow: "inset 0 1px 0 color-mix(in oklab, var(--surface) 60%, transparent)" }}
        >
          <div className="mx-auto grid max-w-[1440px] items-baseline gap-x-12 gap-y-3 px-4 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:px-8 md:py-16">
            <p className="font-display font-extrabold leading-none tracking-[-0.04em]">
              <CountUp to={r.n} className="tnum text-[clamp(3.4rem,8vw,7rem)]" />
              <span className="ms-3 text-lg font-semibold tracking-normal text-muted">{r.unit}</span>
            </p>
            <div className="max-w-[56ch]">
              <h3 className="font-display text-2xl font-bold tracking-[-0.01em]">{r.title}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-muted">{r.body}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

const reel = [
  { src: "/cars/sportage/01.jpg", w: 1536, h: 2048, ar: "سبورتاج 2022 تحت إضاءة المعرض", en: "Sportage 2022 under the showroom lights" },
  { src: "/brand/showroom-skoda.jpg", w: 960, h: 730, ar: "خطوط السقف على كبوت سكودا", en: "The ceiling lines across a Skoda bonnet" },
  { src: "/cars/sportage/06.jpg", w: 1536, h: 2048, ar: "على باب المعرض", en: "At the showroom door" },
  { src: "/cars/sportage/08.jpg", w: 1536, h: 2048, ar: "الكابينة، زي ما هي", en: "The cabin, exactly as it is" },
  { src: "/cars/sportage/03.jpg", w: 1536, h: 2048, ar: "من الخلف، فابريكة", en: "From behind, factory paint" },
  { src: "/cars/elantra/02.jpg", w: 443, h: 590, ar: "إلنترا والاستيكر لسه عليها", en: "Elantra with its film still on" },
];

/** Pinned horizontal walk through the real showroom photos. */
export function ShowroomReel() {
  const { lang, dir } = useLang();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => (dir === "rtl" ? distance() : -distance()),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section, dependencies: [dir] },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-bg py-16 md:flex md:h-[100svh] md:items-center md:py-0">
      <div ref={track} className="flex gap-6 overflow-x-auto px-4 no-scrollbar md:gap-10 md:overflow-visible md:px-8">
        <div className="flex w-[78vw] shrink-0 flex-col justify-center md:w-[34vw]">
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {lang === "ar" ? "من جوه المعرض في دلة" : "Inside the showroom in Dala"}
          </h2>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-muted">
            {lang === "ar"
              ? "كل الصور دي من معرضنا، مش صور كتالوج. اللي تشوفه هنا هو اللي هتلاقيه لما تيجي."
              : "Every photo here was taken in our showroom, not a brochure. What you see is what you will find when you visit."}
          </p>
        </div>
        {reel.map((p) => (
          <figure key={p.src} className="shrink-0">
            <div
              className="relative h-[56svh] overflow-hidden rounded-card bg-bg-3 md:h-[68svh]"
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
            >
              <Image src={p.src} alt={lang === "ar" ? p.ar : p.en} fill sizes="50vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-muted">{lang === "ar" ? p.ar : p.en}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PlateGrid() {
  const { t, lang, dir } = useLang();
  const href = useHref();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="bg-bg-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
              {lang === "ar" ? "على الأرض دلوقتي" : "On the floor right now"}
            </h2>
            <p className="mt-3 text-muted">
              {lang === "ar" ? `${cars.length} عربيات، كل واحدة بكود اللوحة بتاعها.` : `${cars.length} cars, each with its own plate code.`}
            </p>
          </div>
          <Link href={href("/cars")} className="group inline-flex items-center gap-2 font-semibold">
            {t("allCars")}
            <Arrow className="size-4 transition-transform group-hover:translate-x-[calc(var(--d)*4px)] [--d:1] rtl:[--d:-1]" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {cars.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <FaiyumCarCard car={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Lake Qarun: the deep-water field where the people are. */
export function Lake() {
  const { t, pick, lang } = useLang();
  const href = useHref();
  return (
    <section className="bg-alt py-20 text-alt-ink md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-4 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {lang === "ar" ? "كلّم مسؤول البيع مباشرة" : "Call a salesperson directly"}
          </h2>
          <ul className="mt-10 divide-y divide-alt-ink/15 border-y border-alt-ink/15">
            {salespeople.map((s) => (
              <li key={s.id} className="group flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
                <span className="font-display text-2xl font-bold">{pick({ ar: s.nameAr, en: s.nameEn })}</span>
                <a href={telHref(s.phone)} dir="ltr" className="tnum text-lg opacity-75 hover:opacity-100">
                  {s.phone}
                </a>
                <span className="ms-auto flex gap-2">
                  <a
                    href={telHref(s.phone)}
                    aria-label={`${t("callNow")} ${pick({ ar: s.nameAr, en: s.nameEn })}`}
                    className="grid size-11 place-items-center rounded-full border border-alt-ink/30 transition-colors hover:bg-alt-ink hover:text-alt"
                  >
                    <Phone className="size-4" />
                  </a>
                  <a
                    href={waHref(s.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-alt-ink px-5 text-sm font-semibold text-alt transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="size-4" />
                    {t("whatsapp")}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href={href("/sell")}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-card bg-alt-ink p-8 text-alt transition-transform hover:-translate-y-1"
          >
            <Repeat className="size-7" />
            <span className="font-display text-3xl font-extrabold tracking-[-0.02em]">{t("sellTitle")}</span>
            <span className="max-w-[40ch] opacity-80">{t("sellSub")}</span>
          </Link>
          <div className="overflow-hidden rounded-card border border-alt-ink/20">
            <iframe
              title={t("visitUs")}
              src={`https://maps.google.com/maps?q=${brand.map.lat},${brand.map.lng}&z=15&output=embed`}
              className="h-64 w-full grayscale-[0.4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="max-w-[36ch] text-sm leading-relaxed opacity-85">{lang === "ar" ? brand.addressAr : brand.addressEn}</p>
              <a href={brand.mapUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold underline underline-offset-4">
                {t("directions")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
