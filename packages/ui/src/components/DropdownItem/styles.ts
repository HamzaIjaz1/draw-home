import MuiMenuItem from '@mui/material/MenuItem';
import { alpha, css, styled } from '@mui/material';
import { textOverflowEllipsis } from '../../utils/styles';

export const MenuItem = styled(MuiMenuItem)(({ theme }) => css`
  height: 48px;
  justify-content: space-between;

  ul > &:first-of-type {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  ul > &:last-of-type {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  :hover {
    background-color: ${alpha(theme.palette.action.hover, theme.palette.action.hoverOpacity)};
  }
`);

export const Text = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  ${textOverflowEllipsis}
`);

export const Image = styled('img')`
  width: 24px;
  aspect-ratio: 1 / 1;
`;
