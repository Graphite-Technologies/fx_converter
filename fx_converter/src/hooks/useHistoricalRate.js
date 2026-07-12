import { useEffect, useMemo, useState } from 'react';
import { generateHistory } from '../data/historyData.js';

export function useHistoricalRates(range) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (cancelled) return;
      setData(generateHistory(range));
      setIsLoading(false);
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [range]);

  const stats = useMemo(() => {
    if (data.length === 0) return null;
    const open = data[0].value;
    const last = data[data.length - 1].value;
    const change = last - open;
    const changePercent = (change / open) * 100;
    const values = data.map((d) => d.value);
    return {
      open,
      last,
      change,
      changePercent,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [data]);

  return { data, stats, isLoading };
}