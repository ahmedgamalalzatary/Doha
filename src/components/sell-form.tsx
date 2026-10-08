"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Loader2, X } from "lucide-react";
import clsx from "clsx";
import { makes } from "@/data/cars";
import { useLang } from "@/lib/i18n";
import { useVariant } from "@/lib/use-variant";

const EASE = [0.16, 1, 0.3, 1] as const;
const YEARS = Array.from({ length: 17 }, (_, i) => 2026 - i);

type Data = {
  make: string;
  model: string;
  year: string;
  km: string;
  paint: "original" | "partial" | "full";
  notes: string;
  trade: boolean;
  name: string;
  phone: string;
};

const empty: Data = { make: "", model: "", year: "", km: "", paint: "original", notes: "", trade: true, name: "", phone: "" };

export function SellForm() {
  const v = useVariant();
  const { t, lang, dir } = useLang();
  const [step, setStep] = useState(0);
  const [back, setBack] = useState(false);
  const [d, setD] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p)), [photos]);

  const set = <K extends keyof Data>(k: K, val: Data[K]) => {
    setD((x) => ({ ...x, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: typeof errors = {};
    if (s === 0) {
      if (!d.make) e.make = t("required");
      if (!d.model.trim()) e.model = t("required");
      if (!d.year) e.year = t("required");
      if (!d.km) e.km = t("required");
    }
    if (s === 2) {
      if (!d.name.trim()) e.name = t("required");
      if (!/^01[0125]\d{8}$/.test(d.phone.replace(/\s/g, ""))) e.phone = t("invalidPhone");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setBack(false);
    setStep((s) => s + 1);
  };
  const prev = () => {
    setBack(true);
    setStep((s) => s - 1);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!validate(2)) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1300);
  };

  const steps = [t("carInfo"), t("carState"), t("contactInfo")];
  const field = clsx(
    "h-12 w-full border bg-surface px-3 text-[15px] text-ink transition-colors focus:border-ink focus:outline-none",
    v === "showroom" ? "" : "rounded-ctl",
  );
  const errCls = "border-accent";
  const Next = dir === "rtl" ? ArrowLeft : ArrowRight;
  const Prev = dir === "rtl" ? ArrowRight : ArrowLeft;
  const sx = (dir === "rtl" ? -1 : 1) * (back ? -1 : 1);

  const wrap = v === "showroom" ? "max-w-[1480px] md:px-10" : v === "classic" ? "max-w-[1280px] md:px-6" : "max-w-[1440px] md:px-8";
  const heading = v === "classic" ? "text-4xl font-extrabold md:text-5xl" : v === "showroom" ? "font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.05]" : "font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]";
  const solid = v === "showroom" ? "bg-ink text-bg hover:bg-accent hover:text-accent-ink" : "rounded-ctl bg-accent text-accent-ink hover:-translate-y-0.5";

  const Err = ({ k }: { k: keyof Data }) =>
    errors[k] ? (
      <span role="alert" className="text-sm font-medium text-accent">
        {errors[k]}
      </span>
    ) : null;

  return (
    <div className={clsx("mx-auto grid gap-12 px-4 pb-28 pt-14 lg:grid-cols-[5fr_7fr]", wrap)}>
      <div>
        <h1 className={heading}>{t("sellTitle")}</h1>
        <p className="mt-4 max-w-[42ch] text-lg text-muted">{t("sellSub")}</p>
        <ol className="mt-10 flex flex-col gap-4">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              <span
                className={clsx(
                  "tnum grid size-10 place-items-center rounded-full border text-sm font-bold transition-colors duration-500",
                  status === "sent" || i < step ? "border-accent bg-accent text-accent-ink" : i === step ? "border-ink" : "border-line text-muted",
                )}
              >
                {status === "sent" || i < step ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={clsx("font-medium transition-colors", i === step && status !== "sent" ? "text-ink" : "text-muted")}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={clsx("relative overflow-hidden p-6 md:p-10", v === "classic" ? "rounded-card border border-line bg-surface shadow-[0_20px_50px_-30px_rgba(15,26,43,0.35)]" : v === "showroom" ? "bg-bg-2" : "rounded-card bg-surface")}>
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="flex min-h-[420px] flex-col items-start justify-center" role="status">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }} className="grid size-16 place-items-center rounded-full bg-accent text-accent-ink">
                <Check className="size-8" strokeWidth={2.5} />
              </motion.span>
              <h2 className="mt-6 font-display text-3xl font-bold">{t("sent")}</h2>
              <p className="mt-2 max-w-[40ch] text-lg text-muted">{t("sentSub")}</p>
              <button
                type="button"
                onClick={() => {
                  setD(empty);
                  setPhotos([]);
                  setStep(0);
                  setStatus("idle");
                }}
                className="mt-8 font-semibold underline underline-offset-4"
              >
                {t("sendAnother")}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key={step}
              onSubmit={submit}
              noValidate
              initial={{ opacity: 0, x: 40 * sx }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * sx }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex min-h-[420px] flex-col gap-5"
            >
              <p className="tnum text-sm text-muted">
                {t("step")} {step + 1} / 3
              </p>

              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("make")}
                    <select value={d.make} onChange={(e) => set("make", e.target.value)} className={clsx(field, errors.make ? errCls : "border-line")} aria-invalid={!!errors.make}>
                      <option value="">—</option>
                      {[...makes, "Nissan", "Renault", "Suzuki", "Other"].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <Err k="make" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("model")}
                    <input value={d.model} onChange={(e) => set("model", e.target.value)} className={clsx(field, errors.model ? errCls : "border-line")} aria-invalid={!!errors.model} placeholder={lang === "ar" ? "مثلاً: سبورتاج" : "e.g. Sportage"} />
                    <Err k="model" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("year")}
                    <select value={d.year} onChange={(e) => set("year", e.target.value)} className={clsx(field, errors.year ? errCls : "border-line")} aria-invalid={!!errors.year}>
                      <option value="">—</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <Err k="year" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("mileage")} ({t("km")})
                    <input inputMode="numeric" value={d.km} onChange={(e) => set("km", e.target.value.replace(/\D/g, ""))} className={clsx(field, "tnum", errors.km ? errCls : "border-line")} aria-invalid={!!errors.km} placeholder="45000" />
                    <Err k="km" />
                  </label>
                </div>
              )}

              {step === 1 && (
                <>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">{t("paint")}</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {(["original", "partial", "full"] as const).map((p) => (
                        <label key={p} className={clsx("flex cursor-pointer items-center gap-2 border px-4 py-3 text-sm transition-colors", v !== "showroom" && "rounded-ctl", d.paint === p ? "border-accent bg-accent/10" : "border-line hover:border-ink")}>
                          <input type="radio" name="paint" className="sr-only" checked={d.paint === p} onChange={() => set("paint", p)} />
                          <span className={clsx("size-4 rounded-full border-2", d.paint === p ? "border-accent bg-accent" : "border-line")} />
                          {t(p === "original" ? "paintOriginal" : p === "partial" ? "paintPartial" : "paintFull")}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <p className="mb-2 text-sm font-medium">{t("addPhotos")}</p>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {photos.map((p, i) => (
                          <motion.div key={p} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="relative size-20 overflow-hidden rounded-[6px] bg-bg-3">
                            <Image src={p} alt="" fill unoptimized className="object-cover" />
                            <button type="button" onClick={() => setPhotos((x) => x.filter((_, j) => j !== i))} aria-label={t("remove")} className="absolute end-1 top-1 grid size-6 place-items-center rounded-full bg-black/70 text-white">
                              <X className="size-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button type="button" onClick={() => fileRef.current?.click()} className="grid size-20 place-items-center rounded-[6px] border border-dashed border-line text-muted transition-colors hover:border-ink hover:text-ink" aria-label={t("addPhotos")}>
                        <ImagePlus className="size-6" />
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={(e) => {
                          const files = Array.from(e.target.files ?? []).slice(0, 8);
                          setPhotos((x) => [...x, ...files.map((f) => URL.createObjectURL(f))].slice(0, 8));
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </div>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("notes")}
                    <textarea value={d.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className={clsx(field, "h-auto border-line py-3")} placeholder={lang === "ar" ? "صيانات، حوادث، أي حاجة مهمة" : "Service history, accidents, anything important"} />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                    <input type="checkbox" checked={d.trade} onChange={(e) => set("trade", e.target.checked)} className="size-5 accent-[var(--accent)]" />
                    {t("tradeIn")}
                  </label>
                </>
              )}

              {step === 2 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("yourName")}
                    <input value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={clsx(field, errors.name ? errCls : "border-line")} aria-invalid={!!errors.name} />
                    <Err k="name" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {t("phone")}
                    <input value={d.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" dir="ltr" placeholder="01xxxxxxxxx" className={clsx(field, "tnum text-start", errors.phone ? errCls : "border-line")} aria-invalid={!!errors.phone} />
                    <Err k="phone" />
                  </label>
                  <div className={clsx("border border-line p-4 text-sm sm:col-span-2", v !== "showroom" && "rounded-ctl")}>
                    <p className="font-semibold" dir="ltr">
                      {d.make} {d.model} {d.year}
                    </p>
                    <p className="tnum mt-1 text-muted">
                      {Number(d.km || 0).toLocaleString("en-US")} {t("km")} — {t(d.paint === "original" ? "paintOriginal" : d.paint === "partial" ? "paintPartial" : "paintFull")} — {photos.length} {t("photos")}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                {step > 0 ? (
                  <button type="button" onClick={prev} className="inline-flex items-center gap-2 font-semibold text-muted hover:text-ink">
                    <Prev className="size-4" />
                    {t("prev")}
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" disabled={status === "sending"} className={clsx("inline-flex h-[52px] items-center gap-2 px-7 font-semibold transition disabled:opacity-70", solid)}>
                  {status === "sending" ? <Loader2 className="size-5 animate-spin" /> : null}
                  {step < 2 ? t("next") : t("submit")}
                  {step < 2 && <Next className="size-4" />}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
