"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, ShieldCheck, Gauge, Wallet, Repeat, Phone, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { cars, getCar, makes } from "@/data/cars";
import { brand, salespeople, telHref, waHref } from "@/data/brand";
import { useLang } from "@/lib/i18n";
import { useHref } from "@/lib/use-variant";
import { InstallmentCalculator } from "@/components/shared/installment-calculator";
import { ClassicCarCard } from "./car-card";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Hero() {
  const { t, lang, price } = useLang();
  const href = useHref();
  const router = useRouter();
  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [max, setMax] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (make) q.set("make", make);
    if (body) q.set("body", body);
    if (max) q.set("max", max);
    router.push(href(`/cars${q.size ? `?${q}` : ""}`));
  };

  const select = "h-12 w-full rounded-ctl border border-line bg-surface px-3 text-[15px] text-ink";

  return (
    <section className="relative">
      <div className="relative h-[78svh] min-h-[560px] overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}>
          <Image src="/cars/sportage/01.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_62%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1322] via-[#0b1322]/55 to-[#0b1322]/20" />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-4 pb-36 text-white md:px-6">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="font-script text-4xl text-white/90 md:text-5xl" lang="ar">
            {brand.taglineAr}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-2 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em]"
          >
            {lang === "ar" ? "عربيات زيرو بجد، في قلب الفيوم" : "Truly like-new cars in the heart of Faiyum"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }} className="mt-4 max-w-[52ch] text-lg text-white/80">
            {lang === "ar" ? "صيانات توكيل، عداد حقيقي، وتقسيط. اختار عربيتك وكلمنا." : "Dealer service history, honest mileage and instalments. Pick your car and call us."}
          </motion.p>
        </div>
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto -mt-24 grid max-w-[1180px] gap-3 rounded-card bg-surface p-4 shadow-[0_30px_60px_-30px_rgba(15,26,43,0.45)] ring-1 ring-line sm:grid-cols-2 md:p-5 lg:mx-auto lg:grid-cols-[1fr_1fr_1fr_auto] [margin-inline:16px] lg:[margin-inline:auto]"
        role="search"
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-muted">
          {t("make")}
          <select className={select} value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">{t("any")}</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-muted">
          {t("body")}
          <select className={select} value={body} onChange={(e) => setBody(e.target.value)}>
            <option value="">{t("any")}</option>
            <option value="suv">{t("suv")}</option>
            <option value="sedan">{t("sedan")}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-muted">
          {t("maxPrice")}
          <select className={select} value={max} onChange={(e) => setMax(e.target.value)}>
            <option value="">{t("any")}</option>
            {[1_000_000, 1_500_000, 2_000_000, 3_000_000].map((p) => (
              <option key={p} value={p}>
                {price(p)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-ctl bg-accent px-8 font-bold text-accent-ink transition-transform hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1">
          <Search className="size-5" />
          {lang === "ar" ? "دوّر" : "Search"}
        </button>
      </motion.form>
    </section>
  );
}

function BodyTiles() {
  const { t, lang } = useLang();
  const href = useHref();
  const tiles = [
    { body: "suv" as const, img: "/cars/tucson.jpg" },
    { body: "sedan" as const, img: "/cars/c200.jpg" },
  ];
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-20 md:px-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((tile) => (
          <motion.div key={tile.body} {...fade}>
            <Link href={href(`/cars?body=${tile.body}`)} className="group relative flex h-56 items-end overflow-hidden rounded-card p-6 text-white">
              <Image src={tile.img} alt="" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative">
                <p className="text-3xl font-extrabold">{t(tile.body)}</p>
                <p className="tnum text-white/80">
                  {cars.filter((c) => c.body === tile.body).length} {lang === "ar" ? "عربيات متاحة" : "available"}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const { t, lang, dir } = useLang();
  const href = useHref();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-[-0.01em] md:text-4xl">{lang === "ar" ? "عربيات مميزة" : "Featured cars"}</h2>
          <p className="mt-2 text-muted">{t("pricesNote")}</p>
        </div>
        <Link href={href("/cars")} className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline">
          {t("allCars")}
          <Arrow className="size-4" />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.slice(0, 6).map((c, i) => (
          <motion.div key={c.id} {...fade} transition={{ ...fade.transition, delay: (i % 3) * 0.08 }}>
            <ClassicCarCard car={c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const { lang } = useLang();
  const items = [
    { icon: ShieldCheck, ar: ["صيانات توكيل", "تاريخ صيانة كامل لكل عربية."], en: ["Dealer service", "Full service history for every car."] },
    { icon: Gauge, ar: ["عداد حقيقي", "العداد مكتوب زي ما هو في كل إعلان."], en: ["Honest mileage", "Every listing states the real odometer."] },
    { icon: Wallet, ar: ["تقسيط", "احسب القسط التقريبي من صفحة العربية."], en: ["Instalments", "Estimate the monthly payment on any car."] },
    { icon: Repeat, ar: ["بدّل عربيتك", "قيّم عربيتك وبدّلها بعربية من المعرض."], en: ["Trade in", "Get a valuation and trade for a car on the floor."] },
  ];
  return (
    <section className="bg-bg-2 py-20">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
            <span className="grid size-12 place-items-center rounded-ctl bg-accent/10 text-accent">
              <it.icon className="size-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{lang === "ar" ? it.ar[0] : it.en[0]}</h3>
            <p className="mt-1 text-muted">{lang === "ar" ? it.ar[1] : it.en[1]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Finance() {
  const { t, lang } = useLang();
  const href = useHref();
  const car = getCar("hyundai-tucson-2022")!;
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-6">
      <div className="grid overflow-hidden rounded-card bg-[#0f1a2b] text-white lg:grid-cols-2">
        <div className="relative min-h-[300px]">
          <Image src={car.images[0]} alt="" fill sizes="50vw" className="object-cover" />
        </div>
        <div className="p-8 md:p-12 [--ink:#fff] [--muted:#aab4c4] [--line:rgba(255,255,255,0.18)]">
          <h2 className="text-3xl font-extrabold">{t("installments")}</h2>
          <p className="mt-2 text-white/70">
            <span dir="ltr">
              {car.make} {car.model} {car.year}
            </span>
          </p>
          <InstallmentCalculator price={car.price} className="mt-8" />
          <Link href={href(`/cars/${car.id}`)} className="mt-6 inline-flex h-12 items-center rounded-ctl bg-white px-6 font-bold text-[#0f1a2b]">
            {lang === "ar" ? "تفاصيل العربية" : "Car details"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t, pick, lang } = useLang();
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-24 md:px-6">
      <h2 className="text-3xl font-extrabold md:text-4xl">{lang === "ar" ? "تواصل معانا" : "Get in touch"}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {salespeople.map((s) => (
            <div key={s.id} className="rounded-card border border-line bg-surface p-5">
              <p className="font-bold">{pick({ ar: s.nameAr, en: s.nameEn })}</p>
              <p className="tnum mt-1 text-muted" dir="ltr">
                {s.phone}
              </p>
              <div className="mt-4 flex gap-2">
                <a href={telHref(s.phone)} className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-ctl bg-accent text-sm font-bold text-accent-ink">
                  <Phone className="size-4" />
                  {t("callNow")}
                </a>
                <a href={waHref(s.phone)} target="_blank" rel="noreferrer" className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-ctl border border-line text-sm font-bold hover:border-ink">
                  <MessageCircle className="size-4" />
                  {t("whatsapp")}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-card border border-line">
          <iframe
            title={t("visitUs")}
            src={`https://maps.google.com/maps?q=${brand.map.lat},${brand.map.lng}&z=15&output=embed`}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export function ClassicHome() {
  return (
    <>
      <Hero />
      <BodyTiles />
      <Featured />
      <WhyUs />
      <Finance />
      <Contact />
    </>
  );
}
