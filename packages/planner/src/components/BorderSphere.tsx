import { Sphere } from '@react-three/drei';
import { BackSide } from 'three';
import { clickBorderSphere, pointerDownBorderSphere, pointerUpBorderSphere } from '../zustand/useBorderSphere';
import { floorSquareSize } from '../constants';

export const BorderSphere: React.FC = () => (
  <Sphere
    userData={{ isNotPartOfLevelObjects: true }}
    args={[floorSquareSize * 100, 1, 1]}
    onPointerDown={pointerDownBorderSphere}
    onPointerUp={pointerUpBorderSphere}
    onClick={clickBorderSphere}
  >
    <meshStandardMaterial side={BackSide} transparent opacity={0} />
  </Sphere>
);
