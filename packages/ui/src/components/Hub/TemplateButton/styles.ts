import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseButton } from '../../BaseButton';
import { styles } from '../../../utils';
import { slightShadow } from '../../../theme';

export const TEMPLATE_BUTTON_WIDTH = '80px';

export const Button = styled(BaseButton)(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  width: ${TEMPLATE_BUTTON_WIDTH};
  height: 96px;
  border-radius: 4px;
  box-shadow: ${slightShadow};
  background-color: ${theme.palette.background.paper};
`);

type TextProps = {
  accent: boolean;
};
const TextOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['accent'].includes(e),
};
export const Text = styled(Typography, TextOptions)<TextProps>(({ theme, accent }) => css`
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  text-align: center;
  color: ${accent === true ? theme.palette.primary.main : theme.palette.text.primary};

  width: 95%;
  ${styles.textOverflowEllipsis};
`);

export const Image = styled('img')`
  object-fit: contain;
`;
