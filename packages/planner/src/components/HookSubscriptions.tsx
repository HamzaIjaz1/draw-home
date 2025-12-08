import { useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useIsDesktopMenu } from '../zustand';

export const HookSubscriptions: React.FC = () => {
  const theme = useTheme();
  const isDesktopMenuScreenWidth = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if(useIsDesktopMenu.getState().isDesktopMenu !== isDesktopMenuScreenWidth) {
      useIsDesktopMenu.setState({ isDesktopMenu: isDesktopMenuScreenWidth });
    }
  }, [isDesktopMenuScreenWidth]);

  return null;
};
