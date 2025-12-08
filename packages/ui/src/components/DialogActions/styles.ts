import { css, styled } from '@mui/material';
import { createStyledOptions } from '../../utils/createStyledOptions';
import { menuHorizontalGutterWidth } from '../../utils/styles';

type Props = {
  onlyPrimary: boolean;
  paddingHorizontal: boolean;
};
const options = createStyledOptions<Props>({
  onlyPrimary: true,
  paddingHorizontal: true,
});

export const Actions = styled('div', options)<Props>(({ theme, onlyPrimary, paddingHorizontal }) => css`
  display: flex;
  flex-direction: row;
  justify-content: ${onlyPrimary === true ? 'center' : 'space-between'};
  padding: ${paddingHorizontal === false ? 0 : `0 ${menuHorizontalGutterWidth}px`};

  ${theme.breakpoints.up(400)} {
    justify-content: center;
    gap: 20px;
  }
`);
