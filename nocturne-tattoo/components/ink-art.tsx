"use client";

/**
 * InkArt renders original, procedurally generated linework in place of
 * photography. Every piece is deterministic (same seed -> same art), styled
 * to loosely echo the named tattoo category, and drawn only from primitive
 * SVG shapes — no traced or copied artwork.
 */

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GOLD = "#c9a24b";
const GOLD_BRIGHT = "#e3c374";
const OX = "#a32b2b";
const FG = "#f5f1e8";

type Props = {
  seed: number;
  styleSlug?: string;
  className?: string;
  title?: string;
};

export function InkArt({ seed, styleSlug = "blackwork", className, title }: Props) {
  const rnd = mulberry32(seed * 9301 + 49297);
  const W = 400;
  const H = 400;
  const cx = W / 2;
  const cy = H / 2;
  const palette = [GOLD, GOLD_BRIGHT, FG, OX];
  const pick = () => palette[Math.floor(rnd() * palette.length)];

  const els: JSX.Element[] = [];

  const bez = (i: number, strokeW: number, opacity: number, color: string) => {
    const x1 = rnd() * W;
    const y1 = rnd() * H;
    const x2 = rnd() * W;
    const y2 = rnd() * H;
    const cx1 = rnd() * W;
    const cy1 = rnd() * H;
    const cx2 = rnd() * W;
    const cy2 = rnd() * H;
    els.push(
      <path
        key={`b${i}`}
        d={`M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`}
        stroke={color}
        strokeWidth={strokeW}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />
    );
  };

  const ring = (i: number, r: number, strokeW: number, opacity: number, color: string) => {
    els.push(
      <circle
        key={`r${i}`}
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        strokeWidth={strokeW}
        fill="none"
        opacity={opacity}
      />
    );
  };

  const dotField = (i: number, n: number, radius: number, color: string) => {
    const dots = [];
    for (let d = 0; d < n; d++) {
      const angle = rnd() * Math.PI * 2;
      const r = radius * Math.sqrt(rnd());
      dots.push(
        <circle
          key={`d${i}-${d}`}
          cx={cx + Math.cos(angle) * r}
          cy={cy + Math.sin(angle) * r}
          r={0.6 + rnd() * 1.4}
          fill={color}
          opacity={0.5 + rnd() * 0.4}
        />
      );
    }
    els.push(...dots);
  };

  const blob = (i: number, color: string, opacity: number) => {
    const pts = 6;
    const baseR = 60 + rnd() * 60;
    let d = "";
    for (let p = 0; p <= pts; p++) {
      const angle = (p / pts) * Math.PI * 2;
      const r = baseR * (0.6 + rnd() * 0.6);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      d += p === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
    }
    els.push(<path key={`bl${i}`} d={d + "Z"} fill={color} opacity={opacity} />);
  };

  const straightGrid = (i: number, n: number, color: string) => {
    for (let l = 0; l < n; l++) {
      const angle = rnd() * Math.PI;
      const len = 80 + rnd() * 160;
      const ox = rnd() * W;
      const oy = rnd() * H;
      const x2 = ox + Math.cos(angle) * len;
      const y2 = oy + Math.sin(angle) * len;
      els.push(
        <line
          key={`g${i}-${l}`}
          x1={ox}
          y1={oy}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={0.75}
          opacity={0.35 + rnd() * 0.3}
        />
      );
    }
  };

  switch (styleSlug) {
    case "blackwork":
      blob(0, FG, 0.9);
      blob(1, GOLD, 0.15);
      break;
    case "fine-line":
      for (let i = 0; i < 5; i++) bez(i, 0.75, 0.55 + rnd() * 0.3, i % 2 ? GOLD : FG);
      break;
    case "neo-traditional":
      blob(0, OX, 0.7);
      ring(0, 90, 3, 0.8, GOLD);
      for (let i = 0; i < 3; i++) bez(i, 2, 0.6, GOLD_BRIGHT);
      break;
    case "ornamental":
      ring(0, 60, 1, 0.6, GOLD);
      ring(1, 90, 1, 0.4, GOLD);
      ring(2, 120, 0.75, 0.3, FG);
      dotField(0, 90, 130, GOLD);
      break;
    case "realism":
      els.push(
        <ellipse key="e0" cx={cx} cy={cy} rx={110} ry={140} fill="url(#realismGrad)" opacity={0.9} />
      );
      dotField(0, 40, 150, FG);
      break;
    case "japanese":
      for (let i = 0; i < 6; i++) {
        const r = 40 + i * 24;
        els.push(
          <path
            key={`w${i}`}
            d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.6} ${cx + r} ${cy}`}
            stroke={i % 2 ? GOLD : FG}
            strokeWidth={1.2}
            fill="none"
            opacity={0.4}
          />
        );
      }
      break;
    case "script":
      bez(0, 2.5, 0.85, GOLD_BRIGHT);
      bez(1, 1, 0.4, FG);
      break;
    case "geometric":
      straightGrid(0, 14, GOLD);
      ring(0, 70, 1, 0.5, FG);
      break;
    default:
      for (let i = 0; i < 4; i++) bez(i, 1.2, 0.5, pick());
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title ?? "Original generative linework study"}
    >
      <defs>
        <radialGradient id="realismGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={FG} stopOpacity="0.35" />
          <stop offset="100%" stopColor={FG} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`vg${seed}`} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#141210" />
      {els}
      <rect width={W} height={H} fill={`url(#vg${seed})`} />
    </svg>
  );
}
