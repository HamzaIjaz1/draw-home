import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@draw-house/ui/dist/theme';
import { Pages } from './components/Pages';
import { Snackbars } from './components/Snackbars';
import { CustomLogs } from './components/CustomLogs';
import { HookSubscriptions } from './components/HookSubscriptions';
import { PreloadFonts } from './components/PreloadFonts';
import { requestToLoadStrapiAppConfig, useStrapiAppConfig } from './zustand/useStrapiAppConfig';
import { isResolved } from './utils/isResolved';

export const App: React.FC = () => {
  useEffect(() => {
    void requestToLoadStrapiAppConfig();
  }, []);

  const { strapiAppConfig } = useStrapiAppConfig();

  return isResolved(strapiAppConfig) && (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HookSubscriptions />
      <Pages />
      <Snackbars />
      <CustomLogs />
      <PreloadFonts />
    </ThemeProvider>
  );
};
