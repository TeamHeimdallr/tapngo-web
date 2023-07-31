import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number, setStatus: (value: string) => void): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const regex = /^\d+$/;
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    if (regex.test(value as string)) setStatus('type');
    return () => {
      clearTimeout(timer);
      if (regex.test(value as string)) setStatus('done');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debouncedValue;
}
