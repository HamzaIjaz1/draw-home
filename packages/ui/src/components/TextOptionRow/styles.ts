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
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.secondary};
`);

export const Label = BaseText;

export const Value = styled(BaseText)`
  max-width: 160px;
  text-align: right;
  ${textOverflowEllipsis}
`;

export const RightArrowIcon = styled(BaseDownArrowIcon)`
  transform: rotate(-90deg);
`;
