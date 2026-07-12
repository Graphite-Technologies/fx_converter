export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeId}
          className={`tabs__tab ${tab.id === activeId ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {typeof tab.count === 'number' && (
            <span className="tabs__count">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}