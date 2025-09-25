import { useHover } from '../hooks/useHover';

export function UseHoverDemo() {
  const [hoverRef, isHovered] = useHover();
  return (
    <div className="card">
      <button ref={hoverRef}>hover me</button>
      <p>Button is {isHovered ? 'hovered' : 'not hovered'}</p>
    </div>
  );
}
