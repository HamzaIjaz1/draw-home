import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { BaseButton } from '../BaseButton';
import type { MaterialPickerProps } from '.';
import { getCssVar, menuRowHorizontalPadding, setCssVar } from '../../utils/styles';
import { $Props, $props } from '../../utils/$props';
import { lookup } from '../../utils/lookup';

const columnsCssVar = '--material-picker-columns';

export const Container = styled('div')(({ theme }) => css`
  ${setCssVar(columnsCssVar, '3')}
  display: grid;
  grid-template-columns: repeat(${getCssVar(columnsCssVar)}, 1fr);
  justify-items: center;

  ${theme.breakpoints.up(390)} {
    ${setCssVar(columnsCssVar, '4')}
  }

  ${menuRowHorizontalPadding()}
`);

export const Material = styled(BaseButton)(({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  gap: 4px;
  width: 85px;
  height: min-content;
  ${theme.breakpoints.up('md')} {
    width: 78px;
  }
`);

export const Image = styled('img', $props())<$Props<{
  $active: boolean;
  $shape: MaterialPickerProps['shape'];
  $showBorder: boolean;
}>>(({ theme, $active, $shape, $showBorder }) => css`
  width: 82px;
  height: 82px;
  border-radius: ${lookup($shape, { round: '50%', square: '0' })};
  object-fit: ${$shape === 'round' ? 'cover' : 'contain'};

  ${$showBorder === true && css`
    border: 2px solid ${$active ? theme.palette.primary.main : theme.palette.text.disabled};
  `}

  ${theme.breakpoints.up('md')} {
    width: 66px;
    height: 66px;
  }
`);

export const Text = styled(Typography)(({ theme }) => css`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);
