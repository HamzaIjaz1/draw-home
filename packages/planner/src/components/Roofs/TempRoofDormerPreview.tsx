import { getNotUndefined, isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import { useMemo, useRef } from 'react';
import { Group, Quaternion, Vector3 } from 'three';
import { clearFutureWalls, useLevels, useSpaces, useTempWalls, useWalls } from '../../zustand';
import { useRoofs } from '../../zustand/useRoofs';
import { useTempRoofDormer } from '../../zustand/useTempRoofDormer';
import { GableDormer } from '../../calculationsByJovan/dormers/gableDormer';
import { HipDormer } from '../../calculationsByJovan/dormers/hipDormer';
import { ShedDormer } from '../../calculationsByJovan/dormers/shedDormer';
import { RoofParts } from '../../calculationsByJovan/types';
import { findSpaceClosedContours } from '../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../utils/getAreaOfSmallerContour';
import { removeRepeatedValues } from '../../utils/removeRepeatedValues';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from '../../utils/roofCache';
import { RealRoofDormer } from './RealRoofDormer';

/**
 * Converts dormer position and rotation (world space quaternion) to direction point
 */
const calculateDirectionPoint = (position: Vector3, rotation: Quaternion): Vector3 => {
  const forwardDirection = new Vector3(0, 0, 1);
  forwardDirection.applyQuaternion(rotation);
  return position.clone().add(forwardDirection);
};

/**
 * Finds which roof part the dormer is on
 */
const findDormerRoofPartIndex = (position: Vector3, roofParts: RoofParts): number => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  for(let i = 0; i < roofParts.length; i++) {
    const roofPart = roofParts[i];
    if(!roofPart || roofPart.length < 3) {
      continue;
    }

    const [p0, p1, p2] = roofPart;
    if(!p0 || !p1 || !p2) {
      continue;
    }

    const v1 = new Vector3().subVectors(p1, p0);
    const v2 = new Vector3().subVectors(p2, p0);
    const normal = new Vector3().crossVectors(v1, v2).normalize();

    const d = -normal.dot(p0);
    const distance = Math.abs(normal.dot(position) + d);

    if(distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};

/**
 * Displays a preview of the temp dormer with real calculated geometry
 */
export const TempRoofDormerPreview: React.FC = () => {
  const { tempRoofDormer } = useTempRoofDormer();
  const { roofs } = useRoofs();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const groupRef = useRef<Group>(null);

  const dormerGeometry = useMemo(() => {
    if(isNull(tempRoofDormer)) {
      return null;
    }

    try {
      // Find the roof data
      const roof = roofs.find(e => e.id === tempRoofDormer.targetRoofId);
      if(isUndefined(roof)) {
        return null;
      }

      // Get roof parts based on roof type
      const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === roof.id).flatMap(e => e.walls));
      if(wallIds.length === 0) {
        return null;
      }

      const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
      const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
      if(!isArrayLength(spaceWalls, '>=', 1)) {
        return null;
      }

      const level = getNotUndefined(
        levels.find(e => e.id === spaceWalls[0].levelId),
        'This should never happen. |531972|',
      );

      const elevation = level.elevation + level.height;

      // Get the biggest contour
      const { contours } = findSpaceClosedContours(spaceWalls);
      const [biggestContour] = (
        contours
          .map(e => ({
            area: calculateCoplanarPolygonArea(e),
            contour: e,
          }))
          .toSorted((a, b) => b.area - a.area)
      );

      if(isUndefined(biggestContour) || biggestContour.contour.length < 3) {
        return null;
      }

      const coords = biggestContour.contour.slice(0, -1);

      // Calculate roof parts based on type
      let roofParts;
      switch(roof.roofData.type) {
        case 'hip': {
          const { roofParts: parts } = calculateHipRoofDataCached({
            roofId: roof.id,
            coords,
            offset: roof.roofData.overhang,
            roofHeightFromBase: roof.roofData.heightFromBase,
            roofSlope: roof.roofData.hipSlope,
            gableIndices: roof.roofData.activeGableIndices,
            isClosedGable: roof.roofData.isClosedGable,
          });
          roofParts = parts;
          break;
        }
        case 'slanted': {
          const { roofParts: parts } = calculateSlantedRoofDataCached({
            coords,
            offset: roof.roofData.overhang,
            roofHeightFromBase: roof.roofData.heightFromBase,
            roofSlope: roof.roofData.slantedSlope,
            slopeOrientation: roof.roofData.slantedSlopeOrientation,
          });
          roofParts = parts;
          break;
        }
        case 'wraparound': {
          const { roofParts: parts } = calculateWraparoundRoofDataCached({
            coords,
            offset: roof.roofData.overhang,
            roofHeightFromBase: roof.roofData.heightFromBase,
            roofSlope: roof.roofData.slantedSlope,
            flipSide: roof.roofData.isFlippedWraparound,
          });
          roofParts = parts;
          break;
        }
        case 'flat':
          // Flat roofs don't support dormers
          return null;
        default:
          return null;
      }

      // Convert position to relative coordinates
      const relativePosition = tempRoofDormer.dormer.position.clone();
      relativePosition.y -= elevation;

      // Calculate direction point
      const directionPoint = calculateDirectionPoint(relativePosition, tempRoofDormer.dormer.rotation);

      // Find roof part index
      const dormerMainRoofPartIndex = findDormerRoofPartIndex(relativePosition, roofParts);

      // Create dormer instance
      const wallHeight = tempRoofDormer.dormer.height * 0.6;
      const roofHeight = tempRoofDormer.dormer.height * 0.4;
      const dormerSoffit = 0.1;

      let dormer;
      if(tempRoofDormer.dormer.type === 'gable') {
        dormer = new GableDormer(
          relativePosition,
          directionPoint,
          tempRoofDormer.dormer.width,
          tempRoofDormer.dormer.depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          dormerSoffit,
        );
      } else if(tempRoofDormer.dormer.type === 'hip') {
        dormer = new HipDormer(
          relativePosition,
          directionPoint,
          tempRoofDormer.dormer.width,
          tempRoofDormer.dormer.depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          dormerSoffit,
        );
      } else if(tempRoofDormer.dormer.type === 'shed') {
        dormer = new ShedDormer(
          relativePosition,
          directionPoint,
          tempRoofDormer.dormer.width,
          tempRoofDormer.dormer.depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          dormerSoffit,
        );
      } else {
        // Fallback to gable for unknown types
        console.warn(`Unknown dormer type: ${tempRoofDormer.dormer.type}. Falling back to gable.`);
        dormer = new GableDormer(
          relativePosition,
          directionPoint,
          tempRoofDormer.dormer.width,
          tempRoofDormer.dormer.depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          dormerSoffit,
        );
      }

      const { dormerBodyParts, dormerRoofParts } = dormer.calculateGeometry();

      // If geometry is empty (validation failed), return null silently
      // This is normal during preview/dragging when dormer might be in invalid positions
      if(dormerBodyParts.length === 0 && dormerRoofParts.length === 0) {
        return null;
      }

      return {
        dormerBodyParts,
        dormerRoofParts,
        elevation,
      };
    } catch(e) {
      console.error('[TempRoofDormerPreview] Error calculating geometry:', e);
      return null;
    }
  }, [tempRoofDormer, roofs, spaces, walls, tempWalls, levels]);

  return !isNull(tempRoofDormer) && !isNull(dormerGeometry) && tempRoofDormer.isOnRoof === true && (
    <group ref={groupRef}>
      <RealRoofDormer
        dormerBodyParts={dormerGeometry.dormerBodyParts}
        elevation={dormerGeometry.elevation}
        opacity={0.6}
        color='#4caf50'
      />
      <RealRoofDormer
        dormerBodyParts={dormerGeometry.dormerRoofParts}
        elevation={dormerGeometry.elevation}
        opacity={0.6}
        color='#4caf50'
      />
    </group>
  );
};
