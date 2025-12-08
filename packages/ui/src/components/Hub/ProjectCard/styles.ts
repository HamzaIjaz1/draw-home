import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import MuiInput from '@mui/material/InputBase';
import { slightShadow } from '../../../theme';
import { BaseButton } from '../../BaseButton';
import { ThreeDotsIcon } from '../../Icons';
import { setCssVar } from '../../../utils/styles';
import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from './constants';

export const Card = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${CARD_WIDTH_MOBILE};
  height: 160px;
  border-radius: 6px;
  box-shadow: ${slightShadow};
  background-color: ${theme.palette.background.paper};

  position: relative;

  ${theme.breakpoints.up('md')} {
    width: ${CARD_WIDTH_DESKTOP};
    height: 198px;
  }
`);

export const Image = styled('img')(({ theme }) => css`
  width: 100%;
  padding: ${theme.spacing(3)};
  object-fit: contain;
`);

export const Link = styled('a')`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`;

export const InputContainer = styled('div')(({ theme }) => css`
  width: 100%;
  // I use this oddly precise padding-top to keep the image above
  // from moving when the button turns into an input
  padding: ${theme.spacing(1.25, 3, 2.5)};
`);


export const Input = styled(MuiInput)(({ theme }) => css`
  width: 100%;
  border-radius: 5px;
  background-color: #f3f3f3;

  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: ${theme.palette.common.black};

  input {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }
`);

export const TitleButton = styled(BaseButton)(({ theme }) => css`
  padding: ${theme.spacing(3)};
  justify-content: space-between;

  :hover {
    background-color: transparent;
  }
`);

export const moreIconCssVariable = '--project-card-title-more-icon';

export const MoreIcon = styled(ThreeDotsIcon)(({ theme }) => css`
  ${setCssVar(moreIconCssVariable, theme.palette.common.black)};

  button:hover &, button:focus & {
    ${setCssVar(moreIconCssVariable, theme.palette.primary.main)};
  }
`);

export const Title = styled(Typography)(({ theme }) => css`
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: ${theme.palette.common.black};

  button:hover &, button:focus & {
    color: ${theme.palette.primary.main};
  }
`);
