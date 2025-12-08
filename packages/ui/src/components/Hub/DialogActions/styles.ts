import { css, styled } from '@mui/material';
import MuiDialogActions from '@mui/material/DialogActions';

type Props = {
  onlyPrimary: boolean;
};

const options: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['onlyPrimary'].includes(e),
};

export const Actions = styled(MuiDialogActions, options)<Props>(({ theme, onlyPrimary }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up(470)} {
    flex-direction: row;
    justify-content: ${onlyPrimary ? 'center' : 'space-between'};
  }

  && button {
    margin: 0;
  }
`);
