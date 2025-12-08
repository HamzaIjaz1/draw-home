import { css, lighten, styled } from '@mui/material';
import { menuHorizontalGutterWidth } from '../../utils/styles';

const color = '#ffddd6';

type ListItemProps = {
  highlighted: boolean;
};
const ListItemOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['highlighted'].includes(e),
};
export const ListItem = styled('li', ListItemOptions)<ListItemProps>(({ highlighted }) => css`
  list-style-type: none;
  cursor: pointer;
  border-radius: 8px;
  margin-left: ${menuHorizontalGutterWidth}px;
  margin-right: ${menuHorizontalGutterWidth}px;

  ${highlighted === true ? css`
    background-color: ${color};
  ` : css`
    :hover {
      background-color: ${lighten(color, 0.5)};
    }
  `}
`);
