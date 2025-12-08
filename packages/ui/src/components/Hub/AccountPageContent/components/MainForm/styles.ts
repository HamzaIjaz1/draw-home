import { css, styled } from '@mui/material';

export const Container = styled('div')`
  width: 100%;
`;

export const FieldContainer = styled('div')(({ theme }) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;

  ${theme.breakpoints.up('md')} {
    max-width: 410px;
  }
`);

export const ButtonsContainer = styled('div')(({ theme }) => css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;

  ${theme.breakpoints.up('md')} {
    justify-content: flex-start;
  }
`);
