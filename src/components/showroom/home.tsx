"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { cars, getCar } from "@/data/cars";
import { brand, salespeople, telHref, waHref } from "@/data/brand";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { InstallmentCalculator } from "@/components/shared/installment-calculator";
import { ShowroomCarCard } from "./car-card";
import { PlateCall } from "./chrome";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The showroom's LED ceiling, continued out of the photograph and across the page. */
function CeilingLines() {
  const xs = [-40, 150, 340, 530, 720, 910, 1100, 1290, 1480];
  const d = (x: number) => `M${x} -40 L${x - 150} 300 L${x + 70} 620 L${x - 90} 960`;
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full ltr:[mask-image:linear-gradient(to_right,rgba(0,0,0,0.12)_8%,black_48%)] rtl:[mask-image:linear-gradient(to_left,rgba(0,0,0,0.12)_8%,black_48%)]"
      aria-hidden="true"
    >
      <defs>
        <filter id="led-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="text-ink/[0.13] dark:text-white/25" filter="url(#led-glow)">
        {xs.map((x, i) => (
          <motion.path
            key={x}
            d={d(x)}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.15 + i * 0.08, ease: EASE }}
          />
        ))}
      </g>
      {/* a pulse travelling along each strip */}
      <g className="text-ink/30 dark:text-white/80">
        {xs.map((x, i) => (
          <path
            key={x}
            d={d(x)}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="40 960"
            style={{ animation: `led-pulse ${7 + (i % 3)}s linear ${2 + i * 0.6}s infinite`, strokeDashoffset: 1000 }}
          />
        ))}
      </g>
    </svg>
  );
}

