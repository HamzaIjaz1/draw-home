import { WithClassName } from '@draw-house/common/dist/utils';
import { lighten, useTheme } from '@mui/material';
import { isUndefined } from '@arthurka/ts-utils';
import { CSSProperties } from 'react';
import { backgroundSecondary, menuRowDisabled } from '../../theme';

export type IconProps = {
  color?: string;
};

type TransitionProps = {
  transitionDurationMs?: number;
};

type RotateProps = (
  & TransitionProps
  & {
    rotate?: number;
  }
);

const rotateInline = (deg: number | undefined, duration: number | undefined): CSSProperties => ({
  ...isUndefined(deg) ? {} : {
    transform: `rotate(${deg}deg)`,
  },
  ...isUndefined(duration) ? {} : {
    transition: `transform ${duration}ms ease-in-out`,
  },
});

export const WallIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20 10V6.4a.4.4 0 0 0-.4-.4H12m8 4v4m0-4h-4M4 10V6.4c0-.22.18-.4.4-.4H12m-8 4v4m0-4h4m12 4v3.6a.4.4 0 0 1-.4.4H12m8-4h-4M4 14v3.6c0 .22.18.4.4.4H12m-8-4h4m4 4v-4m0 0h4m-4 0H8m8 0v-4m0 0h-4m-4 4v-4m0 0h4m0 0V6' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const HandPointerIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='18'
      height='22'
      viewBox='0 0 18 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.16758 13.4563L3.4254 11.7971C2.81186 11.2127 1.83515 11.2572 1.27722 11.8948C0.772999 12.4711 0.787842 13.3357 1.31155 13.8944L6.99056 19.952C7.35194 20.3375 7.85581 20.5561 8.38415 20.5561C9.42114 20.5561 11.126 20.5561 12.8136 20.5561C15.1074 20.5561 16.6366 18.6446 16.6366 16.7331C16.6366 16.7331 16.6366 10.1795 16.6366 8.54102' stroke={_color} strokeWidth='1.24247' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M13.7683 9.08692C13.7683 9.08692 13.7683 8.96734 13.7683 8.54078C13.7683 6.3562 16.6356 6.3562 16.6356 8.54078' stroke={_color} strokeWidth='1.24247' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10.9006 9.08643C10.9006 9.08643 10.9006 8.30112 10.9006 7.448C10.9006 5.26343 13.7679 5.26343 13.7679 7.448C13.7679 7.66128 13.7679 8.32701 13.7679 8.54028C13.7679 8.96685 13.7679 9.08643 13.7679 9.08643' stroke={_color} strokeWidth='1.24247' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8.03369 9.08742C8.03369 9.08742 8.03369 7.76441 8.03369 6.698C8.03369 4.51343 10.9009 4.51343 10.9009 6.698C10.9009 6.698 10.9009 7.23566 10.9009 7.44895C10.9009 8.30207 10.9009 9.08742 10.9009 9.08742' stroke={_color} strokeWidth='1.24247' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M5.16675 13.4565V2.87503C5.16675 2.08326 5.8086 1.44141 6.60037 1.44141C7.39212 1.44141 8.034 2.08229 8.034 2.87407C8.034 4.01207 8.034 5.59085 8.034 6.69803C8.034 7.76444 8.034 9.08741 8.034 9.08741' stroke={_color} strokeWidth='1.24247' strokeLinecap='round' strokeLinejoin='round' />
    </svg>

  );
};

export const LayoutIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11 16v-5m0 0H3m8 0V9m10-1h-6v2m0 8v3m-4-2v2m0-18v3m10 9h-6v-2m6-9.4v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const TextIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M7.00024 9.00098V7.00098H17.0002V9.00098' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12.0002 7.00098V17.001M12.0002 17.001H10.0002M12.0002 17.001H14.0002' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>

  );
};

export const LayersIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.6208 13.682L5.4217 9.70146C4.46764 8.97104 4.46764 7.67243 5.42171 6.94202L10.6208 2.96142C11.4107 2.35661 12.5904 2.35661 13.3803 2.96142L18.5794 6.94202C19.5334 7.67243 19.5334 8.97104 18.5794 9.70146L13.3803 13.682C12.5904 14.2869 11.4107 14.2869 10.6208 13.682Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4.66732 12.9043L10.6371 17.3817C11.4217 17.9701 12.5796 17.9701 13.3642 17.3817L19.334 12.9043' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4.66732 16.5723L10.6371 21.0496C11.4217 21.638 12.5796 21.638 13.3642 21.0496L19.334 16.5723' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ArrowBendingLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4.5 15.5C8.5 15.5 11 15.5 15 15.5C15 15.5 20 15.5 20 10.7941C20 5.5 15 5.5 15 5.5C11.5714 5.5 9.7143 5.5 6.2857 5.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M7.5 12C6.1332 13.3668 5.3668 14.1332 4 15.5C5.3668 16.8668 6.1332 17.6332 7.5 19' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ArrowBendingRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.5 15.5C15.5 15.5 13 15.5 9 15.5C9 15.5 4 15.5 4 10.7941C4 5.5 9 5.5 9 5.5C12.4286 5.5 14.2857 5.5 17.7143 5.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16.5 12C17.8668 13.3668 18.6332 14.1332 20 15.5C18.6332 16.8668 17.8668 17.6332 16.5 19' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const PlusIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 12H12M12 12H18M12 12V6M12 12V18'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Plus2Icon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 12h8m0 0h8m-8 0V4m0 8v8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ArrowToHeartIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.5 11.46c-.908-1.933-.579-4.316.988-5.92a5.066 5.066 0 0 1 7.273 0l.239.243.238-.244A5.082 5.082 0 0 1 16.875 4c1.367 0 2.675.555 3.636 1.54A5.254 5.254 0 0 1 22 9.21a5.255 5.255 0 0 1-1.489 3.673c-2.197 2.249-4.327 4.594-6.606 6.761a1.328 1.328 0 0 1-1.851-.04L10.975 18.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 14.111H5C1 14.111 1 20 5 20m7-5.889L8.5 11m3.5 3.111-3.5 3.111' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RecentIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 6V12H18' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21.8883 10.5C21.1645 5.68874 17.013 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C16.1006 22 19.6248 19.5318 21.1679 16' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M17 16H21.4C21.7314 16 22 16.2686 22 16.6V21' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ColorPickerIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6.99995 13.1616L12.4643 7.69719C12.8548 7.30666 13.488 7.30666 13.8785 7.69719L15.9998 9.81851C16.3903 10.209 16.3903 10.8422 15.9998 11.2327L14.071 13.1616M6.99995 13.1616L4.82759 15.334C4.73423 15.4273 4.66029 15.5382 4.61002 15.6603L3.58199 18.1569C3.07433 19.3898 4.30723 20.6227 5.54013 20.1151L8.03676 19.0871C8.15885 19.0368 8.26976 18.9628 8.36312 18.8695L14.071 13.1616M6.99995 13.1616H14.071' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M13.8779 3.45312L15.9992 5.57444M15.9992 5.57444L17.4134 4.16023C17.804 3.76971 18.4371 3.76971 18.8276 4.16023L19.5348 4.86734C19.9253 5.25786 19.9253 5.89104 19.5348 6.28156L18.1205 7.69578M15.9992 5.57444L18.1205 7.69578M20.2419 9.81709L18.1205 7.69578' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ScalingIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10.0006 8.33203C7.92419 8.33203 5.83594 10.2629 5.83594 12.6177C5.83594 12.8967 5.83595 13.8162 5.83595 14.0463C5.83595 16.4132 7.70054 18.332 10.0006 18.332C11.9826 18.332 13.6413 16.9073 14.0621 14.9987C14.1297 14.6924 14.1653 14.3736 14.1653 14.0463' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9.99866 11.6641C12.0751 11.6641 14.1633 9.73323 14.1633 7.37831C14.1633 7.0994 14.1633 6.1799 14.1633 5.94981C14.1633 3.58281 12.2987 1.66406 9.99866 1.66406C8.01666 1.66406 6.35803 3.08881 5.93718 4.9974C5.86964 5.30373 5.83398 5.62248 5.83398 5.94981' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ScalingCrossedIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg className={className} width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.83822 4.95368C4.83822 4.62635 4.87389 4.3076 4.94139 4.0013C5.36222 2.09274 7.02089 0.667968 9.00289 0.667969C11.2643 0.667969 13.1047 2.52274 13.166 4.83464' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10.9725 10.1C11.7207 9.65614 12.3596 8.97939 12.752 8.16797' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M13.168 13.0482C13.168 13.3756 13.1323 13.6943 13.0648 14.0007C12.6439 15.9092 10.9853 17.334 9.00329 17.334C6.70321 17.334 4.83863 15.4152 4.83863 13.0482C4.83863 12.8182 4.83863 11.8987 4.83863 11.6197C4.83863 9.26482 6.92688 7.33398 9.00329 7.33398C9.00329 7.33398 9.83463 7.33398 10.2513 7.75065' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16.5 1.5L1.5 16.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const CloseIcon = ({
  className,
  color,
  noBackground = false,
}: WithClassName & IconProps & { noBackground?: boolean }) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {noBackground === false && (
        <path d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' fill={backgroundSecondary} />
      )}
      <path d='M9.17188 14.8287L12.0003 12.0003M12.0003 12.0003L14.8287 9.17188M12.0003 12.0003L9.17188 9.17188M12.0003 12.0003L14.8287 14.8287' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const CloseIconSmall = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M0.273662 0.273659C0.638543 -0.0912205 1.23013 -0.0912194 1.59501 0.273661L5.00001 3.67867L8.40499 0.273663C8.76987 -0.0912184 9.36145 -0.0912216 9.72634 0.273657C10.0912 0.638535 10.0912 1.23012 9.72634 1.595L6.32136 5.00002L9.72634 8.40499C10.0912 8.76987 10.0912 9.36146 9.72634 9.72634C9.36146 10.0912 8.76987 10.0912 8.40499 9.72634L5.00001 6.32137L1.59501 9.72634C1.23013 10.0912 0.638537 10.0912 0.273658 9.72634C-0.0912212 9.36146 -0.0912191 8.76987 0.273663 8.40499L3.67866 5.00002L0.273659 1.59501C-0.0912207 1.23013 -0.0912196 0.638538 0.273662 0.273659Z' fill={_color} />
    </svg>
  );
};

export const GearIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 14.7C13.4913 14.7 14.7 13.4913 14.7 12C14.7 10.5088 13.4913 9.30005 12 9.30005C10.5088 9.30005 9.30005 10.5088 9.30005 12C9.30005 13.4913 10.5088 14.7 12 14.7Z' stroke={_color} strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M18.8602 10.5559L17.8722 8.17032L19.2 6.6L17.4 4.8L15.8382 6.13466L13.402 5.13277L12.8418 3H11.0829L10.5142 5.16102L8.13397 6.16436L6.6 4.8L4.8 6.6L6.10803 8.20996L5.13525 10.6017L3 11.1V12.9L5.161 13.49L6.16417 15.8697L4.8 17.4L6.6 19.2L8.21204 17.8863L10.5573 18.8511L11.1 21H12.9L13.444 18.8519L15.8296 17.8639C16.2272 18.1482 17.4 19.2 17.4 19.2L19.2 17.4L17.8643 15.8245L18.8525 13.4382L20.9999 12.8795L21 11.1L18.8602 10.5559Z' stroke={_color} strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>

  );
};

export const HouseIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='26'
      height='27'
      viewBox='0 0 26 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12.586 5.49991L12.4594 5.61324L3.53972 13.9811C3.24578 14.2569 3.24175 14.7223 3.53086 15.0031C3.80155 15.266 4.2311 15.2697 4.50634 15.0116L5.31709 14.2511L5.31636 23.6181C5.31636 24.3464 5.90685 24.9435 6.65581 24.996L6.76364 25.0001H21.2364C21.9991 25.0001 22.6243 24.4362 22.68 23.721L22.6836 23.6181L22.6844 14.2518L23.4937 15.0114C23.7689 15.2696 24.1985 15.266 24.4692 15.003C24.7583 14.7222 24.7543 14.2569 24.4604 13.9812L15.5508 5.62222C14.7453 4.83721 13.4464 4.79368 12.586 5.49991ZM14.4573 6.53922L14.5268 6.59934L21.2371 12.8939L21.2364 23.6181L17.6189 23.6174L17.6182 16.7077C17.6182 15.9794 17.0277 15.3823 16.2787 15.3291L16.1709 15.3257H11.8291C11.0664 15.3257 10.4412 15.8896 10.3854 16.6048L10.3818 16.7077L10.3825 23.6174L6.76364 23.6181L6.76436 12.8933L13.4935 6.57999C13.7569 6.3333 14.1679 6.31809 14.4573 6.53922ZM11.8291 16.7077H16.1709L16.1716 23.6174H11.8298L11.8291 16.7077Z' fill={_color} />
      <path d='M3.5 4C3.43166 5.90397 1.90397 7.43166 0 7.5C1.90397 7.56834 3.43166 9.09603 3.5 11C3.56834 9.09603 5.09603 7.56834 7 7.5C5.09603 7.43166 3.56834 5.90397 3.5 4Z' fill={_color} />
      <path d='M8 0C7.94143 1.63198 6.63198 2.94143 5 3C6.63198 3.05857 7.94143 4.36802 8 6C8.05857 4.36802 9.36802 3.05857 11 3C9.36802 2.94143 8.05857 1.63198 8 0Z' fill={_color} />
    </svg>
  );
};

export const LessThenSignIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.833 6.5L8.33301 12L13.833 17.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const HamburgerMenuIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4.66699 6.5H19.3337' stroke={_color} strokeWidth='1.33' strokeLinecap='round' />
      <path d='M4.66699 12H19.3337' stroke={_color} strokeWidth='1.33' strokeLinecap='round' />
      <path d='M4.66699 17.5H19.3337' stroke={_color} strokeWidth='1.33' strokeLinecap='round' />
    </svg>
  );
};

export const FloppyDiskIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4 18.2222V5.77778C4 4.79594 4.79594 4 5.77778 4H15.7081C16.1796 4 16.6317 4.1873 16.9652 4.5207L19.4793 7.03485C19.8127 7.36826 20 7.82044 20 8.29194V18.2222C20 19.2041 19.2041 20 18.2222 20H5.77778C4.79594 20 4 19.2041 4 18.2222Z' stroke={_color} strokeWidth='1.06667' />
      <path d='M8.97767 9.33333H15.0221C15.3167 9.33333 15.5554 9.09455 15.5554 8.8V4.53333C15.5554 4.23878 15.3167 4 15.0221 4H8.97767C8.68312 4 8.44434 4.23878 8.44434 4.53333V8.8C8.44434 9.09455 8.68312 9.33333 8.97767 9.33333Z' stroke={_color} strokeWidth='1.06667' />
      <path d='M6.66675 13.4222V20H17.3334V13.4222C17.3334 13.1277 17.0947 12.8889 16.8001 12.8889H7.20008C6.90553 12.8889 6.66675 13.1277 6.66675 13.4222Z' stroke={_color} strokeWidth='1.06667' />
    </svg>
  );
};

export const CircleAroundDotIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3.99902 12.8031H5.61712C6.01276 15.976 8.71939 18.4312 11.9995 18.4312C15.2795 18.4312 17.9862 15.976 18.3818 12.8031H19.9999C19.5965 16.866 16.1685 20.0392 11.9995 20.0392C7.83036 20.0392 4.40241 16.866 3.99902 12.8031ZM3.99902 11.1951C4.40241 7.13217 7.83036 3.95898 11.9995 3.95898C16.1685 3.95898 19.5965 7.13217 19.9999 11.1951H18.3818C17.9862 8.02222 15.2795 5.56701 11.9995 5.56701C8.71939 5.56701 6.01276 8.02222 5.61712 11.1951H3.99902ZM11.9995 13.6071C11.1114 13.6071 10.3914 12.8872 10.3914 11.9991C10.3914 11.111 11.1114 10.3911 11.9995 10.3911C12.8875 10.3911 13.6075 11.111 13.6075 11.9991C13.6075 12.8872 12.8875 13.6071 11.9995 13.6071Z' fill={_color} />
    </svg>
  );
};

export const ToolsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.1854 10.6602L3.59662 17.249C2.86884 17.9767 2.86884 19.1568 3.59662 19.8845C4.32439 20.6123 5.50435 20.6123 6.23213 19.8845L12.8209 13.2957' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16.841 13.6348L20.4547 17.2486C21.1826 17.9763 21.1826 19.1563 20.4547 19.8841C19.727 20.6119 18.547 20.6119 17.8192 19.8841L12.0342 14.0991' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M7.09415 6.2775L5.11751 6.93638L3.14087 3.64199L4.45863 2.32422L7.75303 4.30086L7.09415 6.2775ZM7.09415 6.2775L9.73135 8.9147' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10.1858 10.66C9.39955 8.65382 9.55327 6.02151 11.1742 4.40063C12.795 2.77975 15.7863 2.42399 17.4335 3.41231L14.6002 6.2456L14.3369 9.14446L17.2357 8.88113L20.069 6.04783C21.0574 7.69503 20.7016 10.6864 19.0807 12.3072C17.4598 13.9281 14.8276 14.0818 12.8214 13.2955' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const DoorIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21.2857 19.6154H19.1429V4.38462C19.1429 4.01739 18.9923 3.66521 18.7244 3.40554C18.4565 3.14588 18.0932 3 17.7143 3H6.28571C5.90683 3 5.54347 3.14588 5.27556 3.40554C5.00765 3.66521 4.85714 4.01739 4.85714 4.38462V19.6154H2.71429C2.52485 19.6154 2.34316 19.6883 2.20921 19.8182C2.07525 19.948 2 20.1241 2 20.3077C2 20.4913 2.07525 20.6674 2.20921 20.7972C2.34316 20.9271 2.52485 21 2.71429 21H21.2857C21.4752 21 21.6568 20.9271 21.7908 20.7972C21.9247 20.6674 22 20.4913 22 20.3077C22 20.1241 21.9247 19.948 21.7908 19.8182C21.6568 19.6883 21.4752 19.6154 21.2857 19.6154ZM6.28571 4.38462H17.7143V19.6154H6.28571V4.38462ZM15.5714 12.3462C15.5714 12.5515 15.5086 12.7523 15.3909 12.9231C15.2731 13.0939 15.1058 13.227 14.91 13.3056C14.7142 13.3842 14.4988 13.4047 14.291 13.3647C14.0831 13.3246 13.8922 13.2257 13.7424 13.0805C13.5925 12.9352 13.4905 12.7502 13.4492 12.5487C13.4078 12.3473 13.429 12.1385 13.5101 11.9488C13.5912 11.759 13.7286 11.5968 13.9047 11.4827C14.0809 11.3686 14.2881 11.3077 14.5 11.3077C14.7842 11.3077 15.0567 11.4171 15.2576 11.6119C15.4585 11.8066 15.5714 12.0707 15.5714 12.3462Z' fill={_color} />
    </svg>
  );
};

export const WindowIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 3C8.134 3 5 6.272 5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V10C19 6.272 15.866 3 12 3ZM12 3V21M5 13H19' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M22.0541 11.6229L18.6791 4.87294C18.623 4.76079 18.5368 4.6665 18.4301 4.60063C18.3233 4.53476 18.2004 4.49991 18.075 4.5H5.925C5.7996 4.49991 5.67665 4.53476 5.56995 4.60063C5.46324 4.6665 5.37699 4.76079 5.32088 4.87294L1.94588 11.6229C1.89935 11.7168 1.87509 11.8202 1.875 11.925V16.65C1.875 17.008 2.01723 17.3514 2.27041 17.6046C2.52358 17.8578 2.86696 18 3.225 18H20.775C21.133 18 21.4764 17.8578 21.7296 17.6046C21.9828 17.3514 22.125 17.008 22.125 16.65V11.925C22.1249 11.8202 22.1007 11.7168 22.0541 11.6229ZM9.55819 5.85L10.5707 7.875H8.02931L7.01681 5.85H9.55819ZM13.6082 5.85L14.6207 7.875H12.0793L11.0668 5.85H13.6082ZM9.71681 11.25L8.70431 9.225H11.2457L12.2582 11.25H9.71681ZM13.7668 11.25L12.7543 9.225H15.2957L16.3082 11.25H13.7668ZM17.8168 11.25L16.8043 9.225H19.3457L20.3582 11.25H17.8168ZM18.6707 7.875H16.1293L15.1168 5.85H17.6582L18.6707 7.875ZM3.225 12.0845L5.925 6.68447L8.625 12.0845V16.65H3.225V12.0845ZM9.975 16.65V12.6H20.775V16.65H9.975Z' fill={_color} />
      <line x1='4.5' y1='5.5' x2='6.5' y2='5.5' stroke='white' strokeWidth='3' strokeLinecap='round' />
      <line x1='4.5' y1='5.5' x2='4.5' y2='7.5' stroke='white' strokeWidth='3' strokeLinecap='round' />
      <line x1='4.5' y1='3.5' x2='4.5' y2='7.5' stroke={_color} strokeLinecap='round' />
      <line x1='2.5' y1='5.5' x2='6.5' y2='5.5' stroke={_color} strokeLinecap='round' />
    </svg>
  );
};

export const RoofsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m22.054 11.623-3.375-6.75a.675.675 0 0 0-.604-.373H5.925a.675.675 0 0 0-.604.373l-3.375 6.75a.682.682 0 0 0-.071.302v4.725A1.35 1.35 0 0 0 3.225 18h17.55a1.35 1.35 0 0 0 1.35-1.35v-4.725a.681.681 0 0 0-.07-.302ZM9.558 5.85l1.013 2.025H8.029L7.017 5.85h2.541Zm4.05 0 1.013 2.025h-2.542L11.067 5.85h2.541Zm-3.891 5.4L8.704 9.225h2.542l1.012 2.025H9.717Zm4.05 0-1.013-2.025h2.542l1.012 2.025h-2.541Zm4.05 0-1.013-2.025h2.542l1.012 2.025h-2.541Zm.854-3.375h-2.542L15.117 5.85h2.541l1.013 2.025Zm-15.446 4.21 2.7-5.4 2.7 5.4v4.565h-5.4v-4.565Zm6.75 4.565V12.6h10.8v4.05h-10.8Z' fill={_color} />
    </svg>
  );
};

export const CeilingIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2143_71041)'>
        <path d='m1.172 13.676 3.385-1.954m-3.385 1.954 5.416 3.127 4.55 2.627c.478.276 1.254.276 1.732 0l2.519-1.455 4.062-2.345 3.385-1.954m-21.664 0v-2.052c0-.188.13-.368.36-.5l3.025-1.747m7.447-1.955L8.619 9.377m3.385-1.955V5.077m0 2.345 3.385 1.955m7.447 4.299v-2.052c0-.188-.13-.368-.36-.5l-3.025-1.747m3.385 4.299-3.385-1.954m-14.894 0L8.62 9.377m-4.062 2.345V9.377m4.062 0V7.032m3.385-1.955L8.619 7.032m3.385-1.955 3.385 1.954M4.557 9.377 8.62 7.032m10.832 4.69-2.031-1.173-2.031-1.172m4.062 2.345V9.377m0 0L15.389 7.03m0 2.346V7.03' stroke={_color} strokeWidth='1.2' strokeLinecap='round' />
        <ellipse cx='12' cy='13.75' rx='2' ry='.75' fill={_color} />
      </g>
      <defs>
        <clipPath id='clip0_2143_71041'>
          <path fill={theme.palette.background.paper} d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HintIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 11.5V16.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 7.50916L12.01 7.49805' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const NoTransparencyIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.disabled;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M4.28 17.002v-.906c2.177.003 4.354 0 6.528-.007a5.766 5.766 0 0 0 1.362-.197c.078-.02.155-.045.23-.074-2.46-2.547-4.919-5.092-7.38-7.636-.46-.007-.921-.01-1.384-.007v-.913a6.61 6.61 0 0 1 .041-.468L1.242 4.277c-.266-.275-.313-.584-.14-.928.225-.32.524-.42.899-.3.077.035.149.08.214.133a31740.57 31740.57 0 0 0 17.841 18.452c.05.057.101.112.156.164a.734.734 0 0 1 .103.787c-.162.3-.415.438-.758.412a.784.784 0 0 1-.37-.163l-1.954-2.02-9.267-.007c-1.239-.104-2.227-.652-2.964-1.645a3.918 3.918 0 0 1-.722-2.16Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M7.544 3.394h.859v1.455a55.7 55.7 0 0 0-.91.004 7.777 7.777 0 0 0-.334.04c-.089-.47-.18-.94-.273-1.41 0-.008.002-.016.007-.022.215-.04.432-.063.651-.067Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M11.363 3.394v1.455H9.89V3.394h1.473Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M14.05 3.394v1.455h-1.199V3.394h1.2Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M17.225 4.04c1.183.064 2.151.549 2.905 1.455.52.655.809 1.402.866 2.242.005 3.115.005 6.23 0 9.347a3.968 3.968 0 0 1-.97 2.39c-.068.077-.14.15-.214.223a2550.58 2550.58 0 0 0-5.107-5.293c-.005-.005-.005-.01 0-.015a5.602 5.602 0 0 0 1.588-3.831c.007-2.172.01-4.344.007-6.518h.925Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M5.413 4.077c.01 0 .02.005.026.015.262.399.527.796.795 1.191-.062.041-.12.086-.177.134a.018.018 0 0 1-.023 0 198.76 198.76 0 0 0-.999-1.043 2.7 2.7 0 0 1 .378-.297Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M5.087 9.667v1.477h-1.45V9.667h1.45Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M5.087 12.637v1.202h-1.45v-1.202h1.45Z' fill={_color} />
    </svg>
  );
};

export const TransparencyIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.disabled;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M7.941 3v1.511a26.28 26.28 0 0 0-1.02.012l-.269.034A144.05 144.05 0 0 0 6.368 3.1a.04.04 0 0 1 .008-.023 5.22 5.22 0 0 1 .598-.073C7.297 3 7.62 3 7.941 3Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M11.01 3.008v1.503H9.483V3.008h1.527Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M13.795 3.008v1.503h-1.243V3.008h1.243Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M17.087 3.675c1.225.066 2.229.567 3.011 1.504.54.678.84 1.453.898 2.323.007 3.252.005 6.504-.008 9.755-.116 1.198-.644 2.169-1.584 2.91a4.087 4.087 0 0 1-2.317.83c-3.2.004-6.4.004-9.599 0a4.098 4.098 0 0 1-2.796-1.355 4.075 4.075 0 0 1-1.024-2.53v-.982c2.257.003 4.512 0 6.767-.008 1.576-.056 2.92-.636 4.031-1.74 1.06-1.108 1.61-2.432 1.654-3.973.008-2.243.01-4.488.008-6.734h.959Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M4.841 3.714a.03.03 0 0 1 .027.015c.272.412.547.823.825 1.231-.29.2-.537.445-.74.732-.42-.274-.835-.552-1.247-.836a4.31 4.31 0 0 1 1.135-1.142Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M4.504 7.947H3v-.913c0-.084.003-.168.012-.253.014-.136.034-.271.057-.406.494.092.988.186 1.481.284-.017.124-.031.25-.042.375-.004.305-.005.609-.004.913Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M4.504 9.489v1.526H3V9.489h1.504Z' fill={_color} />
      <path fillRule='evenodd' clipRule='evenodd' d='M4.504 12.556V13.8H3v-1.243h1.504Z' fill={_color} />
    </svg>
  );
};

export const FireplaceIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='3' y='19.25' width='18' height='1.8' rx='0.9' stroke={_color} strokeWidth='1.2' strokeLinejoin='round' />
      <rect x='3' y='3.94922' width='18' height='1.8' rx='0.9' stroke={_color} strokeWidth='1.2' strokeLinejoin='round' />
      <rect x='3.90039' y='5.75' width='16.2' height='13.5' stroke={_color} strokeWidth='1.2' strokeLinejoin='round' />
      <path d='M6.59961 13.8492C6.59961 10.8669 9.01727 8.44922 11.9996 8.44922V8.44922C14.9819 8.44922 17.3996 10.8669 17.3996 13.8492V19.2492H6.59961V13.8492Z' stroke={_color} strokeWidth='1.2' strokeLinejoin='round' />
      <path d='M14.7 16.9583C14.7 18.2235 13.4912 19.2492 12 19.2492C10.5089 19.2492 9.30005 18.2235 9.30005 16.9583C9.30005 14.6674 12 12.9492 12 12.9492C12 12.9492 14.7 14.6674 14.7 16.9583Z' stroke={_color} strokeWidth='1.2' />
    </svg>
  );
};

export const DuplicateIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18.475 19H9.9C9.61005 19 9.375 18.765 9.375 18.475V9.9C9.375 9.61005 9.61005 9.375 9.9 9.375H18.475C18.765 9.375 19 9.61005 19 9.9V18.475C19 18.765 18.765 19 18.475 19Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14.625 9.375V5.525C14.625 5.23505 14.39 5 14.1 5H5.525C5.23505 5 5 5.23505 5 5.525V14.1C5 14.39 5.23505 14.625 5.525 14.625H9.375' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const BinIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18.4006 9.59961L16.8046 18.6766C16.6701 19.4417 16.0055 19.9996 15.2288 19.9996H8.77238C7.99562 19.9996 7.33107 19.4417 7.19655 18.6766L5.60059 9.59961' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M19.1998 7.2H14.6998M14.6998 7.2V5.6C14.6998 4.71634 13.9835 4 13.0998 4H10.8998C10.0161 4 9.2998 4.71634 9.2998 5.6V7.2M14.6998 7.2H9.2998M4.7998 7.2H9.2998' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const PencilIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.general.purpleGray;

  return (
    <svg
      className={className}
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.2813 0.706488C13.048 0.480073 12.782 0.305733 12.4833 0.183469C12.1847 0.0612049 11.8697 7.24792e-05 11.5383 7.24792e-05C11.207 7.24792e-05 10.892 0.0612049 10.5933 0.183469C10.2947 0.305733 10.0287 0.480073 9.79533 0.706488L1.77333 8.50422C1.75467 8.52234 1.73133 8.55856 1.70333 8.6129L0.0653333 12.4982C0 12.6431 -0.0163333 12.7948 0.0163333 12.9533C0.049 13.1118 0.123667 13.2476 0.240333 13.3608C0.357 13.474 0.497 13.5465 0.660333 13.5782C0.823667 13.6099 0.98 13.5986 1.12933 13.5442L5.06333 11.9684C5.18467 11.914 5.25933 11.8733 5.28733 11.8461L13.2813 4.08913C13.5147 3.86271 13.6943 3.6046 13.8203 3.31479C13.9463 3.02498 14.0093 2.71932 14.0093 2.39781C14.0093 2.0763 13.9463 1.77064 13.8203 1.48083C13.6943 1.19102 13.5147 0.932902 13.2813 0.706488ZM0.821333 12.7971L1.22733 11.8461L1.80133 12.4031L0.821333 12.7971ZM2.62733 12.0771L1.56333 11.0446L2.23533 9.45517L4.26533 11.425L2.62733 12.0771ZM4.99333 11.0038L2.66933 8.74875L8.05933 3.51856L10.3833 5.77366L4.99333 11.0038ZM10.9573 5.21668L8.63333 2.96158L9.22133 2.4046L11.5313 4.64611L10.9573 5.21668ZM12.6933 3.51856L12.1193 4.08913L9.79533 1.83403L10.3833 1.27705C10.5793 1.05064 10.8243 0.892148 11.1183 0.801582C11.4123 0.711017 11.7087 0.699696 12.0073 0.76762C12.306 0.835545 12.565 0.975922 12.7843 1.18875C13.0037 1.40158 13.1483 1.6529 13.2183 1.94271C13.2883 2.23252 13.2767 2.52007 13.1833 2.80536C13.09 3.09064 12.9267 3.32837 12.6933 3.51856Z' fill={_color} />
    </svg>
  );
};

