import { useEffect } from 'react';
import { useMousePositionOnWindow } from '../zustand/useMousePositionOnWindow';

export const MousePositionOnWindowTracker: React.FC = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      useMousePositionOnWindow.setState({
        mousePositionOnWindow: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };

    document.addEventListener('mousemove', handler);

    return () => {
      document.removeEventListener('mousemove', handler);
    };
  }, []);

  return null;
};
