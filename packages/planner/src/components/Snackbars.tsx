import { Snackbar } from '@draw-house/ui/dist/components';
import styled from 'styled-components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { closeSnackbar, useSnackbar } from '../zustand';

const StyledSnackbar = styled(Snackbar)`
  && {
    z-index: ${specialZIndexTop + 1};
  }
`;

export const Snackbars: React.FC = () => {
  const { iosOpened, type, message } = useSnackbar().snackbar;

  return (
    <StyledSnackbar
      open={iosOpened}
      type={type}
      text={message}
      handleClose={async () => {
        await closeSnackbar();
      }}
    />
  );
};
