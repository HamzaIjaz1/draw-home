import { useEffect, useMemo, useRef } from 'react';
import { Group, Quaternion, Vector2, Vector3 } from 'three';
import { GroupProps } from '@react-three/fiber';
import { isNull } from '@arthurka/ts-utils';
import { setCursor, useCreationMode, usePopUpToolbar, useViewMode } from '../../zustand';
import { SuspenseHOC } from '../SuspenseHOC';
import { RoofsStore } from '../../zustand/useRoofs';
import { useSelectedItem } from '../../zustand/useSelectedItem';
import { startMovingRoofDormer, useTempRoofDormer } from '../../zustand/useTempRoofDormer';
import { RoofParts } from '../../calculationsByJovan/types';
import { GableDormer } from '../../calculationsByJovan/dormers/gableDormer';
import { HipDormer } from '../../calculationsByJovan/dormers/hipDormer';
import { ShedDormer } from '../../calculationsByJovan/dormers/shedDormer';
import { DORMER_SOFFIT } from '../../zustand/useRoofs/subscriptions';
import { RealRoofDormer } from './RealRoofDormer';

export type RoofDormerProps = {
  dormer: RoofsStore['roofs'][number]['roofData']['dormers'][number];
  roofParts: RoofParts;
  elevation: number;
  opacity: number;
  thickness: RoofsStore['roofs'][number]['roofData']['thickness'];
  topTexture: RoofsStore['roofs'][number]['roofData']['topTexture'];
  bottomTexture: RoofsStore['roofs'][number]['roofData']['bottomTexture'];
  edgeTexture: RoofsStore['roofs'][number]['roofData']['edgeTexture'];
  topColorOverlay: RoofsStore['roofs'][number]['roofData']['topColorOverlay'];
  bottomColorOverlay: RoofsStore['roofs'][number]['roofData']['bottomColorOverlay'];
  edgeColorOverlay: RoofsStore['roofs'][number]['roofData']['edgeColorOverlay'];
  topCompositeOperation: RoofsStore['roofs'][number]['roofData']['topCompositeOperation'];
  bottomCompositeOperation: RoofsStore['roofs'][number]['roofData']['bottomCompositeOperation'];
  edgeCompositeOperation: RoofsStore['roofs'][number]['roofData']['edgeCompositeOperation'];
  topTextureTransform?: RoofsStore['roofs'][number]['roofData']['topTextureTransform'];
  bottomTextureTransform?: RoofsStore['roofs'][number]['roofData']['bottomTextureTransform'];
  edgeTextureTransform?: RoofsStore['roofs'][number]['roofData']['edgeTextureTransform'];
};

/**
 * Converts dormer position and rotation (world space quaternion) to direction point
 * needed by the dormer calculation classes
 */
const calculateDirectionPoint = (position: Vector3, rotation: Quaternion): Vector3 => {
  // The dormer's forward direction (along depth) is the positive Z axis
  // We need to rotate this by the quaternion to get world space direction
  const forwardDirection = new Vector3(0, 0, 1);
  forwardDirection.applyQuaternion(rotation);

  // Direction point is 1 unit forward from position
  return position.clone().add(forwardDirection);
};

/**
 * Finds which roof part the dormer is on by checking which plane the dormer position is closest to
 */
