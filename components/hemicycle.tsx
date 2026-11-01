import React from "react";

export type HemicycleSeat = {
  seatNumber: number;
  color: string;
  label?: string;
  sublabel?: string;
};

export function computeHemicyclePositions(total: number): { x: number; y: number; r: number; angle: number }[] {
  const cx = 180;
  const cy = 166;

  if (total <= 0) return [];

  if (total <= 7) {
    const radius = 112;
    const dotR = total <= 5 ? 22 : 18;
    return Array.from({ length: total }, (_, i) => {
      const angle = total === 1 ? Math.PI / 2 : Math.PI * (1 - i / (total - 1));
      return {
        x: cx + radius * Math.cos(angle),
        y: cy - radius * Math.sin(angle),
        r: dotR,
        angle,
      };
    });
  }

  // Two concentric semicircular arcs (e.g. 15 seats = 6 inner + 9 outer; 10 seats = 4 inner + 6 outer)
  const innerCount = Math.floor(total * 0.4);
  const outerCount = total - innerCount;
  const outerR = 128;
  const innerR = 76;
  const dotR = total <= 10 ? 21 : total <= 15 ? 19.5 : 15;

  const raw: { x: number; y: number; r: number; angle: number; row: number }[] = [];

  for (let i = 0; i < outerCount; i++) {
    const angle = outerCount === 1 ? Math.PI / 2 : Math.PI * (1 - i / (outerCount - 1));
    raw.push({
      x: cx + outerR * Math.cos(angle),
      y: cy - outerR * Math.sin(angle),
      r: dotR,
      angle,
      row: 1,
    });
  }

  for (let i = 0; i < innerCount; i++) {
    const angle = innerCount === 1 ? Math.PI / 2 : Math.PI * (1 - i / (innerCount - 1));
    raw.push({
      x: cx + innerR * Math.cos(angle),
      y: cy - innerR * Math.sin(angle),
      r: dotR,
      angle,
      row: 0,
    });
  }

  raw.sort((a, b) => {
    if (Math.abs(b.angle - a.angle) > 0.05) return b.angle - a.angle;
    return b.row - a.row;
  });

  return raw;
}

export function HemicycleChart({
  seats,
  selectedSeat,
  onSelectSeat,
  title,
  subtitle,
}: {
  seats: HemicycleSeat[];
  selectedSeat?: number | null;
  onSelectSeat?: (seatNumber: number) => void;
  title?: string;
  subtitle?: string;
}) {
  const positions = computeHemicyclePositions(seats.length);

  return (
    <div className="flex flex-col items-center">
      {title && <h4 className="mb-1 text-center font-serif text-base font-bold text-heading">{title}</h4>}
      {subtitle && <p className="mb-3 text-center text-xs text-muted">{subtitle}</p>}
      <div className="w-full max-w-[360px] rounded-lg border border-border bg-bg-alt/70 p-3 shadow-inner">
        <svg viewBox="0 0 360 198" className="w-full overflow-visible" role="img" aria-label={title ?? `Parliamentary hemicycle (${seats.length} seats)`}>
          {positions.map((pos, idx) => {
            const seat = seats[idx];
            if (!seat) return null;
            const isSelected = selectedSeat === seat.seatNumber;
            const isLight =
              seat.color.toLowerCase() === "#ffffff" ||
              seat.color.toLowerCase() === "#f8fafc" ||
              seat.color.toLowerCase() === "#d9d9d9";

            return (
              <g
                key={seat.seatNumber}
                onClick={onSelectSeat ? () => onSelectSeat(seat.seatNumber) : undefined}
                className={onSelectSeat ? "cursor-pointer transition-transform hover:scale-110" : undefined}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              >
                <title>
                  {`Seat #${seat.seatNumber}${seat.label ? ` — ${seat.label}` : ""}${seat.sublabel ? ` (${seat.sublabel})` : ""}`}
                </title>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.r}
                  fill={seat.color}
                  stroke={isSelected ? "#d4af37" : isLight ? "#94a3b8" : "rgba(15,23,42,0.18)"}
                  strokeWidth={isSelected ? 3.5 : isLight ? 1.75 : 1.2}
                />
                {onSelectSeat && (
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    className="pointer-events-none select-none text-[10px] font-bold"
                    fill={isLight ? "#1e293b" : "#ffffff"}
                  >
                    {seat.seatNumber}
                  </text>
                )}
              </g>
            );
          })}
          <text
            x={180}
            y={174}
            textAnchor="middle"
            className="select-none font-serif text-4xl font-bold"
            fill="currentColor"
          >
            {seats.length}
          </text>
        </svg>
      </div>
    </div>
  );
}
