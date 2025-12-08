import { Plane } from '@react-three/drei';
import { Vector2 } from 'three';
import { MeshProps } from '@react-three/fiber';
import { Positive, WallId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import Color from 'color';
import { useState } from 'react';
import { compositeOperations, floorSquareSize } from '../constants';
import { getShadowProps, snapPosition, toVector2, toVector3 } from '../utils';
import { FloorGrid } from './FloorGrid';
import { useLandscapeTextures } from '../customHooks';
import { createWallsFromTempWalls, setCursor, setSingleTempWallEndpoint, useCreationMode, useCreationModeConfig, useGlobalSettings, useLevels, useTempWalls } from '../zustand';
import { SuspenseHOC } from './SuspenseHOC';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';
import { useNewCustomModel } from '../zustand/useNewCustomModel';
import { useCanMoveWall } from '../zustand/useCanMoveWall';
import { getHoldingModifiers, useModifierKeysHolding } from '../zustand/useModifierKeysHolding';
import { getWallType } from '../utils/getWallType';
import { getDefaultColorForTexture } from '../utils/getDefaultColorForTexture';

const getClosestProjectionOnAxis = (wallStart: Vector2, point: Vector2) => {
  const deltaX = point.x - wallStart.x;
  const deltaY = point.y - wallStart.y;

  const xPoint = new Vector2(point.x, wallStart.y);
  const yPoint = new Vector2(wallStart.x, point.y);
  const dPoint1 = new Vector2(
    wallStart.x + (deltaX + deltaY) / 2,
    wallStart.y + (deltaX + deltaY) / 2,
  );
  const dPoint2 = new Vector2(
    wallStart.x + (deltaX - deltaY) / 2,
    wallStart.y - (deltaX - deltaY) / 2,
  );

  const candidates = [xPoint, yPoint, dPoint1, dPoint2].toSorted((a, b) => a.distanceTo(point) - b.distanceTo(point));

  return getNotUndefined(candidates[0], 'This should never happen. |dpo9zb|');
};

export const WallCreationPlane: React.FC = SuspenseHOC(() => {
  const { creationMode } = useCreationMode();
  const { levels } = useLevels();
  const { map } = useLandscapeTextures();
  const { newCustomModel } = useNewCustomModel();
  const { elevation } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |z9o7g1|');
  const { canMoveWall } = useCanMoveWall();
  const [wallStart, setWallStart] = useState<Vector2 | null>(null);

  return (
    <>
      <FloorGrid elevation={elevation} />
      <Plane
        {...getShadowProps()}
        userData={{ isNotPartOfLevelObjects: true }}
        args={[floorSquareSize, floorSquareSize]}
        position-y={elevation - 0.01}
        rotation-x={-Math.PI / 2}
        {
          ...isNull(newCustomModel) && creationMode === 'walls' && canMoveWall === false && {
            onPointerEnter() {
              setCursor('pointer');
            },
            onPointerLeave() {
              setCursor(null);
              createWallsFromTempWalls();
              setWallStart(null);
            },
            onPointerDown(e) {
              if(e.button !== 0) {
                return;
              }

              const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();
              const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
              const { creationModeConfig } = useCreationModeConfig.getState();

              const frontSideSpaceId = null;
              const backSideSpaceId = null;

              const frontColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);
              const backColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureBack.id);

              const snappedPoint = snapPosition(e.point);

              if(creationModeConfig.mode === 'straightLine') {
                setWallStart(snappedPoint);

                useTempWalls.setState({
                  tempWalls: [{
                    id: WallId(generateUUID()),
                    levelId: getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |tc646u|').id,
                    frontSideSpaceId,
                    backSideSpaceId,
                    frontTexture: strapiAppConfig.defaultTexturePalette.wallTextureFront,
                    backTexture: strapiAppConfig.defaultTexturePalette.wallTextureBack,
                    frontColorOverlay: isNull(frontColorOverlay) ? null : {
                      type: 'predefined',
                      value: new Color(frontColorOverlay),
                    },
                    backColorOverlay: isNull(backColorOverlay) ? null : {
                      type: 'predefined',
                      value: new Color(backColorOverlay),
                    },
                    frontCompositeOperation: compositeOperations[0],
                    backCompositeOperation: compositeOperations[0],
                    thickness: ({
                      exterior: defaultExteriorWallThickness,
                      interior: defaultInteriorWallThickness,
                    } satisfies Record<ReturnType<typeof getWallType>, Positive>)[getWallType({ frontSideSpaceId, backSideSpaceId })],
                    height: null,
                    furnitures: [],
                    isVisible: creationModeConfig.isWallVisible,
                    isHidden: false,
                    commentName: '',
                    commentFrontTextureAppearance: '',
                    commentFrontTextureOverlayColor: '',
                    commentBackTextureAppearance: '',
                    commentBackTextureOverlayColor: '',
                    dormerRoofId: null,
                    excludeFromRoofCutting: false,
                    position: {
                      start: snappedPoint,
                      end: snappedPoint,
                    },
                  }],
                });
              }
            },
            onPointerMove(e) {
              const { snapToLockedAxis } = useGlobalSettings.getState();
              const { modifierKeysHolding } = useModifierKeysHolding.getState();

              const holdingModifiers = getHoldingModifiers(modifierKeysHolding);
              let point = e.point;

              if(!isNull(wallStart) && snapToLockedAxis !== (holdingModifiers === 'ctrl' || holdingModifiers === 'ctrl+shift')) {
                const projectedPoint = getClosestProjectionOnAxis(wallStart, toVector2(point));
                point = toVector3(projectedPoint);
              }

              setSingleTempWallEndpoint(snapPosition(point));
            },
            onPointerUp(e) {
              if(e.button !== 0) {
                return;
              }
              e.stopPropagation();

              const { snapToLockedAxis } = useGlobalSettings.getState();
              const { modifierKeysHolding } = useModifierKeysHolding.getState();

              const holdingModifiers = getHoldingModifiers(modifierKeysHolding);

              let point = e.point;
              if(!isNull(wallStart) && snapToLockedAxis !== (holdingModifiers === 'ctrl' || holdingModifiers === 'ctrl+shift')) {
                const projectedPoint = getClosestProjectionOnAxis(wallStart, toVector2(point));
                point = toVector3(projectedPoint);
              }

              const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();
              const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
              const { creationModeConfig } = useCreationModeConfig.getState();

              const snappedPoint = snapPosition(point);
              const frontSideSpaceId = null;
              const backSideSpaceId = null;

              setSingleTempWallEndpoint(snappedPoint);
              createWallsFromTempWalls();

              setWallStart(creationModeConfig.mode === 'multipleStraightLines' ? snappedPoint : null);

              const frontColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);
              const backColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureBack.id);

              if(creationModeConfig.mode === 'multipleStraightLines') {
                useTempWalls.setState({
                  tempWalls: [{
                    id: WallId(generateUUID()),
                    levelId: getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |2dcx8t|').id,
                    frontSideSpaceId,
                    backSideSpaceId,
                    frontTexture: strapiAppConfig.defaultTexturePalette.wallTextureFront,
                    backTexture: strapiAppConfig.defaultTexturePalette.wallTextureBack,
                    frontColorOverlay: isNull(frontColorOverlay) ? null : {
                      type: 'predefined',
                      value: new Color(frontColorOverlay),
                    },
                    backColorOverlay: isNull(backColorOverlay) ? null : {
                      type: 'predefined',
                      value: new Color(backColorOverlay),
                    },
                    frontCompositeOperation: compositeOperations[0],
                    backCompositeOperation: compositeOperations[0],
                    thickness: ({
                      exterior: defaultExteriorWallThickness,
                      interior: defaultInteriorWallThickness,
                    } satisfies Record<ReturnType<typeof getWallType>, Positive>)[getWallType({ frontSideSpaceId, backSideSpaceId })],
                    height: null,
                    furnitures: [],
                    isVisible: creationModeConfig.isWallVisible,
                    isHidden: false,
                    commentName: '',
                    commentFrontTextureAppearance: '',
                    commentFrontTextureOverlayColor: '',
                    commentBackTextureAppearance: '',
                    commentBackTextureOverlayColor: '',
                    dormerRoofId: null,
                    excludeFromRoofCutting: false,
                    position: {
                      start: snappedPoint,
                      end: snappedPoint,
                    },
                  }],
                });
              }
            },
          } satisfies Partial<MeshProps>
        }
      >
        {
          isNull(map) && (
            <meshStandardMaterial
              transparent
              opacity={0.5}
              toneMapped={false}
            />
          )
        }
        {
          !isNull(map) && (
            (
              <meshStandardMaterial
                map={map}
                toneMapped={false}
                transparent={false}
                opacity={0.5}
              />
            )
          )
        }
      </Plane>
    </>
  );
});
