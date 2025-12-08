import { WallId } from '@draw-house/common/dist/brands';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { BoxGeometry } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useEffect, useMemo } from 'react';
import { LevelsStore, mergeFutureWalls, useTempWalls, useWalls, WallsStore } from '../../zustand';
import { calculateWallCornersDiff } from '../../utils';
import { WallSidesSpaceRelations } from '../../utils/getWallSidesSpaceRelations';

const createDashedGeometries = (
  totalLength: number,
  zOffset: number,
  startOffset: number,
  dashSize: number,
  wallHeight: number,
  outlineWidth: number,
  gapSize: number,
) => {
  const minRequiredLength = dashSize * 2;
  if(totalLength < minRequiredLength) {
    const solidGeometry = new BoxGeometry(totalLength, wallHeight, outlineWidth);
    solidGeometry.translate(startOffset, 0, zOffset);

    return [solidGeometry];
  }

  const halfDash = dashSize / 2;
  const workingLength = totalLength - dashSize;
  const segmentLength = dashSize + gapSize;
  const numMiddleSegments = Math.floor(workingLength / segmentLength);

  const dashedGeometries: BoxGeometry[] = [];

  const firstDash = new BoxGeometry(halfDash, wallHeight, outlineWidth);
  firstDash.translate(startOffset - totalLength / 2 + halfDash / 2, 0, zOffset);
  dashedGeometries.push(firstDash);

  if(numMiddleSegments > 1) {
    const actualGap = (workingLength - numMiddleSegments * dashSize) / numMiddleSegments;

    for(let i = 0; i < numMiddleSegments; i++) {
      const dashGeometry = new BoxGeometry(dashSize, wallHeight, outlineWidth);
      const xPosition = startOffset - totalLength / 2 + halfDash + actualGap + i * (dashSize + actualGap) + dashSize / 2;

      dashGeometry.translate(xPosition, 0, zOffset);
      dashedGeometries.push(dashGeometry);
    }
  }

  const lastDash = new BoxGeometry(halfDash, wallHeight, outlineWidth);
  lastDash.translate(startOffset + totalLength / 2 - halfDash / 2, 0, zOffset);
  dashedGeometries.push(lastDash);

  return dashedGeometries;
};

type WallOutline2DProp = {
  id: WallId;
  length: number;
  wallThickness: WallsStore['walls'][number]['thickness'];
  cornersDiff: ReturnType<typeof calculateWallCornersDiff>[number]['cornersDiff'];
  wallHeight: LevelsStore['levels'][number]['height'];
  position: WallsStore['walls'][number]['position'];
  levelId: WallsStore['walls'][number]['levelId'];
  wallSidesRelations?: WallSidesSpaceRelations | undefined;
  isHiddenWall: boolean;
};

export const WallOutline2D: React.FC<WallOutline2DProp> = ({
  id,
  length,
  wallThickness,
  cornersDiff,
  wallHeight,
  position,
  levelId,
  wallSidesRelations,
  isHiddenWall,
}) => {
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();

  const outlineColor = isHiddenWall ? '#afafaf' : '#585858';
  const outlineWidth = 0.03;

  const futureWalls = mergeFutureWalls([...walls, ...tempWalls]);
  const wallsOnSameLevel = futureWalls.filter(e => e.levelId === levelId).filter(e => e.id !== id);

  const frontLength = length + cornersDiff.frontStart + cornersDiff.frontEnd + outlineWidth + 0.01;
  const backLength = length + cornersDiff.backStart + cornersDiff.backEnd + outlineWidth + 0.01;
  const isStartConnected = !isUndefined(wallsOnSameLevel.find(e => (
    position.start.equals(e.position.start) || position.start.equals(e.position.end)
  )));
  const isEndConnected = !isUndefined(wallsOnSameLevel.find(e => (
    position.end.equals(e.position.start) || position.end.equals(e.position.end)
  )));

  const { geometry } = useMemo(() => {
    const dashSize = 0.1;
    const gapSize = 0.05;
    const isDashedFront = !isUndefined(wallSidesRelations) && !isNull(wallSidesRelations.frontSide) && isHiddenWall === true;
    const isDashedBack = !isUndefined(wallSidesRelations) && !isNull(wallSidesRelations.backSide) && isHiddenWall === true;

    const geometries = [];

    if(isDashedFront === true) {
      const dashedGeometries = createDashedGeometries(
        frontLength,
        (wallThickness + outlineWidth) / 2,
        (cornersDiff.frontEnd - cornersDiff.frontStart) / 2,
        dashSize,
        wallHeight,
        outlineWidth,
        gapSize,
      );

      geometries.push(...dashedGeometries);
    } else {
      const frontGeometry = new BoxGeometry(frontLength, wallHeight, outlineWidth);

      frontGeometry.translate((cornersDiff.frontEnd - cornersDiff.frontStart) / 2, 0, (wallThickness + outlineWidth) / 2);
      geometries.push(frontGeometry);
    }

    if(isDashedBack === true) {
      const dashedGeometries = createDashedGeometries(
        backLength,
        -(wallThickness + outlineWidth) / 2,
        (cornersDiff.backEnd - cornersDiff.backStart) / 2,
        dashSize,
        wallHeight,
        outlineWidth,
        gapSize,
      );

      geometries.push(...dashedGeometries);
    } else {
      const backGeometry = new BoxGeometry(backLength, wallHeight, outlineWidth);

      backGeometry.translate((cornersDiff.backEnd - cornersDiff.backStart) / 2, 0, -(wallThickness + outlineWidth) / 2);
      geometries.push(backGeometry);
    }

    if(isStartConnected === false) {
      const startGeom = new BoxGeometry(outlineWidth, wallHeight, wallThickness + outlineWidth * 2);

      startGeom.translate(-(length + outlineWidth) / 2, 0, 0);
      geometries.push(startGeom);
    }
    if(isEndConnected === false) {
      const endGeom = new BoxGeometry(outlineWidth, wallHeight, wallThickness + outlineWidth * 2);

      endGeom.translate((length + outlineWidth) / 2, 0, 0);
      geometries.push(endGeom);
    }

    return {
      geometry: mergeGeometries(geometries),
    };
  }, [
    backLength,
    cornersDiff.backEnd,
    cornersDiff.backStart,
    cornersDiff.frontEnd,
    cornersDiff.frontStart,
    frontLength,
    isEndConnected,
    isStartConnected,
    length,
    wallHeight,
    wallThickness,
    wallSidesRelations,
    isHiddenWall,
  ]);
  useEffect(() => (
    () => {
      geometry.dispose();
    }
  ), [geometry]);

  return (
    <mesh position-y={-0.025} geometry={geometry}>
      <meshStandardMaterial color={outlineColor} />
    </mesh>
  );
};
