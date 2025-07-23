import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useInterval } from './hooks/useInterval';
import { useHover } from './hooks/useHover';
import { useFetch } from './hooks/useFetch';

function App() {
  const [count, setCount] = useState(0);
  const [hoverRef, isHovered] = useHover();
  const { data, refetch, isLoading } = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  useInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} ref={hoverRef}>
          count is {count}
        </button>
        <p>Button is {isHovered ? 'hovered' : 'not hovered'}</p>
      </div>
      <div className="card">
        <button onClick={refetch}>refetch data</button>
        <div>
          <p>{isLoading ? 'Loading' : 'Fetched'}</p>
          <p>{data && JSON.stringify(data)}</p>
        </div>
      </div>
    </>
  );
}

export default App;
