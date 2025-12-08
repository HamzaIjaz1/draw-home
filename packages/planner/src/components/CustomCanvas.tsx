import { IS_EASY_GRAPHICS_MODE } from '@draw-house/common/dist/envVariables/public';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { KeyboardControls } from '@react-three/drei';
import { Animations } from './animations';

const StyledCanvas = styled(Canvas)`
  user-select: none;

  height: 100vh !important;
  height: 100dvh !important;
`;

const controlMap: React.ComponentProps<typeof KeyboardControls>['map'] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
];

export const CustomCanvas: React.FCWithChildren = ({ children }) => (
  <Animations.fadeCanvas>
    <KeyboardControls map={controlMap}>
      <StyledCanvas shadows={IS_EASY_GRAPHICS_MODE === false} frameloop='demand'>
        {children}
      </StyledCanvas>
    </KeyboardControls>
  </Animations.fadeCanvas>
);
