import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { menuRowDisabled } from '../../theme';

type TitleProps = {
  disabled: boolean;
};
const TitleOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['disabled'].includes(e),
};
export const Title = styled(Typography, TitleOptions)<TitleProps>(({ theme, disabled }) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${disabled === true ? menuRowDisabled : theme.palette.text.secondary};
`);
