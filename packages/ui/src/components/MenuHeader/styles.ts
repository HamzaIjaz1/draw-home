import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { IconButton } from '../IconButton';
import { styles } from '../../utils';
import { $Props, $props } from '../../utils/$props';
import {
  menuHorizontalGutterWidth,
  menuRowHorizontalPadding,
} from '../../utils/styles';

export const Header = styled('div', $props())<$Props<{
  $noHeight: boolean;
}>>(({ $noHeight }) => css`
  ${$noHeight === false && css`
    height: 40px;
  `}

  width: 100%;
  ${menuRowHorizontalPadding()}

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`);

export const BackButton = styled(IconButton)`
  position: absolute;
  left: ${menuHorizontalGutterWidth / 2}px;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: ${menuHorizontalGutterWidth / 2}px;
`;

export const Text = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;

  width: 75%;
  ${styles.textOverflowEllipsis}
`;
