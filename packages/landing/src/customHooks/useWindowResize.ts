import { useEffect, useRef } from 'react';

export const useWindowResize = (callback: (event: Event) => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleResize = (event: Event) => {
      callbackRef.current(event);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
