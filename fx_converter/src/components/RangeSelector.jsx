const RANGES = ['1D', '1W', '1M', '3M', '1Y', '5Y'];


export default function RangeSelector({ value, onChange }) {
  return (
    <div className="range-selector" role="tablist" aria-label="Chart range">
      {RANGES.map((r) => (
        <button
          key={r}
          role="tab"
          aria-selected={r === value}
          className={`range-selector__btn ${r === value ? 'is-active' : ''}`}
          onClick={() => onChange(r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export { RANGES };