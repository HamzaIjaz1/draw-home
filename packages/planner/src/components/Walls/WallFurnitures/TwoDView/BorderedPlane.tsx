import { WallFurnitureId } from '@draw-house/common/dist/brands';
import { Plane } from '@react-three/drei';
import { Euler, Side, Vector3 } from 'three';

type BorderedPlaneProps = {
  width: number;
  height: number;
  color: string;
  lineColor: string;
  position: Vector3;
  side?: Side;
  rotation?: Euler;
  outlineWidth: number;
  furnitureId: WallFurnitureId;
  opacity: number;
};

export const BorderedPlane: React.FC<BorderedPlaneProps> = ({
  width,
  height,
  color,
  lineColor,
  position,
  side,
  rotation,
  outlineWidth,
  furnitureId,
  opacity,
}) => (
  <group position={position} rotation={rotation} userData={{ furnitureId }}>
    <Plane args={[width, height]}>
      <meshStandardMaterial
        color={color}
        side={side}
        toneMapped={false}
        transparent
        opacity={opacity}
      />
    </Plane>
    <Plane args={[width, 0.12]}>
      <meshStandardMaterial
        color={lineColor}
        side={side}
        toneMapped={false}
        transparent
        opacity={opacity}
      />
    </Plane>
    <Plane args={[outlineWidth, height]} position={[width / 2 + outlineWidth / 2, 0, 0]}>
      <meshStandardMaterial
        color={lineColor}
        side={side}
        toneMapped={false}
        transparent
        opacity={opacity}
      />
    </Plane>
    <Plane args={[outlineWidth, height]} position={[-width / 2 - outlineWidth / 2, 0, 0]}>
      <meshStandardMaterial
        color={lineColor}
        side={side}
        toneMapped={false}
        transparent
        opacity={opacity}
      />
    </Plane>
  </group>
);
