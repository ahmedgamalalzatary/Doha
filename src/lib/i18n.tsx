"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "ar" | "en";
type Bi = { ar: string; en: string };

const dict = {
  navHome: { ar: "الرئيسية", en: "Home" },
  navCars: { ar: "العربيات", en: "Cars" },
  navCompare: { ar: "قارن", en: "Compare" },
  navSell: { ar: "بيع عربيتك", en: "Sell your car" },
  navContact: { ar: "تواصل", en: "Contact" },
  callNow: { ar: "اتصل دلوقتي", en: "Call now" },
  whatsapp: { ar: "واتساب", en: "WhatsApp" },
  viewCar: { ar: "شوف العربية", en: "View car" },
  allCars: { ar: "كل العربيات", en: "All cars" },
  browseCars: { ar: "تصفح العربيات", en: "Browse cars" },
  km: { ar: "كم", en: "km" },
  egp: { ar: "ج.م", en: "EGP" },
  perMonth: { ar: "شهرياً", en: "/ month" },
  from: { ar: "من", en: "from" },
  year: { ar: "السنة", en: "Year" },
  mileage: { ar: "العداد", en: "Mileage" },
  engine: { ar: "المحرك", en: "Engine" },
  gearbox: { ar: "ناقل الحركة", en: "Gearbox" },
  color: { ar: "اللون", en: "Colour" },
  trim: { ar: "الفئة", en: "Trim" },
  body: { ar: "الشكل", en: "Body" },
  price: { ar: "السعر", en: "Price" },
  condition: { ar: "الحالة", en: "Condition" },
  suv: { ar: "SUV", en: "SUV" },
  sedan: { ar: "سيدان", en: "Sedan" },
  any: { ar: "الكل", en: "Any" },
  make: { ar: "الماركة", en: "Make" },
  maxPrice: { ar: "أقصى سعر", en: "Max price" },
  sortBy: { ar: "ترتيب", en: "Sort" },
  sortNewest: { ar: "الأحدث", en: "Newest" },
  sortPriceLow: { ar: "الأرخص", en: "Lowest price" },
  sortPriceHigh: { ar: "الأغلى", en: "Highest price" },
  sortKm: { ar: "أقل عداد", en: "Lowest km" },
  search: { ar: "دوّر على ماركة أو موديل", en: "Search make or model" },
  results: { ar: "عربية", en: "cars" },
  noResults: { ar: "مفيش عربيات بالمواصفات دي. وسّع السعر أو امسح الفلاتر.", en: "No cars match these filters. Raise the price or clear filters." },
  clearFilters: { ar: "امسح الفلاتر", en: "Clear filters" },
  addCompare: { ar: "أضف للمقارنة", en: "Add to compare" },
  inCompare: { ar: "في المقارنة", en: "In compare" },
  compareN: { ar: "قارن", en: "Compare" },
  compareTitle: { ar: "قارن بين العربيات", en: "Compare cars" },
  compareEmpty: { ar: "اختار لحد 3 عربيات من صفحة العربيات علشان تقارن بينهم.", en: "Pick up to 3 cars from the cars page to compare them." },
  compareFull: { ar: "المقارنة فيها 3 عربيات بالفعل", en: "Compare already holds 3 cars" },
  remove: { ar: "شيل", en: "Remove" },
  installments: { ar: "حاسبة التقسيط", en: "Installment calculator" },
  downPayment: { ar: "المقدم", en: "Down payment" },
  months: { ar: "المدة", en: "Term" },
  monthsUnit: { ar: "شهر", en: "months" },
  monthly: { ar: "القسط الشهري", en: "Monthly payment" },
  financeNote: { ar: "حساب تقريبي بفايدة ثابتة 14% سنوياً. القسط النهائي حسب البنك.", en: "Estimate at a 14% flat annual rate. Final terms depend on the bank." },
  askInstallment: { ar: "اسأل عن التقسيط", en: "Ask about installments" },
  features: { ar: "الكماليات", en: "Features" },
  specs: { ar: "المواصفات", en: "Specifications" },
  salesperson: { ar: "مسؤول البيع", en: "Your salesperson" },
  realCar: { ar: "عربية حقيقية من المعرض", en: "Real car from the showroom" },
  demoCar: { ar: "إعلان توضيحي", en: "Demo listing" },
  pricesNote: { ar: "الأسعار توضيحية لعرض الموقع فقط.", en: "Prices are illustrative for this demo." },
  similar: { ar: "عربيات تانية ممكن تعجبك", en: "You might also like" },
  back: { ar: "رجوع", en: "Back" },
  photos: { ar: "صور", en: "photos" },
  sellTitle: { ar: "بيع عربيتك أو بدّلها", en: "Sell or trade in your car" },
  sellSub: { ar: "ابعت بيانات عربيتك وهنكلمك بعرض خلال يوم.", en: "Send your car's details and we'll call you with an offer within a day." },
  step: { ar: "خطوة", en: "Step" },
  next: { ar: "التالي", en: "Next" },
  prev: { ar: "السابق", en: "Back" },
  submit: { ar: "ابعت الطلب", en: "Send request" },
  sent: { ar: "الطلب وصل", en: "Request sent" },
  sentSub: { ar: "هنكلمك على الرقم اللي سجلته خلال 24 ساعة.", en: "We'll call the number you gave within 24 hours." },
  sendAnother: { ar: "ابعت عربية تانية", en: "Send another car" },
  required: { ar: "مطلوب", en: "Required" },
  invalidPhone: { ar: "اكتب رقم موبايل مصري من 11 رقم يبدأ بـ 01", en: "Enter an 11-digit Egyptian mobile starting with 01" },
  model: { ar: "الموديل", en: "Model" },
  yourName: { ar: "اسمك", en: "Your name" },
  phone: { ar: "رقم الموبايل", en: "Mobile number" },
  notes: { ar: "ملاحظات", en: "Notes" },
  tradeIn: { ar: "عايز أبدّلها بعربية من المعرض", en: "I want to trade it for a car from the showroom" },
  addPhotos: { ar: "أضف صور", en: "Add photos" },
  carInfo: { ar: "بيانات العربية", en: "Car details" },
  carState: { ar: "الحالة والصور", en: "Condition & photos" },
  contactInfo: { ar: "بياناتك", en: "Your details" },
  paint: { ar: "الدهان", en: "Paint" },
  paintOriginal: { ar: "فابريكة بالكامل", en: "All original" },
  paintPartial: { ar: "رش جزئي", en: "Partly repainted" },
  paintFull: { ar: "رش كامل", en: "Fully repainted" },
  visitUs: { ar: "زورنا في المعرض", en: "Visit the showroom" },
  openAlways: { ar: "مفتوح دايماً", en: "Always open" },
  directions: { ar: "الاتجاهات على الخريطة", en: "Get directions" },
  followers: { ar: "متابع على فيسبوك", en: "Facebook followers" },
  theme: { ar: "تغيير الوضع", en: "Toggle theme" },
  language: { ar: "English", en: "عربي" },
  menu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  version: { ar: "النسخة", en: "Version" },
  photoCredit: { ar: "مصدر الصورة", en: "Photo" },
} satisfies Record<string, Bi>;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (k: DictKey) => string;
  pick: (b: Bi) => string;
  num: (n: number) => string;
  price: (n: number) => string;
  km: (n: number) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("doha-lang");
      if (saved === "en" || saved === "ar") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("doha-lang", l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => {
    const nf = new Intl.NumberFormat("en-US");
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggle: () => setLang(lang === "ar" ? "en" : "ar"),
      t: (k) => dict[k][lang],
      pick: (b) => b[lang],
      num: (n) => nf.format(n),
      price: (n) => (lang === "ar" ? `${nf.format(n)} ج.م` : `EGP ${nf.format(n)}`),
      km: (n) => (lang === "ar" ? `${nf.format(n)} كم` : `${nf.format(n)} km`),
    };
  }, [lang, setLang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
