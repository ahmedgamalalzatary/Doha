import { cars } from "@/data/cars";
import { CarDetail } from "@/components/car-detail";

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

export default function CarPage() {
  return <CarDetail />;
}