export const EyeIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='M20.948 11.757c-.026-.06-.661-1.468-2.073-2.88C16.992 6.993 14.616 6 12 6c-2.616 0-4.993.995-6.875 2.876-1.412 1.413-2.05 2.824-2.073 2.881a.6.6 0 0 0 0 .488c.026.059.661 1.467 2.073 2.88C7.007 17.005 9.384 18 12 18c2.616 0 4.993-.994 6.875-2.876 1.412-1.412 2.047-2.82 2.073-2.88a.6.6 0 0 0 0-.487ZM12 16.8c-2.309 0-4.325-.84-5.995-2.494A10.013 10.013 0 0 1 4.275 12a10 10 0 0 1 1.73-2.306C7.675 8.039 9.691 7.2 12 7.2s4.325.84 5.995 2.494A10.01 10.01 0 0 1 19.729 12c-.541 1.01-2.897 4.8-7.729 4.8Zm0-8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 6a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z' />
    </svg>
  );
};

export const EyeClosedIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='M6.444 4.997a.6.6 0 1 0-.888.807L6.999 7.39c-2.724 1.672-3.896 4.25-3.947 4.366a.6.6 0 0 0 0 .488c.026.059.661 1.468 2.073 2.88C7.007 17.005 9.384 18 12 18a9.534 9.534 0 0 0 3.905-.812l1.65 1.816a.6.6 0 1 0 .888-.807L6.444 4.997Zm3.55 5.688 3.125 3.438a2.4 2.4 0 0 1-3.125-3.438ZM12 16.8c-2.309 0-4.325-.839-5.995-2.494A9.986 9.986 0 0 1 4.275 12c.352-.659 1.474-2.504 3.551-3.703l1.35 1.481a3.6 3.6 0 0 0 4.775 5.25l1.104 1.215A8.4 8.4 0 0 1 12 16.8Zm.45-7.157a.6.6 0 0 1 .225-1.179 3.612 3.612 0 0 1 2.908 3.198.6.6 0 0 1-.542.653.48.48 0 0 1-.056 0 .6.6 0 0 1-.6-.544 2.407 2.407 0 0 0-1.935-2.128Zm8.496 2.602c-.032.07-.791 1.753-2.502 3.285a.601.601 0 0 1-.945-.707.6.6 0 0 1 .145-.187A9.96 9.96 0 0 0 19.729 12a9.986 9.986 0 0 0-1.734-2.307C16.325 8.04 14.308 7.2 12 7.2c-.486 0-.972.039-1.452.118a.6.6 0 1 1-.198-1.183A10.05 10.05 0 0 1 12 6c2.616 0 4.993.995 6.875 2.877 1.412 1.412 2.047 2.821 2.073 2.88a.6.6 0 0 1 0 .488h-.002Z' />
    </svg>
  );
};

export const LockIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='16'
      height='21'
      viewBox='0 0 16 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1.86575 21C1.35087 21 0.911238 20.8157 0.546852 20.4472C0.182284 20.0785 0 19.6338 0 19.1131V8.87207C0 8.35136 0.182284 7.90665 0.546852 7.53794C0.911238 7.16943 1.35087 6.98517 1.86575 6.98517H3.23547V4.82464C3.23547 3.47918 3.69788 2.33871 4.62269 1.40323C5.54768 0.467742 6.67345 0 8 0C9.32655 0 10.4523 0.467742 11.3773 1.40323C12.3021 2.33871 12.7645 3.47918 12.7645 4.82464V6.98517H14.1343C14.6491 6.98517 15.0888 7.16943 15.4531 7.53794C15.8177 7.90665 16 8.35136 16 8.87207V19.1131C16 19.6338 15.8177 20.0785 15.4531 20.4472C15.0888 20.8157 14.6491 21 14.1343 21H1.86575ZM1.86575 19.4533H14.1343C14.2325 19.4533 14.3131 19.4215 14.3761 19.3577C14.4392 19.2939 14.4707 19.2124 14.4707 19.1131V8.87207C14.4707 8.77276 14.4392 8.69122 14.3761 8.62747C14.3131 8.56371 14.2325 8.53184 14.1343 8.53184H1.86575C1.76754 8.53184 1.68692 8.56371 1.62389 8.62747C1.56085 8.69122 1.52933 8.77276 1.52933 8.87207V19.1131C1.52933 19.2124 1.56085 19.2939 1.62389 19.3577C1.68692 19.4215 1.76754 19.4533 1.86575 19.4533ZM7.99918 15.8603C8.51187 15.8603 8.94795 15.6788 9.30742 15.3158C9.66707 14.9528 9.84689 14.5121 9.84689 13.9936C9.84689 13.475 9.66734 13.0339 9.30824 12.6702C8.94932 12.3067 8.51351 12.1249 8.00082 12.1249C7.48813 12.1249 7.05205 12.3064 6.69258 12.6694C6.33294 13.0324 6.15311 13.4731 6.15311 13.9916C6.15311 14.5101 6.33266 14.9512 6.69176 15.315C7.05068 15.6785 7.48649 15.8603 7.99918 15.8603ZM4.7648 6.98517H11.2352V4.81524C11.2352 3.91108 10.9209 3.14023 10.2924 2.5027C9.66379 1.86535 8.90058 1.54667 8.00273 1.54667C7.1047 1.54667 6.3405 1.86498 5.71011 2.50159C5.0799 3.13821 4.7648 3.91127 4.7648 4.82077V6.98517Z' fill={_color} />
    </svg>
  );
};

export const RotateIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20.5 10V7C20.5 4.79086 18.7091 3 16.5 3H12.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M23 7.5L20.5 10L18 7.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14.5 17V11C14.5 10.4477 14.0523 10 13.5 10H7.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M2.5 10H4.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14.5 22V20' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4.5 8V19C4.5 19.5523 4.94772 20 5.5 20H16.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const FlipHorizontalIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.5 20H2L9.5 4V20Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20.125 20H22L21.0625 18' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16.375 20H14.5V18' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14.5 12V14' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M18.25 12L19.1875 14' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16.375 8L14.5 4V8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const FlipVerticalIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20 14.5L20 22L4 14.5L20 14.5Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20 3.875L20 2L18 2.9375' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20 7.625L20 9.5L18 9.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 9.5L14 9.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 5.75L14 4.8125' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8 7.625L4 9.5L8 9.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const CenterWallAttachmentIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 6V17C3 17.5523 3.44772 18 4 18H7.5C8.05228 18 8.5 17.5523 8.5 17V13C8.5 12.4477 8.94772 12 9.5 12H14C14.5523 12 15 12.4477 15 13V15V17C15 17.5523 15.4477 18 16 18H19.5C20.0523 18 20.5 17.5523 20.5 17V6C20.5 5.44772 20.0523 5 19.5 5H4C3.44772 5 3 5.44772 3 6Z' fill={theme.palette.text.disabled} />
      <path d='M6 18V8.5H18V18' stroke={_color} />
    </svg>
  );
};

export const OutsideWallAttachmentIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 6V17C3 17.5523 3.44772 18 4 18H7.5C8.05228 18 8.5 17.5523 8.5 17V13C8.5 12.4477 8.94772 12 9.5 12H14C14.5523 12 15 12.4477 15 13V15V17C15 17.5523 15.4477 18 16 18H19.5C20.0523 18 20.5 17.5523 20.5 17V6C20.5 5.44772 20.0523 5 19.5 5H4C3.44772 5 3 5.44772 3 6Z' fill={theme.palette.text.disabled} />
      <path d='M3 18V6C3 5.44772 3.44772 5 4 5H19.5C20.0523 5 20.5 5.44772 20.5 6V18' stroke={_color} />
    </svg>
  );
};

export const InsideWallAttachmentIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 6V17C3 17.5523 3.44772 18 4 18H7.5C8.05228 18 8.5 17.5523 8.5 17V13C8.5 12.4477 8.94772 12 9.5 12H14C14.5523 12 15 12.4477 15 13V15V17C15 17.5523 15.4477 18 16 18H19.5C20.0523 18 20.5 17.5523 20.5 17V6C20.5 5.44772 20.0523 5 19.5 5H4C3.44772 5 3 5.44772 3 6Z' fill={theme.palette.text.disabled} />
      <path d='M8.5 18V12H15V18' stroke={_color} />
    </svg>
  );
};

export const DisabledMaterialIcon = ({ className }: WithClassName) => (
  <svg
    className={className}
    width='80'
    height='28'
    viewBox='0 0 80 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_411_29357)'>
      <path d='M37 17.6568L39.8284 14.8284M39.8284 14.8284L42.6568 12M39.8284 14.8284L37 12M39.8284 14.8284L42.6568 17.6568' stroke={menuRowDisabled} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </g>
    <rect x='0.5' y='0.5' width='79' height='27' rx='5.5' stroke={menuRowDisabled} />
    <defs>
      <clipPath id='clip0_411_29357'>
        <rect width='80' height='28' rx='6' fill='#fff' />
      </clipPath>
    </defs>
  </svg>
);

export const BlankTemplateIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.616092' y='0.616092' width='70.2345' height='70.2345' rx='9.24138' stroke={_color} strokeWidth='1.23218' />
      <path d='M48.0766 35.7334H23.3901' stroke={_color} strokeWidth='1.23218' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M35.7334 48.0766V23.3902' stroke={_color} strokeWidth='1.23218' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RectangularTemplateIcon = ({ className }: WithClassName) => (
  <svg
    className={className}
    width='72'
    height='72'
    viewBox='0 0 72 72'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M4.34473 67.039V4.96082C4.34473 4.62056 4.62056 4.34473 4.96082 4.34473H67.039C67.3792 4.34473 67.6551 4.62056 67.6551 4.96082V67.039C67.6551 67.3792 67.3792 67.6551 67.039 67.6551H4.96082C4.62056 67.6551 4.34473 67.3792 4.34473 67.039Z' stroke='#777' strokeWidth='2.46437' />
    <circle cx='4.34483' cy='4.34483' r='4.34483' fill='#999' />
    <circle cx='67.6551' cy='4.34483' r='4.34483' fill='#999' />
    <circle cx='67.6551' cy='67.6551' r='4.34483' fill='#999' />
    <circle cx='4.34483' cy='67.6551' r='4.34483' fill='#999' />
  </svg>
);

export const TShapeTemplateIcon = ({ className }: WithClassName) => (
  <svg
    className={className}
    width='72'
    height='72'
    viewBox='0 0 72 72'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M5.4622 4.3124L67.0714 4.31241C67.4117 4.31241 67.6875 4.58825 67.6875 4.9285L67.6875 35.117C67.6875 35.4573 67.4117 35.7331 67.0714 35.7331L53.5174 35.7331C53.1771 35.7331 52.9013 36.0089 52.9013 36.3492L52.9013 66.5377C52.9013 66.878 52.6255 67.1538 52.2852 67.1538L20.2484 67.1538C19.9081 67.1538 19.6323 66.878 19.6323 66.5377L19.6323 36.3492C19.6323 36.0089 19.3565 35.7331 19.0162 35.7331L12.2392 35.7331L5.4622 35.7331C5.12194 35.7331 4.8461 35.4573 4.8461 35.117L4.84611 4.9285C4.84611 4.58824 5.12194 4.3124 5.4622 4.3124Z' stroke='#777' strokeWidth='2.46437' />
    <circle cx='52.9012' cy='67.1542' r='4.31264' transform='rotate(-180 52.9012 67.1542)' fill='#999' />
    <circle cx='19.6322' cy='67.1542' r='4.31264' transform='rotate(-180 19.6322 67.1542)' fill='#999' />
    <circle cx='4.84605' cy='4.31284' r='4.31264' transform='rotate(-180 4.84605 4.31284)' fill='#999' />
    <circle cx='67.6874' cy='4.31284' r='4.31264' transform='rotate(-180 67.6874 4.31284)' fill='#999' />
  </svg>
);

export const LShapeTemplateIcon = ({ className }: WithClassName) => (
  <svg
    className={className}
    width='72'
    height='72'
    viewBox='0 0 72 72'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M66.5381 67.6207H35.7334C35.3932 67.6207 35.1174 67.3449 35.1174 67.0046V36.8161C35.1174 36.4758 34.8415 36.2 34.5013 36.2H4.92884C4.58858 36.2 4.31274 35.9242 4.31274 35.5839V5.39539C4.31274 5.05513 4.58858 4.7793 4.92884 4.7793H35.1174H66.5381C66.8783 4.7793 67.1541 5.05513 67.1541 5.39539V67.0046C67.1541 67.3449 66.8783 67.6207 66.5381 67.6207Z' stroke='#777' strokeWidth='2.46437' />
    <circle cx='4.31264' cy='4.77944' r='4.31264' fill='#999' />
    <circle cx='67.154' cy='4.77944' r='4.31264' fill='#999' />
    <circle cx='67.154' cy='67.6208' r='4.31264' fill='#999' />
    <circle cx='35.7333' cy='67.6208' r='4.31264' fill='#999' />
    <circle cx='35.7333' cy='36.2001' r='4.31264' fill='#999' />
    <circle cx='4.31264' cy='36.2001' r='4.31264' fill='#999' />
  </svg>
);

