import { css, styled } from '@mui/material';

export const Container = styled('main')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(7.5)};
  padding: ${theme.spacing(7.5, 3)};
  min-height: 100vh;
  flex-grow: 1;
  background-color: #f8f8f8;

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(8, 5)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(10)};
  }
`);
