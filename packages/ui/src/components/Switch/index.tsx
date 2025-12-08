import { MouseEvent } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import BaseSwitch, { SwitchProps as BaseSwitchProps } from '@mui/material/Switch';
import { menuRowDisabled } from '../../theme';

const StyledSwitch = styled((props: BaseSwitchProps) => (
  <BaseSwitch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme, disabled }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: theme.palette.background.paper,
      '& + .MuiSwitch-track': {
        backgroundColor: disabled === true
          ? menuRowDisabled
          : theme.palette.secondary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.background.paper,
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        backgroundColor: theme.palette.secondary.main,
        border: `6px solid ${theme.palette.background.paper}`,
      },
    },
    '& + .MuiSwitch-track': {
      opacity: 1,
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      backgroundColor: theme.palette.background.paper,
      border: `6px solid ${theme.palette.secondary.main}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      backgroundColor: theme.palette.text.disabled,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundColor: theme.palette.secondary.main,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Switch = (props: SwitchProps & WithClassName) => (
  <StyledSwitch {...props} />
);
