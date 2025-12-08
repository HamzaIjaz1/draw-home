import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { BaseButton } from '../BaseButton';
import { menuRowHorizontalPadding } from '../../utils/styles';
import { DownArrowIcon as BaseDownArrowIcon } from '../Icons';
import { menuRowDisabled } from '../../theme';

export const StyledBaseButton = styled(BaseButton)`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr auto;
  ${menuRowHorizontalPadding()}
`;

type TextProps = {
  disabled: boolean;
};
const TextOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['disabled'].includes(e),
};
export const Label = styled(Typography, TextOptions)<TextProps>(({ theme, disabled }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.secondary};
  word-break: break-word;
`);

export const RightArrowIcon = styled(BaseDownArrowIcon)`
  transform: rotate(-90deg);
`;
