import { WallFurnitureId } from '@draw-house/common/dist/brands';
import { LineProps } from '@react-three/drei';
import { useMemo } from 'react';
import { Shape } from 'three';

type DoorTrajectoryProps = {
  radius: number;
  outlineWidth: number;
  position: LineProps['position'];
  isFlippedHorizontal: boolean;
  isMirrored: boolean;
  color: LineProps['color'];
  furnitureId: WallFurnitureId;
  opacity: number;
};

export const DoorTrajectory: React.FC<DoorTrajectoryProps> = ({
  radius,
  outlineWidth,
  position,
  isFlippedHorizontal,
  isMirrored,
  color,
  furnitureId,
  opacity,
}) => {
  const startAngle = 0;
  const endAngle = Math.PI / 2;
  const radius1 = radius - outlineWidth;

  const shape = useMemo(() => {
    const shape = new Shape();
    const segments = 100;

    shape.moveTo(Math.cos(startAngle) * radius, Math.sin(startAngle) * radius);

    for(let i = 0; i <= segments; i++) {
      const angle = startAngle + (i / segments) * (endAngle - startAngle);
      shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    shape.lineTo(0, 0);
    shape.lineTo(radius - radius1, 0);
    shape.lineTo(radius - radius1, radius1);

    for(let i = 0; i <= segments; i++) {
      const angle = endAngle - (i / segments) * (endAngle - startAngle);
      shape.lineTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
    }

    return shape;
  }, [radius, startAngle, endAngle, radius1]);

  return (
    <mesh
      scale={isMirrored === true ? [1, -1, -1] : [1, 1, 1]}
      position={position}
      rotation={[Math.PI / 2, isFlippedHorizontal === true ? Math.PI : 0, 0]}
    >
      <shapeGeometry args={[shape]} userData={{ furnitureId }} />
      <meshBasicMaterial
        color={color}
        side={2}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
};
