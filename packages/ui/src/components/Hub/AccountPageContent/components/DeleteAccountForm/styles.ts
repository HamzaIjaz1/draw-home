import { css, styled } from '@mui/material';

export const FieldContainer = styled('div')(({ theme }) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing(30)};
`);
