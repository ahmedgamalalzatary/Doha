export const brand = {
  nameAr: "دوحه موتورز",
  nameEn: "AUTO DOHA",
  taglineAr: "اسم له تاريخ",
  taglineEn: "A name with history",
  mottoAr: "مملكة كسر الزيرو الحقيقي",
  mottoEn: "The home of truly like-new cars",
  signoffAr: "دوحة موتورز الاختيار الأنسب",
  signoffEn: "Doha Motors, the right choice",
  mainPhone: "01006250760",
  addressAr: "الفيوم / دلة / شارع مدرسة الزراعة / أمام أبراج المستشارين",
  addressEn: "Dala, Agricultural School St., facing Al-Mostasharin Towers, Faiyum",
  map: { lat: 29.322563, lng: 30.853912 },
  mapUrl: "https://maps.google.com/?q=29.322563,30.853912",
  facebook: "https://www.facebook.com/people/AUTO-DOHA/100064067554086/",
  instagram: "https://www.instagram.com/auto_doha_1",
  followers: "25K",
};

export type Salesperson = {
  id: string;
  nameAr: string;
  nameEn: string;
  phone: string;
};

export const salespeople: Salesperson[] = [
  { id: "waleed", nameAr: "وليد ممدوح", nameEn: "Waleed Mamdouh", phone: "01006250760" },
  { id: "mostafa", nameAr: "مصطفى BK", nameEn: "Mostafa BK", phone: "01005289258" },
  { id: "mamdouh", nameAr: "ممدوح وليد", nameEn: "Mamdouh Waleed", phone: "01017877630" },
  { id: "khaled", nameAr: "خالد وليد", nameEn: "Khaled Waleed", phone: "01095291926" },
];

export const telHref = (phone: string) => `tel:+2${phone}`;
export const waHref = (phone: string, text?: string) =>
  `https://wa.me/2${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
