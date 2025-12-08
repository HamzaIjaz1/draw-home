import { Vector3 } from 'three';


export const movePointAlongDirection = (
  point: Vector3,
  direction: Vector3,
  directionSign: number,
  offset: number,
): Vector3 => {
  // Normalize the direction and scale it by the directionSign and offset
  const offsetVector = direction.clone().normalize().multiplyScalar(directionSign * offset);

  // Return the new point by adding the offset to the original point
  return point.clone().add(offsetVector);
};
