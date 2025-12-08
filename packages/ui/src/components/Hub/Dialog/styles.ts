import { css, styled } from '@mui/material';
import MuiDialog, { dialogClasses } from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import { IconButton as BaseIconButton } from '../../IconButton';
import { accentShadow } from '../../../theme';

export const Container = styled(MuiDialog)(({ theme, open }) => css`
  --dialog-paper-padding-inline:
    clamp(${theme.spacing(6)}, 21.1765vw - ${theme.spacing(14.6472)}, ${theme.spacing(33)});

  backdrop-filter: blur(5px);

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .${dialogClasses.paper} {
    padding-top: ${theme.spacing(15)};
    padding-bottom: ${theme.spacing(10)};
    padding-left: var(--dialog-paper-padding-inline);
    padding-right: var(--dialog-paper-padding-inline);

    margin: 0;
    box-shadow: ${accentShadow};
    border-radius: 15px;
    width: calc(100% - ${theme.spacing(2 * 3)});
    max-width: 600px;

    /* unset value allows CloseButton to be seen outside of a paper box */
    overflow-y: unset;
  }

  ${open === false && css`
    * {
      pointer-events: none;
    }
  `}

  ${theme.breakpoints.up('md')} {
    --dialog-paper-padding-inline: ${theme.spacing(33)};
  }
`);

export const Title = styled(MuiDialogTitle)(({ theme }) => css`
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  padding: ${theme.spacing(0, 0, 7.5)};
`);

export const Content = styled(MuiDialogContent)(({ theme }) => css`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(7.5)};
`);

export const IconButton = styled(BaseIconButton)(({ theme }) => css`
  position: absolute;
  top: -54px;
  right: -10px;
  z-index: 1;

  width: 52px;
  height: 52px;

  ${theme.breakpoints.up('md')} {
    top: -10px;
    right: -54px;
  }

  svg {
    width: 34px;
    height: 34px;
  }
`);
