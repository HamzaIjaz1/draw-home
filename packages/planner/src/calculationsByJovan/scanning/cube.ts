/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-use-before-define */
// import { floorplanData } from './floorplan';
import { floorplanData } from './examples/10_floorplan';

// Fallback points data if needed
export const pointsData: { [key: string]: Array<[number, number, number]> } = {
  cube: [
    [0, 0, 0], [0, 0, 4], [4, 0, 4], [4, 0, 0],
  ],
};

// Get polygon points from the floorplan data
export const getPolygonPoints = (name: keyof typeof pointsData): Array<[number, number]> => {
  // Extract unique points from the line segments
  const uniquePoints = new Set<string>();
  const points: Array<[number, number]> = [];

  // Use only wall segments for polygon points
  getWallLineSegments().forEach(([x1, z1, x2, z2]) => {
    // Add both endpoints if they're not already in the set
    const point1Str = `${x1},${z1}`;
    const point2Str = `${x2},${z2}`;

    if(!uniquePoints.has(point1Str)) {
      uniquePoints.add(point1Str);
      points.push([x1, z1]);
    }

    if(!uniquePoints.has(point2Str)) {
      uniquePoints.add(point2Str);
      points.push([x2, z2]);
    }
  });

  if(points.length > 0) {
    return points;
  }

  // Fallback to the original implementation only if needed
  const fallbackPoints = pointsData[name] || [];
  return fallbackPoints.map(([x, , z]) => [x, z] as [number, number]);
};

// Get line segments for walls only
export const getWallLineSegments = (): Array<[number, number, number, number]> => {
  const wallSegments: Array<[number, number, number, number]> = [];

  // Skip the first two elements (image dimensions and line count)
  for(let i = 2; i < floorplanData.length; i++) {
    const segment = floorplanData[i];

    // Check if this is a wall segment (6 values)
    if(
      segment?.length === 6 &&
      typeof segment[0] === 'number' &&
      typeof segment[1] === 'number' &&
      typeof segment[2] === 'number' &&
      typeof segment[3] === 'number'
    ) {
      // Extract coordinates, convert from decimeters to meters, and round to 2 decimal places
      const x1 = Math.round((segment[0] as number) * 0.1 * 100) / 100;
      const z1 = Math.round((segment[1] as number) * 0.1 * 100) / 100;
      const x2 = Math.round((segment[2] as number) * 0.1 * 100) / 100;
      const z2 = Math.round((segment[3] as number) * 0.1 * 100) / 100;
      wallSegments.push([x1, z1, x2, z2]);
    }
  }

  return wallSegments;
};

// Get line segments for doors only
export const getDoorLineSegments = (): Array<[number, number, number, number]> => {
  const doorSegments: Array<[number, number, number, number]> = [];

  for(let i = 0; i < floorplanData.length; i++) {
    const segment = floorplanData[i];

    // Check if this is a door segment (with "door" at index 4)
    if(
      segment?.length === 7 &&
      typeof segment[0] === 'number' &&
      typeof segment[1] === 'number' &&
      typeof segment[2] === 'number' &&
      typeof segment[3] === 'number' &&
      segment[4] === 'door'
    ) {
      // Extract coordinates, convert from decimeters to meters, and round to 2 decimal places
      const x1 = Math.round((segment[0] as number) * 0.1 * 100) / 100;
      const z1 = Math.round((segment[1] as number) * 0.1 * 100) / 100;
      const x2 = Math.round((segment[2] as number) * 0.1 * 100) / 100;
      const z2 = Math.round((segment[3] as number) * 0.1 * 100) / 100;

      // Add logging to verify the data is being extracted correctly
      // console.log(`Found door segment: [${x1}, ${z1}] to [${x2}, ${z2}]`);
      doorSegments.push([x1, z1, x2, z2]);
    }
  }

  // console.log(`Total door segments extracted: ${doorSegments.length}`);
  return doorSegments;
};
