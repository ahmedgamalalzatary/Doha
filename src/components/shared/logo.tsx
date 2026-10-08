import clsx from "clsx";

/** The rim from the "o" in the AUTO DOHA wordmark. */
export function Wheel({ className, spokes = 5 }: { className?: string; spokes?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
      {Array.from({ length: spokes }).map((_, i) => (
        <path
          key={i}
          d="M46 40 L42 12 Q50 9 58 12 L54 40 Z"
          fill="currentColor"
          transform={`rotate(${(360 / spokes) * i} 50 50)`}
        />
      ))}
    </svg>
  );
}

/** Wordmark rebuilt as live type so it stays crisp at any size. */
export function Logo({ className, wheelClassName }: { className?: string; wheelClassName?: string }) {
  return (
    <span
      dir="ltr"
      className={clsx("inline-flex items-center font-[family-name:var(--font-alexandria)] font-extrabold leading-none tracking-[-0.03em]", className)}
      aria-label="AUTO DOHA"
    >
      <span aria-hidden="true">Aut</span>
      <Wheel className={clsx("mx-[0.04em] h-[0.78em] w-[0.78em]", wheelClassName)} />
      <span
        aria-hidden="true"
        className="ms-[0.18em] inline-grid h-[1.15em] w-[1.15em] place-items-center rounded-full border-[0.11em] border-current text-[0.8em]"
      >
        D
      </span>
    </span>
  );
}
