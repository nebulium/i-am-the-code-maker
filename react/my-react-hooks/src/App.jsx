import './App.css';
import { UseIntervalDemo } from './component/UseIntervalDemo';
import { UseHoverDemo } from './component/UseHoverDemo';
import { UseFetchDemo } from './component/UseFetchDemo';
import { UseScrollSyncDemo } from './component/UseScrollSyncDemo';

function App() {
  return (
    <>
      <UseIntervalDemo />
      <UseHoverDemo />
      <UseFetchDemo />
      <UseScrollSyncDemo />
    </>
  );
}

export default App;