export const DownArrowIcon = ({
  className,
  color,
  rotate,
  transitionDurationMs,
}: WithClassName & IconProps & RotateProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      style={rotateInline(rotate, transitionDurationMs)}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18 9L12 15L6 9' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RoofLegendIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;
  const _secondaryColor = theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='358'
      height='130'
      viewBox='0 0 358 130'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M137.222 44.6567L134.375 39.7251L134.996 39.3662L137.525 43.7452L139.68 42.5011L139.999 43.0536L137.222 44.6567ZM140.014 38.0167C140.331 37.8332 140.643 37.7455 140.948 37.7533C141.258 37.7585 141.546 37.8532 141.812 38.0374C142.08 38.2142 142.311 38.4707 142.505 38.8069L142.716 39.1729L140.182 40.6364C140.433 41.0501 140.723 41.309 141.054 41.4131C141.386 41.5099 141.736 41.4519 142.104 41.2392C142.339 41.1036 142.534 40.9633 142.69 40.8182C142.848 40.6658 142.999 40.4923 143.145 40.2978L143.452 40.8296C143.311 41.0215 143.159 41.189 142.996 41.3322C142.836 41.48 142.629 41.627 142.376 41.7732C142.026 41.9752 141.674 42.0833 141.32 42.0974C140.97 42.1089 140.639 42.018 140.324 41.8249C140.012 41.6245 139.738 41.3193 139.501 40.9095C139.267 40.5043 139.133 40.1181 139.099 39.7509C139.07 39.3811 139.132 39.0474 139.286 38.75C139.444 38.4499 139.687 38.2054 140.014 38.0167ZM140.294 38.518C140.004 38.6854 139.828 38.9128 139.767 39.1999C139.707 39.4798 139.757 39.7948 139.916 40.145L141.802 39.0563C141.68 38.8445 141.541 38.6789 141.386 38.5596C141.231 38.4403 141.062 38.3754 140.878 38.365C140.696 38.3473 140.501 38.3983 140.294 38.518ZM144.265 35.5624C144.707 35.3072 145.103 35.2227 145.453 35.3088C145.801 35.3904 146.114 35.6706 146.39 36.1495L147.782 38.56L147.181 38.9069L145.813 36.5378C145.64 36.2385 145.445 36.0538 145.226 35.9835C145.007 35.9133 144.755 35.9605 144.47 36.1254C144.06 36.362 143.843 36.6406 143.82 36.9612C143.796 37.2818 143.909 37.6586 144.159 38.0914L145.268 40.0115L144.66 40.3624L142.522 36.6603L143.013 36.3772L143.394 36.8296L143.428 36.8096C143.437 36.6328 143.477 36.4684 143.549 36.3164C143.623 36.1572 143.721 36.0143 143.845 35.8878C143.968 35.7613 144.108 35.6528 144.265 35.5624ZM148.064 33.3685C148.309 33.2276 148.554 33.1474 148.8 33.1278C149.052 33.1056 149.301 33.149 149.548 33.258L149.582 33.2381L149.382 32.6998L149.866 32.4207L152.039 36.185C152.241 36.5349 152.35 36.8619 152.366 37.1659C152.384 37.4744 152.306 37.759 152.131 38.0196C151.956 38.2803 151.68 38.5196 151.302 38.7376C151.035 38.8917 150.777 39.0133 150.528 39.1021C150.285 39.1929 150.054 39.2496 149.834 39.2724L149.511 38.7129C149.665 38.7036 149.826 38.6785 149.992 38.6375C150.162 38.6012 150.336 38.5466 150.515 38.474C150.694 38.4013 150.871 38.3144 151.046 38.2134C151.364 38.03 151.558 37.792 151.628 37.4996C151.706 37.209 151.652 36.9026 151.466 36.5803L151.382 36.4352C151.35 36.38 151.307 36.3004 151.254 36.1964C151.197 36.0878 151.159 36.0115 151.14 35.9674L151.112 35.9834C151.092 36.2466 151.012 36.4801 150.872 36.6838C150.736 36.8849 150.542 37.0586 150.289 37.2048C149.81 37.4813 149.337 37.5299 148.872 37.3506C148.411 37.1686 148.006 36.7761 147.658 36.1728C147.429 35.7768 147.292 35.4015 147.247 35.0469C147.204 34.6851 147.25 34.3607 147.385 34.0739C147.52 33.7871 147.747 33.5519 148.064 33.3685ZM148.442 33.8318C148.235 33.9514 148.09 34.109 148.006 34.3046C147.927 34.4975 147.91 34.7225 147.954 34.9795C148.003 35.2338 148.115 35.513 148.29 35.8169C148.553 36.2727 148.838 36.5748 149.145 36.7232C149.453 36.8642 149.769 36.8417 150.091 36.6556C150.28 36.5466 150.428 36.4306 150.535 36.3074C150.639 36.1797 150.706 36.0399 150.735 35.8881C150.761 35.7317 150.749 35.5609 150.697 35.3758C150.645 35.1907 150.556 34.9877 150.428 34.7667L150.344 34.6216C150.15 34.2855 149.954 34.0364 149.756 33.8744C149.563 33.7097 149.358 33.6256 149.141 33.6219C148.924 33.6183 148.691 33.6882 148.442 33.8318ZM154.168 34.3019C154.26 34.2488 154.35 34.1874 154.439 34.1177C154.525 34.0435 154.593 33.9799 154.642 33.9269L154.909 34.3897C154.863 34.4591 154.786 34.5376 154.677 34.6251C154.57 34.7173 154.462 34.7953 154.351 34.8591C154.158 34.9707 153.96 35.0422 153.757 35.0734C153.556 35.0974 153.357 35.0557 153.16 34.9485C152.963 34.8412 152.778 34.6379 152.605 34.3386L151.361 32.1836L150.836 32.4867L150.669 32.1966L151.061 31.6478L150.848 30.7208L151.207 30.5135L151.698 31.363L152.768 30.7449L153.039 31.2146L151.969 31.8327L153.205 33.9739C153.335 34.1995 153.485 34.337 153.655 34.3863C153.827 34.4284 153.998 34.4003 154.168 34.3019ZM154.141 29.9432C154.191 30.0306 154.239 30.1231 154.283 30.2205C154.331 30.3152 154.372 30.4021 154.405 30.4811L154.447 30.4572C154.451 30.2831 154.489 30.12 154.56 29.968C154.632 29.816 154.73 29.6767 154.853 29.5502C154.974 29.4191 155.113 29.3083 155.269 29.218C155.569 29.0452 155.845 28.9499 156.099 28.9323C156.355 28.9074 156.591 28.9648 156.806 29.1043C157.022 29.2438 157.221 29.4724 157.405 29.7901L158.796 32.2007L158.196 32.5476L156.828 30.1785C156.655 29.8792 156.459 29.6944 156.241 29.6242C156.022 29.5539 155.77 29.6012 155.485 29.766C155.208 29.9255 155.022 30.1034 154.927 30.2997C154.829 30.4914 154.804 30.7085 154.852 30.951C154.902 31.1862 155.01 31.4489 155.178 31.739L156.282 33.6522L155.675 34.0031L152.644 28.7538L153.252 28.4029L154.141 29.9432Z' fill={_secondaryColor} />
      <path d='M229.381 64.4421L229.381 65.1599L226.725 65.1599L226.725 68.0789L229.381 68.0789L229.381 68.7967L223.686 68.7967L223.686 68.0789L226.095 68.0789L226.095 65.1599L223.686 65.1599L223.686 64.4421L229.381 64.4421ZM225.026 61.33C225.026 60.9631 225.106 60.6494 225.266 60.3889C225.425 60.123 225.651 59.921 225.943 59.7827C226.231 59.6392 226.568 59.5674 226.956 59.5674L227.379 59.5674L227.379 62.4944C227.863 62.4838 228.232 62.3615 228.488 62.1275C228.738 61.8883 228.862 61.556 228.862 61.1306C228.862 60.8594 228.839 60.6202 228.791 60.4128C228.738 60.2001 228.663 59.9821 228.567 59.7588L229.181 59.7588C229.277 59.9768 229.346 60.1921 229.389 60.4048C229.437 60.6175 229.461 60.8701 229.461 61.1625C229.461 61.5666 229.378 61.9255 229.213 62.2392C229.049 62.5476 228.804 62.7895 228.48 62.9649C228.15 63.1351 227.749 63.2202 227.275 63.2202C226.807 63.2202 226.406 63.1431 226.071 62.9889C225.736 62.8294 225.478 62.6087 225.297 62.3269C225.117 62.0398 225.026 61.7075 225.026 61.33ZM225.6 61.338C225.6 61.6729 225.709 61.9388 225.927 62.1355C226.14 62.3269 226.438 62.4412 226.821 62.4784L226.821 60.3011C226.576 60.3011 226.363 60.3384 226.183 60.4128C226.002 60.4872 225.861 60.6016 225.76 60.7557C225.654 60.9046 225.6 61.0987 225.6 61.338ZM225.106 57.7773L229.381 57.7773L229.381 58.4791L225.106 58.4791L225.106 57.7773ZM223.503 58.1202C223.503 58.0139 223.54 57.9208 223.615 57.8411C223.684 57.756 223.795 57.7135 223.95 57.7135C224.098 57.7135 224.21 57.756 224.285 57.8411C224.359 57.9208 224.396 58.0139 224.396 58.1202C224.396 58.2372 224.359 58.3356 224.285 58.4153C224.21 58.4951 224.098 58.535 223.95 58.535C223.795 58.535 223.684 58.4951 223.615 58.4153C223.54 58.3356 223.503 58.2372 223.503 58.1202ZM225.026 54.9076C225.026 54.6258 225.079 54.3733 225.186 54.1499C225.292 53.9213 225.454 53.7272 225.672 53.5677L225.672 53.5279L225.106 53.4322L225.106 52.8739L229.453 52.8739C229.857 52.8739 230.194 52.943 230.466 53.0812C230.742 53.2195 230.949 53.4295 231.088 53.7113C231.226 53.9931 231.295 54.352 231.295 54.788C231.295 55.0964 231.271 55.3808 231.223 55.6414C231.181 55.8966 231.114 56.1252 231.024 56.3272L230.378 56.3272C230.447 56.189 230.505 56.0375 230.553 55.8726C230.606 55.7078 230.646 55.5297 230.673 55.3383C230.699 55.1469 230.713 54.9502 230.713 54.7481C230.713 54.3812 230.604 54.0941 230.386 53.8868C230.173 53.6741 229.881 53.5677 229.508 53.5677L229.341 53.5677C229.277 53.5677 229.187 53.5651 229.07 53.5598C228.948 53.5544 228.862 53.5491 228.815 53.5438L228.815 53.5757C229.033 53.7246 229.195 53.9107 229.301 54.134C229.407 54.352 229.461 54.6072 229.461 54.8996C229.461 55.4526 229.267 55.8859 228.878 56.1996C228.49 56.508 227.948 56.6622 227.251 56.6622C226.794 56.6622 226.401 56.5931 226.071 56.4549C225.736 56.3113 225.478 56.1093 225.297 55.8487C225.117 55.5882 225.026 55.2745 225.026 54.9076ZM225.616 54.8119C225.616 55.0512 225.68 55.2559 225.808 55.426C225.935 55.5908 226.122 55.7185 226.366 55.8088C226.611 55.8939 226.908 55.9365 227.259 55.9365C227.786 55.9365 228.19 55.8407 228.472 55.6493C228.748 55.4526 228.886 55.1681 228.886 54.796C228.886 54.578 228.86 54.3919 228.807 54.2377C228.748 54.0835 228.66 53.9559 228.543 53.8549C228.421 53.7538 228.267 53.6794 228.081 53.6315C227.895 53.5837 227.674 53.5598 227.419 53.5598L227.251 53.5598C226.863 53.5598 226.55 53.605 226.31 53.6953C226.071 53.7804 225.896 53.916 225.784 54.1021C225.672 54.2882 225.616 54.5248 225.616 54.8119ZM225.098 50.8143C225.199 50.8143 225.303 50.8197 225.409 50.8303C225.515 50.8356 225.611 50.8436 225.696 50.8542L225.696 50.8064C225.547 50.716 225.425 50.6017 225.329 50.4634C225.234 50.3252 225.162 50.171 225.114 50.0008C225.061 49.8307 225.034 49.6552 225.034 49.4745C225.034 49.1289 225.09 48.8417 225.202 48.6131C225.308 48.3792 225.476 48.2037 225.704 48.0867C225.933 47.9698 226.231 47.9113 226.597 47.9113L229.381 47.9113L229.381 48.6051L226.645 48.6051C226.3 48.6051 226.042 48.6822 225.872 48.8364C225.702 48.9906 225.616 49.2325 225.616 49.5622C225.616 49.8812 225.678 50.1311 225.8 50.3119C225.917 50.4927 226.092 50.6229 226.326 50.7027C226.555 50.7771 226.837 50.8143 227.172 50.8143L229.381 50.8143L229.381 51.5162L223.32 51.5162L223.32 50.8143L225.098 50.8143ZM228.886 45.1584C228.886 45.0521 228.878 44.9431 228.862 44.8314C228.841 44.7198 228.82 44.6294 228.799 44.5603L229.333 44.5603C229.37 44.6347 229.399 44.741 229.421 44.8793C229.447 45.0175 229.461 45.1504 229.461 45.2781C229.461 45.5014 229.423 45.7087 229.349 45.9001C229.269 46.0862 229.134 46.2378 228.942 46.3547C228.751 46.4717 228.482 46.5302 228.137 46.5302L225.648 46.5302L225.648 47.1363L225.313 47.1363L225.034 46.5222L224.125 46.2431L224.125 45.8284L225.106 45.8284L225.106 44.5922L225.648 44.5922L225.648 45.8284L228.121 45.8284C228.381 45.8284 228.575 45.7672 228.703 45.6449C228.825 45.5173 228.886 45.3552 228.886 45.1584Z' fill={_secondaryColor} />
      <path d='M143.281 95.0243C144.025 95.0243 144.568 95.1705 144.908 95.4629C145.248 95.7554 145.418 96.1674 145.418 96.6991C145.418 96.9331 145.379 97.159 145.299 97.377C145.224 97.5897 145.099 97.7811 144.924 97.9513C144.748 98.1214 144.515 98.257 144.222 98.358C143.93 98.4537 143.571 98.5016 143.145 98.5016H142.491V100.719H141.774V95.0243H143.281ZM143.217 95.6384H142.491V97.8875H143.066C143.427 97.8875 143.728 97.8502 143.967 97.7758C144.206 97.6961 144.384 97.5711 144.501 97.401C144.618 97.2308 144.677 97.0075 144.677 96.731C144.677 96.3641 144.56 96.0903 144.326 95.9095C144.092 95.7288 143.722 95.6384 143.217 95.6384ZM148.501 96.3641C148.58 96.3641 148.665 96.3695 148.756 96.3801C148.852 96.3854 148.934 96.3961 149.003 96.412L148.915 97.058C148.846 97.0421 148.769 97.0288 148.684 97.0181C148.604 97.0075 148.527 97.0022 148.453 97.0022C148.288 97.0022 148.131 97.0367 147.982 97.1059C147.833 97.175 147.7 97.2734 147.583 97.401C147.467 97.5232 147.373 97.6721 147.304 97.8476C147.241 98.023 147.209 98.2198 147.209 98.4378V100.719H146.507V96.4439H147.081L147.161 97.2255H147.193C147.283 97.066 147.392 96.9224 147.52 96.7948C147.647 96.6619 147.794 96.5582 147.958 96.4838C148.123 96.404 148.304 96.3641 148.501 96.3641ZM153.362 98.5734C153.362 98.9296 153.314 99.2459 153.219 99.5224C153.128 99.7936 152.995 100.025 152.82 100.216C152.65 100.408 152.44 100.554 152.19 100.655C151.945 100.751 151.671 100.799 151.368 100.799C151.086 100.799 150.826 100.751 150.587 100.655C150.347 100.554 150.14 100.408 149.965 100.216C149.789 100.025 149.651 99.7936 149.55 99.5224C149.454 99.2459 149.406 98.9296 149.406 98.5734C149.406 98.1001 149.486 97.7014 149.646 97.377C149.805 97.0474 150.034 96.7975 150.331 96.6273C150.629 96.4519 150.983 96.3641 151.392 96.3641C151.78 96.3641 152.121 96.4519 152.413 96.6273C152.711 96.7975 152.942 97.0474 153.107 97.377C153.277 97.7014 153.362 98.1001 153.362 98.5734ZM150.132 98.5734C150.132 98.9083 150.175 99.2008 150.26 99.4507C150.35 99.6952 150.488 99.884 150.674 100.017C150.861 100.15 151.097 100.216 151.384 100.216C151.671 100.216 151.908 100.15 152.094 100.017C152.28 99.884 152.416 99.6952 152.501 99.4507C152.591 99.2008 152.636 98.9083 152.636 98.5734C152.636 98.2331 152.591 97.9433 152.501 97.704C152.41 97.4648 152.272 97.2813 152.086 97.1537C151.905 97.0208 151.669 96.9543 151.376 96.9543C150.94 96.9543 150.624 97.0979 150.427 97.385C150.23 97.6721 150.132 98.0682 150.132 98.5734ZM153.972 102.633C153.839 102.633 153.722 102.622 153.621 102.601C153.52 102.585 153.432 102.564 153.358 102.537V101.971C153.438 101.992 153.52 102.011 153.605 102.027C153.69 102.043 153.783 102.051 153.884 102.051C154.054 102.051 154.195 102.003 154.307 101.907C154.419 101.817 154.474 101.641 154.474 101.381V96.4439H155.176V101.357C155.176 101.623 155.134 101.851 155.049 102.043C154.964 102.234 154.833 102.38 154.658 102.481C154.482 102.582 154.254 102.633 153.972 102.633ZM154.419 95.2875C154.419 95.1333 154.459 95.0216 154.538 94.9525C154.618 94.8781 154.716 94.8408 154.833 94.8408C154.94 94.8408 155.033 94.8781 155.113 94.9525C155.198 95.0216 155.24 95.1333 155.24 95.2875C155.24 95.4363 155.198 95.548 155.113 95.6224C155.033 95.6969 154.94 95.7341 154.833 95.7341C154.716 95.7341 154.618 95.6969 154.538 95.6224C154.459 95.548 154.419 95.4363 154.419 95.2875ZM158.182 96.3641C158.548 96.3641 158.862 96.4439 159.123 96.6034C159.389 96.7629 159.591 96.9889 159.729 97.2813C159.872 97.5684 159.944 97.9061 159.944 98.2942V98.7169H157.017C157.028 99.2008 157.15 99.5703 157.384 99.8255C157.623 100.075 157.956 100.2 158.381 100.2C158.652 100.2 158.891 100.176 159.099 100.129C159.311 100.075 159.529 100.001 159.753 99.9053V100.519C159.535 100.615 159.319 100.684 159.107 100.727C158.894 100.775 158.641 100.799 158.349 100.799C157.945 100.799 157.586 100.716 157.272 100.551C156.964 100.386 156.722 100.142 156.547 99.8175C156.376 99.4879 156.291 99.0864 156.291 98.6132C156.291 98.1453 156.368 97.7439 156.523 97.4089C156.682 97.074 156.903 96.8161 157.185 96.6353C157.472 96.4545 157.804 96.3641 158.182 96.3641ZM158.174 96.9384C157.839 96.9384 157.573 97.0474 157.376 97.2654C157.185 97.4781 157.07 97.7758 157.033 98.1586H159.21C159.21 97.914 159.173 97.7014 159.099 97.5206C159.024 97.3398 158.91 97.1989 158.756 97.0979C158.607 96.9916 158.413 96.9384 158.174 96.9384ZM162.747 100.799C162.37 100.799 162.032 100.721 161.734 100.567C161.442 100.413 161.211 100.174 161.04 99.8494C160.876 99.5251 160.793 99.1104 160.793 98.6053C160.793 98.0789 160.881 97.6509 161.056 97.3212C161.232 96.9916 161.468 96.7496 161.766 96.5954C162.069 96.4412 162.412 96.3641 162.795 96.3641C163.013 96.3641 163.223 96.3881 163.425 96.4359C163.627 96.4785 163.792 96.5316 163.92 96.5954L163.704 97.1776C163.577 97.1298 163.428 97.0846 163.258 97.0421C163.087 96.9995 162.928 96.9783 162.779 96.9783C162.492 96.9783 162.255 97.0394 162.069 97.1617C161.883 97.284 161.745 97.4648 161.655 97.704C161.564 97.9433 161.519 98.241 161.519 98.5973C161.519 98.9376 161.564 99.2273 161.655 99.4666C161.745 99.7059 161.88 99.8866 162.061 100.009C162.242 100.131 162.468 100.192 162.739 100.192C162.973 100.192 163.178 100.168 163.353 100.121C163.534 100.073 163.699 100.014 163.848 99.9451V100.567C163.704 100.642 163.545 100.697 163.369 100.735C163.199 100.777 162.992 100.799 162.747 100.799ZM166.292 100.224C166.398 100.224 166.507 100.216 166.619 100.2C166.731 100.179 166.821 100.158 166.89 100.137V100.671C166.816 100.708 166.709 100.737 166.571 100.759C166.433 100.785 166.3 100.799 166.172 100.799C165.949 100.799 165.742 100.761 165.55 100.687C165.364 100.607 165.213 100.472 165.096 100.28C164.979 100.089 164.92 99.8202 164.92 99.4746V96.9862H164.314V96.6513L164.928 96.3721L165.207 95.4629H165.622V96.4439H166.858V96.9862H165.622V99.4586C165.622 99.7192 165.683 99.9132 165.805 100.041C165.933 100.163 166.095 100.224 166.292 100.224ZM168.448 96.4439V100.719H167.746V96.4439H168.448ZM168.105 94.8408C168.211 94.8408 168.304 94.8781 168.384 94.9525C168.469 95.0216 168.512 95.1333 168.512 95.2875C168.512 95.4363 168.469 95.548 168.384 95.6224C168.304 95.6969 168.211 95.7341 168.105 95.7341C167.988 95.7341 167.89 95.6969 167.81 95.6224C167.73 95.548 167.69 95.4363 167.69 95.2875C167.69 95.1333 167.73 95.0216 167.81 94.9525C167.89 94.8781 167.988 94.8408 168.105 94.8408ZM173.519 98.5734C173.519 98.9296 173.471 99.2459 173.375 99.5224C173.285 99.7936 173.152 100.025 172.977 100.216C172.806 100.408 172.596 100.554 172.346 100.655C172.102 100.751 171.828 100.799 171.525 100.799C171.243 100.799 170.983 100.751 170.743 100.655C170.504 100.554 170.297 100.408 170.121 100.216C169.946 100.025 169.808 99.7936 169.707 99.5224C169.611 99.2459 169.563 98.9296 169.563 98.5734C169.563 98.1001 169.643 97.7014 169.802 97.377C169.962 97.0474 170.19 96.7975 170.488 96.6273C170.786 96.4519 171.14 96.3641 171.549 96.3641C171.937 96.3641 172.277 96.4519 172.57 96.6273C172.868 96.7975 173.099 97.0474 173.264 97.377C173.434 97.7014 173.519 98.1001 173.519 98.5734ZM170.289 98.5734C170.289 98.9083 170.331 99.2008 170.416 99.4507C170.507 99.6952 170.645 99.884 170.831 100.017C171.017 100.15 171.254 100.216 171.541 100.216C171.828 100.216 172.065 100.15 172.251 100.017C172.437 99.884 172.572 99.6952 172.658 99.4507C172.748 99.2008 172.793 98.9083 172.793 98.5734C172.793 98.2331 172.748 97.9433 172.658 97.704C172.567 97.4648 172.429 97.2813 172.243 97.1537C172.062 97.0208 171.825 96.9543 171.533 96.9543C171.097 96.9543 170.781 97.0979 170.584 97.385C170.387 97.6721 170.289 98.0682 170.289 98.5734ZM176.689 96.3641C177.199 96.3641 177.585 96.4891 177.845 96.739C178.106 96.9836 178.236 97.3823 178.236 97.9353V100.719H177.542V97.9832C177.542 97.6376 177.465 97.3797 177.311 97.2095C177.157 97.0394 176.915 96.9543 176.585 96.9543C176.112 96.9543 175.785 97.0873 175.604 97.3531C175.423 97.619 175.333 98.0018 175.333 98.5016V100.719H174.631V96.4439H175.197L175.301 97.0261H175.341C175.437 96.8772 175.554 96.7549 175.692 96.6592C175.836 96.5582 175.992 96.4838 176.162 96.4359C176.333 96.3881 176.508 96.3641 176.689 96.3641ZM182.335 100.719H181.633V94.6574H182.335V100.719ZM185.34 96.3641C185.707 96.3641 186.021 96.4439 186.281 96.6034C186.547 96.7629 186.749 96.9889 186.887 97.2813C187.031 97.5684 187.103 97.9061 187.103 98.2942V98.7169H184.176C184.186 99.2008 184.309 99.5703 184.543 99.8255C184.782 100.075 185.114 100.2 185.54 100.2C185.811 100.2 186.05 100.176 186.257 100.129C186.47 100.075 186.688 100.001 186.911 99.9053V100.519C186.693 100.615 186.478 100.684 186.265 100.727C186.053 100.775 185.8 100.799 185.508 100.799C185.104 100.799 184.745 100.716 184.431 100.551C184.123 100.386 183.881 100.142 183.705 99.8175C183.535 99.4879 183.45 99.0864 183.45 98.6132C183.45 98.1453 183.527 97.7439 183.681 97.4089C183.841 97.074 184.061 96.8161 184.343 96.6353C184.63 96.4545 184.963 96.3641 185.34 96.3641ZM185.332 96.9384C184.997 96.9384 184.731 97.0474 184.535 97.2654C184.343 97.4781 184.229 97.7758 184.192 98.1586H186.369C186.369 97.914 186.332 97.7014 186.257 97.5206C186.183 97.3398 186.069 97.1989 185.914 97.0979C185.766 96.9916 185.571 96.9384 185.332 96.9384ZM190.249 96.3641C190.759 96.3641 191.145 96.4891 191.405 96.739C191.666 96.9836 191.796 97.3823 191.796 97.9353V100.719H191.102V97.9832C191.102 97.6376 191.025 97.3797 190.871 97.2095C190.717 97.0394 190.475 96.9543 190.145 96.9543C189.672 96.9543 189.345 97.0873 189.164 97.3531C188.983 97.619 188.893 98.0018 188.893 98.5016V100.719H188.191V96.4439H188.757L188.861 97.0261H188.901C188.997 96.8772 189.114 96.7549 189.252 96.6592C189.395 96.5582 189.552 96.4838 189.722 96.4359C189.892 96.3881 190.068 96.3641 190.249 96.3641ZM194.637 96.3641C194.918 96.3641 195.171 96.4173 195.394 96.5237C195.623 96.63 195.817 96.7922 195.976 97.0102H196.016L196.112 96.4439H196.67V100.791C196.67 101.195 196.601 101.532 196.463 101.803C196.325 102.08 196.115 102.287 195.833 102.425C195.551 102.564 195.192 102.633 194.756 102.633C194.448 102.633 194.163 102.609 193.903 102.561C193.648 102.519 193.419 102.452 193.217 102.362V101.716C193.355 101.785 193.507 101.843 193.671 101.891C193.836 101.944 194.014 101.984 194.206 102.011C194.397 102.037 194.594 102.051 194.796 102.051C195.163 102.051 195.45 101.942 195.657 101.724C195.87 101.511 195.976 101.219 195.976 100.846V100.679C195.976 100.615 195.979 100.525 195.984 100.408C195.99 100.285 195.995 100.2 196 100.152H195.968C195.82 100.37 195.633 100.533 195.41 100.639C195.192 100.745 194.937 100.799 194.645 100.799C194.092 100.799 193.658 100.604 193.345 100.216C193.036 99.8282 192.882 99.2858 192.882 98.5893C192.882 98.132 192.951 97.7386 193.089 97.4089C193.233 97.074 193.435 96.8161 193.695 96.6353C193.956 96.4545 194.27 96.3641 194.637 96.3641ZM194.732 96.9543C194.493 96.9543 194.288 97.0181 194.118 97.1457C193.953 97.2734 193.826 97.4594 193.735 97.704C193.65 97.9486 193.608 98.2464 193.608 98.5973C193.608 99.1237 193.703 99.5277 193.895 99.8095C194.092 100.086 194.376 100.224 194.748 100.224C194.966 100.224 195.152 100.198 195.306 100.145C195.461 100.086 195.588 99.9983 195.689 99.8813C195.79 99.759 195.865 99.6048 195.913 99.4187C195.96 99.2327 195.984 99.012 195.984 98.7568V98.5893C195.984 98.2012 195.939 97.8875 195.849 97.6482C195.764 97.4089 195.628 97.2335 195.442 97.1218C195.256 97.0102 195.019 96.9543 194.732 96.9543ZM199.456 100.224C199.562 100.224 199.671 100.216 199.783 100.2C199.894 100.179 199.985 100.158 200.054 100.137V100.671C199.979 100.708 199.873 100.737 199.735 100.759C199.596 100.785 199.464 100.799 199.336 100.799C199.113 100.799 198.905 100.761 198.714 100.687C198.528 100.607 198.376 100.472 198.259 100.28C198.142 100.089 198.084 99.8202 198.084 99.4746V96.9862H197.478V96.6513L198.092 96.3721L198.371 95.4629H198.786V96.4439H200.022V96.9862H198.786V99.4586C198.786 99.7192 198.847 99.9132 198.969 100.041C199.097 100.163 199.259 100.224 199.456 100.224ZM201.612 96.4359C201.612 96.537 201.606 96.6406 201.596 96.747C201.59 96.8533 201.582 96.949 201.572 97.0341H201.62C201.71 96.8852 201.824 96.7629 201.962 96.6672C202.101 96.5715 202.255 96.4997 202.425 96.4519C202.595 96.3987 202.771 96.3721 202.951 96.3721C203.297 96.3721 203.584 96.428 203.813 96.5396C204.047 96.6459 204.222 96.8134 204.339 97.0421C204.456 97.2707 204.515 97.5684 204.515 97.9353V100.719H203.821V97.9832C203.821 97.6376 203.744 97.3797 203.589 97.2095C203.435 97.0394 203.193 96.9543 202.864 96.9543C202.545 96.9543 202.295 97.0155 202.114 97.1378C201.933 97.2547 201.803 97.4302 201.723 97.6641C201.649 97.8928 201.612 98.1746 201.612 98.5095V100.719H200.91V94.6574H201.612V96.4359Z' fill={_secondaryColor} />
      <path d='M141.439 77.8439C141.439 78.1842 141.357 78.4739 141.192 78.7132C141.027 78.9471 140.791 79.1279 140.482 79.2555C140.179 79.3831 139.82 79.4469 139.405 79.4469C139.193 79.4469 138.988 79.4363 138.791 79.415C138.6 79.3938 138.425 79.3645 138.265 79.3273C138.105 79.2848 137.965 79.2343 137.842 79.1758V78.4899C138.034 78.575 138.27 78.6521 138.552 78.7212C138.839 78.7903 139.134 78.8249 139.437 78.8249C139.719 78.8249 139.956 78.7876 140.147 78.7132C140.339 78.6388 140.482 78.5324 140.578 78.3942C140.674 78.2559 140.721 78.0938 140.721 77.9077C140.721 77.7216 140.682 77.5647 140.602 77.4371C140.522 77.3095 140.384 77.1925 140.187 77.0862C139.996 76.9745 139.727 76.8576 139.382 76.7353C139.137 76.6449 138.922 76.5492 138.736 76.4482C138.555 76.3418 138.403 76.2222 138.281 76.0893C138.159 75.9563 138.066 75.8048 138.002 75.6347C137.943 75.4645 137.914 75.2678 137.914 75.0445C137.914 74.7414 137.991 74.4835 138.145 74.2709C138.3 74.0529 138.512 73.8854 138.783 73.7684C139.06 73.6514 139.376 73.593 139.732 73.593C140.046 73.593 140.333 73.6222 140.594 73.6807C140.854 73.7392 141.091 73.8163 141.304 73.912L141.08 74.5261C140.884 74.441 140.668 74.3692 140.434 74.3107C140.206 74.2523 139.966 74.223 139.717 74.223C139.477 74.223 139.278 74.2576 139.118 74.3267C138.959 74.3958 138.839 74.4942 138.759 74.6218C138.68 74.7441 138.64 74.8876 138.64 75.0525C138.64 75.2439 138.68 75.4034 138.759 75.531C138.839 75.6586 138.969 75.7729 139.15 75.8739C139.331 75.975 139.576 76.084 139.884 76.2009C140.219 76.3232 140.501 76.4561 140.729 76.5997C140.963 76.7379 141.139 76.9054 141.256 77.1022C141.378 77.2989 141.439 77.5461 141.439 77.8439ZM143.192 79.3672H142.491V73.3058H143.192V79.3672ZM148.263 77.2218C148.263 77.578 148.216 77.8944 148.12 78.1709C148.029 78.442 147.896 78.6733 147.721 78.8647C147.551 79.0561 147.341 79.2024 147.091 79.3034C146.846 79.3991 146.573 79.4469 146.269 79.4469C145.988 79.4469 145.727 79.3991 145.488 79.3034C145.249 79.2024 145.041 79.0561 144.866 78.8647C144.69 78.6733 144.552 78.442 144.451 78.1709C144.355 77.8944 144.308 77.578 144.308 77.2218C144.308 76.7486 144.387 76.3498 144.547 76.0255C144.706 75.6958 144.935 75.4459 145.233 75.2758C145.53 75.1003 145.884 75.0126 146.293 75.0126C146.682 75.0126 147.022 75.1003 147.314 75.2758C147.612 75.4459 147.843 75.6958 148.008 76.0255C148.178 76.3498 148.263 76.7486 148.263 77.2218ZM145.033 77.2218C145.033 77.5568 145.076 77.8492 145.161 78.0991C145.251 78.3437 145.39 78.5324 145.576 78.6653C145.762 78.7983 145.998 78.8647 146.285 78.8647C146.573 78.8647 146.809 78.7983 146.995 78.6653C147.181 78.5324 147.317 78.3437 147.402 78.0991C147.492 77.8492 147.538 77.5568 147.538 77.2218C147.538 76.8815 147.492 76.5917 147.402 76.3525C147.312 76.1132 147.173 75.9298 146.987 75.8022C146.807 75.6692 146.57 75.6028 146.277 75.6028C145.841 75.6028 145.525 75.7463 145.328 76.0334C145.132 76.3206 145.033 76.7167 145.033 77.2218ZM151.409 75.0126C151.936 75.0126 152.359 75.196 152.678 75.5629C153.002 75.9298 153.164 76.4827 153.164 77.2218C153.164 77.7056 153.09 78.115 152.941 78.45C152.797 78.7797 152.592 79.0296 152.327 79.1997C152.066 79.3645 151.758 79.4469 151.401 79.4469C151.183 79.4469 150.989 79.4177 150.819 79.3592C150.649 79.3007 150.503 79.2263 150.381 79.1359C150.264 79.0402 150.163 78.9365 150.078 78.8249H150.03C150.04 78.9152 150.051 79.0296 150.062 79.1678C150.072 79.306 150.078 79.4257 150.078 79.5267V81.2813H149.376V75.0923H149.95L150.046 75.6745H150.078C150.163 75.5523 150.264 75.4406 150.381 75.3396C150.503 75.2386 150.646 75.1588 150.811 75.1003C150.981 75.0418 151.181 75.0126 151.409 75.0126ZM151.282 75.6028C150.995 75.6028 150.763 75.6586 150.588 75.7703C150.412 75.8766 150.285 76.0388 150.205 76.2568C150.125 76.4748 150.083 76.7512 150.078 77.0862V77.2218C150.078 77.5727 150.115 77.8705 150.189 78.115C150.264 78.3596 150.389 78.5457 150.564 78.6733C150.745 78.8009 150.989 78.8647 151.298 78.8647C151.558 78.8647 151.771 78.793 151.936 78.6494C152.106 78.5058 152.231 78.3118 152.311 78.0672C152.396 77.8173 152.438 77.5328 152.438 77.2138C152.438 76.7247 152.343 76.3339 152.151 76.0414C151.965 75.749 151.675 75.6028 151.282 75.6028ZM155.933 75.0126C156.3 75.0126 156.614 75.0923 156.874 75.2518C157.14 75.4114 157.342 75.6373 157.481 75.9298C157.624 76.2169 157.696 76.5545 157.696 76.9426V77.3653H154.769C154.78 77.8492 154.902 78.2187 155.136 78.4739C155.375 78.7238 155.707 78.8488 156.133 78.8488C156.404 78.8488 156.643 78.8249 156.851 78.777C157.063 78.7238 157.281 78.6494 157.505 78.5537V79.1678C157.287 79.2635 157.071 79.3326 156.859 79.3752C156.646 79.423 156.393 79.4469 156.101 79.4469C155.697 79.4469 155.338 79.3645 155.024 79.1997C154.716 79.0349 154.474 78.7903 154.298 78.466C154.128 78.1363 154.043 77.7349 154.043 77.2617C154.043 76.7938 154.12 76.3923 154.274 76.0574C154.434 75.7224 154.655 75.4645 154.936 75.2838C155.224 75.103 155.556 75.0126 155.933 75.0126ZM155.925 75.5868C155.59 75.5868 155.325 75.6958 155.128 75.9138C154.936 76.1265 154.822 76.4242 154.785 76.8071H156.962C156.962 76.5625 156.925 76.3498 156.851 76.169C156.776 75.9883 156.662 75.8474 156.508 75.7463C156.359 75.64 156.165 75.5868 155.925 75.5868ZM162.475 75.0206C162.996 75.0206 163.382 75.1349 163.631 75.3635C163.881 75.5921 164.006 75.9563 164.006 76.4561V79.3672H163.496L163.36 78.7611H163.328C163.206 78.9152 163.078 79.0455 162.946 79.1519C162.818 79.2529 162.669 79.3273 162.499 79.3752C162.334 79.423 162.132 79.4469 161.893 79.4469C161.638 79.4469 161.406 79.4017 161.199 79.3114C160.997 79.221 160.837 79.0827 160.72 78.8966C160.603 78.7052 160.545 78.466 160.545 78.1788C160.545 77.7535 160.712 77.4265 161.047 77.1979C161.382 76.9639 161.898 76.8363 162.595 76.815L163.32 76.7911V76.5359C163.32 76.1797 163.243 75.9324 163.089 75.7942C162.935 75.6559 162.717 75.5868 162.435 75.5868C162.212 75.5868 161.999 75.6214 161.797 75.6905C161.595 75.7543 161.406 75.8287 161.231 75.9138L161.015 75.3874C161.202 75.2864 161.422 75.2013 161.677 75.1322C161.933 75.0578 162.199 75.0206 162.475 75.0206ZM162.682 77.3015C162.151 77.3228 161.781 77.4079 161.574 77.5568C161.372 77.7056 161.271 77.9157 161.271 78.1868C161.271 78.4261 161.342 78.6015 161.486 78.7132C161.635 78.8249 161.824 78.8807 162.052 78.8807C162.414 78.8807 162.714 78.7823 162.954 78.5856C163.193 78.3835 163.312 78.0752 163.312 77.6604V77.2776L162.682 77.3015ZM167.384 75.0126C167.895 75.0126 168.28 75.1375 168.541 75.3874C168.801 75.632 168.932 76.0308 168.932 76.5838V79.3672H168.238V76.6316C168.238 76.286 168.161 76.0281 168.006 75.858C167.852 75.6878 167.61 75.6028 167.281 75.6028C166.807 75.6028 166.48 75.7357 166.3 76.0015C166.119 76.2674 166.028 76.6502 166.028 77.15V79.3672H165.327V75.0923H165.893L165.997 75.6745H166.036C166.132 75.5257 166.249 75.4034 166.387 75.3077C166.531 75.2067 166.688 75.1322 166.858 75.0844C167.028 75.0365 167.203 75.0126 167.384 75.0126ZM171.772 75.0126C172.054 75.0126 172.306 75.0658 172.53 75.1721C172.758 75.2784 172.952 75.4406 173.112 75.6586H173.152L173.248 75.0923H173.806V79.439C173.806 79.8431 173.737 80.1807 173.598 80.4519C173.46 80.7283 173.25 80.9357 172.968 81.0739C172.687 81.2122 172.328 81.2813 171.892 81.2813C171.583 81.2813 171.299 81.2574 171.038 81.2095C170.783 81.167 170.554 81.1005 170.352 81.0101V80.3641C170.491 80.4332 170.642 80.4917 170.807 80.5396C170.972 80.5927 171.15 80.6326 171.341 80.6592C171.533 80.6858 171.73 80.6991 171.932 80.6991C172.298 80.6991 172.586 80.5901 172.793 80.3721C173.006 80.1594 173.112 79.867 173.112 79.4948V79.3273C173.112 79.2635 173.115 79.1731 173.12 79.0561C173.125 78.9339 173.131 78.8488 173.136 78.8009H173.104C172.955 79.0189 172.769 79.1811 172.546 79.2874C172.328 79.3938 172.072 79.4469 171.78 79.4469C171.227 79.4469 170.794 79.2529 170.48 78.8647C170.172 78.4766 170.017 77.9343 170.017 77.2377C170.017 76.7805 170.087 76.387 170.225 76.0574C170.368 75.7224 170.57 75.4645 170.831 75.2838C171.092 75.103 171.405 75.0126 171.772 75.0126ZM171.868 75.6028C171.629 75.6028 171.424 75.6666 171.254 75.7942C171.089 75.9218 170.961 76.1079 170.871 76.3525C170.786 76.597 170.743 76.8948 170.743 77.2457C170.743 77.7721 170.839 78.1762 171.03 78.458C171.227 78.7345 171.512 78.8727 171.884 78.8727C172.102 78.8727 172.288 78.8461 172.442 78.793C172.596 78.7345 172.724 78.6467 172.825 78.5298C172.926 78.4075 173 78.2533 173.048 78.0672C173.096 77.8811 173.12 77.6604 173.12 77.4052V77.2377C173.12 76.8496 173.075 76.5359 172.984 76.2966C172.899 76.0574 172.764 75.8819 172.578 75.7703C172.392 75.6586 172.155 75.6028 171.868 75.6028ZM175.865 79.3672H175.164V73.3058H175.865V79.3672ZM178.871 75.0126C179.237 75.0126 179.551 75.0923 179.812 75.2518C180.078 75.4114 180.28 75.6373 180.418 75.9298C180.561 76.2169 180.633 76.5545 180.633 76.9426V77.3653H177.706C177.717 77.8492 177.839 78.2187 178.073 78.4739C178.312 78.7238 178.645 78.8488 179.07 78.8488C179.341 78.8488 179.58 78.8249 179.788 78.777C180 78.7238 180.218 78.6494 180.442 78.5537V79.1678C180.224 79.2635 180.008 79.3326 179.796 79.3752C179.583 79.423 179.331 79.4469 179.038 79.4469C178.634 79.4469 178.275 79.3645 177.961 79.1997C177.653 79.0349 177.411 78.7903 177.236 78.466C177.066 78.1363 176.98 77.7349 176.98 77.2617C176.98 76.7938 177.058 76.3923 177.212 76.0574C177.371 75.7224 177.592 75.4645 177.874 75.2838C178.161 75.103 178.493 75.0126 178.871 75.0126ZM178.863 75.5868C178.528 75.5868 178.262 75.6958 178.065 75.9138C177.874 76.1265 177.759 76.4242 177.722 76.8071H179.899C179.899 76.5625 179.862 76.3498 179.788 76.169C179.713 75.9883 179.599 75.8474 179.445 75.7463C179.296 75.64 179.102 75.5868 178.863 75.5868ZM184.505 78.1868C184.505 78.4633 184.436 78.6946 184.298 78.8807C184.159 79.0668 183.963 79.2077 183.707 79.3034C183.452 79.3991 183.149 79.4469 182.798 79.4469C182.5 79.4469 182.243 79.423 182.025 79.3752C181.812 79.3273 181.623 79.2608 181.458 79.1758V78.5377C181.628 78.6228 181.833 78.7026 182.072 78.777C182.317 78.8461 182.564 78.8807 182.814 78.8807C183.17 78.8807 183.428 78.8249 183.588 78.7132C183.747 78.5962 183.827 78.442 183.827 78.2506C183.827 78.1443 183.798 78.0486 183.739 77.9635C183.681 77.8784 183.574 77.7934 183.42 77.7083C183.271 77.6232 183.056 77.5275 182.774 77.4212C182.498 77.3148 182.261 77.2085 182.064 77.1022C181.868 76.9958 181.716 76.8682 181.61 76.7193C181.503 76.5705 181.45 76.379 181.45 76.1451C181.45 75.7835 181.597 75.5044 181.889 75.3077C182.187 75.111 182.575 75.0126 183.053 75.0126C183.314 75.0126 183.556 75.0392 183.779 75.0923C184.008 75.1402 184.22 75.2093 184.417 75.2997L184.178 75.858C184.061 75.8048 183.936 75.7596 183.803 75.7224C183.675 75.6799 183.545 75.648 183.412 75.6267C183.279 75.6001 183.144 75.5868 183.006 75.5868C182.718 75.5868 182.498 75.6347 182.344 75.7304C182.195 75.8208 182.12 75.9457 182.12 76.1052C182.12 76.2222 182.155 76.3232 182.224 76.4083C182.293 76.488 182.407 76.5678 182.567 76.6476C182.732 76.722 182.95 76.8124 183.221 76.9187C183.492 77.0197 183.723 77.1234 183.915 77.2298C184.106 77.3361 184.252 77.4664 184.353 77.6206C184.454 77.7694 184.505 77.9582 184.505 78.1868Z' fill={_secondaryColor} />
      <path d='M80.0037 104.977C80.0037 105.317 79.9213 105.607 79.7564 105.846C79.5916 106.08 79.355 106.261 79.0466 106.388C78.7436 106.516 78.3847 106.58 77.9699 106.58C77.7573 106.58 77.5526 106.569 77.3558 106.548C77.1644 106.527 76.989 106.497 76.8294 106.46C76.6699 106.418 76.529 106.367 76.4067 106.309V105.623C76.5982 105.708 76.8348 105.785 77.1166 105.854C77.4037 105.923 77.6988 105.958 78.0018 105.958C78.2836 105.958 78.5202 105.92 78.7117 105.846C78.9031 105.772 79.0466 105.665 79.1423 105.527C79.238 105.389 79.2859 105.227 79.2859 105.04C79.2859 104.854 79.246 104.698 79.1663 104.57C79.0865 104.442 78.9483 104.325 78.7515 104.219C78.5601 104.107 78.2916 103.99 77.946 103.868C77.7014 103.778 77.4861 103.682 77.3 103.581C77.1192 103.475 76.9677 103.355 76.8454 103.222C76.7231 103.089 76.6301 102.938 76.5663 102.767C76.5078 102.597 76.4785 102.401 76.4785 102.177C76.4785 101.874 76.5556 101.616 76.7098 101.404C76.864 101.186 77.0767 101.018 77.3479 100.901C77.6243 100.784 77.9407 100.726 78.2969 100.726C78.6106 100.726 78.8978 100.755 79.1583 100.813C79.4188 100.872 79.6554 100.949 79.8681 101.045L79.6448 101.659C79.4481 101.574 79.2327 101.502 78.9988 101.444C78.7701 101.385 78.5309 101.356 78.281 101.356C78.0417 101.356 77.8423 101.39 77.6828 101.46C77.5233 101.529 77.4037 101.627 77.3239 101.755C77.2442 101.877 77.2043 102.02 77.2043 102.185C77.2043 102.377 77.2442 102.536 77.3239 102.664C77.4037 102.791 77.5339 102.906 77.7147 103.007C77.8955 103.108 78.1401 103.217 78.4485 103.334C78.7834 103.456 79.0652 103.589 79.2939 103.733C79.5278 103.871 79.7033 104.038 79.8202 104.235C79.9425 104.432 80.0037 104.679 80.0037 104.977ZM84.7716 104.355C84.7716 104.711 84.7238 105.027 84.6281 105.304C84.5377 105.575 84.4048 105.806 84.2293 105.998C84.0592 106.189 83.8491 106.335 83.5992 106.436C83.3547 106.532 83.0808 106.58 82.7778 106.58C82.496 106.58 82.2354 106.532 81.9962 106.436C81.7569 106.335 81.5495 106.189 81.3741 105.998C81.1986 105.806 81.0604 105.575 80.9594 105.304C80.8637 105.027 80.8158 104.711 80.8158 104.355C80.8158 103.881 80.8956 103.483 81.0551 103.158C81.2146 102.829 81.4432 102.579 81.741 102.409C82.0387 102.233 82.3923 102.145 82.8017 102.145C83.1898 102.145 83.5301 102.233 83.8226 102.409C84.1203 102.579 84.3516 102.829 84.5164 103.158C84.6866 103.483 84.7716 103.881 84.7716 104.355ZM81.5416 104.355C81.5416 104.69 81.5841 104.982 81.6692 105.232C81.7596 105.476 81.8978 105.665 82.0839 105.798C82.27 105.931 82.5066 105.998 82.7937 105.998C83.0808 105.998 83.3174 105.931 83.5035 105.798C83.6896 105.665 83.8252 105.476 83.9103 105.232C84.0007 104.982 84.0459 104.69 84.0459 104.355C84.0459 104.014 84.0007 103.725 83.9103 103.485C83.8199 103.246 83.6817 103.063 83.4956 102.935C83.3148 102.802 83.0782 102.736 82.7857 102.736C82.3498 102.736 82.0334 102.879 81.8367 103.166C81.6399 103.453 81.5416 103.849 81.5416 104.355ZM87.8539 102.767H86.7772V106.5H86.0754V102.767H85.3257V102.44L86.0754 102.201V101.954C86.0754 101.587 86.1285 101.289 86.2349 101.061C86.3465 100.832 86.506 100.665 86.7134 100.558C86.9208 100.452 87.1707 100.399 87.4631 100.399C87.6332 100.399 87.7874 100.415 87.9257 100.447C88.0692 100.473 88.1915 100.505 88.2926 100.542L88.1091 101.093C88.024 101.066 87.9257 101.039 87.814 101.013C87.7024 100.986 87.5881 100.973 87.4711 100.973C87.2371 100.973 87.0617 101.053 86.9447 101.212C86.833 101.366 86.7772 101.611 86.7772 101.946V102.225H87.8539V102.767ZM90.5975 102.767H89.5208V106.5H88.8189V102.767H88.0692V102.44L88.8189 102.201V101.954C88.8189 101.587 88.8721 101.289 88.9784 101.061C89.0901 100.832 89.2496 100.665 89.457 100.558C89.6643 100.452 89.9142 100.399 90.2067 100.399C90.3768 100.399 90.531 100.415 90.6692 100.447C90.8128 100.473 90.9351 100.505 91.0361 100.542L90.8527 101.093C90.7676 101.066 90.6692 101.039 90.5576 101.013C90.4459 100.986 90.3316 100.973 90.2146 100.973C89.9807 100.973 89.8052 101.053 89.6883 101.212C89.5766 101.366 89.5208 101.611 89.5208 101.946V102.225H90.5975V102.767ZM92.0729 102.225V106.5H91.3711V102.225H92.0729ZM91.73 100.622C91.8363 100.622 91.9294 100.659 92.0091 100.734C92.0942 100.803 92.1367 100.915 92.1367 101.069C92.1367 101.218 92.0942 101.329 92.0091 101.404C91.9294 101.478 91.8363 101.515 91.73 101.515C91.613 101.515 91.5146 101.478 91.4349 101.404C91.3551 101.329 91.3153 101.218 91.3153 101.069C91.3153 100.915 91.3551 100.803 91.4349 100.734C91.5146 100.659 91.613 100.622 91.73 100.622ZM94.8587 106.006C94.965 106.006 95.074 105.998 95.1857 105.982C95.2973 105.96 95.3877 105.939 95.4568 105.918V106.452C95.3824 106.489 95.276 106.519 95.1378 106.54C94.9996 106.566 94.8666 106.58 94.739 106.58C94.5157 106.58 94.3084 106.543 94.1169 106.468C93.9308 106.388 93.7793 106.253 93.6623 106.061C93.5454 105.87 93.4869 105.601 93.4869 105.256V102.767H92.8807V102.433L93.4949 102.153L93.774 101.244H94.1887V102.225H95.4249V102.767H94.1887V105.24C94.1887 105.5 94.2499 105.694 94.3722 105.822C94.4998 105.944 94.6619 106.006 94.8587 106.006Z' fill={_secondaryColor} />
      <path d='M121.086 122.025C121.086 121.386 121.086 93.047 121.086 78.957' stroke='#737373' strokeOpacity='0.63' strokeWidth='3.98773' />
      <path d='M257.865 46.4422L217.988 12.9453L99.9512 86.3195' stroke={_color} strokeWidth='3.98773' strokeLinecap='round' />
      <path d='M100.567 71.2432C100.512 71.4563 100.639 71.6741 100.853 71.7296L104.325 72.6349C104.539 72.6905 104.756 72.5628 104.812 72.3497C104.867 72.1365 104.74 71.9187 104.527 71.8632L101.44 71.0585L102.244 67.9714C102.3 67.7583 102.172 67.5405 101.959 67.485C101.746 67.4294 101.528 67.5571 101.473 67.7703L100.567 71.2432ZM209.394 8.07587C209.45 7.86276 209.322 7.64496 209.109 7.5894L205.636 6.68409C205.423 6.62854 205.205 6.75626 205.149 6.96938C205.094 7.18249 205.222 7.40029 205.435 7.45584L208.522 8.26057L207.717 11.3476C207.661 11.5607 207.789 11.7785 208.002 11.8341C208.215 11.8896 208.433 11.7619 208.489 11.5488L209.394 8.07587ZM101.155 71.6877L102.506 70.8956L102.102 70.2077L100.751 70.9998L101.155 71.6877ZM105.207 69.3114L107.908 67.7272L107.505 67.0392L104.803 68.6234L105.207 69.3114ZM110.61 66.143L113.311 64.5588L112.908 63.8708L110.206 65.455L110.61 66.143ZM116.012 62.9746L118.714 61.3904L118.31 60.7024L115.609 62.2866L116.012 62.9746ZM121.415 59.8061L124.117 58.2219L123.713 57.534L121.012 59.1182L121.415 59.8061ZM126.818 56.6377L129.519 55.0535L129.116 54.3655L126.414 55.9498L126.818 56.6377ZM132.221 53.4693L134.922 51.8851L134.519 51.1971L131.817 52.7813L132.221 53.4693ZM137.623 50.3009L140.325 48.7167L139.921 48.0287L137.22 49.6129L137.623 50.3009ZM143.026 47.1325L145.728 45.5482L145.324 44.8603L142.623 46.4445L143.026 47.1325ZM148.429 43.964L151.13 42.3798L150.727 41.6919L148.025 43.2761L148.429 43.964ZM153.832 40.7956L156.533 39.2114L156.13 38.5234L153.428 40.1076L153.832 40.7956ZM159.234 37.6272L161.936 36.043L161.532 35.355L158.831 36.9392L159.234 37.6272ZM164.637 34.4588L167.339 32.8745L166.935 32.1866L164.234 33.7708L164.637 34.4588ZM170.04 31.2903L172.741 29.7061L172.338 29.0182L169.636 30.6024L170.04 31.2903ZM175.443 28.1219L178.144 26.5377L177.741 25.8497L175.039 27.4339L175.443 28.1219ZM180.845 24.9535L183.547 23.3693L183.143 22.6813L180.442 24.2655L180.845 24.9535ZM186.248 21.7851L188.95 20.2009L188.546 19.5129L185.845 21.0971L186.248 21.7851ZM191.651 18.6166L194.352 17.0324L193.949 16.3445L191.247 17.9287L191.651 18.6166ZM197.054 15.4482L199.755 13.864L199.352 13.176L196.65 14.7603L197.054 15.4482ZM202.456 12.2798L205.158 10.6956L204.754 10.0076L202.053 11.5918L202.456 12.2798ZM207.859 9.11138L209.21 8.31927L208.806 7.6313L207.456 8.42341L207.859 9.11138ZM100.567 71.2432C100.512 71.4563 100.639 71.6741 100.853 71.7296L104.325 72.6349C104.539 72.6905 104.756 72.5628 104.812 72.3497C104.867 72.1365 104.74 71.9187 104.527 71.8632L101.44 71.0585L102.244 67.9714C102.3 67.7583 102.172 67.5405 101.959 67.485C101.746 67.4294 101.528 67.5571 101.473 67.7703L100.567 71.2432ZM209.394 8.07587C209.45 7.86276 209.322 7.64496 209.109 7.5894L205.636 6.68409C205.423 6.62854 205.205 6.75626 205.149 6.96938C205.094 7.18249 205.222 7.40029 205.435 7.45584L208.522 8.26057L207.717 11.3476C207.661 11.5607 207.789 11.7785 208.002 11.8341C208.215 11.8896 208.433 11.7619 208.489 11.5488L209.394 8.07587ZM101.155 71.6877L102.506 70.8956L102.102 70.2077L100.751 70.9998L101.155 71.6877ZM105.207 69.3114L107.908 67.7272L107.505 67.0392L104.803 68.6234L105.207 69.3114ZM110.61 66.143L113.311 64.5588L112.908 63.8708L110.206 65.455L110.61 66.143ZM116.012 62.9746L118.714 61.3904L118.31 60.7024L115.609 62.2866L116.012 62.9746ZM121.415 59.8061L124.117 58.2219L123.713 57.534L121.012 59.1182L121.415 59.8061ZM126.818 56.6377L129.519 55.0535L129.116 54.3655L126.414 55.9498L126.818 56.6377ZM132.221 53.4693L134.922 51.8851L134.519 51.1971L131.817 52.7813L132.221 53.4693ZM137.623 50.3009L140.325 48.7167L139.921 48.0287L137.22 49.6129L137.623 50.3009ZM143.026 47.1325L145.728 45.5482L145.324 44.8603L142.623 46.4445L143.026 47.1325ZM148.429 43.964L151.13 42.3798L150.727 41.6919L148.025 43.2761L148.429 43.964ZM153.832 40.7956L156.533 39.2114L156.13 38.5234L153.428 40.1076L153.832 40.7956ZM159.234 37.6272L161.936 36.043L161.532 35.355L158.831 36.9392L159.234 37.6272ZM164.637 34.4588L167.339 32.8745L166.935 32.1866L164.234 33.7708L164.637 34.4588ZM170.04 31.2903L172.741 29.7061L172.338 29.0182L169.636 30.6024L170.04 31.2903ZM175.443 28.1219L178.144 26.5377L177.741 25.8497L175.039 27.4339L175.443 28.1219ZM180.845 24.9535L183.547 23.3693L183.143 22.6813L180.442 24.2655L180.845 24.9535ZM186.248 21.7851L188.95 20.2009L188.546 19.5129L185.845 21.0971L186.248 21.7851ZM191.651 18.6166L194.352 17.0324L193.949 16.3445L191.247 17.9287L191.651 18.6166ZM197.054 15.4482L199.755 13.864L199.352 13.176L196.65 14.7603L197.054 15.4482ZM202.456 12.2798L205.158 10.6956L204.754 10.0076L202.053 11.5918L202.456 12.2798ZM207.859 9.11138L209.21 8.31927L208.806 7.6313L207.456 8.42341L207.859 9.11138Z' fill={_secondaryColor} />
      <path d='M125.988 87.6321C125.832 87.7878 125.832 88.0403 125.988 88.196L128.525 90.7338C128.681 90.8895 128.934 90.8895 129.089 90.7338C129.245 90.5781 129.245 90.3256 129.089 90.1699L126.833 87.9141L129.089 85.6583C129.245 85.5025 129.245 85.25 129.089 85.0943C128.934 84.9386 128.681 84.9386 128.525 85.0943L125.988 87.6321ZM215.877 88.196C216.032 88.0403 216.032 87.7878 215.877 87.6321L213.339 85.0943C213.183 84.9386 212.931 84.9386 212.775 85.0943C212.619 85.25 212.619 85.5025 212.775 85.6583L215.031 87.9141L212.775 90.1699C212.619 90.3256 212.619 90.5781 212.775 90.7338C212.931 90.8895 213.183 90.8895 213.339 90.7338L215.877 88.196ZM126.27 88.3128H127.865V87.5153H126.27V88.3128ZM131.055 88.3128H134.245V87.5153H131.055V88.3128ZM137.435 88.3128H140.625V87.5153H137.435V88.3128ZM143.816 88.3128H147.006V87.5153H143.816V88.3128ZM150.196 88.3128H153.386V87.5153H150.196V88.3128ZM156.576 88.3128H159.766V87.5153H156.576V88.3128ZM162.957 88.3128H166.147V87.5153H162.957V88.3128ZM169.337 88.3128H172.527V87.5153H169.337V88.3128ZM175.717 88.3128H178.908V87.5153H175.717V88.3128ZM182.098 88.3128H185.288V87.5153H182.098V88.3128ZM188.478 88.3128H191.668V87.5153H188.478V88.3128ZM194.859 88.3128H198.049V87.5153H194.859V88.3128ZM201.239 88.3128H204.429V87.5153H201.239V88.3128ZM207.619 88.3128H210.809V87.5153H207.619V88.3128ZM214 88.3128H215.595V87.5153H214V88.3128ZM125.988 87.6321C125.832 87.7878 125.832 88.0403 125.988 88.196L128.525 90.7338C128.681 90.8895 128.934 90.8895 129.089 90.7338C129.245 90.5781 129.245 90.3256 129.089 90.1699L126.833 87.9141L129.089 85.6583C129.245 85.5025 129.245 85.25 129.089 85.0943C128.934 84.9386 128.681 84.9386 128.525 85.0943L125.988 87.6321ZM215.877 88.196C216.032 88.0403 216.032 87.7878 215.877 87.6321L213.339 85.0943C213.183 84.9386 212.931 84.9386 212.775 85.0943C212.619 85.25 212.619 85.5025 212.775 85.6583L215.031 87.9141L212.775 90.1699C212.619 90.3256 212.619 90.5781 212.775 90.7338C212.931 90.8895 213.183 90.8895 213.339 90.7338L215.877 88.196ZM126.27 88.3128H127.865V87.5153H126.27V88.3128ZM131.055 88.3128H134.245V87.5153H131.055V88.3128ZM137.435 88.3128H140.625V87.5153H137.435V88.3128ZM143.816 88.3128H147.006V87.5153H143.816V88.3128ZM150.196 88.3128H153.386V87.5153H150.196V88.3128ZM156.576 88.3128H159.766V87.5153H156.576V88.3128ZM162.957 88.3128H166.147V87.5153H162.957V88.3128ZM169.337 88.3128H172.527V87.5153H169.337V88.3128ZM175.717 88.3128H178.908V87.5153H175.717V88.3128ZM182.098 88.3128H185.288V87.5153H182.098V88.3128ZM188.478 88.3128H191.668V87.5153H188.478V88.3128ZM194.859 88.3128H198.049V87.5153H194.859V88.3128ZM201.239 88.3128H204.429V87.5153H201.239V88.3128ZM207.619 88.3128H210.809V87.5153H207.619V88.3128ZM214 88.3128H215.595V87.5153H214V88.3128Z' fill={_secondaryColor} />
      <path d='M216.909 86.5984C217.065 86.7541 217.318 86.7541 217.473 86.5984L220.011 84.0606C220.167 83.9049 220.167 83.6524 220.011 83.4967C219.855 83.3409 219.603 83.3409 219.447 83.4967L217.191 85.7525L214.936 83.4967C214.78 83.3409 214.527 83.3409 214.372 83.4967C214.216 83.6524 214.216 83.9049 214.372 84.0606L216.909 86.5984ZM217.473 18.243C217.318 18.0873 217.065 18.0873 216.909 18.243L214.372 20.7808C214.216 20.9365 214.216 21.189 214.372 21.3447C214.527 21.5005 214.78 21.5005 214.936 21.3447L217.191 19.0889L219.447 21.3447C219.603 21.5005 219.855 21.5005 220.011 21.3447C220.167 21.189 220.167 20.9365 220.011 20.7808L217.473 18.243ZM217.59 86.3164V84.7757H216.793V86.3164H217.59ZM217.59 81.6943V78.6128H216.793V81.6943H217.59ZM217.59 75.5314V72.45H216.793V75.5314H217.59ZM217.59 69.3686V66.2871H216.793V69.3686H217.59ZM217.59 63.2057V60.1243H216.793V63.2057H217.59ZM217.59 57.0428V53.9614H216.793V57.0428H217.59ZM217.59 50.88V47.7986H216.793V50.88H217.59ZM217.59 44.7171V41.6357H216.793V44.7171H217.59ZM217.59 38.5543V35.4728H216.793V38.5543H217.59ZM217.59 32.3914V29.31H216.793V32.3914H217.59ZM217.59 26.2286V23.1471H216.793V26.2286H217.59ZM217.59 20.0657V18.525H216.793V20.0657H217.59ZM216.909 86.5984C217.065 86.7541 217.318 86.7541 217.473 86.5984L220.011 84.0606C220.167 83.9049 220.167 83.6524 220.011 83.4967C219.855 83.3409 219.603 83.3409 219.447 83.4967L217.191 85.7525L214.936 83.4967C214.78 83.3409 214.527 83.3409 214.372 83.4967C214.216 83.6524 214.216 83.9049 214.372 84.0606L216.909 86.5984ZM217.473 18.243C217.318 18.0873 217.065 18.0873 216.909 18.243L214.372 20.7808C214.216 20.9365 214.216 21.189 214.372 21.3447C214.527 21.5005 214.78 21.5005 214.936 21.3447L217.191 19.0889L219.447 21.3447C219.603 21.5005 219.855 21.5005 220.011 21.3447C220.167 21.189 220.167 20.9365 220.011 20.7808L217.473 18.243ZM217.59 86.3164V84.7757H216.793V86.3164H217.59ZM217.59 81.6943V78.6128H216.793V81.6943H217.59ZM217.59 75.5314V72.45H216.793V75.5314H217.59ZM217.59 69.3686V66.2871H216.793V69.3686H217.59ZM217.59 63.2057V60.1243H216.793V63.2057H217.59ZM217.59 57.0428V53.9614H216.793V57.0428H217.59ZM217.59 50.88V47.7986H216.793V50.88H217.59ZM217.59 44.7171V41.6357H216.793V44.7171H217.59ZM217.59 38.5543V35.4728H216.793V38.5543H217.59ZM217.59 32.3914V29.31H216.793V32.3914H217.59ZM217.59 26.2286V23.1471H216.793V26.2286H217.59ZM217.59 20.0657V18.525H216.793V20.0657H217.59Z' fill={_secondaryColor} />
      <path d='M129.524 72.0276C133.242 75.9636 135.716 80.9091 136.636 86.2446' stroke={_secondaryColor} strokeWidth='0.797546' />
      <path d='M98.5 104C98.2239 104 98 104.224 98 104.5C98 104.776 98.2239 105 98.5 105V104ZM110.367 93.6603C110.179 93.4577 109.863 93.4455 109.66 93.6331L106.358 96.6905C106.156 96.8781 106.144 97.1944 106.331 97.397C106.519 97.5997 106.835 97.6118 107.038 97.4242L109.973 94.7066L112.69 97.6416C112.878 97.8442 113.194 97.8564 113.397 97.6688C113.6 97.4812 113.612 97.1648 113.424 96.9622L110.367 93.6603ZM98.5 105C101.24 105 103.34 104.994 104.936 104.819C106.528 104.644 107.717 104.291 108.562 103.519C109.412 102.742 109.831 101.618 110.075 100.108C110.318 98.599 110.4 96.6076 110.5 94.0192L109.5 93.9808C109.4 96.5924 109.319 98.5135 109.088 99.9485C108.856 101.382 108.488 102.233 107.888 102.781C107.283 103.334 106.359 103.656 104.827 103.825C103.298 103.993 101.26 104 98.5 104V105Z' fill={_secondaryColor} />
      <line x1='119' y1='87.5' x2='104' y2='87.5' stroke={_secondaryColor} strokeDasharray='4 4' />
    </svg>
  );
};

