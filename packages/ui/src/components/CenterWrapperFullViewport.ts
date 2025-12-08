import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { styled } from '@mui/material';

export const CenterWrapperFullViewport = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterBlurryWrapperFullViewport = styled('div')`
  position: fixed;
  inset: 0;
  z-index: ${specialZIndexTop};
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.15);
  pointer-events: all;
`;
