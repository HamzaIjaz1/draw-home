import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import {
  AppBar,
  IconButton,
  MobileTitle,
} from './styles';

export type MobileAppBarProps = {
  pageTitle: string;
  onOpenSideMenu: () => void;
};

export const MobileAppBar = ({
  className,
  pageTitle,
  onOpenSideMenu,
}: MobileAppBarProps & WithClassName) => {
  const theme = useTheme();

  return (
    <AppBar className={className}>
      <Toolbar>
        <IconButton
          icon='hamburger'
          size='md'
          variant='text'
          iconColors={{
            default: theme.palette.text.primary,
          }}
          onClick={onOpenSideMenu}
        />
        <MobileTitle variant='h1'>{pageTitle}</MobileTitle>
      </Toolbar>
    </AppBar>
  );
};
