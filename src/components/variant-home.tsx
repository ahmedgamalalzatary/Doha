"use client";

import { useVariant } from "@/lib/use-variant";
import { FaiyumHome } from "@/components/faiyum/home";
import { ShowroomHome } from "@/components/showroom/home";
import { ClassicHome } from "@/components/classic/home";

const homes = { faiyum: FaiyumHome, showroom: ShowroomHome, classic: ClassicHome };

export function VariantHome() {
  const H = homes[useVariant()];
  return <H />;
}