function Hero() {
  const { t, lang } = useLang();
  const href = useHref();
  const mx = useMotionValue(60);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, rgba(255,255,255,0.28), transparent 60%)`;

  return (
    <section className="relative overflow-hidden">
      <CeilingLines />
      <div className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-[1480px] items-center gap-10 px-4 py-12 md:px-10 lg:grid-cols-[5fr_7fr] lg:py-0">
        <div className="relative z-10">
          <motion.h1
            className="font-display text-[clamp(3.4rem,7.4vw,6.6rem)] leading-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          >
            {lang === "ar" ? brand.nameAr : brand.nameEn}
          </motion.h1>
          <motion.p
            lang="ar"
            className="mt-1 font-script text-[clamp(2.6rem,4.6vw,4.2rem)] leading-tight text-accent"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.85 }}
          >
            {brand.taglineAr}
          </motion.p>
          <motion.p
            className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {lang === "ar"
              ? "معرض عربيات بحالة الزيرو في دلة، الفيوم. كل عربية بتتصور تحت نفس الإضاءة اللي هتشوفها بيها لما تزورنا."
              : "A showroom of like-new cars in Dala, Faiyum. Every car is photographed under the same lights you will see it in when you visit."}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.25 }}
          >
            <Link
              href={href("/cars")}
              className="inline-flex h-[52px] items-center bg-ink px-7 font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
            >
              {t("browseCars")}
            </Link>
            <PlateCall className="text-[19px]" />
          </motion.div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" />
            {lang === "ar" ? "دلة، الفيوم. مفتوح دايماً" : "Dala, Faiyum. Always open"}
          </p>
        </div>

        <motion.div
          className="relative z-10 lg:-me-10"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 100);
            my.set(((e.clientY - r.top) / r.height) * 100);
          }}
        >
          <div className="relative aspect-[960/730] overflow-hidden bg-bg-3">
            <Image
              src="/brand/showroom-skoda.jpg"
              alt={lang === "ar" ? "إضاءة سقف المعرض منعكسة على كبوت عربية" : "The showroom ceiling lights reflected on a bonnet"}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ background: sheen }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloorRail() {
  const { t, lang, dir } = useLang();
  const href = useHref();
  const rail = useRef<HTMLDivElement>(null);
  const scrollBy = (n: number) => rail.current?.scrollBy({ left: n * (dir === "rtl" ? -1 : 1) * 420, behavior: "smooth" });
  const Prev = dir === "rtl" ? ArrowRight : ArrowLeft;
  const Next = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-end justify-between gap-6 px-4 md:px-10">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-tight">
            {lang === "ar" ? "على الأرض دلوقتي" : "On the floor now"}
          </h2>
          <p className="mt-2 text-muted">{t("pricesNote")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label={lang === "ar" ? "السابق" : "Previous"} className="grid size-12 place-items-center border border-line transition-colors hover:border-ink">
            <Prev className="size-5" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label={lang === "ar" ? "التالي" : "Next"} className="grid size-12 place-items-center border border-line transition-colors hover:border-ink">
            <Next className="size-5" />
          </button>
          <Link href={href("/cars")} className="ms-4 font-medium underline underline-offset-[6px] hover:text-accent">
            {t("allCars")}
          </Link>
        </div>
      </div>
      <div
        ref={rail}
        data-lenis-prevent
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-10 md:px-10"
      >
        {cars.map((c) => (
          <ShowroomCarCard key={c.id} car={c} tall className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[25vw]" />
        ))}
      </div>
    </section>
  );
}

function SportageStory() {
  const { lang, t } = useLang();
  const href = useHref();
  const car = getCar("kia-sportage-2022")!;
  const [step, setStep] = useState(0);
  const steps = [
    {
      img: "/cars/sportage/01.jpg",
      ar: ["هاي لاين 2022، على 42 ألف كم", "صيانة توكيل لآخر كيلو، وطقم كاوتش جديد كامل. أبيض، فابريكة."],
      en: ["High Line 2022, at 42,000 km", "Dealer-serviced to the last kilometre, a full set of new tyres. White, factory paint."],
    },
    {
      img: "/cars/sportage/07.jpg",
      ar: ["شاشتين منحنيتين", "عدادات رقمية وشاشة لمس كبيرة، Apple CarPlay و Android Auto، وشحن لاسلكي."],
      en: ["Curved twin screens", "Digital cluster and large touchscreen, Apple CarPlay and Android Auto, wireless charging."],
    },
    {
      img: "/cars/sportage/03.jpg",
      ar: ["بانوراما وجنوط سبور", "فتحة سقف بانوراما، إضاءة LED قدام وورا، ومرايات كهرباء بتضم لوحدها."],
      en: ["Panorama and sport wheels", "Panoramic sunroof, LED lights front and rear, power-folding mirrors."],
    },
    {
      img: "/cars/sportage/08.jpg",
      ar: ["6 وسائد وكل أنظمة الأمان", "ESP، Hill Start، Downhill Assist، مراقبة ضغط الكاوتش، وكاميرا خلفية."],
      en: ["6 airbags, every safety system", "ESP, hill start, downhill assist, tyre pressure monitoring and a rear camera."],
    },
  ];

  return (
    <section className="bg-bg-2">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-4 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="top-[76px] h-[60svh] lg:sticky lg:h-[calc(100svh-76px)] lg:py-10">
          <div className="relative size-full overflow-hidden bg-bg-3">
            <AnimatePresence initial={false}>
              <motion.div
                key={step}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0.999 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <Image src={steps[step].img} alt="" fill sizes="50vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-4 start-4 z-10 rounded-[2px] bg-black px-2.5 py-1.5 font-display text-xs tracking-[0.16em] text-[#d8b25c] shadow-[inset_0_0_0_1px_#d8b25c]" dir="ltr">
              {car.code}
            </span>
          </div>
        </div>
        <div className="pb-[20svh] pt-10 lg:pt-[30svh]">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="min-h-[50svh] lg:min-h-[70svh]"
              onViewportEnter={() => setStep(i)}
              viewport={{ amount: 0.6 }}
            >
              <p className="tnum font-display text-sm text-muted" dir="ltr">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h3 className={`mt-3 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-tight transition-colors duration-500 ${step === i ? "text-ink" : "text-muted/50"}`}>
                {lang === "ar" ? s.ar[0] : s.en[0]}
              </h3>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{lang === "ar" ? s.ar[1] : s.en[1]}</p>
            </motion.div>
          ))}
          <Link
            href={href(`/cars/${car.id}`)}
            className="inline-flex h-[52px] items-center bg-ink px-7 font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
          >
            {t("viewCar")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Calligraphy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { dir, lang } = useLang();
  const reveal = useTransform(scrollYProgress, [0.15, 0.5], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${dir === "rtl" ? 0 : reveal}% 0 ${dir === "rtl" ? reveal : 0}%)`;
  const lineStart = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"]);
  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="relative mx-auto max-w-[1480px] px-4 md:px-10">
        <motion.p
          lang="ar"
          dir="rtl"
          className="font-script text-[clamp(5rem,17vw,16rem)] leading-[1.1] text-accent"
          style={{ clipPath: clip }}
        >
          {brand.taglineAr}
        </motion.p>
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-[3px] bg-ink/70 shadow-[0_0_24px_4px_rgba(255,255,255,0.6)] dark:bg-white"
          style={{ insetInlineStart: lineStart }}
        />
        <p className="mt-6 max-w-[48ch] text-lg text-muted">
          {lang === "ar"
            ? "الجملة دي مكتوبة بخط الرقعة على حيطة المعرض. 25 ألف متابع عارفينها."
            : "These words are written in Ruqaa script on the showroom wall. 25,000 followers know them."}
        </p>
      </div>
    </section>
  );
}

