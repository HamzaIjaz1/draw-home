import { tuple } from '@arthurka/ts-utils';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

export type SelectionOutlineProps = {
  w: number;
  h: number;
  d: number;
  isSelected: boolean;
  isSnapping: boolean;
  position: Vector3;
  isCurrentItemSettingsOpened: boolean;
};

export const SelectionOutline: React.FC<SelectionOutlineProps> = ({ w, h, d, isSelected, position, isSnapping, isCurrentItemSettingsOpened }) => {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;

  const vertices = tuple(
    tuple(hw, hh, hd),
    tuple(-hw, hh, hd),
    tuple(-hw, hh, -hd),
    tuple(hw, hh, -hd),
    tuple(hw, -hh, hd),
    tuple(-hw, -hh, hd),
    tuple(-hw, -hh, -hd),
    tuple(hw, -hh, -hd),
  );

  return (
    <group position={position}>
      <Line
        points={[
          vertices[0], vertices[1], vertices[2], vertices[3], vertices[0],
          vertices[4], vertices[7], vertices[3], vertices[2], vertices[6], vertices[7],
          vertices[4], vertices[5], vertices[6], vertices[5], vertices[1],
          vertices[5], vertices[4],
        ]}
        color={
          isSnapping === true
            ? 'green'
            : isSelected === true
              ? '#fd5631'
              : '#ffc1b3'
        }
        lineWidth={1.25}
      />
      {
        isSelected === true && (
          <mesh>
            <boxGeometry args={[w, h, d]} />
            <meshBasicMaterial
              color='#ffc1b3'
              transparent
              opacity={isCurrentItemSettingsOpened === true ? 0 : 0.5}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>
        )
      }
    </group>
  );
};