export const StairsLegendIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;
  const _textColor = theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='358'
      height='130'
      viewBox='0 0 358 130'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M200.785 24.625h24.265a2 2 0 0 1 2 2v87.973H113.63V98.239h-2.817a1 1 0 0 1-1.001-1v-.181a1 1 0 0 1 1.001-1h24.628V80.79h-2.817a1 1 0 0 1-1-1v-.181a1 1 0 0 1 1-1h25.719V62.795h-2.817a1 1 0 0 1-1-1v-.18a1 1 0 0 1 1-1h25.719v-16.36h-2.817a1 1 0 0 1-1-1v-.18a1 1 0 0 1 1-1h25.174v-15.27h-2.817a1 1 0 0 1-1-1v-.181a1 1 0 0 1 1-1Z' stroke='#a6a6a6' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M169.345 30.305c.473 0 .861.062 1.164.184.309.117.537.295.686.534.149.24.223.54.223.901 0 .304-.055.556-.167.758a1.415 1.415 0 0 1-.431.487c-.17.117-.351.21-.542.279L171.841 36h-.837l-1.38-2.353h-1.133V36h-.717v-5.695h1.571Zm-.04.623h-.814v2.113h.854c.308 0 .561-.04.757-.12a.87.87 0 0 0 .431-.366c.096-.16.144-.36.144-.599 0-.25-.051-.449-.152-.598a.824.824 0 0 0-.446-.327 2.435 2.435 0 0 0-.774-.103Zm4.036.797V36h-.702v-4.275h.702Zm-.343-1.603c.106 0 .199.037.279.112.085.069.128.18.128.335 0 .149-.043.26-.128.335a.397.397 0 0 1-.279.111.416.416 0 0 1-.295-.111c-.08-.075-.12-.186-.12-.335 0-.154.04-.266.12-.335a.416.416 0 0 1 .295-.112Zm4.481 4.698c0 .276-.069.507-.208.694a1.264 1.264 0 0 1-.59.422 2.588 2.588 0 0 1-.909.144 3.64 3.64 0 0 1-.774-.072 2.373 2.373 0 0 1-.566-.2v-.637a4.2 4.2 0 0 0 .614.239c.245.069.492.104.742.104.356 0 .614-.056.774-.168a.548.548 0 0 0 .151-.75c-.058-.085-.165-.17-.319-.255a4.724 4.724 0 0 0-.646-.287 6.231 6.231 0 0 1-.71-.319 1.313 1.313 0 0 1-.454-.383c-.107-.149-.16-.34-.16-.574a.95.95 0 0 1 .439-.837c.298-.197.686-.296 1.164-.296.261 0 .503.027.726.08.229.048.441.117.638.207l-.239.559a2.59 2.59 0 0 0-.375-.136 2.484 2.484 0 0 0-.391-.095 2.065 2.065 0 0 0-.407-.04c-.287 0-.507.047-.662.143a.42.42 0 0 0-.223.375c0 .117.035.218.104.303.069.08.183.16.343.24.165.074.383.164.654.27.271.102.502.205.694.312.191.106.337.236.438.39a.987.987 0 0 1 .152.567Zm2.684-3.175c.367 0 .68.08.941.24.266.16.468.385.606.678.143.287.215.624.215 1.012v.423h-2.927c.011.484.133.854.367 1.109.239.25.572.375.997.375.271 0 .511-.024.718-.072.213-.053.431-.128.654-.223v.614a3.137 3.137 0 0 1-.646.207 3.496 3.496 0 0 1-.758.072c-.404 0-.763-.083-1.077-.247a1.754 1.754 0 0 1-.725-.734c-.17-.33-.255-.731-.255-1.204 0-.468.077-.87.231-1.205.159-.335.38-.593.662-.773a1.83 1.83 0 0 1 .997-.272Zm-.008.575c-.335 0-.601.109-.798.327-.191.212-.306.51-.343.893h2.178c0-.245-.038-.457-.112-.638a.907.907 0 0 0-.343-.423c-.149-.106-.343-.16-.582-.16ZM245.128 72h-.718v-2.656h-2.919V72h-.717v-5.695h.717v2.41h2.919v-2.41h.718V72Zm3.112-4.355c.367 0 .681.08.941.24.266.16.468.385.607.678.143.287.215.624.215 1.013v.422h-2.927c.011.484.133.853.367 1.109.239.25.571.375.997.375.271 0 .51-.024.718-.072.212-.053.43-.128.653-.224v.615a3.118 3.118 0 0 1-.646.207 3.487 3.487 0 0 1-.757.072 2.28 2.28 0 0 1-1.077-.248 1.762 1.762 0 0 1-.726-.733c-.17-.33-.255-.731-.255-1.205 0-.467.077-.869.231-1.204.16-.335.381-.593.662-.773.288-.181.62-.272.997-.272Zm-.008.575c-.335 0-.6.109-.797.327-.192.212-.306.51-.343.893h2.177c0-.245-.037-.457-.111-.638a.907.907 0 0 0-.343-.423c-.149-.106-.343-.16-.583-.16Zm3.561-.495V72h-.702v-4.275h.702Zm-.343-1.603c.106 0 .199.037.279.112.085.069.128.18.128.335 0 .149-.043.26-.128.335a.397.397 0 0 1-.279.111.416.416 0 0 1-.295-.111c-.08-.075-.12-.186-.12-.335 0-.154.04-.266.12-.335a.416.416 0 0 1 .295-.112Zm3.213 1.523c.281 0 .534.054.757.16.229.106.423.268.583.486h.039l.096-.566h.558v4.347c0 .404-.069.742-.207 1.013a1.347 1.347 0 0 1-.63.622c-.282.138-.641.207-1.077.207-.308 0-.593-.024-.853-.072a2.806 2.806 0 0 1-.686-.2v-.645c.138.07.29.127.455.175.164.054.343.093.534.12.191.027.388.04.59.04.367 0 .654-.11.862-.327.212-.213.319-.505.319-.877v-.168c0-.064.002-.154.008-.271a4.76 4.76 0 0 1 .015-.255h-.031c-.149.218-.335.38-.559.486-.218.107-.473.16-.765.16-.553 0-.987-.194-1.3-.582-.309-.389-.463-.93-.463-1.627 0-.458.069-.851.207-1.18.144-.336.346-.594.607-.774.26-.181.574-.272.941-.272Zm.095.59a.994.994 0 0 0-.614.192 1.22 1.22 0 0 0-.383.558 2.74 2.74 0 0 0-.127.894c0 .526.096.93.287 1.212.197.276.481.415.853.415.218 0 .404-.027.559-.08a.931.931 0 0 0 .382-.263c.101-.123.176-.277.224-.463.048-.186.072-.407.072-.662v-.167c0-.389-.046-.702-.136-.942a.962.962 0 0 0-.407-.526c-.186-.112-.422-.167-.71-.167Zm3.998-.518c0 .101-.005.205-.016.311a3.556 3.556 0 0 1-.024.287h.048c.09-.148.205-.27.343-.367.138-.095.292-.167.462-.215.171-.053.346-.08.527-.08.345 0 .633.056.861.168.234.106.41.274.527.502.117.229.175.527.175.894V72h-.694v-2.736c0-.345-.077-.603-.231-.773-.154-.17-.396-.255-.726-.255-.319 0-.569.06-.75.183a.976.976 0 0 0-.39.526c-.075.229-.112.51-.112.846V72h-.702v-6.061h.702v1.778Zm5.656 3.788c.106 0 .215-.007.327-.023a2.59 2.59 0 0 0 .271-.064v.534a1.113 1.113 0 0 1-.319.088c-.138.026-.271.04-.399.04-.223 0-.43-.037-.622-.112a.982.982 0 0 1-.454-.407c-.117-.191-.176-.46-.176-.805v-2.489h-.606v-.334l.614-.28.279-.909h.415v.981h1.236v.543h-1.236v2.472c0 .26.061.455.183.582.128.122.29.183.487.183ZM119.345 52.306c.473 0 .861.06 1.164.183.309.117.537.295.686.534.149.24.223.54.223.901 0 .304-.055.556-.167.758a1.415 1.415 0 0 1-.431.487c-.17.117-.351.21-.542.279L121.841 58h-.837l-1.38-2.353h-1.133V58h-.717v-5.694h1.571Zm-.04.622h-.814v2.113h.854c.308 0 .561-.04.757-.12a.87.87 0 0 0 .431-.366c.096-.16.144-.36.144-.599 0-.25-.051-.449-.152-.598a.824.824 0 0 0-.446-.327 2.435 2.435 0 0 0-.774-.103Zm6.907.797V58h-.574l-.104-.566h-.032a1.16 1.16 0 0 1-.351.367 1.49 1.49 0 0 1-.47.207c-.17.048-.348.072-.534.072-.341 0-.628-.053-.862-.16a1.123 1.123 0 0 1-.518-.51c-.117-.229-.176-.524-.176-.885v-2.8h.71v2.752c0 .34.077.595.231.765.155.17.394.256.718.256.319 0 .569-.059.75-.176a.968.968 0 0 0 .391-.526c.079-.234.119-.516.119-.846v-2.225h.702Zm3.415-.08c.51 0 .896.125 1.156.375.261.245.391.644.391 1.197V58h-.694v-2.736c0-.345-.077-.603-.231-.773-.154-.17-.396-.255-.726-.255-.473 0-.8.133-.981.398-.18.266-.271.649-.271 1.149V58h-.702v-4.275h.567l.103.582h.04c.096-.149.213-.27.351-.367.144-.1.3-.175.471-.223.17-.048.345-.072.526-.072Z' fill={_textColor} />
      <path d='M237.675 114.344a.398.398 0 0 0 .564 0l2.538-2.537a.398.398 0 1 0-.564-.564l-2.256 2.256-2.256-2.256a.398.398 0 1 0-.564.564l2.538 2.537Zm.564-88.9a.399.399 0 0 0-.564 0l-2.538 2.537a.399.399 0 0 0 .564.564l2.256-2.255 2.256 2.255a.399.399 0 0 0 .564-.564l-2.538-2.537Zm.117 88.619V25.726h-.798v88.336l.798.001ZM115.531 65.796a.398.398 0 0 0 0 .564l2.537 2.538a.399.399 0 0 0 .564-.564l-2.256-2.256 2.256-2.256a.398.398 0 1 0-.564-.564l-2.537 2.538Zm18.013.564a.4.4 0 0 0 0-.564l-2.538-2.538a.399.399 0 1 0-.564.564l2.256 2.256-2.256 2.256a.398.398 0 1 0 .564.564l2.538-2.538Zm-17.732.117h17.45v-.798h-17.45v.798Zm70.938-25.502a.354.354 0 0 0 .5 0l2.251-2.251a.354.354 0 0 0-.5-.5l-2.001 2-2.001-2a.354.354 0 1 0-.5.5l2.251 2.25Zm.5-14.225a.354.354 0 0 0-.5 0L184.499 29a.354.354 0 0 0 .5.5l2.001-2 2.001 2a.354.354 0 1 0 .5-.5l-2.251-2.25Zm.104 13.975V27h-.708v13.725h.708Z' fill={_color} />
      <path d='M229.234 115.148h14.178M113.629 62.797v31.627m21.812-31.627v14.177m93.793-52.349h14.178m-58.896 0h13.087' stroke={_color} strokeLinecap='round' strokeDasharray='2 2' />
    </svg>
  );
};

