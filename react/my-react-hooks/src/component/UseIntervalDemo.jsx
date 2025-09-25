import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

export function UseIntervalDemo() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}
