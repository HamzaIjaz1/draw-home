import { useCallback, useEffect, useState } from 'react';
import { breakpointMdNumber } from '../commonStyles';

export const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    if(isMobileMenuOpen === false) {
      return;
    }

    const closeMobileMenuOnDesktop = () => {
      if(window.innerWidth >= breakpointMdNumber) {
        closeMobileMenu();
      }
    };

    closeMobileMenuOnDesktop();

    window.addEventListener('resize', closeMobileMenuOnDesktop);

    return () => {
      window.removeEventListener('resize', closeMobileMenuOnDesktop);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  };
};
