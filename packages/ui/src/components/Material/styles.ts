import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { menuRowPadding } from '../../utils/styles';
import { menuRowDisabled } from '../../theme';
import { BaseButton } from '../BaseButton';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  ${menuRowPadding()}
`;

export const ButtonWrap = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Button = styled(BaseButton)`
  display: flex;
  gap: 6px;
  padding: 2px;
  border-radius: 6px;
`;

export const Image = styled('img')(({ theme }) => css`
  min-width: 80px;
  max-width: 80px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid ${theme.palette.text.disabled};
`);

type TextProps = {
  disabled: boolean;
};
const TextOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['disabled'].includes(e),
};
export const Text = styled(Typography, TextOptions)<TextProps>(({ theme, disabled }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.secondary};
`);
