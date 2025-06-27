import { useEffect, useRef } from 'react';

interface UseIntervalOptions {
  immediate?: boolean;
}
/**
 * useInterval is a custom React hook that sets up an interval to call a callback function
 * at specified intervals. It can also call the callback immediately when the interval is set.
 *
 * @param callback - The function to be called at each interval.
 * @param delay - The time in milliseconds between each call. If null, the interval is cleared.
 * @param options - Optional settings for the hook, such as immediate execution.
 * @example
 * ```tsx
 * useInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);
 * ```
 */
export const useInterval = (
  callback: () => void,
  delay: number | null,
  options?: UseIntervalOptions
) => {
  const { immediate = false } = options ?? {};
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (immediate && delay != null) {
      savedCallback.current();
    }
    // If immediate is true, call the callback immediately when the interval is set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (delay == null) return;

    const intervalId = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [delay]);
};