const findDormerRoofPartIndex = (position: Vector3, roofParts: RoofParts): number => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  for(let i = 0; i < roofParts.length; i++) {
    const roofPart = roofParts[i];
    if(!roofPart || roofPart.length < 3) {
      continue;
    }

    // Calculate plane from first 3 points
    const [p0, p1, p2] = roofPart;
    if(!p0 || !p1 || !p2) {
      continue;
    }

    // Calculate plane normal
    const v1 = new Vector3().subVectors(p1, p0);
    const v2 = new Vector3().subVectors(p2, p0);
    const normal = new Vector3().crossVectors(v1, v2).normalize();

    // Calculate distance from point to plane
    const d = -normal.dot(p0);
    const distance = Math.abs(normal.dot(position) + d);

    if(distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};

export const RoofDormer: React.FC<RoofDormerProps> = SuspenseHOC(({
  roofParts,
  elevation,
  opacity,
  thickness,
  topTexture,
  bottomTexture,
  edgeTexture,
  topColorOverlay,
  bottomColorOverlay,
  edgeColorOverlay,
  topCompositeOperation,
  bottomCompositeOperation,
  edgeCompositeOperation,
  topTextureTransform,
  bottomTextureTransform,
  edgeTextureTransform,
  dormer: {
    id,
    type,
    position,
    rotation,
    width,
    height,
    depth,
    isHidden,
  },
}) => {
  const { creationMode } = useCreationMode();
  const { viewMode } = useViewMode();
  const selectedItem = useSelectedItem(s => s.selectedItem);
  const tempRoofDormer = useTempRoofDormer(s => s.tempRoofDormer);
  const groupRef = useRef<Group>(null);

  const isMoving = selectedItem?.type === 'roofDormer' && selectedItem.id === id && selectedItem.mode === 'move';
  const isTempDormer = !isNull(tempRoofDormer) && tempRoofDormer.dormer.id === id;

  // Use temp state if in move mode, otherwise use props
  const actualPosition = isTempDormer ? tempRoofDormer.dormer.position : position;
  const actualRotation = isTempDormer ? tempRoofDormer.dormer.rotation : rotation;

  // Calculate dormer geometry using the calculation classes
  const dormerGeometry = useMemo(() => {
    try {
      // The dormer position is in world space (includes elevation)
      // But roofParts are in relative space (relative to elevation)
      // We need to convert the dormer position to the same coordinate space as roofParts
      const relativePosition = actualPosition.clone();
      relativePosition.y -= elevation;

      // Convert quaternion rotation to direction point (also in relative space)
      const directionPoint = calculateDirectionPoint(relativePosition, actualRotation);

      // Find which roof part this dormer is on (use relative position)
      const dormerMainRoofPartIndex = findDormerRoofPartIndex(relativePosition, roofParts);

      // Create dormer instance based on type
      let dormer;
      const wallHeight = height * 0.6; // 60% of total height is wall
      const roofHeight = height * 0.4; // 40% of total height is roof

      if(type === 'gable') {
        dormer = new GableDormer(
          relativePosition,
          directionPoint,
          width,
          depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          DORMER_SOFFIT,
        );
      } else if(type === 'hip') {
        dormer = new HipDormer(
          relativePosition,
          directionPoint,
          width,
          depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          DORMER_SOFFIT,
        );
      } else if(type === 'shed') {
        dormer = new ShedDormer(
          relativePosition,
          directionPoint,
          width,
          depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          DORMER_SOFFIT,
        );
      } else {
        // Fallback to gable for unknown types
        console.warn(`Unknown dormer type: ${type}. Falling back to gable.`);
        dormer = new GableDormer(
          relativePosition,
          directionPoint,
          width,
          depth,
          wallHeight,
          roofHeight,
          roofParts,
          [dormerMainRoofPartIndex],
          'roof',
          DORMER_SOFFIT,
        );
      }

      // Calculate geometry
      const { dormerBodyParts, dormerRoofParts } = dormer.calculateGeometry();

      return {
        dormerBodyParts,
        dormerRoofParts,
      };
    } catch(e) {
      console.error('[RoofDormer] Error calculating dormer geometry:', e);
      return {
        dormerBodyParts: [],
        dormerRoofParts: [],
      };
    }
  }, [actualPosition, actualRotation, width, height, depth, type, roofParts, elevation]);

  useEffect(() => {
    groupRef.current?.updateMatrixWorld(true);
  }, [actualPosition, actualRotation, width, height, depth]);

  // Initialize temp state when entering move mode
  useEffect(() => {
    if(isMoving === true && isTempDormer === false) {
      startMovingRoofDormer({
        id,
        type,
        position,
        rotation,
        width,
        height,
        depth,
        isHidden,
        wallIds: null,
      });
      setCursor('grabbing');
    }
  }, [isMoving, isTempDormer, id, type, position, rotation, width, height, depth, isHidden]);

  return isHidden === false && isMoving === false && viewMode === '3D' && (
    <group
      ref={groupRef}
      {
        ...creationMode === 'pointer' && !isMoving && {
          onPointerEnter(e) {
            e.stopPropagation();
            setCursor('pointer');
          },
          onPointerLeave(e) {
            e.stopPropagation();
            setCursor(null);
          },
          onPointerUp(e) {
            if(e.button !== 0) {
              return;
            }
            e.stopPropagation();

            usePopUpToolbar.setState({
              popUpToolbar: {
                type: 'roofDormer',
                id,
                coords: new Vector2(e.clientX, e.clientY),
              },
            });
          },
        } satisfies Partial<GroupProps>
      }
    >
      <RealRoofDormer
        dormerBodyParts={dormerGeometry.dormerRoofParts}
        elevation={elevation}
        opacity={opacity}
        dormerRoofId={id}
        thickness={thickness}
        topTexture={topTexture}
        bottomTexture={bottomTexture}
        edgeTexture={edgeTexture}
        topColorOverlay={topColorOverlay}
        bottomColorOverlay={bottomColorOverlay}
        edgeColorOverlay={edgeColorOverlay}
        topCompositeOperation={topCompositeOperation}
        bottomCompositeOperation={bottomCompositeOperation}
        edgeCompositeOperation={edgeCompositeOperation}
        topTextureTransform={topTextureTransform}
        bottomTextureTransform={bottomTextureTransform}
        edgeTextureTransform={edgeTextureTransform}
      />
    </group>
  );
});
