"use client";

const thumbClass =
  "pointer-events-none absolute inset-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold " +
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 " +
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold " +
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background";

export function PriceRangeSlider({
  bounds,
  value,
  onChange,
}: {
  bounds: { min: number; max: number };
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const pctLo = ((lo - bounds.min) / (bounds.max - bounds.min)) * 100;
  const pctHi = ((hi - bounds.min) / (bounds.max - bounds.min)) * 100;

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 bg-white/10" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 bg-gold"
          style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
          className={thumbClass}
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
          className={thumbClass}
        />
      </div>
      <p className="mt-3 text-sm text-foreground">
        ₹{lo.toLocaleString("en-IN")} - ₹{hi.toLocaleString("en-IN")}
        {hi === bounds.max ? "+" : ""}
      </p>
    </div>
  );
}