export const DrawHouseIcon = ({ className }: WithClassName) => (
  <svg className={className} width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M11.5 44s-9.254-.366-8.46-3.556c.595-2.388 6.372-3.71 11.864-4.557 2.763-.425 7.19-.739 12.096-.846' stroke='#d2d2d2' strokeWidth='1.3' strokeLinecap='round' />
    <path d='M34.994 41.467c.337-.004.71-.612.975-.795.105.404.264.8.409 1.193.126.344.243.692.368 1.038.112.307.26.636.31.96.026.176.019.374-.068.532a.575.575 0 0 1-.369.27.462.462 0 0 1-.367-.054.592.592 0 0 1-.212-.217c-.239-.435-.442-1.155-.612-1.638-.143-.404-.333-.835-.427-1.25a.46.46 0 0 1-.007-.04Zm-22.657-.82c.174.218.668.787.935.844l.016.001a1.32 1.32 0 0 1-.03.129c-.128.447-.313.891-.468 1.33-.166.468-.307 1.022-.552 1.453a.517.517 0 0 1-.22.214.498.498 0 0 1-.406.038.61.61 0 0 1-.333-.313.736.736 0 0 1-.062-.443c.055-.365.232-.738.356-1.085.258-.72.528-1.441.764-2.168ZM23.561 7.218l.002-3.183c0-.426-.044-1.042.014-1.45a.686.686 0 0 1 .185-.402.55.55 0 0 1 .387-.171.619.619 0 0 1 .427.224c.092.11.118.245.134.384.05.447.013.93.012 1.381-.002 1.074-.03 2.154.002 3.226-.387.002-.776.012-1.163-.009Zm-8.857 16.126a.647.647 0 0 1-.27.373.545.545 0 0 1-.41.063.555.555 0 0 1-.328-.272c-.178-.314-.173-1.16-.073-1.504.043-.148.136-.323.278-.392a.571.571 0 0 1 .461-.029c.18.079.279.24.352.414.979-.048 1.976-.009 2.956-.008-.067.38-.312.986-.464 1.35h-1.684c-.264 0-.558-.027-.818.005ZM33.566 22c.069-.165.179-.342.348-.416a.534.534 0 0 1 .406-.002.611.611 0 0 1 .325.36c.124.329.114 1.206-.031 1.527a.505.505 0 0 1-.303.284c-.065.023-.134.037-.201.051-.222-.05-.35-.124-.474-.323a.878.878 0 0 1-.069-.136c-.259-.032-.547-.008-.809-.007-.563.001-1.127.006-1.69 0-.139-.457-.329-.895-.467-1.352h1.886c.357 0 .724-.016 1.079.014Z' fill='#222733' />
    <path d='M13.081 34.832c.185.435.615.812 1.044.984.306.123.789.19 1.099.045l.027-.014a.809.809 0 0 1-.051.247c-.449 1.393-.977 2.768-1.467 4.147-.075.21-.362 1.13-.445 1.251l-.016-.001c-.267-.057-.76-.626-.935-.844-.027-.09-.1-.187-.142-.273a3.12 3.12 0 0 1-.3-.89 3.289 3.289 0 0 1 .006-1.01c.08-.496.274-.97.443-1.442l.52-1.45c.074-.202.24-.533.217-.75Zm22.104.025c.03.284.203.628.3.9l.498 1.387c.15.417.316.842.4 1.278.138.726-.005 1.579-.428 2.191.002.027-.002.037.015.059-.265.182-.637.79-.975.795l-.013-.014c-.075-.1-.399-1.133-.478-1.359-.472-1.334-.978-2.661-1.422-4.005-.029-.085-.053-.154-.048-.245.024.013.047.026.073.036.335.12.79.053 1.108-.087.384-.169.815-.532.97-.936Z' fill='#838383' />
    <path d='M31.854 32.545c.166-.288.35-.552.612-.76.452-.358.923-.416 1.475-.344.584.21 1.022.552 1.297 1.129a2.62 2.62 0 0 1 .093 1.979c-.035.098-.078.233-.147.31-.154.404-.586.767-.97.936-.318.14-.773.207-1.108.087a.459.459 0 0 1-.073-.036c-.046.004-.08-.012-.12-.03a2.108 2.108 0 0 1-1.122-1.176c-.282-.706-.227-1.406.063-2.095Zm-17.51-1.102c.523-.087.982-.02 1.42.3.294.216.532.514.687.846.274.64.32 1.34.067 1.997-.203.527-.59.985-1.108 1.213-.047.02-.107.05-.159.05l-.027.013c-.31.144-.792.078-1.099-.045-.429-.172-.858-.548-1.043-.984-.06-.091-.097-.2-.134-.302a2.609 2.609 0 0 1 .089-1.937c.278-.595.709-.933 1.307-1.15ZM23.56 7.218c.387.021.776.011 1.163.01.545.008 1.275-.133 1.691.308.267.284.343.666.33 1.045-.026.71-.166 1.418-.181 2.128-.113.714-.138 1.466-.204 2.187-.104 1.136-.231 2.276-.307 3.415-1.272.02-2.548-.002-3.821-.002l-.517-5.745c-.044-.655-.145-1.311-.171-1.966-.016-.38.058-.766.322-1.052.418-.45 1.145-.315 1.696-.328Z' fill='#222733' />
    <path d='M26.563 10.709c.157.296.253.642.366.957l.628 1.77 2.23 6.275.575 1.626c.074.206.136.461.239.65.138.457.328.895.467 1.351.563.007 1.126.002 1.69 0 .261 0 .55-.024.81.007-.278.046-.591.021-.873.02h-1.622c.328.838.616 1.697.916 2.546l1.133 3.191.558 1.564c.089.249.21.516.262.774-.552-.071-1.024-.013-1.476.345-.262.208-.446.471-.611.76-.175-.219-.62-1.642-.75-2.007l-1.38-3.89-.8-2.25c-.123-.348-.262-.692-.363-1.046-.449.032-.911.012-1.362.012h-2.452l-.028.007c-.026-.464-.002-.941-.001-1.406.124.062 2.931.016 3.338.023-.038-.27-.392-1.137-.499-1.438l-1.505-4.24c.075-1.138.203-2.278.307-3.415.065-.72.09-1.472.203-2.186Zm-4.883.014c-.156.295-.253.641-.365.957l-.629 1.77-2.23 6.275-.575 1.626c-.073.205-.136.461-.239.65-.137.456-.328.894-.467 1.35-.563.008-1.126.002-1.69.001-.261 0-.55-.024-.809.007.278.045.59.02.872.02h1.622c-.327.838-.616 1.697-.916 2.546l-1.133 3.19-.558 1.565c-.088.248-.21.515-.261.774.552-.072 1.023-.014 1.475.345.262.208.446.471.612.759.174-.218.62-1.642.749-2.006l1.38-3.89.8-2.251c.123-.347.263-.692.363-1.046.449.033.912.013 1.362.013h2.453l.027.006c.026-.463.002-.94.002-1.405-.125.062-2.932.015-3.34.023.04-.271.393-1.137.5-1.439l1.506-4.239c-.076-1.138-.204-2.278-.307-3.415-.066-.72-.091-1.473-.204-2.186Z' fill='#838383' />
    <path d='M24.719 21.965c.124.062 2.931.016 3.339.023.191.43.336.9.488 1.348l-2.535.002c-.3 0-1.024-.047-1.263.026l-.028.007c-.026-.464-.002-.941-.001-1.406Zm-1.15-.026c-.007.468-.005.937-.003 1.406-1.273-.03-2.55 0-3.824-.009.126-.445.303-.918.475-1.348.797-.008 1.594 0 2.39 0 .27 0 .689.046.942-.017v-.037l.014.025.006-.02Z' fill='#222733' />
    <path d='M23.57 21.94c-.012-.432-.108-1.264.188-1.593a.496.496 0 0 1 .373-.161.517.517 0 0 1 .39.152c.31.321.202 1.199.197 1.628 0 .464-.024.942.002 1.405.003.454.108 1.3-.214 1.64a.468.468 0 0 1-.339.15.563.563 0 0 1-.407-.185c-.123-.13-.161-.273-.196-.445.018-.393.003-.793.002-1.186-.002-.468-.004-.937.004-1.406Z' fill='#222733' />
  </svg>
);

export const FlatRoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m2 16.5 9.143 3.375 9-2.5L26.5 19.5l6-2m-6 13.5-6.357-2.125M26.5 31l6-2.125V17.5m-6 13.5V19.5M11.143 31.375 2 28V16.5m9.143 14.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7.932 29.955 8 25.574c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='.8' />
      <path d='m2 16.5 15.5-4 15 5-6 2-6.5-2-9 2.5-9-3.5Z' fill={lighten(_color, 0.6)} stroke={_color} strokeWidth='1.3' strokeLinejoin='round' />
    </svg>
  );
};

export const GableRoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m26.5 19.5-6.357-2.125-9 2.5M26.5 31l-6.357-2.125M26.5 31l6-2.125V17.5m-6 13.5V19.5M11.143 31.375 2 28V16.5m9.143 14.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7.932 29.955 8 25.574c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='.8' />
      <path d='m11 20-4.5-9.5 15-2.5L29 9.5l-2.5 10-6.5-2-9 2.5Z' fill={lighten(_color, 0.6)} />
      <path d='m6.5 10.5-4.5 6m4.5-6L11 20l9-2.5m-13.5-7 15-2.5m0 0L29 9.5M21.5 8 20 17.5m0 0 6.5 2 2.5-10m3.5 8-3.5-8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const WraparoundRoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m26.5 31-6.357-2.125M26.5 31l6-2.125V10.5m-6 20.5V19.5M11.143 31.375 2 28V10.5m9.143 20.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7.932 29.955 8 25.574c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='.8' />
      <path d='m11 20-9-9.5 17.5-3 13 3-6 9-6.5-2-9 2.5Z' fill={lighten(_color, 0.6)} />
      <path d='M19.5 7.5 2 10.5l9 9.5 9-2.5m-.5-10 13 3-6 9-6.5-2m-.5-10 .5 10' stroke={_color} strokeWidth='1.3' strokeLinejoin='round' />
    </svg>
  );
};

export const HipRoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m2 16.5 9.143 3.375 9-2.5L26.5 19.5l6-2m-6 13.5-6.357-2.125M26.5 31l6-2.125V17.5m-6 13.5V19.5M11.143 31.375 2 28V16.5m9.143 14.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7.932 29.955 8 25.574c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='.8' />
      <path d='m2 16.5 10.5-7 9-1.5 4 1 7 8.5-6 2-6.5-2-9 2.5-9-3.5Z' fill={lighten(_color, 0.6)} />
      <path d='M12.5 9.5 2 16.5l9 3.5m1.5-10.5L11 20m1.5-10.5 9-1.5M11 20l9-2.5M21.5 8l4 1m-4-1L20 17.5m0 0 6.5 2m0 0 6-2-7-8.5m1 10.5L25.5 9' stroke={_color} strokeWidth='1.3' strokeLinejoin='round' />
    </svg>
  );
};

export const SlantedRoofIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m26.5 19.5-6.357-2.125-9 2.5M26.5 31l-6.357-2.125M26.5 31l6-2.125V22m-6 9v-7m-15.357 7.375L2 28V10.5m9.143 20.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7.932 29.955 8 25.574c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='.8' />
      <path d='m2 10.5 9 9.5 9-2.5 6.5 6.5 6-2-14-14L2 10.5Z' fill={lighten(_color, 0.6)} stroke={_color} strokeWidth='1.3' strokeLinejoin='round' />
    </svg>
  );
};

export const NoRoofIcon = ({ className }: WithClassName) => (
  <svg
    className={className}
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m2 16.5 9.143 3.375 9-2.5L26.5 19.5l6-2m-6 13.5-6.357-2.125M26.5 31l6-2.125V17.5m-6 13.5V19.5M11.143 31.375 2 28V16.5m9.143 14.875 9-2.5m-9 2.5V20m9 8.875V17.5' stroke='#d7d7d7' strokeWidth='1.3' strokeLinecap='round' />
    <path d='M7.932 29.957 8 25.576c0-1.035 0-1.553-.267-1.987-.266-.434-.695-.615-1.554-.977-.859-.362-1.288-.543-1.554-.333-.268.208-.268.725-.268 1.761v4.46' stroke='#d7d7d7' strokeWidth='1.3' />
    <path d='m2 16.5 15.5-4 15 5-6 2-6.5-2-9 2.5-9-3.5Z' stroke='#d7d7d7' strokeWidth='1.3' strokeLinejoin='round' />
  </svg>
);

export const StraightStairsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='56'
      height='56'
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18.97 49.935v1.948L9.704 46.18v-1.948l9.268 5.703Zm1.812-3.208v1.948l-9.267-5.703v-1.947l9.267 5.703Zm1.812-3.207v1.947l-9.267-5.703v-1.947l9.267 5.703Zm1.812-3.208v1.947l-9.267-5.703V34.61l9.267 5.703Zm1.812-3.208v1.947l-9.267-5.703v-1.947l9.267 5.703Zm1.812-3.208v1.947l-9.268-5.703v-1.947l9.268 5.703Zm1.812-3.208v1.948l-9.268-5.703v-1.948l9.268 5.703Zm1.812-3.208v1.948l-9.268-5.703v-1.948l9.268 5.703Zm1.811-3.208v1.948l-9.267-5.703v-1.948l9.267 5.703Zm1.812-3.208v1.948l-9.267-5.703V15.36l9.267 5.703Zm1.813-3.208v1.948L27.821 14.1v-1.948l9.267 5.703Zm1.811-3.208v1.948l-9.267-5.703V8.945l9.267 5.703Z' fill={lighten(_color, 0.7)} />
      <path d='M18.97 51.881v-1.947m0 1.947-9.267-5.703v-1.947m9.268 7.65 2.97-1.782 19.128-33.98 5.228-3.446v-2.97m-27.326 40.23 1.811-1.26m-1.811 1.26-9.268-5.702m11.08 4.442v-1.947m0 1.947-9.268-5.703m9.267 3.756 1.812-1.26m-1.812 1.26-9.267-5.703m11.08 4.442v-1.947m0 1.947-9.268-5.703m9.267 3.756 1.812-1.26m-1.812 1.26-9.267-5.703m11.08 4.442V40.31m0 1.947-9.268-5.703m9.267 3.756 1.812-1.26m-1.812 1.26-9.267-5.703m11.079 4.443v-1.948m0 1.948-9.267-5.703m9.267 3.755 1.812-1.26m-1.812 1.26-9.267-5.703m11.079 4.443v-1.948m0 1.948-9.268-5.703m9.268 3.755 1.812-1.26m-1.812 1.26-9.268-5.703m11.08 4.443v-1.948m0 1.948-9.268-5.703m9.268 3.755 1.812-1.26m-1.812 1.26-9.268-5.703m11.08 4.443v-1.948m0 1.948-9.268-5.703m9.268 3.755 1.811-1.26m-1.811 1.26-9.268-5.703m11.08 4.443V24.27m0 1.948-9.268-5.703m9.267 3.755 1.812-1.26m-1.812 1.26-9.267-5.703m11.08 4.443v-1.948m0 1.948-9.268-5.703m9.267 3.755 1.812-1.26m-1.812 1.26L26.01 15.36m11.08 4.443v-1.948m0 1.948L27.822 14.1m9.267 3.755 1.812-1.26m-1.812 1.26-9.267-5.703m11.08 4.443v-1.948m0 1.948-9.268-5.703m9.267 3.755 7.396-4.943m-7.396 4.943-9.267-5.703m16.663.76L37.09 4l-7.455 4.943M9.704 44.231l1.811-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.811-1.26m0 0V28.19m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0v-1.948m0 0 1.812-1.26m0 0V12.15m0 0 1.812-1.26m0 0V8.943' stroke={_color} strokeWidth='.4' />
    </svg>
  );
};

export const UShapedStairsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='56'
      height='56'
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m33.425 25.38.394-.29v-3.324l-2.078 1.143v-1.558l-2.078 1.246v-1.766l-2.285 1.35v-1.87l-2.39 1.247v-1.87l-2.39 1.247v-1.974l-8.727 5.299v1.974l7.273-4.364 12.281 3.51Zm.705 20.074v-1.662l-8.726-5.403v1.663l8.727 5.402Zm1.663-2.804v-1.767l-8.727-5.403v1.767l8.727 5.402Zm1.87-3.118V37.87l-8.727-5.403v1.663l8.727 5.402Zm1.663-2.805v-1.974l-8.728-5.402v1.974l8.728 5.402Zm1.662-3.117v-1.974l-8.727-5.402v1.974l8.727 5.402Zm1.558-3.117v-1.766l-8.727-5.402v1.766l8.727 5.402Z' fill={lighten(_color, 0.7)} />
      <path d='m52 22.81-9.455 5.921M52 22.81v2.286l-7.065 4.467-8.104 14.234-2.701 1.663M52 22.809l-8.935-5.299-8.41-4.987L26.66 17.4m15.885 11.331v1.766m0-1.766-8.727-5.402m8.727 7.168-1.558 1.143m1.558-1.143-8.727-5.402m7.169 6.545v1.974m0-1.974-8.727-5.402m8.727 7.376-1.662 1.143m1.662-1.143-8.727-5.402m7.065 6.545v1.974m0-1.974-8.728-5.402m8.728 7.376-1.663 1.143m1.663-1.143-8.728-5.402m7.065 6.545v1.662m0-1.662-8.727-5.403m8.727 7.065-1.87 1.351m1.87-1.35-8.727-5.403m6.857 6.753v1.766m0-1.766-8.727-5.403m8.727 7.17-1.662 1.142m1.662-1.143-8.727-5.402m7.065 6.545v1.663m0-1.663-8.727-5.402m8.727 7.065-8.727-5.403v-1.662m8.415-15.065V21.77m0 1.559v1.766m0 0-1.558 1.143m0 0v1.974m0 0-1.663 1.143m0 0v1.974m0 0-1.662 1.142m0 0v1.663m0 0-1.87 1.35m0 0v1.767m0 0-1.662 1.143M26.66 17.4l-.01.007m.01-.007 7.158 4.37M26.66 17.4l-2.712-1.656-.71.406m10.58 5.62-2.078 1.143v-1.558m-8.5-5.205 8.501 5.205M23.24 16.15l-1.68-1.03-.62.413m10.801 5.822L29.662 22.6v-1.766m-8.722-5.302 8.722 5.302m-8.722-5.302-1.875-1.14-.64.427m11.237 6.015-2.285 1.35v-1.87m0 0-10.494-6.44-.683.39m11.177 6.05-2.39 1.247v-1.87M16.2 14.265l8.787 5.427M16.2 14.265l-1.81-1.118-.61.455m11.207 6.09-2.39 1.247v-1.974m-8.817-5.363 8.817 5.363m-8.817-5.363-1.26-.767L4 18.238m18.597.727-8.727 5.299M4 18.238v1.974l9.87 6.026m-9.87-8 9.87 6.026m0 1.974v-1.974m0 1.974 7.273-4.364 12.281 3.51' stroke={_color} strokeWidth='.4' />
    </svg>
  );
};

export const SpiralStairsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='56'
      height='56'
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M29.688 31.252v2.29l10.01-2.05v-2.05l-10.01 1.81Z' fill={lighten(_color, 0.7)} />
      <path d='M35.959 29.442v-1.567l-6.271.964v2.413l6.271-1.81ZM29.688 28l1.447-.025v-1.42h-1.447V28Zm0 7.834v-2.291l11.578-1.81v2.534l-11.578 1.567Zm0 2.171v-2.17l12.784-.483v2.17l-12.784.483Zm-.241 3.015v-2.17h11.336v2.17H29.446Zm7.236 1.81-7.719-1.81v2.171l7.719 2.05V42.83Zm-5.548 3.256-3.136-2.774v3.135l3.136 2.654v-3.015Zm-16.885-24 2.895.603 9.045-.121v-.482H14.25Zm11.94-2.292-11.94.362-.844-.603 12.784.241Zm0-2.05H13.406l1.206-.603h11.82l-.242.603Zm-7.718-3.618-3.86.844 11.82.603.361-.362-8.321-1.085Zm8.804-1.086-3.136-1.93-5.668.724 7.718 1.327 1.086-.12Zm3.256-6.392V8.94H24.14l3.136 2.17h1.206l2.05-2.17 5.306-2.292h-5.306Z' fill={lighten(_color, 0.7)} />
      <path d='m28 46.452 3.136 2.654M28 46.451h-1.809m1.81 0v-3.135m3.135 5.788-8.08.121m8.08-.12V52h-8.08v-2.774m8.08-.12V46.09m0 3.015 5.548-.844v-3.015M26.19 46.452l-3.135 2.774m3.135-2.774V26.673m4.945 19.418L28 43.316m3.136 2.773 5.548-.844M28 43.316l.965-.12m7.719 2.05-7.719-2.05m7.719 2.05v-2.412m0 2.412 4.1-1.447v-2.774m-11.819 2.171v-2.17m0 0 7.719 1.808m-7.719-1.809h.483m7.236 1.81 4.1-1.81m0 0v-2.17m0 2.17H29.448m11.336 0 1.689-.965v-2.532m-1.689 1.326H29.448m11.336 0 1.689-1.326m-13.025 3.497v-2.17m0 0 .24-.845m0 0 12.785-.482m-12.784.482V9.84m12.784 27.689v-2.171m0 0-12.784.482 11.578-1.568m1.206 1.086-1.206-1.086m0 0V31.74m0 0-11.578 1.809 10.01-2.05m1.568.24-1.568-.24m0-2.05-10.01 1.808 6.271-1.809m3.739 0v2.05m0-2.05H35.96m0 0V27.88m0 0-6.271.965m6.271-.965-6.27.12m-3.498-1.327h-5.547v-2.05m5.547 2.05v-2.05m-5.547 0h-3.498v-1.93m3.497 1.93h5.548m-9.045-1.93-2.894-.603m2.894.604 9.045-.121v-.483m-11.94 0h11.94m-11.94 0v-1.93m11.94 1.93v-4.34m0 4.341v2.533m-11.94-4.462 11.94-.362-12.784-.241m.845.603-.845-.603m0 0v-1.81m0 0h12.784m-12.784 0 1.206-.602m-1.206.603v-1.93l1.206-.844m11.578 2.774.242-.603m-11.82 0v-2.171m0 2.17h11.82m-11.82-2.17 3.86-.844m-3.86.844v-2.05l3.86-1.086m-3.86 3.136 11.82.603m.361-.362-8.321-1.085m8.321 1.085-.361.362m.361-.362V13.1m-8.321 1.032V11.84m5.668-2.894-5.668.603v2.291m5.668-2.894v2.17m0-2.17V6.653h2.05m-2.05 2.292h6.392m-6.392 0 3.136 2.17m-3.136 0 3.136 1.93m-3.136-1.93-5.668.724m8.804 1.206v-1.93m0 1.93-.483.054m-8.321-1.26 7.718 1.327.603-.067m-.361 2.479v1.568m4.1-10.493v2.292m0-2.292v-1.93m0 1.93h5.306m-5.306 0h-.844m.844 2.292 5.306-2.292m-5.306 2.292-.844.894m-2.412 1.277h1.206l1.206-1.277m.844-5.115h5.306v1.93m-5.306-1.93-.844.964m1.447 22.284v-1.42H29.69m0-19.899V4h-3.5v2.653m3.498 0H26.19' stroke={_color} strokeWidth='.4' />
    </svg>
  );
};

export const LShapedStairsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='56'
      height='56'
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M28.214 50.14v1.756l-8.357-5.143v-1.756l8.357 5.142Zm1.634-2.893v1.756L21.49 43.86v-1.756l8.357 5.143Zm1.634-2.893v1.756l-8.357-5.143v-1.756l8.357 5.143Zm1.634-2.894v1.757l-8.357-5.142v-1.757l8.357 5.143Zm1.634-2.892v1.757l-8.357-5.143v-1.757l8.357 5.143Zm1.634-2.893v1.756L28 32.331v-1.757l8.384 5.101Z' fill={lighten(_color, 0.7)} />
      <path d='M36.357 25.432 28 30.575v-1.757l8.357-5.143v1.757Zm-9.991.493v1.757l8.357-5.143v-1.757l-8.357 5.143Zm-1.634-2.893v1.757l8.357-5.143V17.89l-8.357 5.142Zm-1.634-2.892v1.756l8.357-5.143v-1.756l-8.357 5.143Zm-1.634-2.893v1.756l8.357-5.143v-1.756l-8.357 5.143Zm-1.621-2.901-.013 1.764 8.357-5.143V9.211l-8.344 5.135Z' fill={lighten(_color, 0.7)} />
      <path d='M28.214 51.893v-1.757m0 1.757-8.357-5.143v-1.756m8.357 6.899 2.679-1.607 7.89-14.017 5.931-3.62v-2.078m-16.5 19.565L29.848 49m-1.634 1.136-8.357-5.142M29.848 49v-1.756m0 1.756-8.357-5.143m8.357 3.387 1.634-1.137m-1.634 1.137L21.491 42.1m9.991 4.006V44.35m0 1.756-8.357-5.143m8.357 3.387 1.634-1.137m-1.634 1.137-8.357-5.143m9.991 4.006v-1.756m0 1.756-8.357-5.143m8.357 3.387 1.634-1.137m-1.634 1.137-8.357-5.143m9.991 4.006v-1.756m0 1.756-8.357-5.142m8.357 3.386 1.634-1.136m-1.634 1.136-8.357-5.143m9.99 4.007v-1.757L28 30.572m8.384 6.857L28 32.328m-8.143 12.666 1.634-1.137m0 0v-1.756m0 0 1.634-1.137m0 0v-1.756m0 0 1.634-1.137m0 0v-1.756m0 0 1.634-1.136m0 0v-1.757m0 0L28 32.328m0 0V30.57m0 0 8.357-5.142M28 30.57v-1.756m8.357-3.386 8.357 5.142m-8.357-5.142v-1.757m0 12 8.357-5.1M28 28.814l-1.634-1.136M28 28.815l8.357-5.143m-9.99 4.007v-1.757m0 1.757 8.356-5.143m-8.357 3.386-1.634-1.136m1.634 1.136 8.357-5.143m-9.99 4.007v-1.757m0 1.757 8.356-5.143m-8.357 3.386-1.634-1.136m1.634 1.136 8.357-5.142m-9.99 4.006v-1.756m0 1.756 8.356-5.143m-8.357 3.387L21.464 19m1.634 1.137 8.357-5.143M21.465 19v-1.756m0 1.756 8.356-5.143m-8.357 3.387-1.634-1.137m1.634 1.137 8.357-5.143m-9.99 4.006.013-1.764m-.014 1.764 8.358-5.143m-8.344 3.379 8.343-5.135m-8.343 5.135L11.5 9.25m24.857 14.422-1.634-1.136m0 0v-1.757m0 0-1.634-1.136m0 0v-1.756m0 0-1.634-1.137m0 0v-1.756m0 0-1.634-1.137m0 0v-1.756m0 0-1.634-1.137m0 0V9.208m0 0L19.858 4 11.5 9.25m0 0v2.078l5.93 3.62 7.891 14.016 2.143 3.729' stroke={_color} strokeWidth='.4' />
    </svg>
  );
};

export const ArrowRotateLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m6 7 1-1-2.293-2.293.492-.491A4.15 4.15 0 0 1 8.133 2C11.361 2 14 4.68 14 7.933 14 11.259 11.301 14 8 14a5.978 5.978 0 0 1-4.243-1.757l-1.414 1.414A7.978 7.978 0 0 0 8 16c4.43 0 8-3.662 8-8.067C16 3.6 12.49 0 8.133 0a6.15 6.15 0 0 0-4.349 1.801l-.491.492L1 0 0 1v6h6Z' fill={_color} />
    </svg>
  );
};

export const ArrowRotateRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10 7 9 6l2.293-2.293-.492-.491A4.15 4.15 0 0 0 7.867 2C4.639 2 2 4.68 2 7.933 2 11.259 4.699 14 8 14c1.537 0 3.07-.586 4.243-1.757l1.414 1.414A7.978 7.978 0 0 1 8 16c-4.43 0-8-3.662-8-8.067C0 3.6 3.51 0 7.867 0a6.15 6.15 0 0 1 4.349 1.801l.491.492L15 0l1 1v6h-6Z' fill={_color} />
    </svg>
  );
};

export const PersonIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='18'
      height='22'
      viewBox='0 0 18 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.23026 10.6457C9.87065 10.6591 10.4877 10.5423 11.0814 10.2955C11.6751 10.0487 12.1987 9.6985 12.6523 9.2449C13.1059 8.79129 13.4561 8.26765 13.7029 7.67396C13.9498 7.08027 14.0732 6.46323 14.0732 5.82285C14.0732 5.18246 13.9498 4.56543 13.7029 3.97174C13.4561 3.37805 13.0992 2.8544 12.6323 2.4008C12.0186 1.7871 11.2982 1.37351 10.471 1.16005C9.64385 0.946592 8.81668 0.946592 7.98952 1.16005C7.16236 1.37351 6.44193 1.7871 5.82823 2.4008C5.36128 2.8544 5.0044 3.37805 4.75758 3.97174C4.51077 4.56543 4.38736 5.18246 4.38736 5.82285C4.38736 6.46323 4.51077 7.07693 4.75758 7.66395C5.0044 8.25097 5.35461 8.77462 5.80821 9.23489C6.26182 9.69517 6.78547 10.0487 7.37916 10.2955C7.97284 10.5423 8.58988 10.6591 9.23026 10.6457ZM6.64872 3.2413C6.99559 2.89443 7.3925 2.6276 7.83943 2.44082C8.28637 2.25404 8.74998 2.16065 9.23026 2.16065C9.71055 2.16065 10.1742 2.25404 10.6211 2.44082C11.068 2.6276 11.4649 2.89109 11.8118 3.23129C12.1587 3.5715 12.4255 3.9684 12.6123 4.42201C12.7991 4.87561 12.8925 5.34256 12.8925 5.82285C12.8925 6.30313 12.7991 6.77008 12.6123 7.22369C12.4255 7.67729 12.1587 8.0742 11.8118 8.4144C11.4649 8.7546 11.068 9.0181 10.6211 9.20487C10.1742 9.39165 9.71055 9.48504 9.23026 9.48504C8.74998 9.48504 8.28637 9.39165 7.83943 9.20487C7.3925 9.0181 6.99559 8.7546 6.64872 8.4144C6.30184 8.0742 6.03502 7.67729 5.84824 7.22369C5.66146 6.77008 5.56807 6.30313 5.56807 5.82285C5.56807 5.34256 5.66146 4.87561 5.84824 4.42201C6.03502 3.9684 6.30184 3.57483 6.64872 3.2413ZM17.6553 16.3892C17.6286 15.9623 17.5786 15.5387 17.5052 15.1184C17.4318 14.6982 17.3285 14.2779 17.195 13.8577C17.0616 13.4374 16.8882 13.0405 16.6747 12.6669C16.4613 12.2934 16.1944 11.9532 15.8742 11.6463C15.5541 11.3395 15.1805 11.0993 14.7536 10.9259C14.2866 10.7391 13.7997 10.6524 13.2927 10.6657C12.9992 10.7058 12.739 10.8192 12.5122 11.006L11.7118 11.5263C11.3782 11.7264 11.0247 11.8798 10.6511 11.9865C9.78393 12.2667 8.92341 12.2667 8.06957 11.9865C7.69601 11.8798 7.34247 11.7197 7.00893 11.5063C6.6754 11.2928 6.4019 11.126 6.18844 11.006C5.96164 10.8192 5.70148 10.7058 5.40797 10.6657C4.91435 10.6657 4.43406 10.7525 3.96711 10.9259C3.54019 11.086 3.16663 11.3228 2.84644 11.6363C2.52625 11.9499 2.25942 12.2934 2.04596 12.6669C1.8325 13.0405 1.65906 13.4341 1.52565 13.8477C1.39224 14.2612 1.2855 14.6815 1.20546 15.1084C1.12541 15.5353 1.07204 15.9623 1.04536 16.3892C1.01868 16.8961 1.00534 17.2897 1.00534 17.5699C0.978654 18.0368 1.05203 18.4904 1.22547 18.9307C1.39891 19.371 1.65573 19.7545 1.99593 20.0814C2.33613 20.4083 2.72637 20.6484 3.16663 20.8018C3.6069 20.9552 4.0605 21.0253 4.52745 21.0119H14.1732C14.6402 21.0253 15.0938 20.9552 15.534 20.8018C15.9743 20.6484 16.3645 20.4083 16.7047 20.0814C17.0449 19.7545 17.3018 19.371 17.4752 18.9307C17.6486 18.4904 17.722 18.0368 17.6953 17.5699C17.6953 17.0362 17.682 16.6427 17.6553 16.3892ZM15.9143 19.2309C15.6741 19.4443 15.404 19.6011 15.1038 19.7012C14.8036 19.8012 14.4934 19.8446 14.1732 19.8312H4.52745C4.20726 19.8446 3.9004 19.8012 3.6069 19.7012C3.31339 19.6011 3.05323 19.4443 2.82643 19.2309C2.59963 19.0174 2.42952 18.7639 2.31612 18.4704C2.20272 18.1769 2.15936 17.8767 2.18604 17.5699C2.18604 17.0763 2.19271 16.7094 2.20606 16.4692C2.23274 16.0823 2.28277 15.7021 2.35615 15.3285C2.42952 14.955 2.51958 14.5814 2.62631 14.2079C2.74638 13.8743 2.89313 13.5541 3.06657 13.2473C3.22667 12.9671 3.41678 12.7203 3.63691 12.5069C3.85705 12.2934 4.11053 12.13 4.39737 12.0166C4.68421 11.9032 4.98772 11.8465 5.30791 11.8465C5.38796 11.8865 5.46801 11.9332 5.54806 11.9865C5.76152 12.1066 6.03502 12.2801 6.36855 12.5069C6.79547 12.7603 7.24241 12.9605 7.70935 13.1072C8.24301 13.2806 8.79334 13.3674 9.36034 13.3674C9.92735 13.3674 10.4777 13.2806 11.0113 13.1072C11.4783 12.9605 11.9185 12.7603 12.3321 12.5069L13.1526 11.9865C13.2327 11.9332 13.3127 11.8865 13.3928 11.8465C13.713 11.8465 14.0165 11.9032 14.3033 12.0166C14.5901 12.13 14.847 12.2934 15.0738 12.5069C15.3006 12.7203 15.4974 12.9738 15.6641 13.2673C15.8309 13.5608 15.9676 13.8743 16.0744 14.2079C16.1811 14.5814 16.2712 14.955 16.3445 15.3285C16.4179 15.7021 16.4679 16.0823 16.4946 16.4692C16.5213 16.9495 16.5346 17.3164 16.5346 17.5699C16.5613 17.8767 16.518 18.1769 16.4046 18.4704C16.2912 18.7639 16.1277 19.0174 15.9143 19.2309Z' fill={_color} stroke={_color} strokeWidth='0.5' />
    </svg>
  );
};

