import Snackbar from '@mui/material/Snackbar';
import { css, styled, Theme } from '@mui/material';
import { createStyledOptions } from '../../utils/createStyledOptions';

export type StyledSnackbarProps = {
  type: 'success' | 'warning' | 'neutral';
};

const CommonOptions = createStyledOptions<StyledSnackbarProps>({
  type: true,
});

const getBorderColor = (theme: Theme, type: StyledSnackbarProps['type']): string => {
  const colors: Record<StyledSnackbarProps['type'], string> = {
    success: theme.palette.general.successBorder,
    warning: theme.palette.primary.main,
    neutral: theme.palette.text.secondary,
  };

  return colors[type];
};

export const StyledSnackbar = styled(Snackbar, CommonOptions)<StyledSnackbarProps>(({ theme, type }) => css`
  & .MuiSnackbarContent-root {
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
    font-size: 12px;
    font-weight: 400;
    width: 430px;
    ${theme.breakpoints.down('md')} {
      width: auto;
    }
    border: 1px solid ${getBorderColor(theme, type)};
  }
  & .MuiSnackbarContent-message {
    padding: 4px 0;
  }
`);
