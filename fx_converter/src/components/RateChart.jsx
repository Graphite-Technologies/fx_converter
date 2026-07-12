import { useMemo, useRef, useState } from 'react';
import { formatAmount } from '../utils/format.js';

const WIDTH = 720;
const HEIGHT = 220;
const PADDING_Y = 16;

export default function RateChart({ data, pairLabel }) {
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const { linePath, areaPath, points, minValue, maxValue } = useMemo(() => {
    if (data.length === 0) {
      return { linePath: '', areaPath: '', points: [], minValue: 0, maxValue: 0 };
    }
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;

    const pts = data.map((d, i) => {
      const x = (i / (data.length - 1)) * WIDTH;
      const y =
        HEIGHT -
        PADDING_Y -
        ((d.value - minValue) / range) * (HEIGHT - PADDING_Y * 2);
      return { x, y, ...d };
    });

    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const area = `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

    return { linePath: line, areaPath: area, points: pts, minValue, maxValue };
  }, [data]);

  function handleMove(e) {
    if (points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const index = Math.min(
      points.length - 1,
      Math.max(0, Math.round(ratio * (points.length - 1)))
    );
    setHoverIndex(index);
  }

  if (data.length === 0) {
    return <div className="rate-chart rate-chart--empty">Loading chart…</div>;
  }

  const active = points[hoverIndex ?? points.length - 1];

  return (
    <div className="rate-chart">
      <div className="rate-chart__header">
        <span className="rate-chart__pair">{pairLabel}</span>
        <span className="rate-chart__reading">
          {formatAmount(active.value, { decimals: 4 })} · {active.date}
        </span>
      </div>

      <svg
        ref={svgRef}
        className="rate-chart__svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
        role="img"
        aria-label={`${pairLabel} rate chart`}
      >
        <defs>
          <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#rateFill)" stroke="none" />
        <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="1.5" />

        {hoverIndex !== null && (
          <line
            x1={active.x}
            x2={active.x}
            y1="0"
            y2={HEIGHT}
            stroke="var(--border-bright)"
            strokeDasharray="3 3"
          />
        )}
        <circle cx={active.x} cy={active.y} r="3.5" fill="var(--accent)" />
      </svg>

      <div className="rate-chart__axis">
        <span>{formatAmount(minValue, { decimals: 4 })}</span>
        <span>{formatAmount(maxValue, { decimals: 4 })}</span>
      </div>
      <div className="rate-chart__dates">
        <span>{data[0].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
}