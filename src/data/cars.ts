export type Body = "suv" | "sedan";
export type FeatureGroup = "exterior" | "interior" | "seats" | "safety";

export type Car = {
  id: string;
  /** Stock code shown on the gold plate tag */
  code: string;
  make: string;
  model: string;
  trim: { ar: string; en: string };
  year: number;
  km: number;
  /** Illustrative EGP price for the demo */
  price: number;
  body: Body;
  engine: string;
  gearbox: { ar: string; en: string };
  color: { ar: string; en: string; hex: string };
  images: string[];
  /** true = a real car from the AUTO DOHA Facebook page */
  real: boolean;
  condition: { ar: string; en: string };
  highlights: { ar: string; en: string }[];
  features: { group: FeatureGroup; ar: string[]; en: string[] }[];
  salesperson: string;
  credit?: string;
};

export const featureGroupLabel: Record<FeatureGroup, { ar: string; en: string }> = {
  exterior: { ar: "الشكل الخارجي", en: "Exterior" },
  interior: { ar: "الداخلية والتكنولوجيا", en: "Interior & tech" },
  seats: { ar: "المقاعد", en: "Seats" },
  safety: { ar: "الأمان ومساعدة السائق", en: "Safety & assistance" },
};

export const cars: Car[] = [
  {
    id: "kia-sportage-2022",
    code: "D-101",
    make: "Kia",
    model: "Sportage",
    trim: { ar: "هاي لاين", en: "High Line" },
    year: 2022,
    km: 42000,
    price: 1_640_000,
    body: "suv",
    engine: "1.6L T-GDi",
    gearbox: { ar: "أوتوماتيك 7 سرعات DCT", en: "7-speed DCT automatic" },
    color: { ar: "أبيض", en: "White", hex: "#F2F1EE" },
    images: [
      "/cars/sportage/01.jpg",
      "/cars/sportage/02.jpg",
      "/cars/sportage/03.jpg",
      "/cars/sportage/04.jpg",
      "/cars/sportage/05.jpg",
      "/cars/sportage/06.jpg",
      "/cars/sportage/07.jpg",
      "/cars/sportage/08.jpg",
    ],
    real: true,
    condition: { ar: "صيانة توكيل لآخر كيلو، طقم كاوتش جديد كامل", en: "Dealer-serviced to the last km, full set of new tyres" },
    highlights: [
      { ar: "فتحة سقف بانوراما", en: "Panoramic sunroof" },
      { ar: "شاشتين منحنيتين", en: "Curved twin screens" },
      { ar: "Apple CarPlay و Android Auto", en: "Apple CarPlay & Android Auto" },
      { ar: "كاميرا خلفية وحساسات", en: "Rear camera & sensors" },
    ],
    features: [
      {
        group: "exterior",
        ar: ["جنوط سبور", "إضاءة LED أمامية وخلفية", "إضاءة نهارية DRL", "فوانيس ضباب LED", "مرايات كهرباء ضم وفتح", "مرايات بإشارات", "فتحة سقف بانوراما", "زجاج خلفي ملون"],
        en: ["Sport alloy wheels", "LED front & rear lights", "Daytime running lights", "LED fog lamps", "Power-folding mirrors", "Mirror indicators", "Panoramic sunroof", "Tinted rear glass"],
      },
      {
        group: "interior",
        ar: ["شاشة عدادات رقمية", "شاشة وسطية كبيرة باللمس", "Apple CarPlay و Android Auto", "Bluetooth و USB", "شحن لاسلكي للموبايل", "تكييف أوتوماتيك Dual Zone", "فتحات تكييف خلفية", "مثبت سرعة", "فرامل يد كهربائية EPB", "Auto Hold", "إضاءة داخلية Ambient", "تشغيل بدون مفتاح Smart Key"],
        en: ["Digital instrument cluster", "Large central touchscreen", "Apple CarPlay & Android Auto", "Bluetooth & USB", "Wireless phone charging", "Dual-zone auto climate", "Rear A/C vents", "Cruise control", "Electric parking brake", "Auto Hold", "Ambient lighting", "Smart key, push start"],
      },
      {
        group: "seats",
        ar: ["فرش جلد", "تحكم كهربائي في دعم السائق", "طارة جلد متعددة الوظائف"],
        en: ["Leather upholstery", "Power lumbar support", "Leather multifunction wheel"],
      },
      {
        group: "safety",
        ar: ["6 وسائد هوائية", "ABS", "EBD", "ESP / ESC", "Traction Control", "Hill Start Assist", "Downhill Assist", "مراقبة ضغط الإطارات TPMS", "ISOFIX", "حساسات ركن أمامية وخلفية", "كاميرا خلفية"],
        en: ["6 airbags", "ABS", "EBD", "ESP / ESC", "Traction control", "Hill start assist", "Downhill assist", "Tyre pressure monitoring", "ISOFIX", "Front & rear parking sensors", "Rear camera"],
      },
    ],
    salesperson: "waleed",
  },
  {
    id: "hyundai-elantra-ad-2026",
    code: "D-102",
    make: "Hyundai",
    model: "Elantra AD",
    trim: { ar: "الفئة الأولى", en: "Base trim" },
    year: 2026,
    km: 16000,
    price: 1_085_000,
    body: "sedan",
    engine: "1.6L MPI",
    gearbox: { ar: "أوتوماتيك 6 سرعات", en: "6-speed automatic" },
    color: { ar: "فيراني", en: "Ferrani grey", hex: "#5A5D62" },
    images: ["/cars/elantra/01.jpg", "/cars/elantra/02.jpg", "/cars/elantra/03.jpg", "/cars/elantra/04.jpg"],
    real: true,
    condition: { ar: "زيرو بدون خدش، الاستيكر لسه على الكبوت", en: "Like new, not a scratch, factory film still on the bonnet" },
    highlights: [
      { ar: "16 ألف كم فقط", en: "Only 16,000 km" },
      { ar: "شاشة ترفيه وسطية", en: "Central infotainment" },
      { ar: "ESP للتحكم في الثبات", en: "ESP stability control" },
    ],
    features: [
      {
        group: "exterior",
        ar: ["جنوط 15 بوصة", "فوانيس هالوجين", "إضاءة نهارية DRL", "إشارات على المرايات"],
        en: ['15" wheels', "Halogen headlamps", "Daytime running lights", "Mirror indicators"],
      },
      {
        group: "interior",
        ar: ["شاشة وسطية للترفيه", "Bluetooth و USB", "تحكم في الصوت من الطارة", "تكييف يدوي", "زجاج كهرباء", "ريموت سنتر لوك"],
        en: ["Central infotainment screen", "Bluetooth & USB", "Steering audio controls", "Manual A/C", "Power windows", "Remote central locking"],
      },
      {
        group: "safety",
        ar: ["2 وسادة هوائية أمامية", "ABS", "EBD", "ESP / ESC", "حساسات"],
        en: ["2 front airbags", "ABS", "EBD", "ESP / ESC", "Parking sensors"],
      },
    ],
    salesperson: "mostafa",
  },
  {
    id: "mercedes-c200-2019",
    code: "D-103",
    make: "Mercedes-Benz",
    model: "C200",
    trim: { ar: "AMG لاين", en: "AMG Line" },
    year: 2019,
    km: 61000,
    price: 2_650_000,
    body: "sedan",
    engine: "1.5L Turbo EQ Boost",
    gearbox: { ar: "أوتوماتيك 9 سرعات", en: "9G-Tronic automatic" },
    color: { ar: "أسود أوبسيديان", en: "Obsidian black", hex: "#16171A" },
    images: ["/cars/c200.jpg"],
    real: false,
    condition: { ar: "صيانة توكيل، فحص كامل", en: "Dealer-serviced, fully inspected" },
    highlights: [
      { ar: "باكدج AMG", en: "AMG package" },
      { ar: "إضاءة Ambient 64 لون", en: "64-colour ambient light" },
      { ar: "فتحة سقف", en: "Sunroof" },
    ],
    features: [
      { group: "exterior", ar: ["جنوط AMG 18 بوصة", "فوانيس LED High Performance", "فتحة سقف"], en: ['18" AMG wheels', "LED High Performance lights", "Sunroof"] },
      { group: "interior", ar: ["شاشة 10.25 بوصة", "إضاءة Ambient", "تكييف ثنائي", "Apple CarPlay"], en: ['10.25" display', "Ambient lighting", "Dual-zone climate", "Apple CarPlay"] },
      { group: "safety", ar: ["7 وسائد هوائية", "Attention Assist", "كاميرا خلفية"], en: ["7 airbags", "Attention Assist", "Rear camera"] },
    ],
    salesperson: "waleed",
    credit: "c200",
  },
  {
    id: "hyundai-tucson-2022",
    code: "D-104",
    make: "Hyundai",
    model: "Tucson",
    trim: { ar: "توب لاين", en: "Top Line" },
    year: 2022,
    km: 38000,
    price: 1_890_000,
    body: "suv",
    engine: "1.6L T-GDi",
    gearbox: { ar: "أوتوماتيك 7 سرعات DCT", en: "7-speed DCT automatic" },
    color: { ar: "أحمر", en: "Red", hex: "#B3262D" },
    images: ["/cars/tucson.jpg"],
    real: false,
    condition: { ar: "فابريكة بالكامل", en: "Original paint throughout" },
    highlights: [
      { ar: "إضاءة Parametric مخفية", en: "Hidden parametric lights" },
      { ar: "شاشة 10.25 بوصة", en: '10.25" screen' },
      { ar: "شنطة كهرباء", en: "Power tailgate" },
    ],
    features: [
      { group: "exterior", ar: ["جنوط 19 بوصة", "شنطة كهرباء", "فتحة سقف بانوراما"], en: ['19" wheels', "Power tailgate", "Panoramic roof"] },
      { group: "interior", ar: ["عدادات رقمية", "شحن لاسلكي", "تكييف ثنائي"], en: ["Digital cluster", "Wireless charging", "Dual-zone climate"] },
      { group: "safety", ar: ["6 وسائد", "Blind Spot", "Lane Keep Assist"], en: ["6 airbags", "Blind spot monitor", "Lane keep assist"] },
    ],
    salesperson: "mamdouh",
    credit: "tucson",
  },
  {
    id: "toyota-corolla-2022",
    code: "D-105",
    make: "Toyota",
    model: "Corolla",
    trim: { ar: "سمارت", en: "Smart" },
    year: 2022,
    km: 47000,
    price: 1_220_000,
    body: "sedan",
    engine: "1.6L",
    gearbox: { ar: "أوتوماتيك CVT", en: "CVT automatic" },
    color: { ar: "فضي", en: "Silver", hex: "#B9BCC0" },
    images: ["/cars/corolla.jpg"],
    real: false,
    condition: { ar: "رخصة سارية، فحص كامل", en: "Valid licence, fully inspected" },
    highlights: [
      { ar: "اقتصادية جداً في البنزين", en: "Very fuel efficient" },
      { ar: "Toyota Safety Sense", en: "Toyota Safety Sense" },
    ],
    features: [
      { group: "exterior", ar: ["فوانيس LED", "جنوط 16 بوصة"], en: ["LED headlamps", '16" wheels'] },
      { group: "interior", ar: ["شاشة 8 بوصة", "Apple CarPlay", "تكييف أوتوماتيك"], en: ['8" screen', "Apple CarPlay", "Auto climate"] },
      { group: "safety", ar: ["7 وسائد", "Pre-Collision", "Lane Departure Alert"], en: ["7 airbags", "Pre-collision system", "Lane departure alert"] },
    ],
    salesperson: "khaled",
    credit: "corolla",
  },
  {
    id: "chery-tiggo-7-pro-2023",
    code: "D-106",
    make: "Chery",
    model: "Tiggo 7 Pro Max",
    trim: { ar: "لاكشري", en: "Luxury" },
    year: 2023,
    km: 22000,
    price: 1_260_000,
    body: "suv",
    engine: "1.6L Turbo",
    gearbox: { ar: "أوتوماتيك 7 سرعات DCT", en: "7-speed DCT automatic" },
    color: { ar: "رمادي", en: "Grey", hex: "#7A7D82" },
    images: ["/cars/tiggo7.jpg"],
    real: false,
    condition: { ar: "ضمان وكيل ساري", en: "Dealer warranty still active" },
    highlights: [
      { ar: "شاشتين 12.3 بوصة", en: 'Twin 12.3" screens' },
      { ar: "كاميرا 360", en: "360° camera" },
    ],
    features: [
      { group: "exterior", ar: ["فتحة سقف بانوراما", "جنوط 18 بوصة"], en: ["Panoramic roof", '18" wheels'] },
      { group: "interior", ar: ["شاشتين 12.3 بوصة", "شحن لاسلكي", "كاميرا 360"], en: ['Twin 12.3" screens', "Wireless charging", "360° camera"] },
      { group: "safety", ar: ["6 وسائد", "ESP", "Auto Hold"], en: ["6 airbags", "ESP", "Auto Hold"] },
    ],
    salesperson: "mostafa",
    credit: "tiggo7",
  },
  {
    id: "peugeot-3008-2021",
    code: "D-107",
    make: "Peugeot",
    model: "3008",
    trim: { ar: "GT لاين", en: "GT Line" },
    year: 2021,
    km: 54000,
    price: 1_720_000,
    body: "suv",
    engine: "1.6L THP",
    gearbox: { ar: "أوتوماتيك 6 سرعات", en: "6-speed automatic" },
    color: { ar: "أزرق فرتيجو", en: "Vertigo blue", hex: "#1F4FA3" },
    images: ["/cars/p3008.jpg"],
    real: false,
    condition: { ar: "صيانة توكيل كاملة", en: "Full dealer service history" },
    highlights: [
      { ar: "i-Cockpit رقمي", en: "Digital i-Cockpit" },
      { ar: "فوانيس Full LED", en: "Full LED lights" },
    ],
    features: [
      { group: "exterior", ar: ["فوانيس Full LED", "جنوط 18 بوصة"], en: ["Full LED lights", '18" wheels'] },
      { group: "interior", ar: ["i-Cockpit 12.3 بوصة", "إضاءة Ambient"], en: ['12.3" i-Cockpit', "Ambient lighting"] },
      { group: "safety", ar: ["6 وسائد", "Active Safety Brake"], en: ["6 airbags", "Active safety brake"] },
    ],
    salesperson: "mamdouh",
    credit: "p3008",
  },
  {
    id: "bmw-x1-2023",
    code: "D-108",
    make: "BMW",
    model: "X1",
    trim: { ar: "M سبورت", en: "M Sport" },
    year: 2023,
    km: 19000,
    price: 3_450_000,
    body: "suv",
    engine: "2.0L TwinPower Turbo",
    gearbox: { ar: "أوتوماتيك 7 سرعات Steptronic", en: "7-speed Steptronic" },
    color: { ar: "رمادي كيب يورك", en: "Cape York grey", hex: "#6B7C80" },
    images: ["/cars/x1.jpg"],
    real: false,
    condition: { ar: "تحت ضمان الوكيل", en: "Under dealer warranty" },
    highlights: [
      { ar: "BMW Curved Display", en: "BMW Curved Display" },
      { ar: "باكدج M", en: "M package" },
    ],
    features: [
      { group: "exterior", ar: ["باكدج M", "جنوط 19 بوصة"], en: ["M package", '19" wheels'] },
      { group: "interior", ar: ["Curved Display", "Harman Kardon"], en: ["Curved Display", "Harman Kardon"] },
      { group: "safety", ar: ["Driving Assistant", "Parking Assistant"], en: ["Driving Assistant", "Parking Assistant"] },
    ],
    salesperson: "waleed",
    credit: "x1",
  },
  {
    id: "skoda-octavia-2022",
    code: "D-109",
    make: "Skoda",
    model: "Octavia",
    trim: { ar: "ستايل", en: "Style" },
    year: 2022,
    km: 33000,
    price: 1_430_000,
    body: "sedan",
    engine: "1.4L TSI",
    gearbox: { ar: "أوتوماتيك 8 سرعات", en: "8-speed automatic" },
    color: { ar: "أبيض", en: "White", hex: "#EDEDEB" },
    images: ["/cars/octavia.jpg"],
    real: false,
    condition: { ar: "فابريكة بالكامل", en: "Original paint throughout" },
    highlights: [
      { ar: "Virtual Cockpit", en: "Virtual Cockpit" },
      { ar: "شنطة كبيرة جداً", en: "Huge boot" },
    ],
    features: [
      { group: "exterior", ar: ["فوانيس LED Matrix", "جنوط 17 بوصة"], en: ["LED Matrix lights", '17" wheels'] },
      { group: "interior", ar: ["Virtual Cockpit", "شاشة 10 بوصة"], en: ["Virtual Cockpit", '10" screen'] },
      { group: "safety", ar: ["7 وسائد", "Front Assist"], en: ["7 airbags", "Front Assist"] },
    ],
    salesperson: "khaled",
    credit: "octavia",
  },
  {
    id: "mg-zs-2021",
    code: "D-110",
    make: "MG",
    model: "ZS",
    trim: { ar: "لاكشري", en: "Luxury" },
    year: 2021,
    km: 58000,
    price: 845_000,
    body: "suv",
    engine: "1.5L",
    gearbox: { ar: "أوتوماتيك CVT", en: "CVT automatic" },
    color: { ar: "أبيض", en: "White", hex: "#EFEFEC" },
    images: ["/cars/mgzs.jpg"],
    real: false,
    condition: { ar: "رخصة سارية، كاوتش جديد", en: "Valid licence, new tyres" },
    highlights: [
      { ar: "أرخص SUV في المعرض", en: "Most affordable SUV on the floor" },
      { ar: "فتحة سقف بانوراما", en: "Panoramic roof" },
    ],
    features: [
      { group: "exterior", ar: ["فتحة سقف بانوراما", "جنوط 17 بوصة"], en: ["Panoramic roof", '17" wheels'] },
      { group: "interior", ar: ["شاشة 10.1 بوصة", "Apple CarPlay"], en: ['10.1" screen', "Apple CarPlay"] },
      { group: "safety", ar: ["6 وسائد", "ESP", "كاميرا خلفية"], en: ["6 airbags", "ESP", "Rear camera"] },
    ],
    salesperson: "mostafa",
    credit: "mgzs",
  },
];

export const getCar = (id: string) => cars.find((c) => c.id === id);
export const makes = Array.from(new Set(cars.map((c) => c.make))).sort();

export const credits: Record<string, { author: string; license: string; source: string }> = {
  corolla: { author: "Poramin", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Toyota_Corolla_Altis_Front_27082022.jpg" },
  tucson: { author: "MercurySable99", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2022_Hyundai_Tucson_SEL_with_HTRAC_All_Wheel_Drive.jpg" },
  c200: { author: "Tokumeigakarinoao", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_C200_4MATIC_AVANTGARDE_(W205)_front.jpg" },
  tiggo7: { author: "Throwawayacc222", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:2023_Chery_Tiggo7_Pro_Max_grey_front.jpg" },
  mgzs: { author: "Vauxford", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2021_MG_ZS_Exclusive_T-GDi_Automatic_1.0_Rear.jpg" },
  x1: { author: "Alexander Migl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:BMW_U11_X1_M35i_DSC_9809.jpg" },
  p3008: { author: "Alexander Migl", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2021_Peugeot_3008_B_1X7A0344.jpg" },
  octavia: { author: "JustAnotherCarDesigner", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Skoda_Octavia_Pro_001.jpg" },
};