export const LogOutIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2 18.0137C1.45 18.0137 0.979167 17.8178 0.5875 17.4262C0.195833 17.0345 0 16.5637 0 16.0137V2.01367C0 1.46367 0.195833 0.992839 0.5875 0.601172C0.979167 0.209505 1.45 0.0136719 2 0.0136719H9V2.01367H2V16.0137H9V18.0137H2ZM13 14.0137L11.625 12.5637L14.175 10.0137H6V8.01367H14.175L11.625 5.46367L13 4.01367L18 9.01367L13 14.0137Z' fill={_color} />
    </svg>
  );
};

export const ProjectsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3.5 9L9 0L14.5 9H3.5ZM14.5 20C13.25 20 12.1875 19.5625 11.3125 18.6875C10.4375 17.8125 10 16.75 10 15.5C10 14.25 10.4375 13.1875 11.3125 12.3125C12.1875 11.4375 13.25 11 14.5 11C15.75 11 16.8125 11.4375 17.6875 12.3125C18.5625 13.1875 19 14.25 19 15.5C19 16.75 18.5625 17.8125 17.6875 18.6875C16.8125 19.5625 15.75 20 14.5 20ZM0 19.5V11.5H8V19.5H0ZM14.5 18C15.2 18 15.7917 17.7583 16.275 17.275C16.7583 16.7917 17 16.2 17 15.5C17 14.8 16.7583 14.2083 16.275 13.725C15.7917 13.2417 15.2 13 14.5 13C13.8 13 13.2083 13.2417 12.725 13.725C12.2417 14.2083 12 14.8 12 15.5C12 16.2 12.2417 16.7917 12.725 17.275C13.2083 17.7583 13.8 18 14.5 18ZM2 17.5H6V13.5H2V17.5ZM7.05 7H10.95L9 3.85L7.05 7Z' fill={_color} />
    </svg>
  );
};

export const TeamIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='22'
      height='16'
      viewBox='0 0 22 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z' fill={_color} />
    </svg>
  );
};

export const CoinIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.1 17H10.85V15.75C11.6833 15.6 12.4 15.275 13 14.775C13.6 14.275 13.9 13.5333 13.9 12.55C13.9 11.85 13.7 11.2083 13.3 10.625C12.9 10.0417 12.1 9.53333 10.9 9.1C9.9 8.76667 9.20833 8.475 8.825 8.225C8.44167 7.975 8.25 7.63333 8.25 7.2C8.25 6.76667 8.40417 6.425 8.7125 6.175C9.02083 5.925 9.46667 5.8 10.05 5.8C10.5833 5.8 11 5.92917 11.3 6.1875C11.6 6.44583 11.8167 6.76667 11.95 7.15L13.55 6.5C13.3667 5.91667 13.0292 5.40833 12.5375 4.975C12.0458 4.54167 11.5 4.3 10.9 4.25V3H9.15V4.25C8.31667 4.43333 7.66667 4.8 7.2 5.35C6.73333 5.9 6.5 6.51667 6.5 7.2C6.5 7.98333 6.72917 8.61667 7.1875 9.1C7.64583 9.58333 8.36667 10 9.35 10.35C10.4 10.7333 11.1292 11.075 11.5375 11.375C11.9458 11.675 12.15 12.0667 12.15 12.55C12.15 13.1 11.9542 13.5042 11.5625 13.7625C11.1708 14.0208 10.7 14.15 10.15 14.15C9.6 14.15 9.1125 13.9792 8.6875 13.6375C8.2625 13.2958 7.95 12.7833 7.75 12.1L6.1 12.75C6.33333 13.55 6.69583 14.1958 7.1875 14.6875C7.67917 15.1792 8.31667 15.5167 9.1 15.7V17ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z' fill={_color} />
    </svg>
  );
};

export const QuestionMarkIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.secondary;

  return (
    <svg
      className={className}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.95 16C10.3 16 10.5958 15.8792 10.8375 15.6375C11.0792 15.3958 11.2 15.1 11.2 14.75C11.2 14.4 11.0792 14.1042 10.8375 13.8625C10.5958 13.6208 10.3 13.5 9.95 13.5C9.6 13.5 9.30417 13.6208 9.0625 13.8625C8.82083 14.1042 8.7 14.4 8.7 14.75C8.7 15.1 8.82083 15.3958 9.0625 15.6375C9.30417 15.8792 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9625 11.1667 11.0875 10.85C11.2125 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.70417 13.175 8.3125C13.425 7.92083 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37917 4.25 7.7875 4.75C7.19583 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.47083 6.575 8.7625 6.225C9.05417 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84583 11.3 6.1375C11.5667 6.42917 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74583 11.4 8.0375C11.2 8.32917 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z' fill={_color} />
    </svg>
  );
};

export const InformationIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='22'
      height='23'
      viewBox='0 0 22 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11.044 0.576618C9.04934 0.576618 7.20134 1.07546 5.5 2.07313C3.828 3.02679 2.508 4.33257 1.54 5.99047C0.528003 7.69239 0.0220032 9.54103 0.0220032 11.5364C0.0220032 13.5317 0.52067 15.3877 1.518 17.1043C2.50067 18.7622 3.82067 20.0826 5.478 21.0656C7.194 22.0633 9.04934 22.5658 11.044 22.5732C13.0387 22.5805 14.8867 22.0853 16.588 21.0877C18.2453 20.1046 19.5653 18.7842 20.548 17.1263C21.5453 15.4244 22.044 13.5757 22.044 11.5804C22.044 9.58504 21.5453 7.73641 20.548 6.03449C19.5653 4.37659 18.2453 3.05614 16.588 2.07313C14.8867 1.07546 13.0387 0.576618 11.044 0.576618ZM11.044 21.3077C9.284 21.3224 7.64867 20.8896 6.138 20.0093C4.65667 19.1583 3.48334 17.9993 2.618 16.5321C1.738 15.0209 1.29067 13.385 1.276 11.6244C1.26134 9.8638 1.694 8.22791 2.574 6.71672C3.42467 5.23488 4.58334 4.06115 6.05 3.19552C7.56067 2.31521 9.196 1.86773 10.956 1.85306C12.716 1.83838 14.3513 2.2712 15.862 3.1515C17.3433 4.00246 18.5167 5.16152 19.382 6.62869C20.262 8.13988 20.7057 9.77577 20.713 11.5364C20.7203 13.297 20.284 14.9329 19.404 16.4441C18.5533 17.9112 17.3947 19.0776 15.928 19.9433C14.432 20.8382 12.804 21.2931 11.044 21.3077ZM11.044 9.59971C10.516 9.59971 10.0613 9.79044 9.68 10.1719C9.29867 10.5534 9.108 11.0082 9.108 11.5364V16.7742C9.108 17.3024 9.29867 17.7572 9.68 18.1386C10.0613 18.5201 10.516 18.7108 11.044 18.7108C11.572 18.7108 12.0267 18.5201 12.408 18.1386C12.7893 17.7572 12.98 17.3024 12.98 16.7742V11.5364C12.98 11.0082 12.7893 10.5534 12.408 10.1719C12.0267 9.79044 11.572 9.59971 11.044 9.59971ZM11.682 16.7742C11.682 16.9502 11.6197 17.1006 11.495 17.2253C11.3703 17.35 11.22 17.4124 11.044 17.4124C10.868 17.4124 10.7177 17.35 10.593 17.2253C10.4683 17.1006 10.406 16.9502 10.406 16.7742V11.5364C10.406 11.3603 10.4683 11.2099 10.593 11.0852C10.7177 10.9605 10.868 10.8982 11.044 10.8982C11.22 10.8982 11.3703 10.9605 11.495 11.0852C11.6197 11.2099 11.682 11.3603 11.682 11.5364V16.7742ZM11.044 4.44995C10.516 4.44995 10.0613 4.64068 9.68 5.02214C9.29867 5.40361 9.108 5.85843 9.108 6.38661C9.108 6.91479 9.29867 7.36961 9.68 7.75108C10.0613 8.13254 10.516 8.32327 11.044 8.32327C11.572 8.32327 12.0267 8.13254 12.408 7.75108C12.7893 7.36961 12.98 6.91479 12.98 6.38661C12.98 5.85843 12.7893 5.40361 12.408 5.02214C12.0267 4.64068 11.572 4.44995 11.044 4.44995ZM11.044 7.02483C10.868 7.02483 10.7177 6.96247 10.593 6.83777C10.4683 6.71306 10.406 6.56267 10.406 6.38661C10.406 6.21055 10.4683 6.06017 10.593 5.93546C10.7177 5.81075 10.868 5.74839 11.044 5.74839C11.22 5.74839 11.3703 5.81075 11.495 5.93546C11.6197 6.06017 11.682 6.21055 11.682 6.38661C11.682 6.56267 11.6197 6.71306 11.495 6.83777C11.3703 6.96247 11.22 7.02483 11.044 7.02483Z' fill={_color} />
    </svg>
  );
};

export const InformationFilledIcon = ({ className, color }: WithClassName & IconProps) => {
  const _color = color || 'currentColor';

  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M7.333 11.336h1.333v-4H7.333v4ZM8 6.003a.646.646 0 0 0 .475-.192.642.642 0 0 0 .191-.475.648.648 0 0 0-.192-.475A.643.643 0 0 0 8 4.67a.643.643 0 0 0-.475.192.648.648 0 0 0-.192.475c0 .188.064.347.192.475A.64.64 0 0 0 8 6.003Zm0 8.666a6.487 6.487 0 0 1-2.6-.525 6.743 6.743 0 0 1-2.117-1.425 6.718 6.718 0 0 1-1.425-2.116 6.506 6.506 0 0 1-.525-2.6c0-.922.175-1.789.525-2.6a6.748 6.748 0 0 1 1.425-2.117c.6-.6 1.305-1.075 2.117-1.425A6.494 6.494 0 0 1 8 1.336a6.5 6.5 0 0 1 2.6.525c.812.35 1.517.825 2.116 1.425.6.6 1.075 1.305 1.426 2.117.35.811.526 1.678.524 2.6a6.536 6.536 0 0 1-.525 2.6 6.688 6.688 0 0 1-1.425 2.116c-.6.6-1.306 1.075-2.116 1.426-.81.35-1.677.525-2.6.524Z' fill={_color} />
    </svg>
  );
};

export const EnvelopeIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='21'
      height='16'
      viewBox='0 0 21 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.1538 -0.00152206H1.84018C1.50948 -0.00152206 1.20278 0.081152 0.920088 0.246501C0.637394 0.41185 0.413373 0.635872 0.248024 0.918565C0.0826745 1.20126 0 1.50795 0 1.83865V14.1598C0 14.4905 0.0826745 14.7972 0.248024 15.0799C0.413373 15.3626 0.637394 15.5866 0.920088 15.752C1.20278 15.9173 1.50948 16 1.84018 16H19.1538C19.4845 16 19.7912 15.9173 20.0739 15.752C20.3566 15.5866 20.5833 15.3626 20.754 15.0799C20.9247 14.7972 21.01 14.4905 21.01 14.1598V1.83865C21.01 1.50795 20.9247 1.20126 20.754 0.918565C20.5833 0.635872 20.3566 0.41185 20.0739 0.246501C19.7912 0.081152 19.4845 -0.00152206 19.1538 -0.00152206ZM18.9138 1.23059L10.545 9.58339L2.1122 1.23059H18.9138ZM1.23212 13.9038V2.09468L7.15268 7.96724L1.23212 13.9038ZM2.0962 14.7679L8.03276 8.83132L10.113 10.8955C10.2303 11.0129 10.3743 11.0715 10.545 11.0715C10.7157 11.0715 10.8597 11.0129 10.977 10.8955L13.0092 8.86332L18.9138 14.7679H2.0962ZM19.7779 13.9038L13.8733 7.99924L19.7779 2.09468V13.9038Z' fill={_color} />
    </svg>
  );
};

export const DeleteIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='19' height='21' viewBox='0 0 19 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M16.7007 7.7998L14.9052 18.0115C14.7539 18.8721 14.0062 19.4998 13.1324 19.4998H5.86892C4.99507 19.4998 4.24745 18.8721 4.09612 18.0115L2.30066 7.7998' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M17.5998 5.1H12.5373M12.5373 5.1V3.3C12.5373 2.30589 11.7314 1.5 10.7373 1.5H8.26228C7.26816 1.5 6.46228 2.30589 6.46228 3.3V5.1M12.5373 5.1H6.46228M1.39978 5.1H6.46228' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ThreeDotsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.common.black;

  return (
    <svg
      className={className}
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M10.8002 2.99995C10.8002 3.99406 9.99431 4.79995 9.0002 4.79995C8.00608 4.79995 7.2002 3.99406 7.2002 2.99995C7.2002 2.00584 8.00608 1.19995 9.0002 1.19995C9.99431 1.19995 10.8002 2.00584 10.8002 2.99995ZM10.8002 9.00009C10.8002 9.9942 9.99431 10.8001 9.0002 10.8001C8.00608 10.8001 7.2002 9.9942 7.2002 9.00009C7.2002 8.00598 8.00608 7.20009 9.0002 7.20009C9.99431 7.20009 10.8002 8.00598 10.8002 9.00009ZM9.0002 16.7997C9.99431 16.7997 10.8002 15.9939 10.8002 14.9997C10.8002 14.0056 9.99431 13.1997 9.0002 13.1997C8.00608 13.1997 7.2002 14.0056 7.2002 14.9997C7.2002 15.9939 8.00608 16.7997 9.0002 16.7997Z' fill={_color} />
    </svg>
  );
};

export const PaperPlaneIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg
      className={className}
      width='22'
      height='23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='M21.066.076.364 10.482a.765.765 0 0 0-.253.232.617.617 0 0 0-.033.649.64.64 0 0 0 .242.242l4.84 2.992v6.775a.634.634 0 0 0 .44.616.644.644 0 0 0 .407 0 .562.562 0 0 0 .32-.241l3.321-4.4 7.436 4.575c.19.118.393.129.605.034a.577.577 0 0 0 .363-.473L21.99.758a.533.533 0 0 0-.033-.352.714.714 0 0 0-.22-.286.585.585 0 0 0-.33-.12.602.602 0 0 0-.34.076ZM5.776 13.453 1.97 11.12l15.18-7.635-11.374 9.966Zm.682 5.983v-4.861l10.67-9.35-10.67 14.211Zm10.494.902-6.534-4.026 9.79-13.046-3.256 17.073Z' />
    </svg>
  );
};

export const ComingSoonIcon = ({ className, color }: WithClassName & IconProps) => {
  const _color = color || '#c5c8cf';

  return (
    <svg
      className={className}
      width='244'
      height='163'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='m22.8 144.84 4.04 2.96c-2.4 3.4-6.4 5.6-11.2 5.6-7.84 0-13.88-6.36-13.88-14.12 0-7.8 6.04-14.16 13.88-14.16 4.68 0 8.68 2.08 11.08 5.44l-4.08 2.92c-1.6-2.08-4.08-3.52-7-3.52-5 0-8.76 4.2-8.76 9.32 0 5.16 3.76 9.28 8.76 9.28 3 0 5.56-1.48 7.16-3.72Zm16.254 3.76c2.72 0 4.88-1.96 4.88-5 0-3-2.16-4.88-4.88-4.88-2.72 0-4.88 1.88-4.88 4.88 0 3.04 2.16 5 4.88 5Zm0 4.76c-5.28 0-9.72-3.88-9.72-9.76 0-5.92 4.44-9.68 9.72-9.68s9.72 3.76 9.72 9.68c0 5.88-4.44 9.76-9.72 9.76Zm35.017-14.68c-2.24 0-3.8 1.48-3.8 4.36V153h-4.88v-10.28c-.04-2.6-1.52-4.04-3.44-4.04-2 0-3.92 1.16-3.92 4.36V153h-4.88v-18.68h4.88v2.76c1.08-2.28 3.56-3.12 5.36-3.12 3 .16 4.88 1.2 5.96 3.48 1.72-3.12 4.44-3.52 5.88-3.52 4.52 0 7.2 2.92 7.2 8.4V153h-4.84v-10.16c0-2.72-1.48-4.16-3.52-4.16Zm18.49-4.36V153h-4.84v-18.68h4.84ZM87 127.08c0-1.64 1.44-2.92 3.16-2.92 1.72 0 3.08 1.28 3.08 2.92 0 1.72-1.36 2.96-3.08 2.96S87 128.8 87 127.08Zm15.952 15.96V153h-4.88v-18.68h4.88v2.76c1.08-2.04 3.36-3.16 5.56-3.16 4.36 0 6.96 2.72 6.96 8.04V153h-4.88v-10.16c0-2.72-1.44-4.16-3.56-4.16-2.24 0-4.08 1.12-4.08 4.36Zm31.855.6c0-3.2-2.4-5.04-5.08-5.04-2.72 0-5.04 2-5.04 5.04 0 3.12 2.32 5.12 5.04 5.12 2.52 0 5.08-1.96 5.08-5.12Zm-10.52 11.16c.8 1.88 3 3.08 4.96 3.08 4.72 0 6-3.52 5.68-7.44-.96 1.88-3.56 2.96-5.96 2.96-4.88 0-9.36-3.76-9.36-9.68 0-6 4.48-9.8 9.36-9.8 2.44 0 4.88 1.04 5.96 2.92v-2.52h4.76v16c0 8.32-3.96 12-10.44 12-3.88 0-7.28-2.12-8.92-5.52 1.08-.52 2.88-1.48 3.96-2Zm29.935-9.84h5.12c.12 2.04 1.8 3.88 4.76 3.88 2.76 0 4.44-1.44 4.56-3.32.12-1.8-1.16-3.04-3.8-3.76l-3.4-.88c-6-1.72-6.96-5.28-6.96-7.68 0-4.84 4.2-8.08 9.28-8.08 5.2 0 9.16 3.2 9.16 8.32h-5.12c0-2.2-1.56-3.6-4.12-3.6-2.28 0-4.12 1.28-4.12 3.24 0 .8.32 2.44 3.28 3.16l3.4 1c6.2 1.72 7.72 5.16 7.52 8.4-.2 4.96-4.68 7.8-9.68 7.8-5.88 0-9.88-3.76-9.88-8.48Zm32.566 3.64c2.72 0 4.88-1.96 4.88-5 0-3-2.16-4.88-4.88-4.88-2.72 0-4.88 1.88-4.88 4.88 0 3.04 2.16 5 4.88 5Zm0 4.76c-5.28 0-9.72-3.88-9.72-9.76 0-5.92 4.44-9.68 9.72-9.68s9.72 3.76 9.72 9.68c0 5.88-4.44 9.76-9.72 9.76Zm22.656-4.76c2.72 0 4.88-1.96 4.88-5 0-3-2.16-4.88-4.88-4.88-2.72 0-4.88 1.88-4.88 4.88 0 3.04 2.16 5 4.88 5Zm0 4.76c-5.28 0-9.72-3.88-9.72-9.76 0-5.92 4.44-9.68 9.72-9.68s9.72 3.76 9.72 9.68c0 5.88-4.44 9.76-9.72 9.76Zm18.976-10.32V153h-4.88v-18.68h4.88v2.76c1.08-2.04 3.36-3.16 5.56-3.16 4.36 0 6.96 2.72 6.96 8.04V153h-4.88v-10.16c0-2.72-1.44-4.16-3.56-4.16-2.24 0-4.08 1.12-4.08 4.36Z' />
      <path stroke={_color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='5.037' d='M115.469 41.308 89.937 66.839a7.221 7.221 0 1 0 10.213 10.213l25.531-25.532m15.578 1.314 14.003 14.003A7.222 7.222 0 0 1 145.05 77.05l-22.418-22.417M103.49 24.325l-7.66 2.553-7.66-12.766 5.107-5.106 12.766 7.66-2.553 7.659Zm0 0 10.219 10.219' />
      <path stroke={_color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='5.037' d='M115.47 41.307c-3.047-7.774-2.451-17.974 3.83-24.255 6.281-6.28 17.872-7.66 24.255-3.83l-10.979 10.98-1.021 11.232 11.233-1.02 10.979-10.98c3.83 6.384 2.452 17.975-3.829 24.256-6.281 6.28-16.481 6.877-24.255 3.83' />
    </svg>
  );
};

export const UploadIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.background.paper;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 -4 32 32'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} fillRule='evenodd' d='M25 22H8s-6.038-.62-6-6c.021-3.04 2.688-5.82 6-6 0-4.14 2.65-8 7-8 3.433 0 5.723 2.1 6.538 5.01C26.493 6.8 29.844 10.72 30 14c.135 2.83-2.32 6.48-5 8ZM23.067 5.03C21.599 2.05 18.543 0 15 0c-4.749 0-8.63 3.68-8.967 8.34C2.542 9.34 0 12.39 0 16c0 4.26 3.54 7.73 8 7.98L25 24c3.437-1.49 7-5.65 7-9.5 0-5.06-3.951-9.18-8.933-9.47Zm-6.29 1.25a.964.964 0 0 0-.761-.28.966.966 0 0 0-.762.28l-5.941 5.91a1.004 1.004 0 1 0 1.423 1.42L15 9.37v9.62a1.001 1.001 0 0 0 2 0V9.34l4.295 4.27a1.004 1.004 0 1 0 1.423-1.42l-5.941-5.91Z' />
    </svg>
  );
};

export const SaveCopyIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ExpandArrowsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      version='1.0'
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='M248.5 33.9c-1.6 1-16.6 15.5-33.2 32.2-25.4 25.7-30.3 31-31.2 34.4-3.5 13.4 11.2 24.5 23.4 17.7 1.1-.6 8.8-7.9 17-16.1l15-15.1.5 55.4c.5 54 .6 55.5 2.6 58.2 3.9 5.3 7.1 6.9 13.4 6.9 6.3 0 9.5-1.6 13.4-6.9 2-2.7 2.1-4.2 2.6-58.2l.5-55.4 15 15.1c8.3 8.2 15.9 15.5 17 16.1 6.4 3.6 14 2.5 19.1-2.6 3-3 5.7-9.4 4.9-11.9-.2-.7-.6-2.6-1-4.2-.5-2.2-8.9-11.3-31.3-33.8-16.9-17-31.9-31.5-33.4-32.3-3.8-2-10.7-1.8-14.3.5zm-145 149.6c-.5.2-2.3.6-4 1-2.2.5-11.3 8.9-33.8 31.3-17 16.9-31.5 31.9-32.3 33.4-1.8 3.5-1.8 10.1 0 13.6.8 1.5 15.3 16.5 32.3 33.4 22.5 22.4 31.6 30.8 33.8 31.3 1.7.4 3.5.8 4.2 1 2.5.8 8.9-1.9 11.9-4.9 5.1-5.1 6.2-12.7 2.6-19.1-.6-1.1-7.9-8.8-16.1-17l-15.1-15 55.4-.5c54-.5 55.5-.6 58.2-2.6 5.3-3.9 6.9-7.1 6.9-13.4 0-6.3-1.6-9.5-6.9-13.4-2.7-2-4.2-2.1-58.2-2.6l-55.4-.5 15.1-15c8.2-8.3 15.5-15.9 16.1-17 5.5-9.8 0-21.3-11.2-23.8-1.4-.3-2.9-.4-3.5-.2zm299.5.7c-9.6 2.7-14.2 14.3-9.2 23.3.6 1.1 7.9 8.7 16.1 17l15.1 15-55.4.5c-54 .5-55.5.6-58.2 2.6-5.3 3.9-6.9 7.1-6.9 13.4 0 6.3 1.6 9.5 6.9 13.4 2.7 2.1 4 2.1 58.4 2.4l55.6.2-16.1 16.3c-13 13.1-16.3 17-17.2 20.2-1.4 5.4.2 11 4.3 15.1 3 3 9.4 5.7 11.9 4.9.7-.2 2.6-.6 4.2-1 2.2-.5 11.3-8.9 33.8-31.3 17-16.9 31.5-31.9 32.3-33.4.8-1.5 1.4-4.5 1.4-6.8s-.6-5.3-1.4-6.8c-.8-1.5-15.3-16.5-32.3-33.4-22.4-22.3-31.6-30.8-33.8-31.3-1.6-.4-3.7-.8-4.5-1-.8-.2-3.1.1-5 .7zM249.5 305.4c-3.7 1.7-7 5.2-8.4 8.9-.7 1.9-1.1 21.1-1.1 57v54.1l-16.2-16.1c-11.4-11.2-17.2-16.3-19.3-16.8-1.6-.4-3.5-.8-4.1-1-2.6-.8-9.4 1.9-12.2 4.8-2.9 3.1-5.5 9.6-4.7 12 .2.7.6 2.5 1 4.2.5 2.2 8.9 11.3 31.3 33.8 16.9 17 31.9 31.5 33.4 32.3 3.5 1.8 10.1 1.8 13.6 0 1.5-.8 16.5-15.3 33.4-32.3 22.4-22.5 30.8-31.6 31.3-33.8.4-1.7.8-3.5 1-4.2.8-2.5-1.9-8.9-4.9-11.9-5.1-5.1-12.7-6.2-19.1-2.6-1.1.6-8.7 7.9-17 16.1l-15 15.1-.5-55.4c-.5-54-.6-55.5-2.6-58.2-1.1-1.5-3.2-3.7-4.6-4.7-3.4-2.5-11.3-3.2-15.3-1.3z' />
    </svg>
  );
};

export const PlusCircledIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='20'
      height='20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path stroke={_color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.3' d='M10 7v3m0 0v3m0-3h3m-3 0H7m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    </svg>
  );
};

export const LevelElevationHintIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;
  const shadow = lighten(_color, 0.6);

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 2.64H1.405a.016.016 0 0 0-.012.029l4.334 4.063h10.595a.016.016 0 0 0 .011-.029L12 2.641Zm0 0v4.864' stroke={_color} strokeWidth='.4' strokeDasharray='0.8 0.8' />
      <path d='M12 7.64H1.405a.016.016 0 0 0-.012.029l4.334 4.063h10.595a.016.016 0 0 0 .011-.029L12 7.641Z' fill={_color} stroke={_color} strokeWidth='.4' />
      <path d='M1.363 2.64v4.91l4.364 3.818m10.636-4.636v4.636H5.727m0 0V6.732' stroke={_color} strokeWidth='.4' strokeDasharray='0.8 0.8' />
      <path d='M5.7 11.555v-4' stroke='#fff' strokeWidth='.4' strokeLinecap='round' strokeDasharray='0.8 0.8' />
      <path d='M12.255 17.64H1.795a.055.055 0 0 0-.034.098l3.68 2.891c.009.008.02.012.033.012h10.723a.055.055 0 0 0 .033-.099l-3.943-2.89a.055.055 0 0 0-.032-.011Z' fill={shadow} stroke={shadow} strokeWidth='.545' />
      <path stroke={_color} strokeWidth='.38' strokeLinecap='round' d='M17.645 11.81h3.984' />
      <path stroke={_color} strokeWidth='.38' strokeLinecap='round' d='M17.645 20.81h3.984' />
      <path d='m22.5 12-.866 1.5h1.732L22.5 12Zm0 9 .866-1.5h-1.732L22.5 21Zm-.15-7.65v6.3h.3v-6.3h-.3Z' fill={_color} />
    </svg>
  );
};

export const FloorHeightHintIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11.881 4.633H1.405a.016.016 0 0 0-.012.028l4.334 4.063H16.11a.1.1 0 0 0 .069-.173l-4.093-3.837a.3.3 0 0 0-.205-.081Z' stroke={_color} strokeWidth='.55' />
      <path d='M16.363 19.114V8.824a.1.1 0 0 0-.1-.1H5.727v10.59h10.436a.2.2 0 0 0 .2-.2Z' fill={_color} />
      <path d='M1.363 4.633v10.682a.4.4 0 0 0 .137.3l4.227 3.7m0 0h10.436a.2.2 0 0 0 .2-.2V8.823a.1.1 0 0 0-.1-.1H5.727v10.59Z' stroke={_color} strokeWidth='.55' />
      <path stroke={_color} strokeWidth='.38' strokeLinecap='round' d='M17.645 9.083h3.984' />
      <path stroke={_color} strokeWidth='.38' strokeLinecap='round' d='M17.645 19.451h3.984' />
      <path d='m22.635 9.273-1.102 1.91h2.204l-1.102-1.91Zm0 10.364 1.102-1.909h-2.204l1.102 1.91Zm-.191-8.645v6.927h.382v-6.927h-.382Z' fill={_color} />
    </svg>
  );
};

