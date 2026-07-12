/**
 * Deterministic mock time-series generator, standing in for a real
 * `/history?pair=USD/EUR&range=1M` endpoint.
 *
 * Deliberately deterministic (seeded PRNG, no Date.now/Math.random in the
 * component tree) so the chart is stable across renders and testable with a
 * plain snapshot test - a real API response would give us the same property.
 */

const RANGE_CONFIG = {
  '1D': { points: 24, open: 0.8522, seed: 11 },
  '1W': { points: 42, open: 0.8501, seed: 23 },
  '1M': { points: 31, open: 0.8516, seed: 7 },
  '3M': { points: 60, open: 0.8399, seed: 42 },
  '1Y': { points: 52, open: 0.8123, seed: 99 },
  '5Y': { points: 60, open: 0.7654, seed: 5 },
};

// Small mulberry32 PRNG so output is reproducible without a dependency.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function labelFor(range, index, total) {
  const now = new Date('2026-07-12T16:00:00');
  const unit = { '1D': 'h', '1W': 'd', '1M': 'd', '3M': 'd', '1Y': 'w', '5Y': 'm' }[range];
  const stepMs = {
    h: 3600e3,
    d: 86400e3,
    w: 7 * 86400e3,
    m: 30 * 86400e3,
  }[unit];
  const date = new Date(now.getTime() - (total - 1 - index) * stepMs);
  if (unit === 'h') return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Generates a random-walk series for a given range.
 * @param {'1D'|'1W'|'1M'|'3M'|'1Y'|'5Y'} range
 * @returns {{ date: string, value: number }[]}
 */
export function generateHistory(range) {
  const cfg = RANGE_CONFIG[range] ?? RANGE_CONFIG['1M'];
  const rand = mulberry32(cfg.seed);
  const points = [];
  let value = cfg.open;

  for (let i = 0; i < cfg.points; i++) {
    if (i > 0) {
      const drift = (rand() - 0.5) * 0.0055;
      value = Math.max(0.7, value + drift);
    }
    points.push({ date: labelFor(range, i, cfg.points), value: Number(value.toFixed(4)) });
  }

  // Pin the last point to the live "LAST" quote so the chart always agrees
  // with the numbers shown in the stats row above it.
  points[points.length - 1].value = 0.853;
  return points;
}