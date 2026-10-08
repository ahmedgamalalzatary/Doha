"use client";

import { WaterwheelHero } from "./waterwheel-hero";
import { Lake, PlateGrid, ShowroomReel, Strata } from "./home-sections";

export function FaiyumHome() {
  return (
    <>
      <WaterwheelHero />
      <Strata />
      <ShowroomReel />
      <PlateGrid />
      <Lake />
    </>
  );
}