export const StraightLineIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3.444 19a.778.778 0 1 0 0-1.555.778.778 0 0 0 0 1.556Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20.555 6.556a.778.778 0 1 0 0-1.556.778.778 0 0 0 0 1.556Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M3.445 18.226 20.128 6.015' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const MultipleStraightLinesIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 4.727h10' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 4.727v14.545' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 20.185a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 5.638a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M2 19.273h10' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RectangleIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3.9 4.797v14.4' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M3.9 20.097a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M3.9 5.698a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20.1 4.797v14.4' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20.1 20.097a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20.1 5.698a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M19.2 4.797H4.8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M19.2 19.195H4.8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const HexagonIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill={_color} d='m7.618 20.087-.566.319.186.33h.38v-.65Zm8.989 0v.65h.38l.186-.331-.566-.32Zm4.494-7.975.566.32.18-.32-.18-.319-.566.32Zm-4.494-7.975.566-.319-.186-.33h-.38v.65Zm-8.989 0v-.65h-.38l-.186.331.566.32Zm-4.494 7.975-.567-.319-.18.32.18.318.567-.319Zm4.382 9.538c.926 0 1.66-.759 1.66-1.675h-1.3c0 .215-.17.375-.36.375v1.3Zm1.66-1.675c0-.917-.734-1.676-1.66-1.676v1.3c.19 0 .36.16.36.376h1.3Zm-1.66-1.676a1.67 1.67 0 0 0-1.662 1.676h1.3c0-.216.17-.376.362-.376v-1.3Zm-1.662 1.676a1.67 1.67 0 0 0 1.662 1.675v-1.3a.368.368 0 0 1-.362-.375h-1.3ZM7.506 5.7c.926 0 1.66-.759 1.66-1.676h-1.3c0 .216-.17.376-.36.376v1.3Zm1.66-1.676c0-.916-.734-1.675-1.66-1.675v1.3c.19 0 .36.16.36.375h1.3ZM7.507 2.35a1.67 1.67 0 0 0-1.662 1.675h1.3c0-.215.17-.375.362-.375v-1.3ZM5.844 4.025a1.67 1.67 0 0 0 1.662 1.676V4.4a.368.368 0 0 1-.362-.376h-1.3Zm-2.833 9.65c.926 0 1.661-.758 1.661-1.675h-1.3c0 .216-.17.375-.36.375v1.3ZM4.672 12c0-.917-.735-1.675-1.66-1.675v1.3c.19 0 .36.16.36.375h1.3Zm-1.66-1.675c-.927 0-1.662.758-1.662 1.675h1.3c0-.216.17-.375.361-.375v-1.3ZM1.35 12c0 .917.735 1.675 1.661 1.675v-1.3A.368.368 0 0 1 2.65 12h-1.3Zm19.639 1.675c.926 0 1.661-.758 1.661-1.675h-1.3c0 .216-.17.375-.361.375v1.3ZM22.65 12c0-.917-.735-1.675-1.661-1.675v1.3c.19 0 .361.16.361.375h1.3Zm-1.661-1.675c-.926 0-1.662.758-1.662 1.675h1.3c0-.216.17-.375.362-.375v-1.3ZM19.327 12c0 .917.736 1.675 1.662 1.675v-1.3a.368.368 0 0 1-.361-.375h-1.3Zm-2.833 9.65a1.67 1.67 0 0 0 1.662-1.675h-1.3c0 .215-.17.375-.362.375v1.3Zm1.662-1.675a1.67 1.67 0 0 0-1.662-1.676v1.3c.192 0 .362.16.362.376h1.3Zm-1.662-1.676c-.925 0-1.66.759-1.66 1.676h1.3c0-.216.17-.376.36-.376v-1.3Zm-1.66 1.676c0 .916.735 1.675 1.66 1.675v-1.3a.368.368 0 0 1-.36-.375h-1.3ZM16.493 5.7a1.67 1.67 0 0 0 1.662-1.676h-1.3c0 .216-.17.376-.362.376v1.3Zm1.662-1.676a1.67 1.67 0 0 0-1.662-1.675v1.3c.192 0 .362.16.362.375h1.3ZM16.494 2.35c-.926 0-1.66.759-1.66 1.675h1.3c0-.215.17-.375.36-.375v-1.3Zm-1.66 1.675c0 .917.734 1.676 1.66 1.676V4.4a.368.368 0 0 1-.36-.376h-1.3ZM7.617 20.737h8.989v-1.3H7.618v1.3Zm9.555-.331 4.494-7.975-1.132-.638-4.494 7.975 1.132.638Zm4.494-8.613-4.494-7.975-1.132.639 4.494 7.974 1.132-.638Zm-5.06-8.306H7.618v1.3h8.989v-1.3Zm-9.555.331-4.495 7.975 1.133.638 4.494-7.974-1.132-.639Zm-4.495 8.613 4.495 7.975 1.132-.638-4.494-7.975-1.133.638Z' />
    </svg>
  );
};

export const CurvedLineIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21.09 15.59a9.091 9.091 0 0 0-18.182 0' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M2.91 16.498a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21.09 16.498a.91.91 0 1 0 0-1.818.91.91 0 0 0 0 1.818Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const BrokenCurvedLineIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18 4h3' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' fill={_color} stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10 20s6.5-2.5 2-8 2-8 2-8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M3 20h3' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const FloorIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2143_71038)'>
        <path d='m1.172 11.332 3.385 1.954m-3.385-1.954 5.416-3.127m-5.416 3.127v2.052c0 .188.13.367.36.5l10.472 6.047m0-2.345L8.619 15.63m3.385 1.955 5.416-3.127m-5.416 3.127v2.345m10.832-8.6L19.45 9.379m3.385 1.954-5.416 3.127m5.416-3.127v2.052c0 .188-.13.367-.36.5l-10.472 6.047m3.385-12.899-2.52-1.454c-.477-.276-1.253-.276-1.731 0l-4.55 2.627m8.8-1.173 4.063 2.346m-4.062-2.346L12.68 8.596m-8.124 4.69 4.062 2.345m-4.062-2.345 2.708-1.563m1.354 3.908 1.692-.977 1.016-.586m8.124-4.69-2.708 1.563m-6.77-.782L6.588 8.205m3.385 1.954 2.708-1.563m-2.708 1.563-2.708 1.564m6.77.781 3.385 1.955m-3.385-1.955 2.708-1.563m-2.708 1.563-2.708 1.564m5.416-3.127L12.68 8.596m-1.354 5.472-4.062-2.345' stroke={_color} strokeWidth='1.2' strokeLinecap='round' />
      </g>
      <defs>
        <clipPath id='clip0_2143_71038'>
          <path fill={theme.palette.background.paper} d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CompassIcon = ({ className, color }: WithClassName & IconProps) => {
  const _color = color || '#ef4444';

  return (
    <svg
      className={className}
      width='14'
      height='49'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6.86 0 0 24.01h13.72L6.86 0Z' fill={_color} />
      <path d='m0 24.01 6.86 24.01 6.86-24.01H0Z' fill='#e2e8f0' />
    </svg>
  );
};

export const AnnotationIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.primary;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2385_26108)'>
        <path d='M10 18a8 8 0 1 0-6.93-4l-.67 3.6 3.6-.67A7.964 7.964 0 0 0 10 18Z' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M23.86 10.614v-.001L21.387 8.14a2.19 2.19 0 0 0-3.093 0h-.001L8.173 18.263l.7.7-.7-.7a2.3 2.3 0 0 0-.673 1.626V24.5h4.611a2.3 2.3 0 0 0 1.626-.673l10.123-10.12a2.19 2.19 0 0 0 0-3.093Zm-6.165 4.305L11.614 21H11v-.614l6.08-6.08.615.613Zm2.76-2.76-.286.286-.614-.614.287-.287.614.614Z' fill={_color} stroke='#fff' strokeWidth='2' />
        <path d='M9.25 13.75h1.5V8.5H13V7H7v1.5h2.25v5.25Z' fill={_color} />
      </g>
      <defs>
        <clipPath id='clip0_2385_26108'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const RoofOnlyIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.053 8 1.19 16.577a.3.3 0 0 0 .273.423h.5a.3.3 0 0 0 .274-.177l3.394-7.537M5.052 8h4.632M5.053 8l.579 1.286M7.079 12.5l1.947 4.323a.3.3 0 0 0 .273.177h4.438m-6.658-4.5h13.895m-13.895 0L5.632 9.286M20.974 12.5l-1.947-4.323A.3.3 0 0 0 18.753 8h-4.437m6.658 4.5 1.835 4.077a.3.3 0 0 1-.273.423h-4.168M9.684 8l4.053 9M9.684 8h4.632m-.58 9h4.632m-4.052-9 4.052 9' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const FloorWithCornersIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M21.5 6v12.6a.4.4 0 0 1-.4.4h-5.774M2.5 6v12.6c0 .22.18.4.4.4h5.776M6.3 10.219h3.8m-3.8 0V6m0 4.219L2.853 18M17.7 10.219h-3.8m3.8 0V6m0 4.219L21.148 18M10.1 10.219 8.676 19m1.425-8.781h3.8M8.676 19h6.65m-1.425-8.781L15.326 19M4 15.5h16m-14.5-3h13' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const CeilingWithCornersIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M21.5 19V6.4a.4.4 0 0 0-.4-.4h-5.774M2.5 19V6.4c0-.22.18-.4.4-.4h5.776M6.3 14.781h3.8m-3.8 0V19m0-4.219L2.853 7M17.7 14.781h-3.8m3.8 0V19m0-4.219L21.148 7M10.1 14.781 8.676 6m1.425 8.781h3.8M8.676 6h6.65m-1.425 8.781L15.326 6M4 9.5h16m-14.5 3h13' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const SearchInputIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.text.disabled;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M16 16L21 21' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M5 11C5 14.3137 7.68629 17 11 17C12.6598 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1516 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const DropFileIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 3v12m0 0-3.5-3.5M12 15l3.5-3.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const GlbIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2402_55125)' fill={_color}>
        <path d='M1.5 21.75V2.25a.75.75 0 0 1 .75-.75H13.5v3A1.5 1.5 0 0 0 15 6h3v2.25h1.5v-3a.748.748 0 0 0-.218-.532l-4.5-4.5A.75.75 0 0 0 14.25 0h-12A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24H7.5v-1.5H2.25a.75.75 0 0 1-.75-.75Z' />
        <path d='m7.37 19.11 1.645.2c.027.19.09.322.19.394.137.103.352.154.646.154.376 0 .658-.056.846-.17a.698.698 0 0 0 .287-.363c.044-.12.066-.34.066-.662v-.794c-.43.587-.974.881-1.63.881-.731 0-1.31-.309-1.738-.927-.335-.49-.502-1.098-.502-1.826 0-.912.218-1.61.656-2.091.44-.482.988-.723 1.64-.723.674 0 1.23.295 1.667.887v-.764h1.348v4.886c0 .642-.053 1.122-.159 1.44-.106.318-.254.568-.446.749-.191.181-.447.323-.769.425-.318.103-.721.154-1.21.154-.923 0-1.577-.159-1.963-.477a1.48 1.48 0 0 1-.58-1.2c0-.047.002-.105.005-.174Zm1.286-3.195c0 .578.111 1.002.333 1.272.226.266.503.4.831.4.352 0 .65-.137.892-.41.243-.277.364-.686.364-1.226 0-.564-.116-.982-.349-1.256a1.107 1.107 0 0 0-.881-.41c-.346 0-.63.135-.857.405-.222.267-.333.675-.333 1.225Z' />
        <path d='M13.922 18.75v-7.516h1.44v7.516h-1.44Z' />
        <path d='M16.782 18.75v-7.516h1.441v2.707c.445-.506.97-.758 1.58-.758.662 0 1.21.24 1.645.723.434.478.651 1.167.651 2.066 0 .93-.222 1.645-.666 2.148-.441.502-.978.753-1.61.753-.311 0-.619-.076-.923-.23-.3-.157-.56-.388-.78-.692v.8h-1.338Zm1.43-2.84c0 .564.09.981.268 1.251.249.383.58.574.994.574.318 0 .588-.135.81-.405.226-.273.339-.702.339-1.286 0-.623-.113-1.07-.339-1.344a1.068 1.068 0 0 0-.866-.415c-.345 0-.633.135-.862.405-.229.267-.343.673-.343 1.22Z' />
      </g>
      <defs>
        <clipPath id='clip0_2402_55125'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const JpgIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_8864_28623)' fill={_color}>
        <path d='M1.5 21.75V2.25a.75.75 0 0 1 .75-.75H13.5v3A1.5 1.5 0 0 0 15 6h3v2.25h1.5v-3a.748.748 0 0 0-.218-.532l-4.5-4.5A.75.75 0 0 0 14.25 0h-12A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24H7.5v-1.5H2.25a.75.75 0 0 1-.75-.75Z' />
        <path d='M8.604 12.546h1.512v5.725c0 .421-.083.762-.248 1.022-.166.26-.404.451-.714.572-.308.12-.676.181-1.104.181a2.95 2.95 0 0 1-.15-.003 3.71 3.71 0 0 1-.156-.004v-1.183c.04.003.076.004.107.004a.879.879 0 0 0 .092.004c.244 0 .414-.052.511-.157.1-.101.15-.255.15-.461v-5.7Zm.752-.703a.817.817 0 0 1-.575-.224.72.72 0 0 1-.241-.543c0-.208.08-.387.241-.536a.81.81 0 0 1 .575-.227c.228 0 .42.075.58.227.16.149.24.328.24.536a.72.72 0 0 1-.24.543.814.814 0 0 1-.58.224Zm1.472 8.203v-7.5h1.492v.916h.067a2 2 0 0 1 .288-.447c.128-.154.293-.282.497-.384.206-.104.461-.156.767-.156.398 0 .765.104 1.1.313.337.206.606.517.807.934.201.414.302.934.302 1.559 0 .608-.099 1.122-.295 1.54-.194.417-.46.733-.796.949-.333.213-.707.32-1.122.32-.293 0-.543-.049-.749-.146a1.55 1.55 0 0 1-.5-.366 1.9 1.9 0 0 1-.299-.45h-.046v2.918h-1.513Zm1.48-4.773c0 .325.046.608.136.85.09.24.22.429.39.564a.987.987 0 0 0 .622.199.975.975 0 0 0 .625-.203c.17-.137.3-.326.387-.568.09-.244.135-.524.135-.842a2.41 2.41 0 0 0-.131-.83 1.237 1.237 0 0 0-.387-.562.98.98 0 0 0-.629-.202 1 1 0 0 0-.625.195c-.168.13-.297.315-.387.554a2.4 2.4 0 0 0-.135.845Zm6.806 4.887c-.49 0-.91-.068-1.261-.203a2.093 2.093 0 0 1-.831-.543 1.672 1.672 0 0 1-.401-.774l1.399-.188a.926.926 0 0 0 .568.532c.154.06.341.09.561.09.33 0 .6-.081.813-.242.216-.159.323-.425.323-.8v-.997h-.063a1.438 1.438 0 0 1-.299.43 1.503 1.503 0 0 1-.511.33 1.964 1.964 0 0 1-.746.128 2.24 2.24 0 0 1-1.118-.284c-.334-.192-.6-.485-.8-.878-.196-.395-.294-.894-.294-1.498 0-.618.1-1.134.302-1.549.2-.414.468-.724.802-.93a2.074 2.074 0 0 1 1.105-.309c.305 0 .56.052.767.156.206.102.371.23.497.384.128.151.226.3.295.447h.056v-.916h1.503v5.508c0 .464-.114.852-.341 1.165a2.052 2.052 0 0 1-.945.703c-.4.159-.86.238-1.381.238Zm.032-3.374c.243 0 .45-.06.617-.18.17-.124.301-.3.391-.527.092-.23.139-.504.139-.823 0-.32-.045-.597-.135-.831-.09-.237-.22-.42-.391-.55a.993.993 0 0 0-.621-.196.98.98 0 0 0-.629.202c-.17.133-.3.318-.387.554-.088.237-.131.51-.131.82 0 .315.043.588.131.817.09.228.219.404.387.53.17.123.38.184.629.184Z' />
      </g>
      <defs>
        <clipPath id='clip0_8864_28623'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PngIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_8864_28624)' fill={_color}>
        <path d='M1.5 21.75V2.25a.75.75 0 0 1 .75-.75H13.5v3A1.5 1.5 0 0 0 15 6h3v2.25h1.5v-3a.748.748 0 0 0-.218-.532l-4.5-4.5A.75.75 0 0 0 14.25 0h-12A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24H7.5v-1.5H2.25a.75.75 0 0 1-.75-.75Z' />
        <path d='M6.604 20.046v-7.5h1.491v.916h.067a2 2 0 0 1 .288-.448c.128-.153.294-.281.497-.383.206-.104.462-.156.767-.156.398 0 .765.104 1.101.312.336.206.605.517.806.934.201.414.302.934.302 1.559 0 .608-.098 1.122-.295 1.541-.194.417-.459.733-.795.948-.334.213-.708.32-1.122.32a1.75 1.75 0 0 1-.75-.146 1.55 1.55 0 0 1-.5-.365c-.13-.15-.23-.3-.299-.451h-.046v2.919H6.604Zm1.48-4.773c0 .324.045.607.135.849.09.241.22.43.39.564.171.133.379.2.622.2a.976.976 0 0 0 .625-.203c.17-.138.3-.327.387-.569.09-.243.135-.524.135-.841a2.41 2.41 0 0 0-.131-.831 1.237 1.237 0 0 0-.387-.561.98.98 0 0 0-.629-.203.999.999 0 0 0-.625.196c-.168.13-.297.315-.387.554-.09.239-.135.52-.135.845Zm5.86-.426V18h-1.512v-5.454h1.441v.962h.064c.121-.317.324-.568.608-.753.284-.187.628-.28 1.033-.28.379 0 .709.082.99.248a1.7 1.7 0 0 1 .658.71c.156.306.234.67.234 1.094V18h-1.513v-3.203c.003-.334-.083-.594-.255-.781-.173-.19-.411-.284-.714-.284a1.08 1.08 0 0 0-.54.131.916.916 0 0 0-.362.384 1.33 1.33 0 0 0-.132.6Zm6.666 5.313c-.49 0-.91-.068-1.26-.203a2.092 2.092 0 0 1-.832-.544 1.67 1.67 0 0 1-.401-.774l1.399-.188c.043.11.11.21.202.306.093.094.215.17.366.227.154.059.341.089.561.089.33 0 .6-.08.814-.242.215-.159.323-.425.323-.799v-.998h-.064a1.438 1.438 0 0 1-.299.43 1.503 1.503 0 0 1-.511.33 1.966 1.966 0 0 1-.746.128 2.24 2.24 0 0 1-1.118-.284c-.334-.192-.6-.484-.8-.877-.196-.395-.294-.895-.294-1.499 0-.618.1-1.134.302-1.548.201-.414.469-.725.802-.93a2.074 2.074 0 0 1 1.105-.31c.305 0 .56.053.767.157.206.102.372.23.497.383.128.152.226.301.295.448h.056v-.916h1.503v5.507c0 .464-.114.853-.341 1.165a2.05 2.05 0 0 1-.945.703c-.4.159-.86.238-1.381.238Zm.032-3.374c.244 0 .45-.06.618-.181.17-.123.3-.299.39-.526.093-.23.139-.504.139-.824 0-.32-.045-.596-.135-.83a1.211 1.211 0 0 0-.39-.551.993.993 0 0 0-.622-.196.981.981 0 0 0-.629.203c-.17.132-.3.317-.387.554-.088.237-.131.51-.131.82 0 .315.043.587.131.817.09.227.22.404.387.529.17.123.38.185.629.185Z' />
      </g>
      <defs>
        <clipPath id='clip0_8864_28624'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SkmIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_7551_44699)' fill={_color}>
        <path d='M1.5 21.75V2.25a.75.75 0 0 1 .75-.75H13.5v3A1.5 1.5 0 0 0 15 6h3v5.5h1.5V5.25a.748.748 0 0 0-.218-.532l-4.5-4.5A.75.75 0 0 0 14.25 0h-12A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24H7.5v-1.5H2.25a.75.75 0 0 1-.75-.75Z' />
        <path d='m5 18.464 1.295-.202c.055.257.167.452.335.587.168.131.404.197.707.197.334 0 .585-.062.753-.188a.423.423 0 0 0 .17-.352c0-.1-.03-.183-.092-.249-.064-.063-.208-.12-.431-.174-1.041-.235-1.7-.45-1.98-.643-.385-.27-.578-.644-.578-1.123 0-.432.167-.796.5-1.09.334-.295.852-.442 1.553-.442.667 0 1.163.111 1.487.334.325.222.548.551.67.986l-1.216.23a.766.766 0 0 0-.299-.446c-.143-.103-.35-.155-.62-.155-.34 0-.583.049-.73.146a.314.314 0 0 0-.146.268c0 .094.042.174.128.24.116.087.517.21 1.203.37.689.16 1.17.356 1.442.588.27.235.404.562.404.982 0 .457-.187.85-.56 1.179-.374.329-.926.493-1.658.493-.664 0-1.19-.138-1.58-.413A1.909 1.909 0 0 1 5 18.464Zm5.643 1.423V13h1.29v3.655l1.511-1.757h1.59l-1.668 1.823 1.787 3.166H13.76l-1.226-2.24-.601.643v1.597h-1.29Zm5.185-4.989h1.189v.681c.425-.53.932-.794 1.52-.794.312 0 .583.066.813.198.23.131.417.33.564.596.215-.266.446-.465.694-.596a1.67 1.67 0 0 1 .794-.198c.358 0 .661.075.91.226.247.147.432.365.555.653.089.213.133.557.133 1.033v3.19h-1.29v-2.851c0-.495-.045-.815-.134-.959-.119-.188-.303-.282-.55-.282a.865.865 0 0 0-.51.17.938.938 0 0 0-.345.497c-.07.216-.105.56-.105 1.03v2.395h-1.29v-2.734c0-.485-.023-.799-.07-.94a.594.594 0 0 0-.215-.314.653.653 0 0 0-.39-.104.925.925 0 0 0-.538.165.913.913 0 0 0-.344.474c-.068.207-.101.55-.101 1.03v2.423h-1.29v-4.989Z' />
      </g>
      <defs>
        <clipPath id='clip0_7551_44699'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ReplaceIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21.167 8A10.003 10.003 0 0 0 12 2c-5.185 0-9.448 3.947-9.95 9M18 8h3.4a.6.6 0 0 0 .6-.6V4M2.882 16c1.543 3.532 5.067 6 9.168 6 5.185 0 9.449-3.947 9.95-9M6.05 16h-3.4a.6.6 0 0 0-.6.6V20' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m8.235 9.626 3.636 2.292c.08.051.178.051.258 0l3.649-2.3M12 16.54V12m4-2.344v4.688c0 .11-.053.21-.137.264l-3.733 2.354a.24.24 0 0 1-.26 0l-3.733-2.354A.311.311 0 0 1 8 14.344V9.656c0-.11.053-.21.137-.264l3.733-2.354a.24.24 0 0 1 .26 0l3.733 2.354a.311.311 0 0 1 .137.264Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const RailingsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2 21h6.5v-4h6v-4H21M4 21V11m15 2V3M4 12l15-8M4 16l15-8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M7 11v3m3-5v3m3-4v3m3-5v3' stroke={_color} strokeWidth='1.3' strokeLinecap='square' />
    </svg>
  );
};

export const StringerLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='26'
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1h20a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H1m0-8h22M1 9h22' stroke='#bebebe' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M1 1v24' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const StringerCenterIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='26'
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 17h22M1 9h22m-2 16H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2Z' stroke='#bebebe' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M11.7 1v24' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const StringerRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='26'
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M23 1H3a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20m0-8H1m22-8H1' stroke='#bebebe' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M23 1v24' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const RailingsLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='32'
      viewBox='0 0 24 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1.227 4h22m0 0v24m0-24V1m-22 19h22m-22-8h22m-22 16h22m0 0v3' stroke='#bebebe' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M1.227 4v24' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M.002 28.003a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm.025-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm0-8.003a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm0-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Z' fill={_color} />
    </svg>
  );
};

export const RailingsRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='25'
      height='32'
      viewBox='0 0 25 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M23 4H1m0 0v24M1 4V1m22 19H1m22-8H1m22 16H1m0 0v3' stroke='#bebebe' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M23 4v24' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M24.225 28.003a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-.025-8a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-8.003a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0-8a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z' fill={_color} />
    </svg>
  );
};

export const GeneralItemIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='53'
      height='54'
      viewBox='0 0 53 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M30.53 3.22v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.746 1.665-1.665V3.22c0-.92-.746-1.665-1.665-1.665H32.195c-.92 0-1.666.745-1.666 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M17.387 12.415v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V12.415c0-.92-.745-1.665-1.665-1.665H19.052c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M1.623 4.532V43.25c0 .92.746 1.665 1.665 1.665h17.693c.92 0 1.666-.745 1.666-1.665V4.532c0-.92-.746-1.665-1.666-1.665H3.288c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const UniqueItemIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;
  const color2 = lighten(_color, 0.6);

  return (
    <svg
      className={className}
      width='52'
      height='54'
      viewBox='0 0 52 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M29.7 3.22v38.717c0 .92.745 1.665 1.665 1.665h17.692c.92 0 1.666-.746 1.666-1.665V3.22c0-.92-.746-1.665-1.666-1.665H31.364c-.92 0-1.665.745-1.665 1.665Z' fill='#fff' stroke={color2} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M.793 4.532V43.25c0 .92.746 1.665 1.665 1.665h17.693c.92 0 1.666-.745 1.666-1.665V4.532c0-.92-.746-1.665-1.666-1.665H2.458c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke={color2} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M16.557 12.415v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V12.415c0-.92-.745-1.665-1.665-1.665H18.222c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const BackgroundLocationIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='39'
      height='52'
      viewBox='0 0 39 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M16.977 10.548v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V10.548c0-.92-.745-1.665-1.665-1.665H18.642c-.92 0-1.665.745-1.665 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M1.213 2.665v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V2.665c0-.92-.745-1.665-1.665-1.665H2.878c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke='#999' strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const ForegroundLocationIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='39'
      height='52'
      viewBox='0 0 39 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1.213 2.665v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V2.665c0-.92-.745-1.665-1.665-1.665H2.878c-.92 0-1.665.746-1.665 1.665Z' fill='#fff' stroke='#999' strokeWidth='1.3' strokeLinecap='round' />
      <path d='M16.977 10.548v38.717c0 .92.745 1.665 1.665 1.665h17.693c.92 0 1.665-.745 1.665-1.665V10.548c0-.92-.745-1.665-1.665-1.665H18.642c-.92 0-1.665.745-1.665 1.665Z' fill='#fff' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const ArrowArchingRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='27'
      height='12'
      viewBox='0 0 27 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M.46 8.152a9.987 9.987 0 0 1 1.111-2.499c4.3-6.94 15.08-6.943 19.382-.004h.001l1.782 2.853.53.85.278-.963 1.295-4.504a.42.42 0 0 1 .312-.28c.18-.044.345.01.451.11a.342.342 0 0 1 .107.355l-1.852 6.438c-.055.19-.29.346-.558.28l-6.913-1.726a.42.42 0 0 1-.311-.28l-.43.124.43-.123a.342.342 0 0 1 .107-.355.484.484 0 0 1 .451-.109l4.817 1.202 1.073.268-.586-.938-1.773-2.837a9.717 9.717 0 0 0-1.638-1.988C12.95-1.17 3.392 1.173 1.33 8.336a.42.42 0 0 1-.311.28.484.484 0 0 1-.452-.11.342.342 0 0 1-.106-.354Z' fill={_color} stroke={_color} strokeWidth='.893' />
    </svg>
  );
};

export const ArrowArchingLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='27'
      height='12'
      viewBox='0 0 27 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M25.71 8.152a9.985 9.985 0 0 0-1.111-2.499c-4.3-6.94-15.08-6.943-19.382-.004h-.001L3.434 8.503l-.53.85-.278-.963-1.295-4.504a.42.42 0 0 0-.312-.28.484.484 0 0 0-.451.11.342.342 0 0 0-.107.355l1.852 6.438c.055.19.29.346.558.28l6.912-1.726a.42.42 0 0 0 .312-.28l.43.124-.43-.123a.342.342 0 0 0-.107-.355.484.484 0 0 0-.451-.109L4.72 9.521l-1.073.268.586-.938 1.773-2.837a9.72 9.72 0 0 1 1.638-1.988C13.22-1.17 22.778 1.173 24.84 8.336a.42.42 0 0 0 .311.28c.18.044.345-.01.452-.11a.342.342 0 0 0 .106-.354Z' fill={_color} stroke={_color} strokeWidth='.893' />
    </svg>
  );
};

export const SelectSimilarIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3.15 4.5c0-.746.604-1.35 1.35-1.35H9c.746 0 1.35.604 1.35 1.35V9A1.35 1.35 0 0 1 9 10.35H4.5A1.35 1.35 0 0 1 3.15 9V4.5Z' stroke={_color} strokeWidth='1.3' />
      <path d='M3.15 15c0-.746.604-1.35 1.35-1.35H9c.746 0 1.35.604 1.35 1.35v4.5A1.35 1.35 0 0 1 9 20.85H4.5a1.35 1.35 0 0 1-1.35-1.35V15Z' stroke={_color} strokeWidth='1.3' />
      <path d='M13.65 4.5c0-.746.604-1.35 1.35-1.35h4.5c.746 0 1.35.604 1.35 1.35V9a1.35 1.35 0 0 1-1.35 1.35H15A1.35 1.35 0 0 1 13.65 9V4.5Z' stroke={_color} strokeWidth='1.3' />
      <path d='M18.813 18.813 21 21m-7-4.375a2.625 2.625 0 1 0 5.25 0 2.625 2.625 0 0 0-5.25 0Z' stroke={_color} strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const MatchColorsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2.6 17A1.4 1.4 0 0 1 4 15.6h5a1.4 1.4 0 0 1 1.4 1.4v3A1.4 1.4 0 0 1 9 21.4H4A1.4 1.4 0 0 1 2.6 20v-3Z' fill={_color} stroke={_color} strokeWidth='1.2' />
      <path d='M13.6 17a1.4 1.4 0 0 1 1.4-1.4h5a1.4 1.4 0 0 1 1.4 1.4v3a1.4 1.4 0 0 1-1.4 1.4h-5a1.4 1.4 0 0 1-1.4-1.4v-3Z' stroke={_color} strokeWidth='1.2' />
      <path d='M11.603 7.066C12.693 5.526 15.466 2 18 2c0 2.652-3.369 5.554-4.84 6.695M6.5 13h3.943a2.86 2.86 0 0 0 1.642-.521c.485-.34.864-.823 1.087-1.388a3.227 3.227 0 0 0 .169-1.786 3.14 3.14 0 0 0-.809-1.583 2.916 2.916 0 0 0-1.512-.846 2.832 2.832 0 0 0-1.707.176A2.99 2.99 0 0 0 7.987 8.19C7.662 8.7 7.5 9.888 7.5 10.5c0 2.14-1 2.5-1 2.5Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const GroupingIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fillRule='evenodd' clipRule='evenodd' d='M14 5.352a4.65 4.65 0 0 0-4.624 5.15h1.31a3.35 3.35 0 1 1 2.813 2.813v1.31a4.65 4.65 0 1 0 .5-9.273Z' fill={_color} />
      <rect x='2' y='2' width='20' height='20' rx='1' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeDasharray='2 3' />
      <path d='M6.5 10.7c0-.11.09-.2.2-.2h6.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2H6.7a.2.2 0 0 1-.2-.2v-6.6Z' stroke={_color} strokeWidth='1.3' />
    </svg>
  );
};

export const RemoveFloorIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 7h6' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path fillRule='evenodd' clipRule='evenodd' d='M3.032 11.612.61 13.011l-.233.134v2.243c0 .31.214.606.592.825l10.473 6.046.563.325.563-.325 10.473-6.046c.379-.219.592-.516.592-.825v-2.243l-.233-.134-3.385-1.955-4.062-2.345-2.52-1.454a2.666 2.666 0 0 0-.97-.312 6.22 6.22 0 0 1-.18.949.453.453 0 0 1 .025.013l1.956 1.13-2.145 1.237-2.145 1.239-.185-.107c-.361.25-.75.46-1.161.63l.22.127L6.703 13.4l-2.145 1.24-2.26-1.305 1.988-1.147a6.22 6.22 0 0 1-1.254-.576ZM1.97 15.388v-.943l2.025 1.17 4.062 2.345 3.152 1.82v1.045l-9.114-5.262c-.08-.047-.125-.11-.125-.175Zm8.905 1.595-1.13.652 2.26 1.304 4.29-2.477-2.26-1.304-2.144 1.239-1.016.586Zm4.287-2.475 2.259 1.304 4.29-2.476-2.26-1.305-2.144 1.239-2.145 1.238Zm6.879.88v-.943l-4.057 2.342L12.8 19.78v1.045l9.114-5.262c.08-.047.126-.11.126-.175Zm-5.297-3.093 1.582-.914-2.936-1.695-1.582.914 2.936 1.695Zm-1.126.65-2.936-1.696-2.145 1.239-2.145 1.238 2.936 1.695 2.145-1.238 2.145-1.238Zm-5.416 3.127-2.936-1.696-1.582.914 2.936 1.695 1.13-.652.452-.261Z' fill={_color} />
    </svg>
  );
};

