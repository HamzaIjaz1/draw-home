import { Box3, Vector3 } from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { adjustWallEnd, buildFurnitureIntervals, filterFurnitureOnWallPlane, findFurnituresWithFurnitureIdInScene, furnitureWorldOnWall, getGlobalWallChainEndsHorizontal, onWallFromWorldPoint } from '../../utils/wallsChain';
import { setTempWallFurnitureCoordinate, useTempWallFurniture } from '../../zustand/useTempWallFurniture';
import { useWalls } from '../../zustand/useWalls/store';
import { GuideLines } from '../GuideLines';
import { perpTowardPointC, pointAlong, toVector3 } from '../../utils/helpers';
import { wallGuideLineDistanceColor, wallGuideLineDistanceLabelColor, wallGuideLineSnapColor } from '../../constants';
import { useViewMode } from '../../zustand/useViewMode';
import { useLevels } from '../../zustand/useLevels/store';
import { computeBoundsOnlyMeshes, useModelBounds } from '../../customHooks/useModelBounds';
import { getWallsByLevel } from '../../zustand/useWalls/actions1';
import { useR3FDataResolved } from '../../zustand/useR3FData';
import { computeFurnitureSnap } from '../../utils/computeFurnitureSnap';

const EPS = 1e-4; // Snap update tolerance, avoid maximum update depth exceeded error
const colinearTolerance = 0.001;
const snapDistance = 0.1;

