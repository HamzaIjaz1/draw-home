import { css, styled } from '@mui/material';

export const Container = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

export const Label = styled('label')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
