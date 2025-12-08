import { useEffect, useRef } from 'react';

export const useRefreshDetection = (e: unknown) => {
  const isFirstTime = useRef(false);
  console.info('useRefreshDetection hook: You should see only this string.');

  useEffect(() => {
    if(isFirstTime.current === false) {
      isFirstTime.current = true;
      return;
    }

    console.info('useRefreshDetection hook: Change detected!', e);
  }, [e]);
};
