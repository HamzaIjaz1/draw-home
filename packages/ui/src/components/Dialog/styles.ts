import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconButton } from '../IconButton';
import { createStyledOptions } from '../../utils/createStyledOptions';
import { PopUp, PopUpCssVars } from '../PopUp';
import { setCssVar } from '../../utils/styles';

export const Container = styled(PopUp)(({ theme }) => css`
  ${setCssVar(PopUpCssVars.padding, '30px 16px 20px')}

  ${theme.breakpoints.up('md')} {
    ${setCssVar(PopUpCssVars.padding, '30px 20px 20px')}
  }
`);

type TitleProps = {
  withMarginTop: boolean;
};
const TitleOptions = createStyledOptions<TitleProps>({
  withMarginTop: true,
});
export const Title = styled(Typography, TitleOptions)<TitleProps>(({ theme, withMarginTop }) => css`
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  text-align: center;
  overflow-wrap: anywhere;
  margin-bottom: 16px;

  ${withMarginTop === true && css`
    margin-top: 10px;
  `}

  ${theme.breakpoints.up('md')} {
    font-size: 22px;
    line-height: 26px;
  }
`);

export const Content = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
`;

export const IconContainer = styled('div')`
  display: flex;
  margin-bottom: 30px;
`;
