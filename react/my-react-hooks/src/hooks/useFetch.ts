import { useCallback, useEffect, useRef, useState } from 'react';

// TODO requestInit 是什么
export const useFetch = <T = unknown>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;
    const signal = controller.signal;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      abortController.current?.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
