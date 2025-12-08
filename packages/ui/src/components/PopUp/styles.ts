import { css, styled } from '@mui/material';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { accentShadow } from '../../theme';
import { CssVariable, getCssVar } from '../../utils/styles';

export const cssVars = {
  padding: '--popup-base-paper-padding',
} satisfies Record<string, CssVariable>;

export const Container = styled(Dialog)(({ open }) => css`
  backdrop-filter: blur(5px);

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .${dialogClasses.paper} {
    padding: ${getCssVar(cssVars.padding)};
    margin: 0;
    box-shadow: ${accentShadow};
    border-radius: 20px;
    width: calc(100% - 24px);
    max-width: 450px;
    align-items: center;
  }

  ${open === false && css`
    * {
      pointer-events: none;
    }
  `}
`);