export const WallTempFurnitureGuideLineHelper = () => {
  const { viewMode } = useViewMode();
  const { scene, camera } = useR3FDataResolved.getState();
  const tempWallFurniture = useStoreWithEqualityFn(
    useTempWallFurniture,
    state => state.tempWallFurniture,
    (a, b) => a?.furniture.onWallCoordinateX === b?.furniture.onWallCoordinateX &&
    a?.furniture.onWallCoordinateY === b?.furniture.onWallCoordinateY,
  );
  const tempFurnitureBounds = useModelBounds({ url: tempWallFurniture?.furniture.url });
  const { levels } = useLevels();
  const { walls } = useWalls();
  const [snapGuideLines, setSnapGuideLines] = useState<Array<{ from: Vector3; to: Vector3 }>>([]);

  const targetWallId = !isNull(tempWallFurniture) ? tempWallFurniture.targetWallId : null;
  const lastAppliedRef = useRef<{ x: number; y: number } | null>(null);

  const up = useMemo(() => new Vector3(0, 1, 0), []);
  const { targetWall, targetLevelId, targetLevelElevation, targetLevelHeight } = useMemo(() => {
    if(isNull(targetWallId)) {
      return { targetWall: null, targetLevelId: null, targetLevelElevation: null, targetLevelHeight: null };
    }

    const found = walls.find(e => e.id === targetWallId);
    if(isUndefined(found)) {
      return { targetWall: null, targetLevelId: null, targetLevelElevation: null, targetLevelHeight: null };
    }

    const level = levels.find(e => e.id === found.levelId);
    return {
      targetWall: found,
      targetLevelId: found.levelId,
      targetLevelElevation: level ? level.elevation : null,
      targetLevelHeight: level ? level.height : null,
    };
  }, [targetWallId, walls, levels]);

  const wallsByLevel = useMemo(() => getWallsByLevel(walls), [walls]);

  const wallsOnSameLevel = useMemo(() => {
    if(isNull(targetLevelId)) {
      return walls;
    }
    return wallsByLevel.get(targetLevelId) ?? [];
  }, [targetLevelId, wallsByLevel, walls]);

  const tempOnWallX = !isNull(tempWallFurniture) ? tempWallFurniture.furniture.onWallCoordinateX : null;
  const tempOnWallY = !isNull(tempWallFurniture) ? tempWallFurniture.furniture.onWallCoordinateY : null;
  const start = !isNull(targetWall) ? targetWall.position.start : null;
  const end = !isNull(targetWall) ? targetWall.position.end : null;
  const tempFurnitureHeight = !isNull(tempFurnitureBounds) ? tempFurnitureBounds.size.y : null;

  // Get selected furniture world coordinates
  const tempWallFurnitureWorldPos = useMemo(() => {
    if(isNull(start) || isNull(end) || isNull(tempOnWallX) || isNull(tempOnWallY)
      || isNull(targetLevelElevation)) {
      return null;
    }

    const p = furnitureWorldOnWall(
      toVector3(start),
      toVector3(end),
      tempOnWallX,
      tempOnWallY,
    );
    p.add(new Vector3(0, targetLevelElevation, 0));
    return p;
  }, [start, end, tempOnWallX, tempOnWallY, targetLevelElevation]);

  // Get all furnitures in scene with filled furnitureId in userData
  const furnituresAll = useMemo(() => {
    if(isNull(tempWallFurniture)) {
      return [];
    }
    return findFurnituresWithFurnitureIdInScene(scene);
  }, [scene, tempWallFurniture]);

  // Filtered furnitures
  const furnituresWithoutTempFurniture = useMemo(() => furnituresAll.filter(
    e => e.userData?.furnitureId !== tempWallFurniture?.furniture.id,
  ), [furnituresAll, tempWallFurniture?.furniture.id]);

  const otherFurnitureWorldBounds = useMemo(() => furnituresWithoutTempFurniture
    .map(obj => {
      const { box, size, center } = computeBoundsOnlyMeshes(obj);

      return {
        box,
        size,
        center,
        furnitureId: obj.userData?.furnitureId,
      };
    }), [furnituresWithoutTempFurniture]);

  // Get start and end points of wall (not only current wall, continuation in a straight line also)
  const wallsChain = useMemo(() => {
    if(isNull(targetWall)) {
      return null;
    }

    const chain = getGlobalWallChainEndsHorizontal(wallsOnSameLevel, targetWall.id);

    if(isNull(chain) || chain.tangent.lengthSq() === 0) {
      return null;
    }

    return {
      A: chain.A,
      B: chain.B,
      tangent: chain.tangent,
    };
  }, [targetWall, wallsOnSameLevel]);

  // Snap Furniture Effect
  useEffect(() => {
    if(
      false
        || isNull(tempWallFurniture)
        || isNull(targetWall)
        || isNull(targetWallId)
        || isNull(tempFurnitureBounds)
        || isNull(tempWallFurnitureWorldPos)
        || isNull(tempFurnitureHeight)
        || isNull(wallsChain)
        || isNull(targetLevelHeight)
        || isNull(targetLevelElevation)
        || otherFurnitureWorldBounds.length === 0
    ) {
      return;
    }

    const curFurnitureObj = furnituresAll.find(e => e.userData?.furnitureId === tempWallFurniture.furniture.id);
    if(isUndefined(curFurnitureObj)) {
      return;
    }

    const tempWallFurnitureWorldCenterPos = tempWallFurnitureWorldPos.clone().add(new Vector3(0, tempFurnitureHeight / 2, 0));
    const tempFurnitureWorldPosBox = new Box3().setFromCenterAndSize(tempWallFurnitureWorldCenterPos, tempFurnitureBounds.size);

    // Filter all the furnitures, which is not on the colinear wall
    const colinearFurnitures = filterFurnitureOnWallPlane(otherFurnitureWorldBounds, wallsChain, colinearTolerance);

    const otherFurnitureObjs = (
      colinearFurnitures
        .map(({ furnitureId }) => furnituresWithoutTempFurniture.find(e => e.userData?.furnitureId === furnitureId))
        .filter(e => !isUndefined(e))
    );

    const wallU = wallsChain.tangent.clone().setY(0).normalize();
    const wallN = new Vector3().crossVectors(up, wallU).normalize();

    const { offset, guides } = computeFurnitureSnap(
      curFurnitureObj,
      otherFurnitureObjs,
      snapDistance,
      {
        normal: wallN,
        point: tempWallFurnitureWorldCenterPos,
      },
      null,
    );

    if(!isNull(offset)) {
      const snappedCenter = tempFurnitureWorldPosBox.getCenter(new Vector3()).add(offset);
      const newOnWallX = onWallFromWorldPoint(targetWall.position, snappedCenter);
      const newOnWallY = snappedCenter.y - targetLevelElevation - tempFurnitureHeight / 2;
      const newOnWallYForSetter = newOnWallY - targetLevelHeight / 2;

      const curOnWallX = tempWallFurniture.furniture.onWallCoordinateX;
      const curOnWallY = tempWallFurniture.furniture.onWallCoordinateY;

      const changedX = Math.abs(newOnWallX - curOnWallX) > EPS;
      const changedY = Math.abs(newOnWallY - curOnWallY) > EPS;

      const last = lastAppliedRef.current;
      const sameAsLast = !isNull(last) && Math.abs(last.x - newOnWallX) <= EPS && Math.abs(last.y - newOnWallY) <= EPS;

      if((changedX === true || changedY === true) && sameAsLast === false) {
        setTempWallFurnitureCoordinate(targetWallId, newOnWallX, newOnWallYForSetter);
        lastAppliedRef.current = { x: newOnWallX, y: newOnWallY };
      }
    }
    setSnapGuideLines(guides);
  }, [
    tempWallFurniture,
    tempFurnitureBounds,
    levels,
    targetWallId,
    targetWall,
    tempWallFurnitureWorldPos,
    tempFurnitureHeight,
    otherFurnitureWorldBounds,
    wallsChain,
    targetLevelHeight,
    up,
    furnituresAll,
    furnituresWithoutTempFurniture,
    targetLevelElevation,
  ]);

  if(
    false
      || isNull(tempWallFurniture)
      || isNull(tempFurnitureHeight)
      || isNull(targetWall)
      || isNull(tempFurnitureBounds)
      || isNull(tempWallFurnitureWorldPos)
      || isNull(targetLevelId)
      || isNull(wallsChain)
      || furnituresWithoutTempFurniture.length === 0
  ) {
    return null;
  }

  const wallEndA = wallsChain.A.clone().setY(tempWallFurnitureWorldPos.y + tempFurnitureHeight / 2);
  const wallEndB = wallsChain.B.clone().setY(tempWallFurnitureWorldPos.y + tempFurnitureHeight / 2);

  const wallEndToHiddenA = adjustWallEnd(
    tempWallFurnitureWorldPos.clone().setY(wallEndA.y),
    wallEndA,
    targetWall.id,
    wallsOnSameLevel,
  );

  const wallEndToHiddenB = adjustWallEnd(
    tempWallFurnitureWorldPos.clone().setY(wallEndB.y),
    wallEndB,
    targetWall.id,
    wallsOnSameLevel,
  );

  // Selected furniture at world position
  const from = tempWallFurnitureWorldPos.clone();

  // Selected furniture bounding box points
  const tempFurnitureTopA = pointAlong(from, wallsChain.tangent, -tempFurnitureBounds.size.x / 2).setY(from.y + tempFurnitureHeight);
  const tempFurnitureTopB = pointAlong(from, wallsChain.tangent, tempFurnitureBounds.size.x / 2).setY(from.y + tempFurnitureHeight);
  const tempFurnitureMiddleA = pointAlong(from, wallsChain.tangent, -tempFurnitureBounds.size.x / 2).setY(from.y + tempFurnitureHeight / 2);
  const tempFurnitureMiddleB = pointAlong(from, wallsChain.tangent, tempFurnitureBounds.size.x / 2).setY(from.y + tempFurnitureHeight / 2);

  const perpToCamera = perpTowardPointC(wallEndA, wallEndB, camera.position);
  const normalLabel = perpToCamera.sub(up.clone().multiplyScalar(perpToCamera.dot(up))).normalize();

  const dimensionIntervalsHorizontalA = buildFurnitureIntervals(tempFurnitureMiddleA, wallEndToHiddenA, furnituresWithoutTempFurniture);
  const dimensionIntervalsHorizontalB = buildFurnitureIntervals(tempFurnitureMiddleB, wallEndToHiddenB, furnituresWithoutTempFurniture);

  return (
    <>
      {
        snapGuideLines.map((e, i) => (
          <GuideLines
            key={i}
            from={e.from}
            to={e.to}
            showLabel={false}
            lineColor={wallGuideLineSnapColor}
          />
        ))
      }
      {/* target furniture dimension label */}
      <GuideLines
        from={tempFurnitureTopA}
        to={tempFurnitureTopB}
        showLine={false}
        showEndpoints={false}
        showLabel={viewMode !== '2D'}
        labelNormal={viewMode === '2D' ? up : normalLabel}
      />
      {/* Center Horizontal blue line with dimension labels direction A */}
      {
        dimensionIntervalsHorizontalA.map(e => (
          <GuideLines
            key={e.id}
            from={e.from}
            to={e.to}
            showLine={e.isFurnitureInterval === false}
            showEndpoints={e.isFurnitureInterval === false}
            lineColor={e.isFurnitureInterval === true ? undefined : wallGuideLineDistanceColor}
            labelBackgroundColor={e.isFurnitureInterval === true ? undefined : wallGuideLineDistanceLabelColor}
            labelNormal={viewMode === '2D' ? up : normalLabel}
          />
        ))
      }
      {/* Center Horizontal blue line with dimension labels direction B */}
      {
        dimensionIntervalsHorizontalB.map(e => (
          <GuideLines
            key={e.id}
            from={e.from}
            to={e.to}
            showLine={e.isFurnitureInterval === false}
            showEndpoints={e.isFurnitureInterval === false}
            lineColor={e.isFurnitureInterval === true ? undefined : wallGuideLineDistanceColor}
            labelBackgroundColor={e.isFurnitureInterval === true ? undefined : wallGuideLineDistanceLabelColor}
            labelNormal={viewMode === '2D' ? up : normalLabel}
          />
        ))
      }
    </>
  );
};
