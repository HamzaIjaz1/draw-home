import { css, styled, Theme } from '@mui/material';
import Paper from '@mui/material/Paper';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiMenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from '../constants';
import { setCssVar } from '../../../../utils/styles';
import {
  BinIcon as BaseBinIcon,
  PencilIcon as BasePencilIcon,
} from '../../../Icons';

export const Container = styled(Paper)(({ theme }) => css`
  position: absolute;
  top: calc(100% + ${theme.spacing(3)});
  z-index: 1;
  width: ${CARD_WIDTH_MOBILE};
  border-radius: 5px;

  ${theme.breakpoints.up('md')} {
    width: ${CARD_WIDTH_DESKTOP};
  }
`);

export const MenuList = styled(MuiMenuList)`
  padding: 0;
`;

export const MenuItem = styled(MuiMenuItem)(({ theme }) => css`
  padding: ${theme.spacing(0, 3, 0, 1)};
  height: 30px;
  min-height: unset;

  :hover {
    background-color: #ffefed;
  }
`);

export const ListItemIcon = styled(MuiListItemIcon)`
  justify-content: center;
`;

export const Text = styled(Typography)(({ theme }) => css`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: ${theme.palette.general.purpleGray};

  li:hover &, li:focus & {
    color: ${theme.palette.primary.main};
  }
`);

export const iconCssVariable = '--project-card-menu-option-icon';

export const getIconCss = (theme: Theme) => css`
  ${setCssVar(iconCssVariable, theme.palette.general.purpleGray)}
  li:hover &, li:focus & {
    ${setCssVar(iconCssVariable, theme.palette.primary.main)}
  }
`;

export const BinIcon = styled(BaseBinIcon)`
   width: 20px;
   height: 20px;
`;

export const PencilIcon = styled(BasePencilIcon)`
  width: 14px;
  height: 18px;
`;
