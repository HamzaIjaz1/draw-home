import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import MuiDivider from '@mui/material/Divider';
import { menuHorizontalGutterWidth } from '../../utils/styles';
import { $Props, $props } from '../../utils/$props';

const StyledDivider = styled(MuiDivider, $props())<$Props<{
  $fullWidth: boolean;
}>>(({ $fullWidth }) => css`
  ${$fullWidth === false && css`
    width: calc(100% - ${2 * menuHorizontalGutterWidth}px);
  `};

  && {
    margin: 0 auto;
  }
`);

export type DividerProps = {
  fullWidth?: boolean;
};

export const Divider = ({ className, fullWidth = false }: DividerProps & WithClassName) => (
  <StyledDivider
    className={className}
    $fullWidth={fullWidth}
    aria-hidden='true'
  />
);
