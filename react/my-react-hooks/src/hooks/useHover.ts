import { type RefObject, useEffect, useRef, useState } from 'react';

export const useHover = (): [RefObject<HTMLElement | null>, boolean] => {
  const hoverRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = hoverRef?.current;
    if (!element) return;
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [hoverRef, isHovered];
};
