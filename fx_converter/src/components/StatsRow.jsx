import { formatAmount, formatPercent, formatSigned } from '../utils/format.js';

function StatMetric({ label, value, tone = 'neutral' }) {
  return (
    <div className="stat-metric">
      <span className="stat-metric__label">{label}</span>
      <span className={`stat-metric__value tone-${tone}`}>{value}</span>
    </div>
  );
}


export default function StatsRow({ stats }) {
  if (!stats) {
    return (
      <div className="stats-row stats-row--loading" aria-live="polite">
        Loading…
      </div>
    );
  }

  const isUp = stats.change >= 0;

  return (
    <div className="stats-row">
      <StatMetric label="OPEN" value={formatAmount(stats.open, { decimals: 4 })} />
      <StatMetric label="LAST" value={formatAmount(stats.last, { decimals: 4 })} />
      <StatMetric
        label="CHANGE"
        value={formatSigned(stats.change)}
        tone={isUp ? 'up' : 'down'}
      />
      <StatMetric
        label="% CHANGE"
        value={`${isUp ? '▲' : '▼'} ${formatPercent(stats.changePercent)}`}
        tone={isUp ? 'up' : 'down'}
      />
    </div>
  );
}