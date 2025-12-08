import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { css, styled } from '@mui/material';
import { setCssVar } from '../../../utils/styles';

export const iconColorCssVariable = '--icon-color';

type CommonProps = {
  active: boolean;
};
const CommonOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['active'].includes(e),
};

export const StyledLink = styled(MuiLink, CommonOptions)<CommonProps>(({ theme, active }) => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing(5)};
  text-decoration: none;
  height: 24px;

  svg {
    min-width: 18px;
    min-height: 18px;
  }

  ${setCssVar(iconColorCssVariable, theme.palette.text.secondary)}
  :hover, :focus {
    ${setCssVar(iconColorCssVariable, theme.palette.primary.main)}
  }

  ${active === true && css`
    ${setCssVar(iconColorCssVariable, theme.palette.primary.main)}
  `}
`);

export const Text = styled(Typography, CommonOptions)<CommonProps>(({ theme, active }) => css`
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  width: 130px;
  height: 22px;

  ${active === true && css`
    color: ${theme.palette.text.primary};
  `}

  a:hover &, a:focus & {
    color: ${theme.palette.text.primary};
  }
`);
