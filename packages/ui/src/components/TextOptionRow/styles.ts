import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { menuRowPadding, textOverflowEllipsis } from '../../utils/styles';
import { DownArrowIcon as BaseDownArrowIcon } from '../Icons';
import { menuRowDisabled } from '../../theme';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  ${menuRowPadding()}
`;

type TextProps = {
  disabled: boolean;
};
const TextOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['disabled'].includes(e),
};
const BaseText = styled(Typography, TextOptions)<TextProps>(({ theme, disabled }) => css`
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.primary};
`);

export const Label = styled(Typography, TextOptions)<TextProps>(({ theme, disabled }) => css`
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.secondary};
`);

export const Value = styled(BaseText)`
  max-width: 160px;
  text-align: right;
  ${textOverflowEllipsis}
`;

export const RightArrowIcon = styled(BaseDownArrowIcon)`
  transform: rotate(-90deg);
`;
