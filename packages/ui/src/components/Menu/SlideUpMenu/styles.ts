import { css, keyframes, styled } from '@mui/material';
import { isUndefined } from '@arthurka/ts-utils';
import { MenuFrame as BaseMenuFrame } from '../../MenuFrame';
import { MenuHeader as BaseMenuHeader } from '../../MenuHeader';
import { menuContainerWidth, scrollbarWidth } from '../../../utils/styles';
import { headerSpacing } from '../base/styles';
import { $Props, $props } from '../../../utils/$props';

// Without 'visibility: hidden', interactable elements such as buttons
// would remain focusable even when offscreen
const hideKeyframes = keyframes`
  0% {
    visibility: visible;
  }
  100% {
    visibility: hidden;
  }
`;

export const animationDuration = 0.2;

export const MenuFrame = styled(BaseMenuFrame, $props())<$Props<{
  $opened: boolean;
  $noHeightLimit: boolean;
}>>(({ theme, $opened, $noHeightLimit }) => css`
  display: flex;
  flex-direction: column;

  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, ${$opened ? 0 : 'calc(100% + 5px)'});
  transition: transform ${animationDuration}s;

  ${$opened === false && css`
    animation: ${hideKeyframes} ${animationDuration}s forwards;
  `}

  width: 100%;
  max-width: ${menuContainerWidth}px;
  max-height: ${$noHeightLimit === true ? '100svh' : '60svh'};

  ${theme.breakpoints.up('md')} {
    max-width: ${menuContainerWidth + scrollbarWidth}px;
  }
`);

export const MenuHeader = styled(BaseMenuHeader, $props())<$Props<{
  $bottomSpacing: keyof typeof headerSpacing | undefined;
}>>(({ $bottomSpacing }) => css`
  ${!isUndefined($bottomSpacing) && css`
    margin-bottom: ${headerSpacing[$bottomSpacing]};
  `}
`);
