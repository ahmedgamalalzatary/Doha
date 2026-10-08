export const FLAT_RATE = 0.14;

/** Flat-rate car loan, the way Egyptian banks usually quote it. */
export function monthlyInstallment(price: number, downPct: number, months: number) {
  const principal = price * (1 - downPct / 100);
  const interest = principal * FLAT_RATE * (months / 12);
  return Math.round((principal + interest) / months);
}

export function downPaymentAmount(price: number, downPct: number) {
  return Math.round((price * downPct) / 100);
}
