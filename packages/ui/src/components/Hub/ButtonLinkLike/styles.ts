import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { BaseButton } from '../../BaseButton';
import { setCssVar } from '../../../utils/styles';

export const iconColorCssVariable = '--icon-color';

export type Version = 'normal' | 'smaller';

type CommonProps = {
  active: boolean;
  version: Version;
};

const CommonOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['active', 'version'].includes(e),
};

export const Button = styled(BaseButton, CommonOptions)<CommonProps>(({ theme, active, version }) => css`
  display: flex;
  width: fit-content;
  gap: ${version === 'normal' ? theme.spacing(5) : theme.spacing(2.5)};
  padding: ${theme.spacing(0)};
  height: 19px;

  ${setCssVar(iconColorCssVariable, theme.palette.text.secondary)}
  :hover, :focus {
    ${setCssVar(iconColorCssVariable, theme.palette.primary.main)}
    background-color: transparent;
  }

  ${active === true && css`
    ${setCssVar(iconColorCssVariable, theme.palette.primary.main)}
  `}

  svg {
    min-width: 14px;
    min-height: 14px;
  }
`);

export const Text = styled(Typography, CommonOptions)<CommonProps>(({ theme, active, version }) => css`
  font-size: ${version === 'normal' ? '16px' : '14px'};
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  max-width: 130px;
  height: 18px;

  ${active === true && css`
    color: ${theme.palette.text.primary};
  `}

  button:hover &, button:focus & {
    color: ${version === 'smaller' ? theme.palette.primary.main : theme.palette.text.primary};
  }
`);
