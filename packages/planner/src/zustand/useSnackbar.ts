import { wait } from '@arthurka/ts-utils';
import { SafeOmit } from '@draw-house/common/dist/utils';
import { SnackbarProps } from '@draw-house/ui/dist/components/Snackbar';
import { theme } from '@draw-house/ui/dist/theme';
import { create } from 'zustand';

type Store = {
  snackbar: {
    iosOpened: boolean;
    type: SnackbarProps['type'];
    message: SnackbarProps['text'];
    animationDone: Promise<void>;
  };
};

export const useSnackbar = create<Store>(() => ({
  snackbar: {
    iosOpened: false,
    type: 'success',
    message: '',
    animationDone: Promise.resolve(),
  },
}));

export const closeSnackbar = async () => {
  const { snackbar } = useSnackbar.getState();
  await snackbar.animationDone;

  if(snackbar.iosOpened === false) {
    return;
  }

  const animationDone = wait(theme.transitions.duration.leavingScreen / 1000);

  useSnackbar.setState({
    snackbar: {
      ...snackbar,
      iosOpened: false,
      animationDone,
    },
  });

  return animationDone;
};

export const openSnackbar = async (data: SafeOmit<Store['snackbar'], 'iosOpened' | 'animationDone'>) => {
  await closeSnackbar();

  const animationDone = wait(theme.transitions.duration.enteringScreen / 1000);

  useSnackbar.setState({
    snackbar: {
      ...data,
      iosOpened: true,
      animationDone,
    },
  });

  return animationDone;
};
