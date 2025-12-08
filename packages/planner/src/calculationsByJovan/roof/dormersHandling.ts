import { Vector3 } from 'three';
import { RoofParts } from '../types';
import { Dormer } from '../dormers/dormer';
import { DormerFactory } from '../dormers/dormerFactory';
import { getClosestPointOnLineSegment } from '../Utils/Curve/analysis';
import { findPointAlongDirection } from '../Utils/Transform/euclidianTransform';

export function findBaseEdge(roofPart: Vector3[]): [Vector3, Vector3] | null | undefined {
  const minY = Math.min(...roofPart.map(vertex => vertex.y));

  // Find the base edges
  const n = roofPart.length;
  const baseEdges: Array<[Vector3, Vector3]> = [];
  for(let j = 0; j < n; j++) {
    const p1 = roofPart[j];
    if(p1 === undefined) {
      continue; // or handle accordingly
    }
    const p2 = roofPart[(j + 1) % n];
    if(p2 === undefined) {
      continue; // or handle accordingly
    }
    if(p1.y === minY && p2.y === minY) {
      baseEdges.push([p1, p2]);
    }
  }

  // Use the first base edge
  return baseEdges.length > 0 ? baseEdges[0] : null;
}

export function handleDormers(
  hipRoofParts: RoofParts,
  dormerTypes: string[],
  dormerPositions: Vector3[],
  dormerMainRoofPartIndices: number[],
  dormerPlacements: Array<'roof' | 'inset' | 'wall'>,
  offset: number,
  dormerSoffits: number[],
  gableIndices: number[],
  roofHeightFromBase: number,
): {
    dormerBodyParts: RoofParts;
    dormerRoofParts: RoofParts;
  } {
  const dormers: Dormer[] = [];
  const numberOfDormers = dormerTypes.length;

  if(
    dormerPositions.length < numberOfDormers ||
    dormerMainRoofPartIndices.length < numberOfDormers
  ) {
    console.error(
      'Mismatch in dormer data arrays. Please ensure that dormerTypes, dormerPositions, and dormerMainRoofPartIndices have consistent lengths.',
    );
    // Remove the throw statement to prevent the application from crashing
    return { dormerBodyParts: [], dormerRoofParts: [] };
  }

  for(let i = 0; i < numberOfDormers; i++) {
    const dormerMainRoofPartIndex = dormerMainRoofPartIndices[i] ?? 0;

    // Skip if the dormer is on a gable roof part
    if(gableIndices.includes(dormerMainRoofPartIndex)) {
      console.warn(
        `Dormer at index ${i} is placed on a gable roof part and will be skipped.`,
      );
      continue;
    }

    let dormerPos = dormerPositions[i];


    if(dormerPos) {
      dormerPos = dormerPos.clone();
      dormerPos.y += roofHeightFromBase;
      const dormerType = dormerTypes[i];
      const dormerPlacement: 'roof' | 'inset' | 'wall' =
        dormerPlacements[i] ?? 'roof';

      if(dormerType === undefined) {
        console.warn(`Dormer type is undefined at index ${i}. Skipping this dormer.`);
        continue;
      }

      const dormerMainRoofPartIndex = dormerMainRoofPartIndices[i] ?? 0;
      const roofPart = hipRoofParts[dormerMainRoofPartIndex];
      if(!roofPart) {
        console.warn(`Roof part not found at index ${dormerMainRoofPartIndex}. Skipping this dormer.`);
        continue;
      }

      const baseEdge = findBaseEdge(roofPart);

      if(baseEdge) {
        const dirrectionPoint = getClosestPointOnLineSegment(
          baseEdge[0],
          baseEdge[1],
          dormerPos,
        );
        const wallPosition = findPointAlongDirection(
          dirrectionPoint,
          dormerPos,
          offset,
        );

        let factoryPosition;
        if(dormerPlacement === 'roof' || dormerPlacement === 'inset') {
          factoryPosition = dormerPos;
        } else if(dormerPlacement === 'wall') {
          factoryPosition = wallPosition;
        } else {
          console.warn(
            `Unknown dormer placement '${dormerPlacement}' at index ${i}. Defaulting to 'roof'.`,
          );
          factoryPosition = dormerPos;
        }


        const dormerSoffit = dormerSoffits[i] ?? 0;

        const dormer = DormerFactory(
          dormerType,
          factoryPosition,
          dirrectionPoint,
          1.9, // width
          1.5, // depth
          1, // wall height
          1, // roof height
          hipRoofParts,
          [dormerMainRoofPartIndex],
          dormerPlacement,
          dormerSoffit,
        );

        if(dormer) {
          dormers.push(dormer);
        } else {
          console.warn(`DormerFactory returned null at index ${i}. Skipping this dormer.`);
        }
      } else {
        console.warn(
          `No base edge found for roof part at index ${dormerMainRoofPartIndex}. Skipping this dormer.`,
        );
      }
    } else {
      console.warn(`Dormer position is undefined at index ${i}. Skipping this dormer.`);
    }
  }

  const dormerGeometries = dormers.map(dormer => dormer.calculateGeometry());
  const dormerBodyParts = dormerGeometries.flatMap(geo => geo.dormerBodyParts);
  const dormerRoofParts = dormerGeometries.flatMap(geo => geo.dormerRoofParts);

  return { dormerBodyParts, dormerRoofParts };
}
