import { useMediaQuery } from '@mui/material';

export const useCheckDnDSupport = () => {
  const isDnDSupported = useMediaQuery('(hover: none) and (pointer: coarse)') === false;

  return { isDnDSupported };
};
