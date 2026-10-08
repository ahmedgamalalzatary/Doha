export const variants = ["faiyum", "showroom", "classic"] as const;
export type Variant = (typeof variants)[number];

export const variantInfo: Record<Variant, { ar: string; en: string; noteAr: string; noteEn: string }> = {
  faiyum: { ar: "الفيوم", en: "Faiyum", noteAr: "رمل وادي الريان وبحيرة قارون", noteEn: "Desert sand & Lake Qarun" },
  showroom: { ar: "المعرض", en: "Showroom", noteAr: "حجر أبيض وخطوط إضاءة", noteEn: "White stone & light lines" },
  classic: { ar: "كلاسيك", en: "Classic", noteAr: "وكيل فاخر تقليدي", noteEn: "Classic premium dealer" },
};

export const isVariant = (v: string): v is Variant => (variants as readonly string[]).includes(v);
