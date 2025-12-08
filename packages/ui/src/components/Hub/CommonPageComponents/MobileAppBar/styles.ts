import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import { css, styled } from '@mui/material';
import { IconButton as BaseIconButton } from '../../../IconButton';
import { accentShadow } from '../../../../theme';

export const AppBar = styled(MuiAppBar)(({ theme }) => css`
  position: sticky;
  display: inherit;

  ${theme.breakpoints.up('md')} {
    display: none;
  }

  padding: ${theme.spacing(0, 6)};
  background-color: ${theme.palette.background.paper};
  box-shadow: ${accentShadow};
`);

export const IconButton = styled(BaseIconButton)`
  svg {
    width: 34px;
    height: 34px;
  }
`;

export const MobileTitle = styled(Typography)(({ theme }) => css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: ${theme.palette.text.primary};

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);