export const Rotate2Icon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11.614 20.457c1.422 1.24 3.634 1.596 5.677.741 2.584-1.08 3.98-3.712 3.296-6.05m-7.394 4.65-1.694.708c-.165.069-.25.244-.188.39l.628 1.502' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12.323 3.441c-1.421-1.239-3.634-1.595-5.677-.74-2.584 1.08-3.98 3.712-3.296 6.05m7.394-4.65 1.695-.708c.165-.07.249-.244.188-.39L11.999 1.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m6.638 18.298-2.943-5.096a1 1 0 0 1 .366-1.366l12.201-7.044a1 1 0 0 1 1.366.366l2.943 5.096a1 1 0 0 1-.366 1.366L8.004 18.664a1 1 0 0 1-1.366-.366Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const EyeOutlinedIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_3715_53850)'>
        <rect x='1' y='1' width='24' height='24' rx='6' fill='#fff' />
        <path d='M21.948 12.757c-.026-.06-.661-1.468-2.073-2.88C17.992 7.993 15.616 7 13 7c-2.616 0-4.993.995-6.875 2.876-1.412 1.413-2.05 2.824-2.073 2.881a.6.6 0 0 0 0 .488c.026.059.661 1.467 2.073 2.88C8.007 18.005 10.384 19 13 19c2.616 0 4.993-.994 6.875-2.875 1.412-1.413 2.047-2.821 2.073-2.88a.6.6 0 0 0 0-.488ZM13 17.8c-2.309 0-4.325-.84-5.995-2.494A10.013 10.013 0 0 1 5.275 13a9.999 9.999 0 0 1 1.73-2.306C8.675 9.039 10.691 8.2 13 8.2s4.325.84 5.995 2.494A9.998 9.998 0 0 1 20.729 13c-.541 1.01-2.897 4.8-7.729 4.8Z' fill={_color} />
        <path d='M15.35 13a2.35 2.35 0 1 1-4.7 0 2.35 2.35 0 0 1 4.7 0Z' fill={_color} stroke={_color} strokeWidth='1.3' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <rect x='1' y='1' width='24' height='24' rx='6' stroke='#e1e1e1' />
      <defs>
        <clipPath id='clip0_3715_53850'>
          <rect x='1' y='1' width='24' height='24' rx='6' fill='#fff' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PenAndWrenchCrossedIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || lighten(theme.palette.primary.main, 0.5);

  return (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2791_40499)'>
        <path d='m26.75 18.833-2.6-2.599 6.992-6.992 9.784 9.782-6.994 6.992-5.077-5.075 3.62-3.62c.58-.58.58-1.526 0-2.108a1.493 1.493 0 0 0-2.105 0l-3.62 3.62ZM11.806 37.985a1.49 1.49 0 0 1-2.105 0 1.493 1.493 0 0 1 0-2.105l8.738-8.736-2.599-2.6L4.702 35.683.78 49.387l13.705-3.923 11.138-11.14-5.077-5.075-8.739 8.736ZM50 9.895 40.246.14 33.78 6.606l9.754 9.759L50 9.895ZM37.948 29.22c-.805.002-1.586.096-2.336.266L20.037 14c.409-1.115.627-2.321.625-3.579C20.646 4.721 16.006.11 10.303.126c-.073 0-.149 0-.223.002l.775 2.853a5.99 5.99 0 0 1 3.378 5.382 6 6 0 0 1-5.977 6.01A5.997 5.997 0 0 1 2.33 9.38L.432 7.491A10.282 10.282 0 0 0 0 10.481c.018 5.7 4.656 10.315 10.36 10.297a10.337 10.337 0 0 0 2.816-.398l15.266 15.18c-.517 1.235-.8 2.59-.8 4.013.023 5.698 4.659 10.313 10.365 10.295h.221l-.772-2.855a6.003 6.003 0 0 1-3.386-5.378 5.994 5.994 0 0 1 5.98-6.008c2.972-.011 5.445 2.151 5.926 4.99l1.898 1.885c.287-.947.434-1.952.432-2.99-.016-5.696-4.656-10.309-10.358-10.293Z' fill={_color} />
      </g>
      <defs>
        <clipPath id='clip0_2791_40499'>
          <path fill='#fff' d='M0 0h50v50H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const UnlockIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || lighten(theme.palette.primary.main, 0.5);

  return (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2791_40895)'>
        <path d='M34 6.833C32.627 4.293 29.957 2 25.133 2 17.027 2 15 8.477 15 11.714V19' stroke={_color} strokeWidth='5' strokeLinecap='round' strokeLinejoin='round' />
        <path fillRule='evenodd' clipRule='evenodd' d='M2 24.615C2 20.41 5.432 17 9.667 17h30.666C44.567 17 48 20.41 48 24.615v17.77C48 46.59 44.567 50 40.333 50H9.667C5.432 50 2 46.59 2 42.385v-17.77Zm25.556 5.077c0-1.954-2.13-3.175-3.834-2.198a2.535 2.535 0 0 0-1.278 2.198v7.616c0 1.954 2.13 3.175 3.834 2.198a2.535 2.535 0 0 0 1.278-2.198v-7.616Z' fill={_color} />
      </g>
      <defs>
        <clipPath id='clip0_2791_40895'>
          <path fill='#fff' d='M0 0h50v50H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ResetIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20.25 8.4A9.025 9.025 0 0 0 11.977 3C7.299 3 3.453 6.552 3 11.1m13.489-2.7h3.97A.54.54 0 0 0 21 7.86V3.9M3.75 15.6a9.025 9.025 0 0 0 8.272 5.4c4.679 0 8.525-3.552 8.978-8.1M7.511 15.6h-3.97a.54.54 0 0 0-.541.54v3.96' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const PersonWalkingIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6.244 12.252s4.331-4.442 6.806-2.094c1.385 1.309 2.475 3.363 5.57 3.363m-5.995-3.698L8.1 20.5m6.188-.004v-4.442L11 13.651m5.143-7.747c0 1.051-.83 1.903-1.856 1.903-1.025 0-1.856-.852-1.856-1.903 0-1.052.83-1.904 1.856-1.904 1.025 0 1.856.852 1.856 1.904Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const MirroringIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.5 20H2L9.5 4v16Zm10.625 0H22l-.938-2m-4.687 2H14.5v-2m0-6v2m3.75-2 .938 2m-2.813-6L14.5 4v4' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const QuestionMarkCircledIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9 9c0-3.5 5.5-3.5 5.5 0 0 2.5-2.5 2-2.5 5m0 4.011.01-.011' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ScaleUpIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.1111 13.422V19.9998H4.53333C4.23878 19.9998 4 19.761 4 19.4664V12.8887H10.5778C10.8724 12.8887 11.1111 13.1274 11.1111 13.422Z'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M11.1111 20H13.7778' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4 12.8888V10.2222' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M6.66667 4H4.53333C4.23878 4 4 4.23878 4 4.53333V6.66667'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M13.7777 4H10.2222' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M20 10.2222V13.7777' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M17.3334 4H19.4667C19.7613 4 20 4.23878 20 4.53333V6.66667'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.3334 20.0002H19.4667C19.7613 20.0002 20 19.7614 20 19.4668V17.3335'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.1111 10.2222H13.7778V12.8888'
        stroke={_color}
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const BidirectionalHorizontalArrowIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5 9c-.607.59-3 2.16-3 3 0 .84 2.393 2.41 3 3m14-6c.607.59 3 2.16 3 3 0 .84-2.393 2.41-3 3M2.423 11.98h19.445' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const BidirectionalVerticalArrowIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9 5c.59-.607 2.16-3 3-3 .84 0 2.41 2.393 3 3M9 19c.59.607 2.16 3 3 3 .84 0 2.41-2.393 3-3M12 2.231V21.77' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ArrowClockwiseIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20.01 2v3.132a.314.314 0 0 1-.556.201A9.98 9.98 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const TwoArrowsClockwiseIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8.731 18.685c1.682 1.466 4.298 1.887 6.715.877 3.056-1.278 4.706-4.392 3.898-7.156m-8.746 5.499-2.003.838c-.196.081-.295.288-.223.461l.743 1.777m6.271-15.814c-1.734-1.511-4.433-1.946-6.926-.904-3.153 1.319-4.855 4.53-4.021 7.382m9.021-5.672 2.067-.865c.202-.084.304-.297.23-.476L14.99 2.8' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const DownloadIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 14.5v-10m0 10c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.008-1.994 2.5-2.5m5.5 4.5c0 2.482-.518 3-3 3H7c-2.482 0-3-.518-3-3' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const StarsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 12c4.5 0 9-4.5 9-9 0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9Zm-1 7.5c.833 0 2.5-1.667 2.5-2.5 0 .833 1.667 2.5 2.5 2.5-.833 0-2.5 1.667-2.5 2.5 0-.833-1.667-2.5-2.5-2.5ZM16 5c1 0 3-2 3-3 0 1 2 3 3 3-1 0-3 2-3 3 0-1-2-3-3-3Z' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const FavouriteFilledIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074-.576.433-.864.65-1.034.65-.17 0-.458-.217-1.034-.65C9.56 3.012 7.219 2.35 4.537 3.994c-3.519 2.16-4.315 9.28 3.803 15.29C9.886 20.427 10.659 21 12 21c1.341 0 2.114-.572 3.66-1.717 8.118-6.008 7.322-13.13 3.803-15.289Z' fill={_color} />
    </svg>
  );
};

export const ReplaceModelIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4 15.6h6a1.4 1.4 0 0 1 1.4 1.4v3a1.4 1.4 0 0 1-1.4 1.4H4A1.4 1.4 0 0 1 2.6 20v-3A1.4 1.4 0 0 1 4 15.6Zm10-13h6A1.4 1.4 0 0 1 21.4 4v3A1.4 1.4 0 0 1 20 8.4h-6A1.4 1.4 0 0 1 12.6 7V4A1.4 1.4 0 0 1 14 2.6Z' stroke={_color} strokeWidth='1.2' />
      <path d='M14.5 18.5h2a2 2 0 0 0 2-2v-5m0 0-2 1.5m2-1.5 2 1.5m-11-7.5h-2a2 2 0 0 0-2 2v5m0 0 2-1.5m-2 1.5-2-1.5' stroke={_color} strokeWidth='1.2' strokeLinecap='round' />
    </svg>
  );
};

export const TapeMeasureIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.5 17.76v-3.64m9.5 3.64H7.63A6.63 6.63 0 0 1 1 11.13v-.38A6.25 6.25 0 0 1 7.25 4.5v0a6.25 6.25 0 0 1 6.25 6.25v3.37m9.5 3.64v1.74m0-1.74v-2.14a1.5 1.5 0 0 0-1.5-1.5h-8m4.69 3.64v-.869m-2.261.87v-1.74m4.571 1.74v-1.74M4.78 11.51v-.487a2.61 2.61 0 0 1 2.61-2.61v0a2.61 2.61 0 0 1 2.61 2.61v.487a2.61 2.61 0 0 1-2.61 2.61v0a2.61 2.61 0 0 1-2.61-2.61Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const RotateArrowCircleIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.5 17C5.689 16.563 2 14.058 2 11.034 2 7.7 6.477 5 12 5s10 2.701 10 6.034c0 2.474-2.468 4.6-6 5.531' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m8.499 13 2.2 3.81a.6.6 0 0 1-.22.82L6.5 19' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const PlayCircledIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='9' stroke={_color} strokeWidth='1.3' />
      <path
        d='M9.748 8.427A.5.5 0 0 0 9 8.862v6.276a.5.5 0 0 0 .748.434l5.492-3.138a.5.5 0 0 0 0-.868L9.748 8.427Z'
        fill={_color}
      />
    </svg>
  );
};

export const InfoBookIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.114M6 17h14M6 21h14' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='M6 21a2 2 0 1 1 0-4' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 9.5V13' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
      <path d='m12 7.01.01-.01' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ChainIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M14 11.998C14 9.506 11.683 7 8.857 7H7.143C4.303 7 2 9.238 2 11.998c0 2.378 1.71 4.368 4 4.873a5.3 5.3 0 0 0 1.143.124' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10 11.998c0 2.491 2.317 4.997 5.143 4.997h1.714c2.84 0 5.143-2.237 5.143-4.997 0-2.379-1.71-4.37-4-4.874A5.304 5.304 0 0 0 16.857 7' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ShareIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m22.003 7.616-5.58-5.074c-.424-.422-.931 0-.931.677v2.436a.1.1 0 0 1-.1.101c-3.693.054-8.21 3.075-8.387 8.864-.012.407.514.553.763.23 1.858-2.423 4.547-4.236 7.624-4.274a.1.1 0 0 1 .1.1v2.69c0 .676.507 1.099.93.676l5.58-5.073c.34-.339.34-1.015 0-1.353Z' stroke={_color} strokeWidth='1.3' />
    </svg>
  );
};

export const LandscapeIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m3 16 7-3 11 5m-5-8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const MyAssetsIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.5 11.46c-.908-1.933-.579-4.316.988-5.92a5.066 5.066 0 0 1 7.273 0l.239.243.238-.244A5.082 5.082 0 0 1 16.875 4c1.367 0 2.675.555 3.636 1.54A5.254 5.254 0 0 1 22 9.21a5.255 5.255 0 0 1-1.489 3.673c-2.197 2.249-4.327 4.594-6.606 6.761a1.328 1.328 0 0 1-1.851-.04L10.975 18.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 14.111H5C1 14.111 1 20 5 20m7-5.889L8.5 11m3.5 3.111-3.5 3.111' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const HandTappingIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_11521_174132)' stroke={_color} strokeLinecap='round'>
        <path d='m16 9.803-.243-.42c-.971-1.683 1.24-2.959 2.21-1.276m-4.178 2.971-.728-1.261m0 0c-.972-1.683 1.239-2.959 2.21-1.277a3631.68 3631.68 0 0 1 .728 1.262m-2.938.015-.334-.578c-.971-1.682-3.181-.406-2.21 1.276l1.062 1.84-1.062-1.84-1.7-2.944a1.275 1.275 0 0 0-2.21 1.277l4.705 8.149m.002 0-2.081-.502a1.327 1.327 0 0 0-1.613 1.032 1.324 1.324 0 0 0 .916 1.524l7.071 2.138a1.7 1.7 0 0 0 1.343-.155l3.415-1.971c1.768-1.021 2.097-3.174 1.247-4.646l-3.642-6.31' strokeWidth='1.242' strokeLinejoin='round' />
        <path d='M4 9.623A4 4 0 1 1 10.21 5' strokeWidth='1.2' />
      </g>
      <defs>
        <clipPath id='clip0_11521_174132'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CheckMarkIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='m5 13 4 4L19 7' stroke={_color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const AlertIcon = ({ className }: WithClassName) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='m10.289 3.861-8.47 14.14a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0Z' fill='#fdeaea' stroke='#f02e2e' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M12 9v4m0 4h.01' stroke='#f02e2e' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const KeyboardAndMouseIcon = ({ className, color = '#5e5e5e' }: WithClassName & IconProps) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M22 11.5V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h9.5' stroke={color} strokeWidth='1.3' strokeLinecap='round' />
    <path d='M19 14h-2a1 1 0 0 0-1 1v3.5a3 3 0 1 0 6 0V15a1 1 0 0 0-1-1h-2Zm0 0v2.182M15 13H9M4.5 8.5h1m3.5 0h1m4 0h1m3.5 0h1M4.5 13h1' stroke={color} strokeWidth='1.3' strokeLinecap='round' />
  </svg>
);

export const HouseWithChimneyIcon = ({ className, color = '#5e5e5e' }: WithClassName & IconProps) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='m10.66 3.211-8.13 7.345a1 1 0 0 0-.077 1.407l.56.63a1 1 0 0 0 1.435.06l6.864-6.502a1 1 0 0 1 1.376 0l6.826 6.468a1 1 0 0 0 1.466-.098l.532-.658a1 1 0 0 0-.108-1.37L13.34 3.21a2 2 0 0 0-2.682 0ZM5.5 7.5V3.8a.3.3 0 0 1 .3-.3h1.9a.3.3 0 0 1 .3.3v1.7' stroke={color} strokeWidth='1.3' strokeLinecap='round' />
    <path d='M5.5 12v8.2a.3.3 0 0 0 .3.3h3.4a.3.3 0 0 0 .3-.3v-5.4a.3.3 0 0 1 .3-.3h4.4a.3.3 0 0 1 .3.3v5.4a.3.3 0 0 0 .3.3h3.4a.3.3 0 0 0 .3-.3V12' stroke={color} strokeWidth='1.3' strokeLinecap='round' />
  </svg>
);

export const CameraIcon = ({ className, color = '#5e5e5e' }: WithClassName & IconProps) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M15 12v4.4a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V7.6a.6.6 0 0 1 .6-.6h10.8a.6.6 0 0 1 .6.6V12Zm0 0 5.016-4.18a.6.6 0 0 1 .984.461v7.438a.6.6 0 0 1-.984.46L15 12Z' stroke={color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const CircumscribedPencilIcon = ({ className, color = '#5e5e5e' }: WithClassName & IconProps) => (
  <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z' stroke={color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M8 21.168V14l4-7 4 7v7.168' stroke={color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M8 14s1.127 1 2 1 2-1 2-1 1.127 1 2 1 2-1 2-1' stroke={color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const DollhouseIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='m21.906 2.613-9.812 1.87a.5.5 0 0 1-.188 0l-9.812-1.87a.5.5 0 0 0-.594.491V15.21a.5.5 0 0 0 .252.434l9.9 5.658a.7.7 0 0 0 .695 0l9.901-5.658a.5.5 0 0 0 .252-.434V3.104a.5.5 0 0 0-.594-.49Z' stroke={_color} strokeWidth='1.3' />
      <path d='M12 4.5V13m0 0L1.5 15.5M12 13l10.5 2.5m-17-1V6.346a.3.3 0 0 1 .342-.297l2.9.414A.3.3 0 0 1 9 6.76v6.74M17.25 7l-2.48.244a.3.3 0 0 0-.27.299v2.452a.3.3 0 0 0 .275.299l2.475.206m0-3.5 2.42-.238a.3.3 0 0 1 .33.298v3.343a.3.3 0 0 1-.325.3L17.25 10.5m0-3.5v3.5' stroke={_color} strokeWidth='.6' />
    </svg>
  );
};

export const GableDormerIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 11.0616L8.88439 20.9982M1 11.0616L7.28963 13.5836C7.64316 13.7253 8.04653 13.6539 8.32993 13.3994L8.88439 12.9016M1 11.0616C1 11.0616 6.78598 5.88154 8.44543 4.39287C8.71859 4.14783 9.10145 4.06989 9.44988 4.18499L16.1329 6.39256M8.88439 20.9982H20.9827C21.5349 20.9982 21.9827 20.5505 21.9827 19.9982V11.8996M8.88439 20.9982V12.9016M21.9827 11.8996L16.1329 6.39256M21.9827 11.8996L23 12.8574M16.1329 6.39256L8.88439 12.9016M12.3179 15.3714V17.8433C12.3179 18.3956 12.7656 18.8433 13.3179 18.8433H15.6879M12.3179 15.3714V12.8996C12.3179 12.3473 12.7656 11.8996 13.3179 11.8996H15.6879M12.3179 15.3714H15.6879M19.0578 15.3714V12.8996C19.0578 12.3473 18.6101 11.8996 18.0578 11.8996H15.6879M19.0578 15.3714V17.8433C19.0578 18.3956 18.6101 18.8433 18.0578 18.8433H15.6879M19.0578 15.3714H15.6879M15.6879 15.3714V11.8996M15.6879 15.3714V18.8433' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const HipDormerIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9.41418 20.9978L0.708304 10.4346C0.623014 10.3311 0.631389 10.1816 0.731307 10.0922C1.67775 9.24495 6.18217 5.21258 7.66416 3.88311C7.93731 3.63806 8.32017 3.56013 8.66861 3.67523L16.2971 6.39215M9.41418 20.9978H21.1468C21.6991 20.9978 22.1468 20.5501 22.1468 19.9978V13.399M9.41418 20.9978V13.399M16.2971 6.39215L9.04855 12.9011L8.49409 13.399M16.2971 6.39215L23.2108 12.9679C23.3744 13.1235 23.2643 13.399 23.0386 13.399H8.49409M12.4821 15.871V17.8429C12.4821 18.3951 12.9298 18.8429 13.4821 18.8429H15.852M12.4821 15.871V13.399M12.4821 15.871H15.852M19.222 15.871V17.8429C19.222 18.3951 18.7742 18.8429 18.222 18.8429H15.852M19.222 15.871H15.852M19.222 15.871V13.399M15.852 15.871V18.8429M15.852 15.871V13.399M8.49409 13.399L0.914185 10.3916' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const ShedDormerIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='19' viewBox='0 0 24 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M8.64123 17.8986L0.675029 1.00703C0.596824 0.841201 0.7178 0.650391 0.901144 0.650391H12.1759C12.2732 0.650391 12.3685 0.67882 12.4499 0.732189L22.5865 7.37493C22.7111 7.45661 22.6533 7.65039 22.5043 7.65039H8.20356C8.07713 7.65039 7.95539 7.60249 7.86285 7.51634L0.756836 0.900391M8.64123 17.8986H20.7395C21.2918 17.8986 21.7395 17.4509 21.7395 16.8986L21.7568 7.65039M8.64123 17.8986V7.65039M12.0748 12.5331V14.7437C12.0748 15.2959 12.5225 15.7437 13.0748 15.7437H15.4447M12.0748 12.5331V10.5995C12.0748 10.0472 12.5225 9.59948 13.0748 9.59948H15.4447M12.0748 12.5331H15.4447M18.8146 12.5331V10.5995C18.8146 10.0472 18.3669 9.59948 17.8146 9.59948H15.4447M18.8146 12.5331V14.7437C18.8146 15.2959 18.3669 15.7437 17.8146 15.7437H15.4447M18.8146 12.5331H15.4447M15.4447 12.5331V9.59948M15.4447 12.5331V15.7437' stroke={_color} strokeWidth='1.3' strokeLinecap='round' />
    </svg>
  );
};

export const Rotate90Icon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M17.556 17.244C20.238 16.436 22 15.06 22 13.5c0-1.014-.744-1.95-2-2.701m-8 7.2c-5.522 0-10-2.013-10-4.5 0-1.013.744-1.948 2-2.7' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9.5 15.5 12 18l-2.5 2.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8.33 11.018h.07c.318 0 .583-.056.795-.168.215-.116.386-.275.513-.477a2.13 2.13 0 0 0 .273-.716c.055-.274.083-.572.083-.893V7.591c0-.278-.022-.521-.066-.73a1.79 1.79 0 0 0-.18-.528.903.903 0 0 0-.266-.323.549.549 0 0 0-.665.01.901.901 0 0 0-.252.313c-.067.13-.12.285-.156.463a2.883 2.883 0 0 0-.052.56c0 .188.016.369.048.543.035.172.086.324.153.458s.15.24.252.318a.57.57 0 0 0 .357.117c.13 0 .248-.032.356-.098a.998.998 0 0 0 .284-.276 1.57 1.57 0 0 0 .267-.828l.318.131c0 .237-.037.471-.11.702a2.374 2.374 0 0 1-.302.626 1.608 1.608 0 0 1-.446.45.973.973 0 0 1-.55.168c-.24 0-.453-.061-.638-.183a1.518 1.518 0 0 1-.456-.505 2.6 2.6 0 0 1-.27-.73 4.04 4.04 0 0 1 .02-1.785 2.59 2.59 0 0 1 .322-.758c.141-.221.312-.393.513-.514a1.29 1.29 0 0 1 .688-.187c.273 0 .512.071.717.215.205.143.378.341.52.594.14.252.246.545.318.879.071.333.107.692.107 1.075v.398c0 .402-.027.79-.08 1.164-.053.371-.14.715-.26 1.033a2.964 2.964 0 0 1-.467.833 2.021 2.021 0 0 1-.706.556 2.26 2.26 0 0 1-.976.197H8.33v-.931Zm6.642-3.086v1.113c0 .533-.039.988-.117 1.365-.076.374-.187.678-.333.912-.145.234-.32.405-.522.514-.201.11-.426.164-.675.164-.199 0-.383-.034-.554-.103a1.283 1.283 0 0 1-.457-.322 1.91 1.91 0 0 1-.35-.566 3.945 3.945 0 0 1-.221-.837 7.36 7.36 0 0 1-.076-1.127V7.932c0-.536.039-.988.117-1.356.079-.371.19-.672.336-.903.146-.233.319-.403.52-.51.202-.105.429-.158.678-.158.2 0 .385.034.554.103.17.065.323.17.457.313.136.143.251.33.346.561.097.228.17.503.221.828.051.32.076.695.076 1.122Zm-.834 1.272v-1.44c0-.272-.011-.51-.034-.716A2.726 2.726 0 0 0 14 6.52a1.15 1.15 0 0 0-.166-.356.602.602 0 0 0-.516-.266.604.604 0 0 0-.346.103.741.741 0 0 0-.256.318c-.07.146-.123.34-.16.58a6.112 6.112 0 0 0-.052.865v1.44c0 .274.012.516.035.725.023.208.058.388.104.537.046.147.101.268.166.365a.645.645 0 0 0 .229.206.635.635 0 0 0 .287.065.61.61 0 0 0 .35-.103.773.773 0 0 0 .255-.327c.07-.153.122-.35.156-.594a6.32 6.32 0 0 0 .052-.874Zm1.644-2.951c0-.227.042-.436.125-.626.083-.19.194-.342.332-.454a.685.685 0 0 1 .91 0c.137.112.245.263.326.454.083.19.125.399.125.626 0 .228-.042.437-.125.627a1.13 1.13 0 0 1-.325.444.708.708 0 0 1-.454.164.73.73 0 0 1-.457-.164 1.142 1.142 0 0 1-.332-.444 1.548 1.548 0 0 1-.125-.627Zm.468 0c0 .169.044.31.131.426a.39.39 0 0 0 .315.168.371.371 0 0 0 .308-.168.696.696 0 0 0 .125-.426.725.725 0 0 0-.125-.435c-.083-.115-.186-.173-.308-.173s-.227.058-.315.173a.698.698 0 0 0-.131.435Z' fill={_color} />
    </svg>
  );
};

export const Rotate45Icon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.primary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M17.556 17.244C20.238 16.436 22 15.06 22 13.5c0-1.014-.744-1.95-2-2.701m-8 7.2c-5.522 0-10-2.013-10-4.5 0-1.013.744-1.948 2-2.7' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9.5 15.5 12 18l-2.5 2.5' stroke={_color} strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M11.615 9.48v.897H8.027L8 9.7l2.146-4.6h.659l-.714 1.673L8.858 9.48h2.757Zm-.622-4.382v6.808h-.824V5.098h.824Zm2.036 3.642-.656-.219.27-3.423h2.682v.954h-1.999l-.136 1.67c.077-.063.184-.124.32-.183.137-.062.293-.093.469-.093.234 0 .444.053.628.159.187.102.346.254.475.453.13.197.23.437.298.72.068.28.102.597.102.95 0 .314-.034.609-.102.883a2.343 2.343 0 0 1-.301.725 1.483 1.483 0 0 1-.51.491 1.434 1.434 0 0 1-.72.173c-.207 0-.407-.04-.598-.122a1.551 1.551 0 0 1-.509-.369 1.884 1.884 0 0 1-.362-.608 2.714 2.714 0 0 1-.157-.837h.806c.02.222.065.41.133.566.07.153.164.27.28.35a.684.684 0 0 0 .404.122.64.64 0 0 0 .358-.098.79.79 0 0 0 .25-.29 1.55 1.55 0 0 0 .15-.449 2.925 2.925 0 0 0-.007-1.117 1.374 1.374 0 0 0-.167-.43.785.785 0 0 0-.277-.281.722.722 0 0 0-.386-.103c-.196 0-.346.039-.451.117a1.547 1.547 0 0 0-.287.29Zm3.177-2.487c0-.227.041-.436.123-.626.082-.19.192-.342.328-.454A.693.693 0 0 1 17.108 5c.164 0 .314.058.448.173.134.112.241.263.321.454.082.19.123.399.123.626 0 .228-.041.437-.123.627-.08.187-.187.335-.321.444a.693.693 0 0 1-.448.164.716.716 0 0 1-.45-.164 1.142 1.142 0 0 1-.329-.444 1.567 1.567 0 0 1-.123-.627Zm.462 0c0 .169.043.31.13.426.086.112.19.168.31.168.121 0 .222-.056.304-.168a.702.702 0 0 0 .123-.426.732.732 0 0 0-.123-.435c-.082-.115-.183-.173-.304-.173-.12 0-.224.058-.31.173a.705.705 0 0 0-.13.435Z' fill={_color} />
    </svg>
  );
};

export const MastercardIcon = ({ className }: WithClassName) => (
  <svg className={className} version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 152.4 108' enableBackground='new 0 0 152.4 108' xmlSpace='preserve'>
    <path fill='none' d='M0 0h152.4v108H0z' />
    <path fill='#ff5f00' d='M60.4 25.7h31.5v56.6H60.4z' />
    <path d='M62.4 54c0-11 5.1-21.5 13.7-28.3-15.6-12.3-38.3-9.6-50.6 6.1C13.3 47.4 16 70 31.7 82.3c13.1 10.3 31.4 10.3 44.5 0C67.5 75.5 62.4 65 62.4 54z' fill='#eb001b' />
    <path d='M134.4 54c0 19.9-16.1 36-36 36-8.1 0-15.9-2.7-22.2-7.7 15.6-12.3 18.3-34.9 6-50.6-1.8-2.2-3.8-4.3-6-6 15.6-12.3 38.3-9.6 50.5 6.1 5 6.3 7.7 14.1 7.7 22.2z' fill='#f79e1b' />
  </svg>
);

export const VisaIcon = ({ className }: WithClassName) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 324.68'>
    <path fill='#1434cb' d='M651.19.5c-70.93 0-134.32 36.77-134.32 104.69 0 77.9 112.42 83.28 112.42 122.42 0 16.48-18.88 31.23-51.14 31.23-45.77 0-79.98-20.61-79.98-20.61l-14.64 68.55s39.41 17.41 91.73 17.41c77.55 0 138.58-38.57 138.58-107.66 0-82.32-112.89-87.54-112.89-123.86 0-12.91 15.5-27.05 47.66-27.05 36.29 0 65.89 14.99 65.89 14.99l14.33-66.2S696.61.5 651.18.5ZM2.22 5.5.5 15.49s29.84 5.46 56.72 16.36c34.61 12.49 37.07 19.77 42.9 42.35l63.51 244.83h85.14L379.93 5.5h-84.94l-84.28 213.17-34.39-180.7c-3.15-20.68-19.13-32.48-38.68-32.48H2.23Zm411.87 0-66.63 313.53h81L494.85 5.5h-80.76Zm451.76 0c-19.53 0-29.88 10.46-37.47 28.73l-118.67 284.8h84.94l16.43-47.47h103.48l9.99 47.47h74.95L934.12 5.5h-68.27Zm11.05 84.71 25.18 117.65h-67.45l42.28-117.65Z' />
  </svg>
);

export const CreditCardIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.common.black;

  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke={_color} xmlns='http://www.w3.org/2000/svg'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z' />
    </svg>
  );
};

export const ChevronLeftIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15 18l-6-6 6-6' stroke={_color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const ChevronRightIcon = ({ className, color }: WithClassName & IconProps) => {
  const theme = useTheme();
  const _color = color || theme.palette.secondary.main;

  return (
    <svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9 18l6-6-6-6' stroke={_color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};
