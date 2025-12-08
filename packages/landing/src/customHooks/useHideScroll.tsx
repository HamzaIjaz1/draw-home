import { useEffect } from 'react';

export const useHideScroll = (shouldHide: boolean) => {
  useEffect(() => {
    if(shouldHide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldHide]);
};
