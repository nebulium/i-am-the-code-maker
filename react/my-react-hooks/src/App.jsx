import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useInterval } from './hooks/useInterval';
import { useHover } from './hooks/useHover';

function App() {
  const [count, setCount] = useState(0);
  const [hoverRef, isHovered] = useHover();

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
