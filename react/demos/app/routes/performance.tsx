import { useEffect, useRef, useState } from 'react';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Performance' },
    { name: 'description', content: 'performance api demo' },
  ];
}

export default function Performance() {
  const observer = useRef<PerformanceObserver>(null);
  const [info, setInfo] = useState<PerformanceEntry>();

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      observer.current = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setInfo(entry);
        }
      });

      observer.current.observe({ entryTypes: ['longtask'] });
    } else {
      console.log('not support');
    }
  }, []);
  const runLongTask = () => {
    const startTime = performance.now();
    let sum = 0;
    for (let i = 0; i < 5e7; i++) {
      sum += i;
    }
    const endTime = performance.now();
    console.log(`long task cost: ${endTime - startTime}ms`);
  };
  return (
    <div className="w-screen min-h-screen flex items-center justify-center gap-4 flex-col">
      <button
        className="border rounded-2xl px-2 cursor-pointer"
        onClick={() => runLongTask()}
      >
        click to run long task
      </button>
      <div className="">
        <div>
          <strong>Task Type: </strong>
          <span>{info?.name ?? ''}</span>
        </div>
        <div>
          <strong>Task Duration: </strong>
          <span>{Math.round(info?.duration ?? 0)} ms</span>
        </div>
        <div>
          <strong>Task Start Time: </strong>
          <span>{Math.round(info?.startTime ?? 0)} ms</span>
        </div>
        <div>
          <strong>Task Source: </strong>
          <span>{info?.entryType ?? ''}</span>
        </div>
      </div>
    </div>
  );
}
