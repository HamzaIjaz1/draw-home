import { Vector3 } from 'three';


export const movePointAlongDirection = (
  intersection: Vector3,
  thirdLineDir: Vector3,
  recalculatedDir: Vector3,
  offset: number,
): Vector3 => {
  // Calculate the sign based on the dot product and apply the offset in the correct direction
  const offsetVector = thirdLineDir.clone().normalize().multiplyScalar(Math.sign(recalculatedDir.dot(thirdLineDir)) * -offset);

  // Return the intersection with the adjusted offset
  return intersection.clone().add(offsetVector);
};


export const applyOffsetInDirection = (
  intersection: Vector3,
  thirdLineDir: Vector3, // The direction from the third line
  recalculatedDir: Vector3, // The recalculated direction for detecting the sign
  offset: number,
): Vector3 => {
  // Multiply by -1 to reverse the direction of the offset
  const offsetVector = thirdLineDir.clone().normalize().multiplyScalar(-Math.sign(recalculatedDir.dot(thirdLineDir)) * offset);

  // Adjust the intersection based on the calculated offset
  const result = intersection.clone();
  result.add(offsetVector);
  return result;
};

export function findPointAlongDirection(
  directionPoint: Vector3,
  position: Vector3,
  offset: number,
): Vector3 {
  // Step 1: Calculate the direction vector
  const directionVector = new Vector3().subVectors(position, directionPoint);

  // Step 2: Normalize the direction vector
  directionVector.normalize();

  // Step 3: Scale the direction vector by the offset
  directionVector.multiplyScalar(offset);

  // Step 4: Calculate the offset point
  const offsetPoint = new Vector3().addVectors(directionPoint, directionVector);

  return offsetPoint;
}
