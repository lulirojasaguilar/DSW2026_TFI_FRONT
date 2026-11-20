import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const TICK_MS = 30000;

const timeAgo = (since) => {
  const minutes = Math.floor((Date.now() - since.getTime()) / 60000);

  return minutes < 1 ? 'hace un momento' : `hace ${minutes} min`;
};

export default function LastUpdate({ updatedAt }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), TICK_MS);

    return () => clearInterval(timer);
  }, []);

  if (!updatedAt) return null;

  return (
    <span className="flex items-center gap-1.5 text-xs text-muted">
      <RefreshCw className="h-3.5 w-3.5" /> Última actualización:{' '}
      {timeAgo(updatedAt)}
    </span>
  );
}
