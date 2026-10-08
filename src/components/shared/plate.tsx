import clsx from "clsx";

/** The gold-on-black dealer plate every AUTO DOHA car wears. */
export function Plate({
  top = "DOHA",
  bottom = "01006250760",
  className,
}: {
  top?: string;
  bottom?: string;
  className?: string;
}) {
  return (
    <span
      dir="ltr"
      className={clsx(
        "inline-flex flex-col items-center justify-center rounded-[3px] bg-[#050505] px-[0.9em] py-[0.35em] leading-none text-[#d8b25c] shadow-[inset_0_0_0_1px_#d8b25c,inset_0_0_0_3px_#050505,inset_0_0_0_4px_rgba(216,178,92,0.45)]",
        className,
      )}
    >
      <span className="font-[family-name:var(--font-kufi)] text-[1.15em] font-bold tracking-[0.12em]">{top}</span>
      <span className="tnum mt-[0.2em] text-[0.62em] font-medium tracking-[0.08em] opacity-90">{bottom}</span>
    </span>
  );
}
