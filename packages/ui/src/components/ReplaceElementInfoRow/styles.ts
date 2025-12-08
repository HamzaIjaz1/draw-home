import { css, styled } from '@mui/material';

export const Container = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 10px;
`;

export const Image = styled('img')`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const Text = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  overflow-wrap: anywhere;
`);

export const HighlightedText = styled('span')(({ theme }) => css`
  max-width: 100px;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.primary.main};
  overflow-wrap: anywhere;
`);
