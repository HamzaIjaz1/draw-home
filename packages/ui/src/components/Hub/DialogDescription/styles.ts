import { css, styled } from '@mui/material';

export const Container = styled('span')(({ theme }) => css`
  margin-bottom: ${theme.spacing(4)};
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.5px;
`);

export const Text = styled('span')(({ theme }) => css`
  color: ${theme.palette.general.purpleGray};
`);

export const TextHighlighted = styled('span')(({ theme }) => css`
  color: ${theme.palette.primary.main};
`);
