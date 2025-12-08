import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseButton } from '../BaseButton';

export const Button = styled(BaseButton)(({ theme }) => css`
  align-items: flex-start;
  padding: ${theme.spacing(0.5, 0)};
  border-radius: ${theme.spacing(2)};
`);

export const ItemContainer = styled('div')(({ theme }) => css`
  width: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(2)};
`);

export const ArrowContainer = styled('div')`
  width: 28px;
`;

export const Text = styled(Typography)(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
