import MuiDrawer from '@mui/material/Drawer';
import { css, styled } from '@mui/material';
import { MenuAccount } from '../MenuAccount';
import { IconButton as BaseIconButton } from '../../IconButton';
import { backgroundSecondary } from '../../../theme';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: var(--left-menu-width, 250px);
  flex-grow: 1;
`;

export const StyledMenuAccount = styled(MenuAccount)`
  border-top: 1px solid ${backgroundSecondary};
`;

const commonDrawerStyles = css`
  --left-menu-width: 250px;
  --vertical-bar-width: 60px;
  flex-shrink: 0;
`;

export const DesktopDrawer = styled(MuiDrawer)(({ theme }) => css`
  ${commonDrawerStyles}
  width: var(--left-menu-width);

  display: none;
  ${theme.breakpoints.up('md')} {
    display: inherit;
  }
`);

export const MobileDrawer = styled(MuiDrawer)(({ theme }) => css`
  ${commonDrawerStyles}
  --left-menu-width: clamp(260px, 100vw - 60px, 330px);
  display: inherit;
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);

export const VerticalBar = styled('div')(({ theme }) => css`
  display: flex;
  justify-content: center;
  width: var(--vertical-bar-width);
  height: 100%;
  background-color: #171a21;
  padding-top: ${theme.spacing(6)};
`);

export const IconButton = styled(BaseIconButton)(({ theme }) => css`
  position: sticky;
  top: ${theme.spacing(6)};

  svg {
    width: 34px;
    height: 34px;
  }
`);

export const MobileWrap = styled('div')`
  display: flex;
  flex-grow: 1;
`;
