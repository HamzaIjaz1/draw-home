import { WithClassName } from '@draw-house/common/dist/utils';
import IconButton from '@mui/material/IconButton';
import { StyledSnackbar, type StyledSnackbarProps } from './styles';
import { CloseIconSmall } from '../Icons';

export type SnackbarProps = {
  text: string;
  open: boolean;
  handleClose: () => void;
  type: StyledSnackbarProps['type'];
};

export const Snackbar = ({
  className,
  text,
  open,
  handleClose,
  type,
}: SnackbarProps & WithClassName) => {
  const action = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={handleClose}
    >
      <CloseIconSmall />
    </IconButton>
  );

  return (
    <StyledSnackbar
      className={className}
      open={open}
      message={text}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
      action={action}
      type={type}
      ContentProps={{
        elevation: 3,
      }}
    />
  );
};
