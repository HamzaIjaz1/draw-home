import { css, styled } from '@mui/material';
import { slightShadow } from '../../../../theme';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
  box-shadow: ${slightShadow};
  border-radius: 10px;
  padding: ${theme.spacing(5, 3)};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(5, 3)};
  }
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(7.5)};
  }
`);