function PlatesTeam() {
  const { t, pick, lang } = useLang();
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1480px] px-4 md:px-10">
        <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-tight">
          {lang === "ar" ? "كل رقم على اللوحة بيرد" : "Every number on the plate answers"}
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {salespeople.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-black p-6 text-[#d8b25c] shadow-[inset_0_0_0_1px_#d8b25c,inset_0_0_0_5px_#000,inset_0_0_0_6px_rgba(216,178,92,0.4)] transition-transform duration-500 group-hover:-translate-y-1">
                <p className="font-display text-2xl">{pick({ ar: s.nameAr, en: s.nameEn })}</p>
                <p className="tnum mt-6 font-display text-3xl tracking-[0.06em]" dir="ltr">
                  {s.phone}
                </p>
                <span className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/4 [--sweep:700%] rtl:[--sweep:-700%] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:animate-[sweep_1s_ease-out] group-hover:opacity-100" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={telHref(s.phone)} className="inline-flex h-11 items-center justify-center gap-2 border border-line text-sm transition-colors hover:border-ink">
                  <Phone className="size-4" />
                  {t("callNow")}
                </a>
                <a href={waHref(s.phone)} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 border border-line text-sm transition-colors hover:border-ink">
                  <MessageCircle className="size-4" />
                  {t("whatsapp")}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinanceAndTrade() {
  const { t, lang } = useLang();
  const href = useHref();
  const car = getCar("kia-sportage-2022")!;
  return (
    <section className="bg-bg-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1480px] gap-6 px-4 md:px-10 lg:grid-cols-[7fr_5fr]">
        <div className="bg-surface p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl">{t("installments")}</h2>
          <p className="mt-2 text-muted">
            <span dir="ltr">
              {car.make} {car.model} {car.year}
            </span>
          </p>
          <InstallmentCalculator price={car.price} className="mt-8" />
        </div>
        <Link href={href("/sell")} className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-alt p-8 text-alt-ink md:p-12">
          <Image src="/cars/sportage/06.jpg" alt="" fill sizes="40vw" className="object-cover opacity-35 mix-blend-luminosity transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl">{t("sellTitle")}</h2>
            <p className="mt-3 max-w-[36ch] opacity-85">{t("sellSub")}</p>
            <span className="mt-6 inline-flex h-12 items-center bg-alt-ink px-6 font-medium text-alt">
              {lang === "ar" ? "ابدأ التقييم" : "Start the valuation"}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function ShowroomHome() {
  return (
    <>
      <Hero />
      <FloorRail />
      <SportageStory />
      <Calligraphy />
      <PlatesTeam />
      <FinanceAndTrade />
    </>
  );
}
