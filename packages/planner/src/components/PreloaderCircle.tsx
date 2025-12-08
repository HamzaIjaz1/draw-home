import { isNull } from '@arthurka/ts-utils';
import { useFrame } from '@react-three/fiber';
import Color from 'color';
import { useRef } from 'react';
import { DoubleSide, Group, Vector3 } from 'three';

export const PreloaderCircle = ({ placementAreaPosition, elevation }: { placementAreaPosition: Vector3 | null; elevation: number }) => {
  const loaderGroupRef = useRef<Group>(null);
  const radius = 0.4;
  const numCircles = 8;
  const circleRadius = 0.05;

  useFrame((e, delta) => {
    if(!isNull(loaderGroupRef.current)) {
      loaderGroupRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group
      ref={loaderGroupRef}
      position={isNull(placementAreaPosition) ? new Vector3(0, elevation + 0.1, 0) : placementAreaPosition}
    >
      {
        Array.from({ length: numCircles }, (e, i) => {
          const angle = (i / numCircles) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const lightenedColor = Color('#fd5631').lighten(i * 0.1).string();

          return (
            <mesh key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[circleRadius, 16]} />
              <meshStandardMaterial
                color={lightenedColor}
                side={DoubleSide}
              />
            </mesh>
          );
        })
      }
    </group>
  );
};
